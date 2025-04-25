from flask import Flask, request, jsonify
import whisper
import os
from flask_cors import CORS


app = Flask(__name__)
CORS(app)  # This allows requests from your frontend

model = whisper.load_model("medium")

@app.route('/transcribe', methods=['POST'])
def transcribe():
    if 'file' not in request.files:
        return jsonify({"error": "No audio file provided"}), 400

    audio = request.files['file']
    file_path = os.path.join("uploads", audio.filename)
    os.makedirs("uploads", exist_ok=True)
    audio.save(file_path)

    result = model.transcribe(file_path)
    os.remove(file_path)  # Optional: remove the file after transcription

    return jsonify({"transcription": result['text']})

if __name__ == '__main__':
    app.run(debug=True)
