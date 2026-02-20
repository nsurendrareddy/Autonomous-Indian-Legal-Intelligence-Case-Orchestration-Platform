"""
seed_db.py — Run this ONCE to populate MongoDB with sample lawyers and legal sections.
Usage:
    cd major2/backend_python
    python seed_db.py
"""
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017/legalassist")
client = MongoClient(MONGO_URI)
db = client.get_database()

# ─── LAWYERS ──────────────────────────────────────────────────────────────────
LAWYERS = [
    {"name": "Adv. Priya Sharma", "specializations": ["Consumer Law", "Civil Law"], "rating": 4.8, "experience": 12, "phone": "+91 98765 43210", "email": "priya.sharma@legalfirm.in"},
    {"name": "Adv. Ravi Kumar", "specializations": ["Cyber Law", "Criminal Law"], "rating": 4.7, "experience": 9, "phone": "+91 98123 45678", "email": "ravi.kumar@cyberlaw.in"},
    {"name": "Adv. Sunita Reddy", "specializations": ["Property Law", "Civil Law"], "rating": 4.9, "experience": 15, "phone": "+91 97001 23456", "email": "sunita.reddy@propertylaw.in"},
    {"name": "Adv. Mohammed Iqbal", "specializations": ["Family Law", "Civil Law"], "rating": 4.6, "experience": 11, "phone": "+91 96543 21098", "email": "m.iqbal@familylaw.in"},
    {"name": "Adv. Anjali Gupta", "specializations": ["Labour Law", "Civil Law"], "rating": 4.5, "experience": 8, "phone": "+91 95432 10987", "email": "anjali.gupta@labourlaw.in"},
    {"name": "Adv. Srinivas Rao", "specializations": ["Criminal Law", "Consumer Law"], "rating": 4.7, "experience": 14, "phone": "+91 94321 09876", "email": "srinivas.rao@criminallaw.in"},
    {"name": "Adv. Kavitha Nair", "specializations": ["Property Law", "Family Law"], "rating": 4.8, "experience": 10, "phone": "+91 93210 98765", "email": "kavitha.nair@legalassist.in"},
    {"name": "Adv. Deepak Joshi", "specializations": ["Cyber Law", "Consumer Law"], "rating": 4.6, "experience": 7, "phone": "+91 92109 87654", "email": "deepak.joshi@cyberlaw.in"},
    {"name": "Adv. Lakshmi Venkat", "specializations": ["Labour Law", "Criminal Law"], "rating": 4.5, "experience": 13, "phone": "+91 91098 76543", "email": "lakshmi.venkat@labourlaw.in"},
    {"name": "Adv. Arun Mehta", "specializations": ["Property Law", "Consumer Law"], "rating": 4.4, "experience": 6, "phone": "+91 90987 65432", "email": "arun.mehta@propertyconsumer.in"},
]

# ─── LEGAL SECTIONS ───────────────────────────────────────────────────────────
SECTIONS = [
    {
        "title": "Consumer Protection Act 2019 — Deficiency in Service",
        "section": "Section 2(11)",
        "category": "Consumer Rights",
        "description": "Defines deficiency as any fault, imperfection, shortcoming or inadequacy in quality, nature, or manner in services.",
        "applicability": "All consumers of goods/services",
        "remedy": "Refund, compensation, or replacement",
        "authority": "District Consumer Disputes Redressal Commission"
    },
    {
        "title": "Consumer Protection Act 2019 — Unfair Trade Practices",
        "section": "Section 2(47)",
        "category": "Consumer Rights",
        "description": "Prohibits false advertisements, misleading offers, unsafe goods, and deceptive pricing.",
        "applicability": "Retailers, e-commerce, service providers",
        "remedy": "Cease and desist, compensation up to ₹10 lakh",
        "authority": "National Consumer Helpline (1800-11-4000)"
    },
    {
        "title": "Information Technology Act 2000 — Hacking",
        "section": "Section 66",
        "category": "Cyber Crime",
        "description": "Punishes unauthorized access to computer systems with imprisonment up to 3 years and/or fine up to ₹5 lakh.",
        "applicability": "Any person accessing computer systems without permission",
        "remedy": "FIR, compensation",
        "authority": "Cyber Crime Cell"
    },
    {
        "title": "IT Act 2000 — Identity Theft",
        "section": "Section 66C",
        "category": "Cyber Crime",
        "description": "Punishes fraudulent use of electronic signature, password, or unique identification.",
        "applicability": "Online fraud, phishing victims",
        "remedy": "Imprisonment up to 3 years + fine up to ₹1 lakh",
        "authority": "Cybercrime.gov.in"
    },
    {
        "title": "Transfer of Property Act 1882 — Sale of Immovable Property",
        "section": "Section 54",
        "category": "Property Law",
        "description": "Defines a 'sale' of immovable property including the rights, liabilities, and registration requirements.",
        "applicability": "Property buyers, sellers, and agents",
        "remedy": "Specific performance, injunction, or damages",
        "authority": "Sub-Registrar Office / Civil Court"
    },
    {
        "title": "Registration Act 1908 — Compulsory Registration",
        "section": "Section 17",
        "category": "Property Law",
        "description": "Mandates registration of sale deeds, gift deeds, and lease agreements exceeding 11 months.",
        "applicability": "Immovable property transactions",
        "remedy": "Void transaction if unregistered",
        "authority": "District Registrar Office"
    },
    {
        "title": "Indian Penal Code — Cheating",
        "section": "Section 420 IPC",
        "category": "Criminal Law",
        "description": "Punishes cheating and fraudulently inducing delivery of property with imprisonment up to 7 years.",
        "applicability": "Online fraud, property fraud, financial fraud",
        "remedy": "FIR, criminal prosecution, compensation",
        "authority": "Local Police Station"
    },
    {
        "title": "Indian Penal Code — Criminal Breach of Trust",
        "section": "Section 406 IPC",
        "category": "Criminal Law",
        "description": "Punishes persons entrusted with property who dishonestly misappropriate it.",
        "applicability": "Employees, fiduciaries, agents",
        "remedy": "Imprisonment up to 3 years + fine",
        "authority": "Local Police Station / Sessions Court"
    },
    {
        "title": "Hindu Marriage Act 1955 — Grounds for Divorce",
        "section": "Section 13",
        "category": "Family Law",
        "description": "Lists grounds for divorce: adultery, cruelty, desertion, conversion, mental disorder, and mutual consent.",
        "applicability": "Hindu married couples",
        "remedy": "Divorce decree, alimony, child custody",
        "authority": "Family Court"
    },
    {
        "title": "Industrial Disputes Act 1947 — Wrongful Termination",
        "section": "Section 25F",
        "category": "Labour Law",
        "description": "Mandates retrenchment compensation equal to 15 days average pay for each completed year of service.",
        "applicability": "Workers in establishments with 100+ employees",
        "remedy": "Reinstatement or compensation",
        "authority": "Labour Commissioner / Industrial Tribunal"
    },
]

def seed():
    # Clear and reseed lawyers
    db.lawyers.delete_many({})
    result_l = db.lawyers.insert_many(LAWYERS)
    print(f"✅ Inserted {len(result_l.inserted_ids)} lawyers")

    # Clear and reseed legal sections
    db.legal_sections.delete_many({})
    result_s = db.legal_sections.insert_many(SECTIONS)
    print(f"✅ Inserted {len(result_s.inserted_ids)} legal sections")

    print("\n🎉 Database seeded successfully!")
    print(f"📊 Database: {db.name}")
    client.close()

if __name__ == "__main__":
    seed()
