from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from jose import JWTError, jwt

from app.database import engine, Base, get_db
from app import models, schemas
from app.services import user_service, spending_service
from app.core.security import create_access_token, verify_password, SECRET_KEY, ALGORITHM

Base.metadata.create_all(bind=engine)

app = FastAPI()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Giriş yapmanız gerekiyor (Token geçersiz)",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    user = user_service.get_user_by_email(db, email=email)
    if user is None:
        raise credentials_exception
    return user



@app.post("/register", response_model=schemas.UserOut)
def register_user(user_data: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = user_service.get_user_by_email(db, email=user_data.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Bu e-posta zaten kayıtlı.")
    return user_service.create_user(db=db, user=user_data)

@app.post("/token")
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = user_service.get_user_by_email(db, email=form_data.username)
    if not user or not verify_password(form_data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="E-posta veya şifre hatalı",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/spendings", response_model=schemas.SpendingOut)
def create_spending_endpoint(
    spending: schemas.SpendingCreate, 
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user) 
):
    return spending_service.create_spending(db=db, spending=spending, user_id=current_user.id)

@app.get("/spendings", response_model=list[schemas.SpendingOut])
def read_spendings(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    return spending_service.get_user_spendings(db=db, user_id=current_user.id)

@app.get("/")
def acilis_mesaji():
    return {"mesaj": "Akıllı Finans Sistemi Backend Çalışıyor!"}

@app.get("/analysis/categories", response_model=list[schemas.CategoryStat])
def get_category_stats(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    return spending_service.get_spending_stats_by_category(db=db, user_id=current_user.id)