from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json
import traceback
from dashboard import FeedbackSentimentDashboard

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

@app.route("/upload", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    file_path = os.path.join(app.config["UPLOAD_FOLDER"], file.filename)
    file.save(file_path)
    print(f" File uploaded: {file.filename}")

    try:
        dashboard = FeedbackSentimentDashboard(file_path)
        dashboard.load_data()
        dashboard.analyze_sentiments()
        dashboard.save_results()
        print(" Analysis and save completed.")
        return jsonify({"message": "Analysis complete"}), 200
    except Exception as e:
        print(" Upload failed with error:")
        traceback.print_exc()
        return jsonify({"error": f"Failed to process file: {str(e)}"}), 500

@app.route("/dashboard-data", methods=["GET"])
def get_dashboard_data():
    print(" /dashboard-data hit")
    try:
        with open("processed_feedback.json", "r") as f:
            data = json.load(f)
        return jsonify(data)
    except FileNotFoundError:
        return jsonify({"error": "Processed data not found"}), 404
    except Exception as e:
        print(" JSON load failed with error:")
        traceback.print_exc()
        return jsonify({"error": f"Invalid JSON: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True)
