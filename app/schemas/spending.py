from pydantic import BaseModel
from datetime import datetime

class SpendingBase(BaseModel):
    amount: float 
    category: str 
    description: str | None = None 

class SpendingCreate(SpendingBase):
    pass 

class SpendingOut(SpendingBase):
    id: int
    user_id: int
    date: datetime

    class Config:
        from_attributes = True

        
class CategoryStat(BaseModel):
    category: str
    total_amount: float
    count: int