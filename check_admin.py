#!/usr/bin/env python3

import asyncio
import sys
import os
from pathlib import Path

# Add backend to path
sys.path.append('/app/backend')

from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from sqlalchemy import select
from server import UserModel, get_password_hash, verify_password

async def check_admin():
    # Database setup
    ROOT_DIR = Path('/app/backend')
    DB_PATH = os.path.join(ROOT_DIR, "medassoc.db")
    DATABASE_URL = f"sqlite+aiosqlite:///{DB_PATH}"
    
    engine = create_async_engine(DATABASE_URL, echo=False)
    AsyncSessionLocal = async_sessionmaker(engine, expire_on_commit=False)
    
    async with AsyncSessionLocal() as session:
        # Check if admin user exists
        result = await session.execute(select(UserModel).where(UserModel.username == "admin@medassoc.com"))
        admin_user = result.scalars().first()
        
        if admin_user:
            print(f"✅ Admin user found: {admin_user.username}")
            print(f"   Full name: {admin_user.full_name}")
            print(f"   Disabled: {admin_user.disabled}")
            
            # Test password verification
            test_password = "admin123"
            if verify_password(test_password, admin_user.hashed_password):
                print(f"✅ Password verification successful")
            else:
                print(f"❌ Password verification failed")
                
        else:
            print("❌ Admin user not found")
            
            # Create admin user
            print("Creating admin user...")
            admin = UserModel(
                username="admin@medassoc.com",
                full_name="Admin",
                hashed_password=get_password_hash("admin123")
            )
            session.add(admin)
            await session.commit()
            print("✅ Admin user created")

if __name__ == "__main__":
    asyncio.run(check_admin())