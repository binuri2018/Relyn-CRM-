from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from models import db, Customer, Deal, Activity
from datetime import datetime

api_bp = Blueprint('api', __name__)

@api_bp.route('/dashboard')
@jwt_required()
def dashboard():
    customers = Customer.query.count()
    deals = Deal.query.count()
    activities = Activity.query.count()
    recent_activities = [a.to_dict() for a in Activity.query.order_by(Activity.date.desc()).limit(5)]
    return jsonify({'customers': customers, 'deals': deals, 'activities': activities, 'recent_activities': recent_activities})

### Customers
@api_bp.route('/customers', methods=['GET', 'POST'])
@jwt_required()
def customers():
    if request.method == 'GET':
        q = request.args.get('search')
        query = Customer.query
        if q:
            qlike = f"%{q}%"
            query = query.filter(Customer.name.ilike(qlike) | Customer.email.ilike(qlike) | Customer.company.ilike(qlike))
        results = [c.to_dict() for c in query.order_by(Customer.name).all()]
        return jsonify(results)

    data = request.json or {}
    cust = Customer(name=data.get('name'), email=data.get('email'), phone=data.get('phone'), company=data.get('company'), tags=data.get('tags'))
    db.session.add(cust)
    db.session.commit()
    return jsonify(cust.to_dict()), 201

@api_bp.route('/customers/<int:id>', methods=['PUT', 'DELETE'])
@jwt_required()
def customer_detail(id):
    cust = Customer.query.get_or_404(id)
    if request.method == 'PUT':
        data = request.json or {}
        cust.name = data.get('name', cust.name)
        cust.email = data.get('email', cust.email)
        cust.phone = data.get('phone', cust.phone)
        cust.company = data.get('company', cust.company)
        cust.tags = data.get('tags', cust.tags)
        db.session.commit()
        return jsonify(cust.to_dict())
    else:
        db.session.delete(cust)
        db.session.commit()
        return jsonify({'deleted': True})

### Deals
@api_bp.route('/deals', methods=['GET', 'POST'])
@jwt_required()
def deals():
    if request.method == 'GET':
        stage = request.args.get('stage')
        query = Deal.query
        if stage:
            query = query.filter_by(stage=stage)
        results = [d.to_dict() for d in query.order_by(Deal.due_date.nullslast()).all()]
        return jsonify(results)
    data = request.json or {}
    due_date = None
    if data.get('due_date'):
        due_date = datetime.fromisoformat(data.get('due_date')).date()
    deal = Deal(customer_id=data['customer_id'], title=data.get('title'), stage=data.get('stage','New'), value=data.get('value'), due_date=due_date)
    db.session.add(deal)
    db.session.commit()
    return jsonify(deal.to_dict()), 201

@api_bp.route('/deals/<int:id>', methods=['PUT', 'DELETE'])
@jwt_required()
def deal_detail(id):
    deal = Deal.query.get_or_404(id)
    if request.method == 'PUT':
        data = request.json or {}
        deal.title = data.get('title', deal.title)
        deal.stage = data.get('stage', deal.stage)
        deal.value = data.get('value', deal.value)
        if data.get('due_date'):
            deal.due_date = datetime.fromisoformat(data.get('due_date')).date()
        db.session.commit()
        return jsonify(deal.to_dict())
    else:
        db.session.delete(deal)
        db.session.commit()
        return jsonify({'deleted': True})

### Activities
@api_bp.route('/activities', methods=['GET', 'POST'])
@jwt_required()
def activities():
    if request.method == 'GET':
        customer_id = request.args.get('customer_id')
        query = Activity.query
        if customer_id:
            query = query.filter_by(customer_id=customer_id)
        results = [a.to_dict() for a in query.order_by(Activity.date.desc()).all()]
        return jsonify(results)
    data = request.json or {}
    date = None
    if data.get('date'):
        date = datetime.fromisoformat(data.get('date'))
    act = Activity(customer_id=data['customer_id'], title=data.get('title'), type=data.get('type'), date=date, completed=data.get('completed', False))
    db.session.add(act)
    db.session.commit()
    return jsonify(act.to_dict()), 201

@api_bp.route('/activities/<int:id>', methods=['PUT', 'DELETE'])
@jwt_required()
def activity_detail(id):
    act = Activity.query.get_or_404(id)
    if request.method == 'PUT':
        data = request.json or {}
        act.title = data.get('title', act.title)
        act.type = data.get('type', act.type)
        if data.get('date'):
            act.date = datetime.fromisoformat(data.get('date'))
        act.completed = data.get('completed', act.completed)
        db.session.commit()
        return jsonify(act.to_dict())
    else:
        db.session.delete(act)
        db.session.commit()
        return jsonify({'deleted': True})
