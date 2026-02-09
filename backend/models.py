from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Customer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    email = db.Column(db.String(128))
    phone = db.Column(db.String(64))
    company = db.Column(db.String(128))
    tags = db.Column(db.String(256))
    deals = db.relationship('Deal', backref='customer', cascade='all, delete-orphan')
    activities = db.relationship('Activity', backref='customer', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'phone': self.phone,
            'company': self.company,
            'tags': self.tags,
        }

class Deal(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey('customer.id'), nullable=False)
    title = db.Column(db.String(256))
    stage = db.Column(db.String(64), default='New')
    value = db.Column(db.Float)
    due_date = db.Column(db.Date)

    def to_dict(self):
        return {
            'id': self.id,
            'customer_id': self.customer_id,
            'title': self.title,
            'stage': self.stage,
            'value': self.value,
            'due_date': self.due_date.isoformat() if self.due_date else None,
        }

class Activity(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey('customer.id'), nullable=False)
    title = db.Column(db.String(256))
    type = db.Column(db.String(64))
    date = db.Column(db.DateTime, default=datetime.utcnow)
    completed = db.Column(db.Boolean, default=False)

    def to_dict(self):
        return {
            'id': self.id,
            'customer_id': self.customer_id,
            'title': self.title,
            'type': self.type,
            'date': self.date.isoformat() if self.date else None,
            'completed': self.completed,
        }

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    role = db.Column(db.String(32), default='Sales')

    def to_dict(self):
        return {'id': self.id, 'username': self.username, 'role': self.role}
