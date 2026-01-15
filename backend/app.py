from flask import Flask, request, jsonify, render_template
from logic.scene_1 import scene_one

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/scene/1", methods=["POST"])
def handle_scene_1():
    data = request.json
    choice = data.get("choice")
    
    result = scene_one(choice)
    
    return jsonify({
        "scene": 1,
        "result": result
    })

if __name__ == "__main__":
    app.run(debug=True)

