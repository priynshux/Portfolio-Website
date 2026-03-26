# Priyanshu Ranjan — Flask + SQLAlchemy Portfolio

## 📁 Project Structure

```
portfolio_db/
├── app.py                        ← Flask app, SQLAlchemy models, routes
├── requirements.txt
├── instance/
│   └── portfolio.db              ← SQLite DB (auto-created on first run)
├── templates/
│   ├── index.html                ← Portfolio homepage (Jinja2)
│   └── admin_skills.html         ← Admin panel
└── static/
    ├── css/
    │   ├── style.css             ← Portfolio styles
    │   └── admin.css             ← Admin panel styles
    └── js/
        ├── main.js               ← Cursor, animations
        └── admin.js              ← Live preview, modal, search
```

## 🚀 Quick Start

```bash
# 1. Install dependencies
pip install -r requirements.txt

# 2. Run the app (DB is auto-created + seeded)
python main.py

# 3. Open in browser
#    Portfolio  →  http://localhost:5000
#    Admin      →  http://localhost:5000/admin/skills
#    API        →  http://localhost:5000/api/skills
```

## 🗄️ SQLAlchemy Model

```python
class Skill(db.Model):
    id         = Integer  (primary key)
    name       = String   (skill name, e.g. "Python")
    icon       = String   (emoji, e.g. "🐍")
    level      = String   (e.g. "Intermediate")
    fill       = Integer  (0–100, progress bar %)
    color      = String   (css class: html/css/js/node/blue/pink)
    created_at = DateTime (auto)
```

## 🔌 REST API

| Method | Endpoint                        | Description          |
|--------|---------------------------------|----------------------|
| GET    | `/api/skills`                   | List all skills      |
| GET    | `/api/skills/<id>`              | Get single skill     |

## ⚙️ Admin Panel Features

- ➕ **Add** skills with live preview card
- ✏️ **Edit** any skill via modal popup
- 🗑️ **Delete** skills with confirmation
- 🔍 **Search** skills in real-time
- Flash notifications auto-dismiss after 4s
