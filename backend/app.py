from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

# API endpoint for fetching the Instagram video URL
API_URL = "https://karma-api2.vercel.app/instadl?url="

@app.route('/api/download', methods=['GET'])
def download():
    # Get the URL parameter from the frontend request
    instagram_url = request.args.get('url')

    if not instagram_url:
        return jsonify({"error": "Instagram URL is required"}), 400

    try:
        # Call the external API with the Instagram URL
        print(f"Requesting video for URL: {instagram_url}")
        response = requests.get(f"{API_URL}{instagram_url}")

        # Log the response from the external API
        print(f"API Response Status: {response.status_code}")
        print(f"API Response: {response.text}")

        # If the request is successful, return the video URL
        if response.status_code == 200:
            data = response.json()
            # Assuming the API response contains a key 'video_url'
            video_url = data.get('video_url')
            if video_url:
                return jsonify({"video_url": video_url})
            else:
                return jsonify({"error": "No video found for the provided URL"}), 404
        else:
            return jsonify({"error": "Failed to fetch data from the API"}), 500

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500


if __name__ == '__main__':
    app.run(debug=True)
