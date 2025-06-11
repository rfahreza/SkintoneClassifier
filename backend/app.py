from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from PIL import Image
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

model = load_model("best_model.keras")

LABELS = ['fair', 'medium', 'dark']


@app.route('/api/classify', methods=['POST'])
def classify():
    file = request.files['file']

    img = Image.open(file.stream).convert('RGB')
    # Ubah ukuran gambar menjadi 64x64
    img = img.resize((64, 64))
    img_array = np.array(img) / 255.0
    # Tambahkan dimensi batch. Bentuknya akan menjadi (1, 64, 64, 3)
    img_array = np.expand_dims(img_array, axis=0)
    preds = model.predict(img_array)

    idx = np.argmax(preds[0])
    undertone = LABELS[idx]
    confidence = float(preds[0][idx]) * 100

    result = {
        "undertone": undertone,
        "confidence": int(confidence),
        "colorPalette": {
            "primary": ["#D4A574", "#E6B887"],
            "secondary": ["#CD853F", "#DEB887"],
            "accent": ["#FF6B35", "#FFA07A"]
        },
        "description": f"Kulitmu memiliki undertone {undertone}...",
        "tips": [
            "Pilih foundation dengan undertone sesuai hasil",
            "Warna tertentu cocok untukmu"
        ]
    }
    return jsonify(result)


if __name__ == '__main__':
    app.run(debug=True, port=5050)
