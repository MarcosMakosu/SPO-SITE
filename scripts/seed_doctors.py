import asyncio
import sys
import os

# Ensure backend path is in sys.path
sys.path.append("/app/backend")

# Now we can import from server
# We need to make sure we don't trigger the whole app startup if possible, 
# but server.py does `app = FastAPI()` at module level. That's fine.
from server import DoctorModel, AsyncSessionLocal, engine

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
    print("Seeding doctors...")
    async with AsyncSessionLocal() as session:
        # Check if we already have doctors
        # Note: In a real script we might want to truncate, but here let's just add if empty or append
        # Let's clean up for demo purposes
        from sqlalchemy import delete
        await session.execute(delete(DoctorModel))
        
        for doc in doctors_data:
            new_doc = DoctorModel(
                name=doc["name"],
                city=doc["city"],
                specialty=doc["specialty"],
                contact_info=doc["contact_info"],
                image_url=doc["image_url"]
            )
            session.add(new_doc)
        
        await session.commit()
    print("Seed complete.")

if __name__ == "__main__":
    asyncio.run(seed())
