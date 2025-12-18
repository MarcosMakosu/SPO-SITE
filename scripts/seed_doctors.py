import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime, timezone
import uuid

# Configuration
MONGO_URL = os.environ.get('MONGO_URL', "mongodb://localhost:27017")
DB_NAME = os.environ.get('DB_NAME', "test_database")

doctors_data = [
    {
        "name": "Dr. Carlos Mendes",
        "city": "Belém",
        "specialty": "Cirurgia de Catarata",
        "contact_info": "(91) 3222-1234",
        "image_url": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800"
    },
    {
        "name": "Dra. Ana Paula Souza",
        "city": "Ananindeua",
        "specialty": "Oftalmopediatria",
        "contact_info": "(91) 3255-5678",
        "image_url": "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=800"
    },
    {
        "name": "Dr. Roberto Silva",
        "city": "Santarém",
        "specialty": "Retina e Vítreo",
        "contact_info": "(93) 3522-9090",
        "image_url": "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=800"
    },
    {
        "name": "Dra. Maria Fernanda",
        "city": "Belém",
        "specialty": "Glaucoma",
        "contact_info": "(91) 98888-7777",
        "image_url": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800"
    },
    {
        "name": "Dr. João Pedro Oliveira",
        "city": "Marabá",
        "specialty": "Córnea e Lentes de Contato",
        "contact_info": "(94) 3322-4455",
        "image_url": "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800"
    }
]

async def seed():
    print(f"Connecting to {MONGO_URL}...")
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]
    
    # Clear existing doctors
    print("Clearing existing doctors...")
    await db.doctors.delete_many({})
    
    # Insert new doctors
    print("Inserting new doctors...")
    for doc in doctors_data:
        doc_db = doc.copy()
        doc_db["id"] = str(uuid.uuid4())
        doc_db["created_at"] = datetime.now(timezone.utc).isoformat()
        await db.doctors.insert_one(doc_db)
        print(f"Added: {doc['name']}")
        
    print("Seed complete!")
    client.close()

if __name__ == "__main__":
    asyncio.run(seed())
