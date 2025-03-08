from flask import Flask, request, jsonify
import joblib
import numpy as np

# Load the trained ML model
model = joblib.load("fitness.pkl")  # Ensure fitness.pkl is in the same directory

app = Flask(__name__)  # Create a Flask web server

@app.route("/predict", methods=["POST"])
def predict():
    try:
        # Get JSON input from request
        data = request.get_json()
        user_input = np.array(data["features"]).reshape(1, -1)  # Convert input to NumPy array

        # Run the model prediction
        prediction = model.predict(user_input)

        # Return workout plan as JSON response
        return jsonify({"workout_plan": prediction.tolist()})

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)  # Run Flask on port 5000
