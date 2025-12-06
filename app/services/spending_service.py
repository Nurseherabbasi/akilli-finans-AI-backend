from sqlalchemy.orm import Session
from sqlalchemy import func
from app import models, schemas

def create_spending(db: Session, spending: schemas.SpendingCreate, user_id: int):

    db_spending = models.Spending(
        amount=spending.amount,
        category=spending.category,
        description=spending.description,
        user_id=user_id
    )
    
    db.add(db_spending)
    db.commit()
    db.refresh(db_spending)
    
    return db_spending

def get_user_spendings(db: Session, user_id: int):
    
    return db.query(models.Spending).filter(models.Spending.user_id == user_id).all()

def get_spending_stats_by_category(db: Session, user_id: int):

    stats = db.query(
        models.Spending.category,
        func.sum(models.Spending.amount).label("total_amount"),
        func.count(models.Spending.id).label("count")
    ).filter(
        models.Spending.user_id == user_id
    ).group_by(
        models.Spending.category
    ).all()
    
    return stats