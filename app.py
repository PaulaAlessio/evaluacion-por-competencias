from flask import Flask, render_template
from models import db
from routes.students import students_bp
from routes.assignments import assignments_bp
from routes.events import events_bp

app = Flask(__name__)  # Your Flask app initialization
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///school.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)


# Register Blueprints
app.register_blueprint(students_bp)
app.register_blueprint(assignments_bp)
app.register_blueprint(events_bp)


@app.route('/')
def home():
    return render_template('index.html')  # Base menu with links to the views


if __name__ == '__main__':
    app.run(debug=True)
