import random
from faker import Faker
from app.database import SessionLocal, engine, Base
from app import models
from app.core.security import get_password_hash

Base.metadata.create_all(bind=engine)

fake = Faker()
db = SessionLocal()

def create_fake_data():
    print("Sahte veri üretimi başladı...")

    test_email = "test@user.com"
    user = db.query(models.User).filter(models.User.email == test_email).first()
    
    if not user:
        print("👤 Test kullanıcısı oluşturuluyor...")
        user = models.User(
            email=test_email,
            full_name="Test Kullanıcısı",
            password_hash=get_password_hash("1234")
        )
        db.add(user)
        db.commit()
        db.refresh(user)
    
    print(f"Kullanıcı Hazır: {user.email} (ID: {user.id})")

    categories = ["Gıda", "Ulaşım", "Eğlence", "Fatura", "Giyim", "Sağlık"]
    
    print(" Harcamalar ekleniyor...")
    for _ in range(50):
        amount = round(random.uniform(50.0, 2000.0), 2) 
        category = random.choice(categories)
        date = fake.date_time_between(start_date="-30d", end_date="now") 
        
        spending = models.Spending(
            user_id=user.id,
            amount=amount,
            category=category,
            description=fake.sentence(nb_words=3),
            date=date
        )
        db.add(spending)
    
    db.commit()
    print("İşlem Tamam! 50 adet sahte harcama veritabanına eklendi.")

if __name__ == "__main__":
    create_fake_data()