import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
import joblib
from utils.preprocess import load_and_preprocess, encode_input

def train_and_save_models():
    data, label_encoders = load_and_preprocess()
    features = ['Farm Size (acres)', 'Soil Type', 'Region', 'Labor Availability', 
                'Water Availability', 'Pesticide Type', 'Fertilizer Type', 'Labor Cost Per Day']
    target_columns = ['Land Preparation', 'Seeds', 'Fertilizers', 'Pesticides', 'Irrigation',
                      'Labor', 'Machinery', 'Transportation', 'Miscellaneous', 'Total Cost']
    
    X = data[features]
    y = data[target_columns]
    X_train, _, y_train, _ = train_test_split(X, y, test_size=0.2, random_state=42)
    
    models = {}
    for target in target_columns:
        rf = RandomForestRegressor(n_estimators=200, max_depth=15, min_samples_split=5, random_state=42)
        rf.fit(X_train, y_train[target])
        models[target] = rf
        joblib.dump(rf, f'models/{target}.pkl')
    
    return models

def load_models():
    target_columns = ['Land Preparation', 'Seeds', 'Fertilizers', 'Pesticides', 'Irrigation',
                      'Labor', 'Machinery', 'Transportation', 'Miscellaneous', 'Total Cost']
    models = {}
    for target in target_columns:
        models[target] = joblib.load(f'models/{target}.pkl')
    return models

def predict_costs(user_input):
    models = load_models()
    label_encoders = joblib.load('utils/encoders.pkl')
    features = ['Farm Size (acres)', 'Soil Type', 'Region', 'Labor Availability', 
                'Water Availability', 'Pesticide Type', 'Fertilizer Type', 'Labor Cost Per Day']
    
    encoded_input = encode_input(user_input, label_encoders, features)
    predictions = {}
    for target in models:
        predictions[target] = models[target].predict(encoded_input)[0]
    
    return {
        "Total Cost Estimate": f"₹{int(predictions['Total Cost']):,}",
        "breakdown": {
            "Land Preparation": f"₹{int(predictions['Land Preparation']):,}",
            "Seeds": f"₹{int(predictions['Seeds']):,}",
            "Fertilizers": f"₹{int(predictions['Fertilizers']):,}",
            "Pesticides": f"₹{int(predictions['Pesticides']):,}",
            "Irrigation": f"₹{int(predictions['Irrigation']):,}",
            "Labor": f"₹{int(predictions['Labor']):,}",
            "Machinery": f"₹{int(predictions['Machinery']):,}",
            "Transportation": f"₹{int(predictions['Transportation']):,}",
            "Miscellaneous": f"₹{int(predictions['Miscellaneous']):,}"
        }
    }