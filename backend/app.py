from flask import Flask, request, jsonify, render_template
from logic.story import scene_one , opening_scene

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/scene/1", methods=["GET", "POST"])
def handle_scene_1():

    # 🔹 When the page loads (GET request)
    if request.method == "GET":
       return jsonify({
        "scene": 1,
        "result": opening_scene()
    })

    # 🔹 When the user makes a choice (POST request)
    data = request.json
    choice = data.get("choice")

    result = scene_one(choice)

    return jsonify({
        "scene": 1,
        "result": result
    })


if __name__ == "__main__":
    app.run(debug=True)
