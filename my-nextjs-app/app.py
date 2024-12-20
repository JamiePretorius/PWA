
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests

@app.route("/api/data", methods=["GET"])
def get_data():
    return jsonify({"message": "Hello from Flask!"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=6358)
