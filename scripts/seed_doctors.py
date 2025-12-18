import asyncio
import os
import uuid
from datetime import datetime, timezone
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy import select, delete

# Import models from server (assuming server.py is in the parent path or python path is set)
# To make this robust, we define a minimal version or import
import sys
sys.path.append("/app/backend")
from server import DoctorModel, Base, engine, AsyncSessionLocal

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
    print("Starting seed for SQLite...")
    
    # Create tables if they don't exist
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with AsyncSessionLocal() as session:
        # Clear existing
        print("Clearing existing doctors...")
        await session.execute(delete(DoctorModel))
        
        # Insert new
        print("Inserting new doctors...")
        for doc in doctors_data:
            new_doc = DoctorModel(
                id=str(uuid.uuid4()),
                name=doc["name"],
                city=doc["city"],
                specialty=doc["specialty"],
                contact_info=doc["contact_info"],
                image_url=doc["image_url"],
                created_at=datetime.utcnow()
            )
            session.add(new_doc)
            print(f"Added: {doc['name']}")
        
        await session.commit()
    
    print("Seed complete!")

if __name__ == "__main__":
    asyncio.run(seed())
