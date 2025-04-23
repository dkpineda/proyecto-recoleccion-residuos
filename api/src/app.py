from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/health-check', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'message': 'Server is running'
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
