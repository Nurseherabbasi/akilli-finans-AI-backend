from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base

class Spending(Base):
    __tablename__ = "spendings"

    id = Column(Integer, primary_key=True, index=True)
    
    user_id = Column(Integer, ForeignKey("users.id"))
    
    amount = Column(Float) 
    category = Column(String) 
    description = Column(String) 
    date = Column(DateTime(timezone=True), server_default=func.now()) 
    
    owner = relationship("app.models.user.User", backref="spendings")