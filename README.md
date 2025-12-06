# 💰 Akıllı Harcama Takip ve Öneri Sistemi - Backend API

![Python](https://img.shields.io/badge/Python-3.11+-blue?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.109+-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16+-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)

Bu proje, kullanıcıların gelir-gider dengesini yönetmelerini sağlayan, harcama alışkanlıklarını görselleştiren ve yapay zeka destekli finansal öneriler sunan **Akıllı Finans Mobil Uygulaması** için geliştirilmiş **RESTful API** servisidir.

## 🚀 Proje Hakkında

Günümüzde finansal farkındalık eksikliği büyük bir problemdir. Bu proje; harcamaları kaydetme, kategori bazlı analiz etme ve geleceğe yönelik tahminlerde bulunma süreçlerini otomatize ederek kullanıcılara **proaktif bir finans yönetimi** sunmayı hedefler.

### 🌟 Temel Özellikler

* **🔐 Güvenli Kimlik Doğrulama:** JWT (JSON Web Token) ve Bcrypt hashing ile endüstri standardında güvenli kayıt ve giriş işlemleri.
* **💳 Harcama Yönetimi:** Harcamaların kategori, tutar ve açıklama ile kaydedilmesi, düzenlenmesi ve listelenmesi.
* **📊 Akıllı Veri Analizi:** Kullanıcı harcamalarını kategorize ederek oransal dağılım raporları sunan SQL tabanlı analiz motoru.
* **🔮 Gelecek Tahmini Altyapısı:** Geçmiş verilere dayalı harcama öngörüsü için ML (Makine Öğrenmesi) entegrasyonuna hazır mimari.
* **🛡️ Clean Architecture:** Genişletilebilir, modüler ve bakımı kolay kod yapısı (Service, Router, Schema katmanları).

---

## 🛠️ Kullanılan Teknolojiler

Bu projenin backend mimarisinde aşağıdaki teknolojiler kullanılmıştır:

* **Dil:** Python 3.11+
* **Framework:** FastAPI (Yüksek performanslı web çatısı)
* **Veritabanı:** PostgreSQL
* **ORM:** SQLAlchemy (Veritabanı modelleme ve ilişkiler)
* **Validasyon:** Pydantic (Veri doğrulama şemaları)
* **Güvenlik:** Python-Jose (JWT Token) & Passlib (Şifreleme)

---

## ⚙️ Kurulum ve Çalıştırma Rehberi

Projeyi yerel ortamınızda (Localhost) çalıştırmak için terminalinizde aşağıdaki adımları sırasıyla uygulayın:

```bash
# 1. Projeyi Klonlayın
git clone [https://github.com/Nurseherabbasi/akilli-finans-backend.git](https://github.com/Nurseherabbasi/akilli-finans-backend.git)
cd akilli-finans-backend

# 2. Sanal Ortamı Kurun ve Başlatın
python -m venv venv
.\venv\Scripts\activate

# 3. Gerekli Kütüphaneleri Yükleyin
pip install -r requirements.txt

# 4. Çevre Değişkenlerini (.env) Ayarlayın
# .env.example dosyasının adını .env olarak değiştirin ve içine kendi şifrelerinizi girin.
copy .env.example .env

# 5. Sunucuyu Başlatın
uvicorn app.main:app --reload