from flask import Flask, request, jsonify
from flask_cors import CORS
from model import predict_costs

from model_crop import train_crop_model, recommend_crops

# logging.basicConfig(level=logging.DEBUG)
crop_model, crop_scaler, crop_label_encoder, crop_feature_columns = train_crop_model()


app = Flask(__name__)
CORS(app)

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        prediction = predict_costs(data)
        return jsonify(prediction)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/api/recommend', methods=['POST'])
def recommend_crop():
    try:
        data = request.get_json()
        # logging.debug(f"Received data: {data}")
        if not data:
            return jsonify({"error": "No input data provided"}), 400
        
        user_input = {
            'N': float(data.get('N', 90)),
            'P': float(data.get('P', 42)),
            'K': float(data.get('K', 43)),
            'temperature': float(data.get('temperature', 24.5)),
            'humidity': float(data.get('humidity', 70.2)),
            'ph': float(data.get('ph', 6.5)),
            'rainfall': float(data.get('rainfall', 210)),
            'state': data.get('state', 'Punjab'),
            'district': data.get('district', 'Ludhiana'),
            'season': data.get('season', 'rabi'),
            'irrigation': data.get('irrigation', 'groundwater'),
            'water_availability': data.get('water_availability', 'high'),
            'soil_type': data.get('soil_type', 'alluvial')
        }
        
        recommendations = recommend_crops(crop_model, crop_scaler, crop_label_encoder, crop_feature_columns, user_input)
        # logging.debug(f"Recommendations: {recommendations}")
        return jsonify({"recommendations": recommendations})
    except Exception as e:
        # logging.error(f"Error in recommend_crop: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    print("Starting crop recommendation server...")
    app.run(debug=True, host='0.0.0.0', port=5000)