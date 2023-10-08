from flask import Flask, request, jsonify
import crawler
import tokenizer
import completer

app = Flask(__name__)


@app.route('/crawl')
def crawl():
    # Define root domain to crawl
    domain = "infomoney.com.br"
    full_url = f"https://{domain}"

    # Crawl the domain
    crawler.crawl(full_url)

    # Tokenize the text
    tokenizer.tokenize(domain)

    # Return a success message
    return f"Successfully crawled and tokenized {domain}!"

@app.route('/question', methods=['POST'])
def answer_question():
    if request.method == 'POST':
        data = request.get_json()
        question = data.get('question', '')

        if question:
            answer = completer.complete(question)
            return jsonify({'answer': answer})
        else:
            return jsonify({'error': 'Question parameter missing or empty'}), 400
    else:
        return jsonify({'error': 'Invalid request method'}), 405


if __name__ == '__main__':
    app.run(debug=True)
