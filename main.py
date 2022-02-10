import json
import os
from flask import Flask, render_template, request
import requests
from flask_cors import CORS
from flask.werkzeug import secure_filename

app = Flask('app')
base_url = "https://raw.githubusercontent.com/MrAlex6204/Books/master/"

CORS(app)


def remove_suffix(input_string, suffix):
    if suffix and input_string.endswith(suffix):
        return input_string[:-len(suffix)]
    return input_string


@app.route("/")
def hello():
    return render_template('index.html')


@app.route("/books")
def return_books():
    response = requests.get("https://api.github.com/repos/MrAlex6204/Books/git/trees/master?recursive=1")
    data_in_json = response.json()
    finished_data = {"data": []}
    for data in data_in_json['tree']:
        if str(data['path']).endswith(".pdf"):
            finished_data['data'].append(remove_suffix(str(data['path']), ".pdf"))

    print(json.dumps(finished_data))
    return json.dumps(finished_data)


@app.route("/read", methods=['POST'])
def read_book():
    if 'book' in dict(request.form).keys():

        book_name = request.form['book']

        print(book_name)

        complete_url = base_url + book_name

        file = requests.get(complete_url)
        book_name = secure_filename(book_name)
        if not os.path.exists(os.path.join('static/books', book_name)):
                create = open(os.path.join('static/books', book_name), 'x')
                create.close()
                file_edited = open(os.path.join('static/books', book_name), 'wb')

                file_edited.write(file.content)

                file_edited.close()

        return render_template("read.html", book=book_name, source=os.path.join('static/books', book_name))

    else:
        return "Sorry content not available"


app.run(host="0.0.0.0", port=80808, debug=True)
