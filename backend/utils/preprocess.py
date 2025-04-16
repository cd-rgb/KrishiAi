import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder
import joblib

def load_and_preprocess():
    data = pd.read_csv('data/agri_cost_estimation_dataset.csv')
    # data = pd.read_csv('data/agri_cost_estimation_dataset_expanded.csv')
    season_mapping = {
        'Monsoon': 'Kharif', 'Transitional': 'Kharif', 'Rainy': 'Kharif', 'Late Kharif': 'Kharif',
        'Harvest': 'Rabi', 'Winter': 'Rabi', 'Rabi': 'Rabi', 'Post-Rabi': 'Rabi',
        'Zaid': 'Zaid', 'Summer': 'Zaid', 'Spring': 'Zaid', 'Autumn': 'Rabi', 'Dry': 'Rabi',
        'Pre-Kharif': 'Kharif', 'Post-Zaid': 'Zaid'
    }
    data['Crop Season'] = data['Crop Season'].map(season_mapping)
    
    label_encoders = {}
    for col in ['Crop Type', 'Crop Season', 'Soil Type', 'Region', 'Labor Availability',
                'Water Availability', 'Pesticide Type', 'Fertilizer Type']:
        le = LabelEncoder()
        data[col] = le.fit_transform(data[col])
        label_encoders[col] = le
    
    joblib.dump(label_encoders, 'utils/encoders.pkl')
    return data, label_encoders

def encode_input(user_input, label_encoders, features):
    encoded_input = []
    for feature in features:
        if feature in label_encoders:
            try:
                value = user_input.get(feature.split()[0], '')
                encoded_value = label_encoders[feature].transform([value])[0]
            except:
                encoded_value = 0
            encoded_input.append(encoded_value)
        else:
            encoded_input.append(user_input.get(feature, 0))
    return np.array([encoded_input])