import pandas as pd
from sklearn.preprocessing import StandardScaler, LabelEncoder

def preprocess_crop_data(df):
    # Encode the label
    label_encoder = LabelEncoder()
    df['label'] = label_encoder.fit_transform(df['label'])
    
    # One-hot encode categorical features
    categorical_cols = ['state', 'district', 'season', 'irrigation', 'water_availability', 'soil_type']
    df = pd.get_dummies(df, columns=categorical_cols)
    
    # Features and target
    X = df.drop('label', axis=1)
    y = df['label']
    
    # Standardize numeric features
    scaler = StandardScaler()
    numeric_cols = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']
    X[numeric_cols] = scaler.fit_transform(X[numeric_cols])
    
    return X, y, scaler, label_encoder, df.columns.drop('label')

def encode_input(input_data, scaler, label_encoder, feature_columns):
    input_df = pd.DataFrame([input_data])
    input_df = pd.get_dummies(input_df, columns=['state', 'district', 'season', 'irrigation', 'water_availability', 'soil_type'])
    input_df = input_df.reindex(columns=feature_columns, fill_value=0)
    numeric_cols = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']
    input_df[numeric_cols] = scaler.transform(input_df[numeric_cols])
    return input_df