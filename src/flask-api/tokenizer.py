import os
import pandas as pd
import tiktoken
import openai

openai.api_key = "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"

def remove_newlines(serie):
    serie = serie.str.replace('\n', ' ')
    serie = serie.str.replace('\\n', ' ')
    serie = serie.str.replace('  ', ' ')
    return serie

# Function to split the text into chunks of a maximum number of tokens


def split_into_many(text, tokenizer, max_tokens=500):

    # Split the text into sentences
    sentences = text.split('. ')

    # Get the number of tokens for each sentence
    n_tokens = [len(tokenizer.encode(" " + sentence))
                for sentence in sentences]

    chunks = []
    tokens_so_far = 0
    chunk = []

    # Loop through the sentences and tokens joined together in a tuple
    for sentence, token in zip(sentences, n_tokens):
        # If the number of tokens so far plus the number of tokens in the current sentence is greater
        # than the max number of tokens, then add the chunk to the list of chunks and reset
        # the chunk and tokens so far
        if tokens_so_far + token > max_tokens:
            chunks.append(". ".join(chunk) + ".")
            chunk = []
            tokens_so_far = 0

        # Otherwise, add the sentence to the chunk and add the number of tokens to the total
        chunk.append(sentence)
        tokens_so_far += token + 1

    chunks.append(". ".join(chunk) + ".")

    return chunks


def tokenize(domain):
    # Create a list to store the text files
    texts = []

    # Get all the text files in the text directory
    folder_path = f"text/{domain}/"
    for file in os.listdir(folder_path):
        prefix = file.find(domain) + len(domain)
        base_name = file[prefix:-4].replace('-', ' ').replace(
            '_', ' ').replace('#update', '').lstrip()
        if not base_name:
            base_name = file[:-4]

        # Open the file and read the text
        with open(folder_path + file, "r") as f:
            text = f.read()
            texts.append((base_name, text))

    # Create a dataframe from the list of texts
    df = pd.DataFrame(texts, columns=['title', 'text'])

    # Set the text column to be the raw text with newlines removed
    df['text'] = remove_newlines(df.text)
    df.to_csv('processed/scraped.csv')

    # Load the cl100k_base tokenizer which is designed to work with the ada-002 model
    tokenizer = tiktoken.get_encoding("cl100k_base")

    # Tokenize the text and save the number of tokens to a new column
    df = pd.read_csv('processed/scraped.csv', index_col=0)
    df.columns = ['title', 'text']
    df['n_tokens'] = df.text.apply(lambda x: len(tokenizer.encode(x)))
    
    shortened = []
    max_tokens = 500

    # Loop through the dataframe
    for row in df.iterrows():
        # If the text is None, go to the next row
        if row[1]['text'] is None:
            continue

        # # If the number of tokens is greater than the max number of tokens, split the text into chunks
        if row[1]['n_tokens'] > max_tokens:
            shortened += split_into_many(row[1]['text'], tokenizer, max_tokens)

        # Otherwise, add the text to the list of shortened texts
        else:
            shortened.append(row[1]['text'])

    df = pd.DataFrame(shortened, columns=['text'])
    df['n_tokens'] = df.text.apply(lambda x: len(tokenizer.encode(x)))

    df['embeddings'] = df.text.apply(lambda text: openai.Embedding.create(
        input=text, model='text-embedding-ada-002')['data'][0]['embedding'])
    
    df.to_csv('processed/embeddings.csv')

    print(f"Successfully tokenized {domain}!")
