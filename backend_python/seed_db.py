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

# ─── LAWYERS (20 entries) ──────────────────────────────────────────────────────
LAWYERS = [
    {"name": "Adv. Priya Sharma",     "specializations": ["Consumer Law", "Civil Law"],       "rating": 4.8, "experience": 12, "phone": "+91 98765 43210", "email": "priya.sharma@legalfirm.in"},
    {"name": "Adv. Ravi Kumar",       "specializations": ["Cyber Law", "Criminal Law"],        "rating": 4.7, "experience": 9,  "phone": "+91 98123 45678", "email": "ravi.kumar@cyberlaw.in"},
    {"name": "Adv. Sunita Reddy",     "specializations": ["Property Law", "Civil Law"],        "rating": 4.9, "experience": 15, "phone": "+91 97001 23456", "email": "sunita.reddy@propertylaw.in"},
    {"name": "Adv. Mohammed Iqbal",   "specializations": ["Family Law", "Civil Law"],          "rating": 4.6, "experience": 11, "phone": "+91 96543 21098", "email": "m.iqbal@familylaw.in"},
    {"name": "Adv. Anjali Gupta",     "specializations": ["Labour Law", "Civil Law"],          "rating": 4.5, "experience": 8,  "phone": "+91 95432 10987", "email": "anjali.gupta@labourlaw.in"},
    {"name": "Adv. Srinivas Rao",     "specializations": ["Criminal Law", "Consumer Law"],     "rating": 4.7, "experience": 14, "phone": "+91 94321 09876", "email": "srinivas.rao@criminallaw.in"},
    {"name": "Adv. Kavitha Nair",     "specializations": ["Property Law", "Family Law"],       "rating": 4.8, "experience": 10, "phone": "+91 93210 98765", "email": "kavitha.nair@legalassist.in"},
    {"name": "Adv. Deepak Joshi",     "specializations": ["Cyber Law", "Consumer Law"],        "rating": 4.6, "experience": 7,  "phone": "+91 92109 87654", "email": "deepak.joshi@cyberlaw.in"},
    {"name": "Adv. Lakshmi Venkat",   "specializations": ["Labour Law", "Criminal Law"],       "rating": 4.5, "experience": 13, "phone": "+91 91098 76543", "email": "lakshmi.venkat@labourlaw.in"},
    {"name": "Adv. Arun Mehta",       "specializations": ["Property Law", "Consumer Law"],     "rating": 4.4, "experience": 6,  "phone": "+91 90987 65432", "email": "arun.mehta@propertyconsumer.in"},
    # ── 10 new lawyers ──
    {"name": "Adv. Neha Patel",       "specializations": ["Family Law", "Women's Rights"],     "rating": 4.9, "experience": 16, "phone": "+91 89876 54321", "email": "neha.patel@familyrights.in"},
    {"name": "Adv. Vikram Singh",     "specializations": ["Criminal Law", "Civil Law"],        "rating": 4.7, "experience": 18, "phone": "+91 88765 43210", "email": "vikram.singh@criminallaw.in"},
    {"name": "Adv. Meera Krishnan",   "specializations": ["Cyber Law", "Financial Fraud"],     "rating": 4.6, "experience": 8,  "phone": "+91 87654 32109", "email": "meera.krishnan@cyberfinance.in"},
    {"name": "Adv. Suresh Babu",      "specializations": ["Labour Law", "Consumer Law"],       "rating": 4.5, "experience": 20, "phone": "+91 86543 21098", "email": "suresh.babu@labourlegal.in"},
    {"name": "Adv. Pooja Iyer",       "specializations": ["Property Law", "Civil Law"],        "rating": 4.8, "experience": 11, "phone": "+91 85432 10987", "email": "pooja.iyer@propertylegal.in"},
    {"name": "Adv. Rahul Verma",      "specializations": ["Financial Fraud", "Criminal Law"],  "rating": 4.7, "experience": 13, "phone": "+91 84321 09876", "email": "rahul.verma@fraudlaw.in"},
    {"name": "Adv. Divya Menon",      "specializations": ["Women's Rights", "Family Law"],     "rating": 4.9, "experience": 9,  "phone": "+91 83210 98765", "email": "divya.menon@womenlaw.in"},
    {"name": "Adv. Karthik Rajan",    "specializations": ["Consumer Law", "Property Law"],     "rating": 4.6, "experience": 7,  "phone": "+91 82109 87654", "email": "karthik.rajan@consumerlaw.in"},
    {"name": "Adv. Ananya Das",       "specializations": ["Cyber Law", "Criminal Law"],        "rating": 4.5, "experience": 5,  "phone": "+91 81098 76543", "email": "ananya.das@cyberlaw.in"},
    {"name": "Adv. Rajesh Nambiar",   "specializations": ["Labour Law", "Civil Law"],          "rating": 4.8, "experience": 22, "phone": "+91 80987 65432", "email": "rajesh.nambiar@labourlaw.in"},
]

# ─── LEGAL SECTIONS (40 entries) ──────────────────────────────────────────────
SECTIONS = [
    # ── CONSUMER RIGHTS (6) ──
    {"title": "Consumer Protection Act 2019 — Deficiency in Service",   "section": "Section 2(11)",  "category": "Consumer Rights", "description": "Defines deficiency as any fault, imperfection, shortcoming or inadequacy in quality, nature, or manner in services.", "applicability": "All consumers of goods/services", "remedy": "Refund, compensation, or replacement", "authority": "District Consumer Disputes Redressal Commission"},
    {"title": "Consumer Protection Act 2019 — Unfair Trade Practices",  "section": "Section 2(47)",  "category": "Consumer Rights", "description": "Prohibits false advertisements, misleading offers, unsafe goods, and deceptive pricing.", "applicability": "Retailers, e-commerce, service providers", "remedy": "Cease and desist, compensation up to ₹10 lakh", "authority": "National Consumer Helpline (1800-11-4000)"},
    {"title": "Consumer Protection Act 2019 — Product Liability",       "section": "Section 84",     "category": "Consumer Rights", "description": "Holds manufacturers, sellers, and service providers liable for any harm caused by a defective product or deficient service.", "applicability": "Consumers harmed by defective products", "remedy": "Compensation for injury or loss", "authority": "District/State/National Consumer Commission"},
    {"title": "Consumer Protection Act 2019 — E-Commerce Rules",        "section": "Section 94",     "category": "Consumer Rights", "description": "Mandates transparency in pricing, no hidden charges, and clear return/refund policies for all e-commerce platforms.", "applicability": "Online shoppers on platforms like Amazon, Flipkart", "remedy": "Refund, replacement, or compensation", "authority": "Consumer helpline or Consumer Commission"},
    {"title": "Consumer Protection Act 2019 — Misleading Advertisement","section": "Section 21",     "category": "Consumer Rights", "description": "Central Consumer Protection Authority (CCPA) can issue orders against misleading advertisements and penalise manufacturers.", "applicability": "Consumers misled by false product claims", "remedy": "Fine up to ₹10 lakh on manufacturer; ₹50 lakh on repeat", "authority": "Central Consumer Protection Authority (CCPA)"},
    {"title": "Consumer Protection Act 2019 — Right to Seek Redressal", "section": "Section 2(9)",  "category": "Consumer Rights", "description": "Every consumer has the right to seek redressal against unfair trade practices or exploitation.", "applicability": "All consumers in India", "remedy": "Compensation, replacement, or removal of defect", "authority": "Consumer Forum (District / State / National)"},

    # ── CYBER CRIME (7) ──
    {"title": "IT Act 2000 — Hacking",                  "section": "Section 66",  "category": "Cyber Crime", "description": "Punishes unauthorized access to computer systems with imprisonment up to 3 years and/or fine up to ₹5 lakh.", "applicability": "Any person accessing computer systems without permission", "remedy": "FIR, compensation", "authority": "Cyber Crime Cell"},
    {"title": "IT Act 2000 — Identity Theft",           "section": "Section 66C", "category": "Cyber Crime", "description": "Punishes fraudulent use of electronic signature, password, or unique identification.", "applicability": "Online fraud, phishing victims", "remedy": "Imprisonment up to 3 years + fine up to ₹1 lakh", "authority": "Cybercrime.gov.in"},
    {"title": "IT Act 2000 — Phishing & Online Fraud",  "section": "Section 66D", "category": "Cyber Crime", "description": "Punishes cheating by impersonation using a computer resource with imprisonment up to 3 years and fine up to ₹1 lakh.", "applicability": "Victims of phishing, fake website fraud", "remedy": "FIR + compensation claim", "authority": "Cyber Crime Portal (cybercrime.gov.in)"},
    {"title": "IT Act 2000 — Cyberstalking / Obscene Content", "section": "Section 67", "category": "Cyber Crime", "description": "Prohibits publishing or transmitting obscene material in electronic form.", "applicability": "Victims of revenge porn, morphed images, cyberbullying", "remedy": "Imprisonment up to 3 years + fine up to ₹5 lakh", "authority": "Cyber Crime Cell / Women's Helpline 1091"},
    {"title": "IT Act 2000 — Data Theft",               "section": "Section 43",  "category": "Cyber Crime", "description": "Provides civil remedy for unauthorized access, data theft, or virus introduction into a computer system.", "applicability": "Businesses and individuals whose data is stolen", "remedy": "Compensation from the offender", "authority": "Adjudicating Officer / Civil Court"},
    {"title": "IT Act 2000 — Cyber Terrorism",          "section": "Section 66F", "category": "Cyber Crime", "description": "Punishes acts that threaten the unity or security of India through electronic means.", "applicability": "Serious cyber attacks on critical infrastructure", "remedy": "Imprisonment up to life", "authority": "NIA / Cyber Cell"},
    {"title": "IT Act 2000 — Breach of Confidentiality","section": "Section 72",  "category": "Cyber Crime", "description": "Punishes disclosure of information obtained through lawful access, without consent.", "applicability": "Data processors, IT professionals misusing data", "remedy": "Imprisonment up to 2 years + fine up to ₹1 lakh", "authority": "Cyber Crime Cell"},

    # ── PROPERTY LAW (6) ──
    {"title": "Transfer of Property Act 1882 — Sale of Immovable Property", "section": "Section 54",         "category": "Property Law", "description": "Defines a sale of immovable property including rights, liabilities, and registration requirements.", "applicability": "Property buyers, sellers, and agents", "remedy": "Specific performance, injunction, or damages", "authority": "Sub-Registrar Office / Civil Court"},
    {"title": "Registration Act 1908 — Compulsory Registration",             "section": "Section 17",         "category": "Property Law", "description": "Mandates registration of sale deeds, gift deeds, and lease agreements exceeding 11 months.", "applicability": "Immovable property transactions", "remedy": "Void transaction if unregistered", "authority": "District Registrar Office"},
    {"title": "RERA 2016 — Delayed Possession",                              "section": "Section 18",         "category": "Property Law", "description": "Builders must compensate buyers for delayed possession at applicable interest rate or refund with interest.", "applicability": "Home buyers affected by delayed delivery", "remedy": "Refund with interest or continued payment of interest till possession", "authority": "State RERA Authority"},
    {"title": "RERA 2016 — Registration of Project",                         "section": "Section 3",          "category": "Property Law", "description": "All real estate projects above 500 sq.m. or 8 apartments must be registered with RERA before marketing.", "applicability": "Buyers who invested in unregistered projects", "remedy": "Penalty on builder, project registration order", "authority": "State RERA Authority"},
    {"title": "Rent Control Act — Eviction Protection",                      "section": "Various State Acts", "category": "Property Law", "description": "Protects tenants from arbitrary eviction and regulates rent increases. Applies state-wise.", "applicability": "Tenants in residential and commercial properties", "remedy": "Stay of eviction, fair rent fixation", "authority": "Rent Controller / Civil Court"},
    {"title": "Benami Transactions Act 1988 — Benami Property",              "section": "Section 3",          "category": "Property Law", "description": "Prohibits holding property in another person's name to conceal ownership.", "applicability": "Property fraud, black money cases", "remedy": "Confiscation of property, imprisonment up to 7 years", "authority": "Income Tax Dept / Benami Prohibition Unit"},

    # ── CRIMINAL LAW (6) ──
    {"title": "IPC — Cheating",               "section": "Section 420 IPC",     "category": "Criminal Law", "description": "Punishes cheating and fraudulently inducing delivery of property with imprisonment up to 7 years.", "applicability": "Online fraud, property fraud, financial fraud", "remedy": "FIR, criminal prosecution, compensation", "authority": "Local Police Station"},
    {"title": "IPC — Criminal Breach of Trust","section": "Section 406 IPC",    "category": "Criminal Law", "description": "Punishes persons entrusted with property who dishonestly misappropriate it.", "applicability": "Employees, fiduciaries, agents", "remedy": "Imprisonment up to 3 years + fine", "authority": "Local Police Station / Sessions Court"},
    {"title": "IPC — Defamation",             "section": "Section 499-500 IPC", "category": "Criminal Law", "description": "Punishes making or publishing imputation that harms the reputation of a person.", "applicability": "Victims of false statements in print, social media, speech", "remedy": "Imprisonment up to 2 years + fine", "authority": "Magistrate Court"},
    {"title": "IPC — Extortion",              "section": "Section 383 IPC",     "category": "Criminal Law", "description": "Punishes fear-based demands of money, property, or valuable security.", "applicability": "Victims of blackmail, ransom, coercive demands", "remedy": "Imprisonment up to 3 years + fine", "authority": "Local Police Station"},
    {"title": "IPC — Assault",                "section": "Section 351 IPC",     "category": "Criminal Law", "description": "Punishes any act that causes apprehension of force or violence in another person.", "applicability": "Physical threats, workplace violence, road rage", "remedy": "Imprisonment up to 3 months / 2 years depending on severity", "authority": "Local Police Station / Magistrate"},
    {"title": "BNS 2023 — Organized Crime",   "section": "Section 111 BNS",    "category": "Criminal Law", "description": "Bharatiya Nyaya Sanhita (replacing IPC) punishes organized crime with minimum 5 years imprisonment.", "applicability": "Gang crimes, extortion rings, contract killings", "remedy": "Minimum 5 years to life imprisonment", "authority": "Local Police / CBI"},

    # ── FAMILY LAW (6) ──
    {"title": "Hindu Marriage Act 1955 — Grounds for Divorce",  "section": "Section 13",          "category": "Family Law", "description": "Lists grounds for divorce: adultery, cruelty, desertion, conversion, mental disorder, and mutual consent.", "applicability": "Hindu married couples", "remedy": "Divorce decree, alimony, child custody", "authority": "Family Court"},
    {"title": "Hindu Marriage Act 1955 — Maintenance",          "section": "Section 24 & 25",     "category": "Family Law", "description": "Either spouse can claim maintenance during and after divorce proceedings based on income and need.", "applicability": "Spouses without sufficient income to support themselves", "remedy": "Monthly maintenance allowance ordered by court", "authority": "Family Court"},
    {"title": "Protection of Women from DV Act 2005",           "section": "Section 3",           "category": "Family Law", "description": "Protects women from physical, sexual, verbal, emotional, and economic abuse within domestic relationships.", "applicability": "Married women, women in live-in relationships, family members", "remedy": "Protection order, residence order, monetary relief", "authority": "Protection Officer / Magistrate Court"},
    {"title": "Special Marriage Act 1954 — Inter-Religion Marriage","section": "Section 4",       "category": "Family Law", "description": "Allows two persons of any religion or nationality to marry legally under civil law.", "applicability": "Couples from different religions or nationalities", "remedy": "Legal recognition of marriage", "authority": "Marriage Registrar Office"},
    {"title": "Guardians and Wards Act 1890 — Child Custody",   "section": "Section 17",          "category": "Family Law", "description": "Court determines custody based on the welfare of the child, not solely parents' rights.", "applicability": "Divorced or separated parents", "remedy": "Sole or joint custody order, visitation rights", "authority": "Family Court / District Court"},
    {"title": "Hindu Succession Act 1956 — Equal Inheritance",  "section": "Section 6 (amended 2005)", "category": "Family Law", "description": "Daughters have equal rights as sons in ancestral property after 2005 amendment.", "applicability": "Hindu women claiming property rights", "remedy": "Equal share in ancestral property", "authority": "Civil Court / Revenue Court"},

    # ── LABOUR LAW (6) ──
    {"title": "Industrial Disputes Act 1947 — Wrongful Termination","section": "Section 25F", "category": "Labour Law", "description": "Mandates retrenchment compensation equal to 15 days average pay for each completed year of service.", "applicability": "Workers in establishments with 100+ employees", "remedy": "Reinstatement or compensation", "authority": "Labour Commissioner / Industrial Tribunal"},
    {"title": "Payment of Gratuity Act 1972",                        "section": "Section 4",  "category": "Labour Law", "description": "Employees completing 5+ years of service are entitled to gratuity at 15 days salary per year of service.", "applicability": "Employees in organizations with 10+ staff", "remedy": "Payment of due gratuity + interest for delay", "authority": "Labour Commissioner / Controlling Authority"},
    {"title": "Minimum Wages Act 1948",                              "section": "Section 12", "category": "Labour Law", "description": "Employers must pay not less than the minimum wages fixed by the government for each category of work.", "applicability": "All workers in scheduled industries", "remedy": "Claim for difference in wages + compensation", "authority": "Labour Inspector / Labour Court"},
    {"title": "POSH Act 2013 — Sexual Harassment at Workplace",      "section": "Section 4 & 11", "category": "Labour Law", "description": "Mandates Internal Complaints Committee (ICC) in organizations with 10+ employees to address sexual harassment.", "applicability": "Women employees in all sectors", "remedy": "Warning, termination, compensation, FIR", "authority": "Internal Complaints Committee / District Officer"},
    {"title": "Employees Provident Fund Act 1952",                   "section": "Section 7A", "category": "Labour Law", "description": "Protects employees' right to PF contributions; employer defaults are punishable.", "applicability": "Employees in organizations with 20+ staff", "remedy": "Recovery of dues + penalty on employer", "authority": "EPFO / Regional PF Commissioner"},
    {"title": "Contract Labour Act 1970 — Non-Regularisation",       "section": "Section 10", "category": "Labour Law", "description": "Regulates employment of contract labour and prohibits it in certain circumstances.", "applicability": "Contract labourers denied regularisation or fair wages", "remedy": "Regularisation or minimum standards enforcement", "authority": "Labour Commissioner"},

    # ── FINANCIAL FRAUD (5) ──
    {"title": "RBI Guidelines — UPI Fraud",                          "section": "RBI Circular 2017", "category": "Financial Fraud", "description": "Banks must resolve unauthorized UPI/NEFT/IMPS transactions within 10 working days. Zero liability for no-fault customers.", "applicability": "Victims of UPI fraud, SIM swap, OTP fraud", "remedy": "Full refund within 10 working days", "authority": "Bank's Grievance Cell / RBI Ombudsman"},
    {"title": "Prevention of Money Laundering Act 2002",             "section": "Section 3 & 4",    "category": "Financial Fraud", "description": "Punishes persons involved in money laundering with imprisonment of 3–7 years and property attachment.", "applicability": "Victims of financial scams, benami transactions", "remedy": "Reporting to ED; confiscation of proceeds of crime", "authority": "Enforcement Directorate (ED)"},
    {"title": "Negotiable Instruments Act 1881 — Cheque Bounce",     "section": "Section 138",      "category": "Financial Fraud", "description": "Cheque dishonour due to insufficient funds is a criminal offence punishable with 2 years imprisonment or double the cheque amount.", "applicability": "Payees who received bounced cheques", "remedy": "Imprisonment or fine of double cheque amount", "authority": "Magistrate Court (within 30 days of dishonour notice)"},
    {"title": "Banning of Unregulated Deposit Schemes Act 2019",     "section": "Section 3",        "category": "Financial Fraud", "description": "Prohibits deposit schemes not regulated by government (chit funds, ponzi schemes) and protects investors.", "applicability": "Victims of ponzi schemes, chit fund fraud", "remedy": "Refund of deposits; imprisonment of promoters up to 10 years", "authority": "Designated Court / State Regulator"},
    {"title": "SEBI Act 1992 — Investment Fraud",                    "section": "Section 11 & 15A", "category": "Financial Fraud", "description": "SEBI regulates securities market and can take action against fraudulent schemes, insider trading, and pump-and-dump.", "applicability": "Stock market fraud victims", "remedy": "Compensation, penalty, disgorgement of profits", "authority": "SEBI Complaint Portal (scores.gov.in)"},

    # ── WOMEN'S RIGHTS (4) ──
    {"title": "POCSO Act 2012",                      "section": "Section 4 & 6", "category": "Women's Rights", "description": "Protects children below 18 from sexual assault, harassment, and exploitation with stringent punishments.", "applicability": "Children under 18 who are victims of sexual offences", "remedy": "Imprisonment of 7 years to life; child-friendly court procedures", "authority": "Special POCSO Court / Child Welfare Committee"},
    {"title": "Dowry Prohibition Act 1961",          "section": "Section 3 & 4", "category": "Women's Rights", "description": "Prohibits giving or taking of dowry and punishes with minimum 5 years imprisonment.", "applicability": "Women facing dowry harassment or demands", "remedy": "Imprisonment + fine; Section 498A IPC for cruelty", "authority": "Police Station / Family Court"},
    {"title": "Maternity Benefit Act 1961 (amended 2017)", "section": "Section 5", "category": "Women's Rights", "description": "Women employees are entitled to 26 weeks of paid maternity leave in establishments with 10+ employees.", "applicability": "Working women in registered organizations", "remedy": "Payment of maternity benefit + 12 weeks for additional children", "authority": "Labour Department / Inspector"},
    {"title": "Equal Remuneration Act 1976",         "section": "Section 4",    "category": "Women's Rights", "description": "Mandates equal pay for men and women performing same or similar work.", "applicability": "Women facing pay discrimination at workplace", "remedy": "Recovery of equal wages; fine on employer", "authority": "Labour Commissioner"},
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

    # Create unique index on users.email to prevent duplicate registrations
    db.users.create_index("email", unique=True)
    print("✅ Created unique index on users.email")

    print("\n🎉 Database seeded successfully!")
    print(f"📊 Database: {db.name}")
    client.close()

if __name__ == "__main__":
    seed()
