from sqlalchemy.orm import Session
from app import models, schemas
from app.core.security import get_password_hash

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = get_password_hash(user.password)
    
    db_user = models.User(
        email=user.email,
        full_name=user.full_name,
        password_hash=hashed_password 
    )
    
    db.add(db_user)
    db.commit()    
    db.refresh(db_user) 
    
    return db_user

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()