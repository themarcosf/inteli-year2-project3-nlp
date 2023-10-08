from html.parser import HTMLParser
from urllib.parse import urlparse
from collections import deque
import os
from bs4 import BeautifulSoup
import requests
import urllib.request
import re

# Regex pattern to match a URL
HTTP_URL_PATTERN = r'^https://.+'

# Create a class to parse the HTML and get the hyperlinks


class HyperlinkParser(HTMLParser):
    def __init__(self):
        super().__init__()
        # Create a set to store the hyperlinks
        self.links = set()

    # Override the HTMLParser's handle_starttag method to get the hyperlinks
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)

        # Check if the tag is an anchor tag and if it has an href attribute
        if tag == 'a' and 'href' in attrs:
            # Add the hyperlink to the set
            self.links.add(attrs['href'])

# Function to get the hyperlinks from a URL


def get_hyperlinks(url):
    # Try to open the URL and read the HTML
    try:
        # Open the URL and read the HTML
        with urllib.request.urlopen(url) as response:
            # If the response is not HTML, return an empty list
            if not response.info().get("Content-Type").startswith("text/html"):
                return []

            # Decode the response and process the HTML
            html = response.read().decode("utf-8")
    except Exception as e:
        print(e)
        return []

    # Create the HTML parser and then parse the HTML to get the hyperlinks
    parser = HyperlinkParser()
    parser.feed(html)

    return parser.links

# Function to get the hyperlinks from a URL that are within the same domain


def get_domain_hyperlinks(local_domain, url):
    clean_links = []

    for link in get_hyperlinks(url):
        clean_link = None

        # If link is a # or none, skip it
        if link == "#" or link is None:
            continue

        # If link is a URL, check if it is within the same domain
        if re.search(HTTP_URL_PATTERN, link):
            # Parse the URL and check if the domain is the same
            url_obj = urlparse(link)

            if url_obj.netloc.find(local_domain) != -1:
                clean_link = link

        if clean_link is not None:
            if clean_link.endswith("/"):
                clean_link = clean_link[:-1]
            clean_links.append(clean_link)

    # Return the list of hyperlinks that are within the same domain
    return list(set(clean_links))


def crawl(url):
    # Parse the URL and get the domain
    local_domain = urlparse(url).netloc

    # Create a queue to store the URLs to crawl
    queue = deque([url])

    # Create a set to store the URLs that have already been seen (no duplicates)
    seen = set([url])

    # Create a directory to store the text files
    if not os.path.exists("text/"):
        os.mkdir("text/")

    if not os.path.exists(f"text/{local_domain}/"):
        os.mkdir(f"text/{local_domain}/")

    # Create a directory to store the csv files
    if not os.path.exists("processed"):
        os.mkdir("processed")

    # While the queue is not empty and the crawler has not seen more than 10 URLs, continue crawling
    counter = 0
    while queue and counter < 10:

        # Get the next URL from the queue
        url = queue.pop()
        print(url)  # for debugging and to see the progress

        # Save text from the url to a <url>.txt file
        filename = url[8:].replace("/", "_")

        if len(filename) < 100:
            with open(f"text/{local_domain}/{filename}.txt", "w") as f:
                try:
                    # Get the text from the URL using BeautifulSoup
                    soup = BeautifulSoup(requests.get(url).text, "html.parser")

                    # Get the text but remove the tags
                    text = soup.get_text()

                    # If the crawler gets to a page that requires JavaScript, it will stop the crawl
                    if ("You need to enable JavaScript to run this app." in text):
                        print("Unable to parse page " + url +
                              " due to JavaScript being required")

                    # Otherwise, write the text to the file in the text directory
                    f.write(text)
                    counter += 1

                except Exception as e:
                    print("Unable to parse page " + url + " due to " + str(e))

        # Get the hyperlinks from the URL and add them to the queue
        for link in get_domain_hyperlinks(local_domain, url):
            if link not in seen:
                queue.append(link)
                seen.add(link)
