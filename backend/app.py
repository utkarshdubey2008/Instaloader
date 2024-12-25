from flask import Flask, jsonify, request
import requests

app = Flask(__name__)

@app.route('/download', methods=['GET'])
def download_media():
    url = request.args.get('url')
    
    if not url:
        return jsonify({"error": "URL is required"}), 400

    # Construct the API URL to fetch Instagram post data
    api_url = f"https://karma-api2.vercel.app/instadl?url={url}"

    try:
        response = requests.get(api_url)
        data = response.json()

        if "error" in data:
            return jsonify({"error": "Failed to fetch Instagram data"}), 400

        return jsonify(data)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
