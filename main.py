from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
import numpy as np
from sklearn.linear_model import LinearRegression

app = FastAPI(title="AI Harcama Analiz Servisi")

class PredictExpenseRequest(BaseModel):
    months: List[int]
    expenses: List[float]

@app.post("/predict-expense")
def predict_expense(data: PredictExpenseRequest):
    months = data.months
    expenses = data.expenses

    X = np.array(months).reshape(-1, 1)
    y = np.array(expenses)

    model = LinearRegression()
    model.fit(X, y)

    next_month = np.array([[max(months) + 1]])
    prediction = model.predict(next_month)

    return {
        "next_month": int(next_month[0][0]),
        "predicted_expense": float(prediction[0])
    }




class Expense(BaseModel):
    category: str
    amount: float


class AnalyzeRequest(BaseModel):
    expenses: List[Expense]

@app.get("/")
def root():
    return {"message": "AI Harcama Analiz Servisi Çalışıyor"}


@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.post("/analyze")
def analyze_expenses(data: AnalyzeRequest):
    # 1. Toplam harcama
    total_spending = sum(e.amount for e in data.expenses)

    # 2. Kategori bazlı harcamalar
    category_totals = {}
    for e in data.expenses:
        category_totals[e.category] = category_totals.get(e.category, 0) + e.amount

    top_categories = sorted(
        category_totals.items(),
        key=lambda x: x[1],
        reverse=True
    )[:3]

    # 3. Bütçe riski analizi
    if total_spending > 10000:
        risk = "Yüksek"
        warning = "Bu ay harcamalarınız oldukça yüksek."
    elif total_spending > 6000:
        risk = "Orta"
        warning = "Harcamalarınızı kontrol etmeniz faydalı olabilir."
    else:
        risk = "Düşük"
        warning = "Harcamalarınız kontrol altında."

    # 4. AI önerisi
    if risk == "Yüksek":
        recommendation = "Gereksiz harcamaları azaltmanız ve bütçe planı oluşturmanız önerilir."
    elif risk == "Orta":
        recommendation = "Harcamalarınızı gözden geçirerek tasarruf yapabilirsiniz."
    else:
        recommendation = "Mevcut harcama alışkanlıklarınız sürdürülebilir görünüyor."

    # 5. Aylık harcama tahmini
    predicted_next_month_spending = round(total_spending * 1.08, 2)

    # 6. Sonuç
    return {
        "total_spending": total_spending,
        "top_categories": top_categories,
        "risk_level": risk,
        "warning": warning,
        "predicted_next_month_spending": predicted_next_month_spending,
        "recommendation": recommendation
    }


