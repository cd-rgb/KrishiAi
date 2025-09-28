import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.metrics import accuracy_score
import xgboost as xgb
import pickle
from utils.crop_preprocess import preprocess_crop_data, encode_input


def train_crop_model():
    # Load dataset
    df_crop = pd.read_csv('data/expanded_crop_dataset_with_water_soil.csv')
    X_crop, y_crop, crop_scaler, crop_label_encoder, crop_feature_columns = preprocess_crop_data(df_crop)
    X_train_crop, X_test_crop, y_train_crop, y_test_crop = train_test_split(X_crop, y_crop, test_size=0.2, random_state=42)

    # Train model
    crop_model = xgb.XGBClassifier(
        n_estimators=300,
        max_depth=7,
        learning_rate=0.05,
        eval_metric='mlogloss',
        random_state=42
    )
    crop_model.fit(X_train_crop, y_train_crop)
    
    # Save model
    with open('models/crop_recommendation_model.pkl', 'wb') as f:
        pickle.dump(crop_model, f)
    
    # Evaluate
    y_pred_crop = crop_model.predict(X_test_crop)
    print(f"Crop Recommendation Test Accuracy: {accuracy_score(y_test_crop, y_pred_crop):.2%}")
    
    return crop_model, crop_scaler, crop_label_encoder, crop_feature_columns

def recommend_crops(crop_model, crop_scaler, crop_label_encoder, crop_feature_columns, input_data):
    input_df = encode_input(input_data, crop_scaler, crop_label_encoder, crop_feature_columns)
    probabilities = crop_model.predict_proba(input_df)[0]
    top3_idx = np.argsort(probabilities)[-3:][::-1]
    top3_labels = crop_label_encoder.inverse_transform(top3_idx)
    top3_scores = probabilities[top3_idx].astype(float)  # Convert float32 to float
    
    # Mock profit, demand, and reasons (to match UI image)
    recommendations = []
    for i, (crop, score) in enumerate(zip(top3_labels, top3_scores), 1):
        profit = 'High Profit' if i == 1 else 'Medium Profit' if i == 2 else 'Low Profit'
        demand = 'High Demand' if i == 1 else 'Medium Demand' if i == 2 else 'Stable Demand'
        reasons = [
            f'- Optimal soil pH and temperature conditions' if i == 1 else
            f'- Good soil organic matter content' if i == 2 else
            f'- Excellent for crop rotation'
        ]
        recommendations.append({
            'rank': i,
            'crop': crop,
            'suitabilityScore': float(score * 100),  # Convert to float
            'profit': profit,
            'demand': demand,
            'reasons': reasons
        })
    return recommendations