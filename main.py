from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
import os
from dotenv import load_dotenv
load_dotenv()


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URI")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = os.getenv("SECRET_KEY")

db = SQLAlchemy(app)

# ── Models ─────────────────────────────────────────────────────────────────────

class Skill(db.Model):
    id    = db.Column(db.Integer, primary_key=True)
    name  = db.Column(db.String(100), nullable=False)
    level = db.Column(db.String(50),  default='Intermediate')
    fill  = db.Column(db.Integer,     default=70)

class Project(db.Model):
    id    = db.Column(db.Integer,     primary_key=True)
    name  = db.Column(db.String(120), nullable=False)
    desc  = db.Column(db.Text,        nullable=False)
    tech  = db.Column(db.String(200), default='')
    link  = db.Column(db.String(300), default='')

# ── Public Routes ──────────────────────────────────────────────────────────────
with app.app_context():
    db.create_all()
@app.route('/')
def index():
    data = {
        "name": "Priyanshu Ranjan",
        "title": "Full-Stack Developer",
        "university": "Kristu Jayanti Deemed to be University",
        "bio": "Let's Build Something Cool"
    }
    return render_template('index.html', data=data, skills=Skill.query.all(), projects=Project.query.all())

# ── Admin Routes (CRUD) ────────────────────────────────────────────────────────

@app.route('/admin')
def admin():
    return render_template('admin_skills.html', skills=Skill.query.all(), projects=Project.query.all())

@app.route('/admin/add/<type>', methods=['POST'])
def add_item(type):
    if type == 'skill':
        db.session.add(Skill(name=request.form['name'], level=request.form['level'], fill=request.form['fill']))
    else:
        db.session.add(Project(name=request.form['name'], desc=request.form['desc'], tech=request.form['tech'], link=request.form['link']))
    db.session.commit()
    return redirect(url_for('admin'))

@app.route('/admin/delete/<type>/<int:id>', methods=['POST'])
def delete_item(type, id):
    item = Skill.query.get(id) if type == 'skill' else Project.query.get(id)
    db.session.delete(item)
    db.session.commit()
    return redirect(url_for('admin'))

if __name__ == '__main__':
    app.run(debug=False)
