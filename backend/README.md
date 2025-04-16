# Krishi AI Backend

This is the Flask backend for the Krishi AI project, which handles ML model predictions and data processing.

## Project Structure

```
backend/                            # Flask backend
│   ├── app.py                          # Main Flask application
│   ├── model.py                        # ML model logic (prediction code)
│   ├── requirements.txt                # Backend dependencies
│   ├── data/                           # Dataset storage
│   │   └── updated_agri_cost_estimation_dataset.csv
│   └── utils/                          # Utility functions
│       ├── preprocess.py               # Data preprocessing
│       └── encoders.pkl                # Saved label encoders
```

## Setup Instructions

1. Create a virtual environment:

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

3. Place your trained model file (`model.pkl`) in the root directory

4. Run the Flask application:
   ```bash
   python app.py
   ```

## API Endpoints

### Prediction

- POST /predict
  - Input: JSON data containing features for prediction
  - Output: JSON containing prediction result

## Data Processing

The backend includes:

- Data preprocessing utilities
- Label encoding for categorical features
- Model prediction interface

## Dependencies

- Flask: Web framework
- Flask-CORS: Cross-Origin Resource Sharing
- NumPy: Numerical computing
- Pandas: Data manipulation
- Scikit-learn: Machine learning
- Joblib: Model serialization
