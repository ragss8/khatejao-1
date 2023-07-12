from fastapi import FastAPI, UploadFile, File, HTTPException
from pymongo import MongoClient
from pydantic import BaseModel, EmailStr
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timedelta, timezone
import secrets
from gridfs import GridFS

app = FastAPI()

class SignupForm(BaseModel):
    restaurantName: str
    address: str
    phoneNumber: str
    email: EmailStr
    password: str

class LoginForm(BaseModel):
    email: EmailStr
    password: str

class RestaurantForm(BaseModel):
    restaurantName: str
    address: str
    phoneNumber: str
    email: EmailStr
    cuisineType: str
    openingHours: str
    deliveryTime: str
    averageRating: float
    photo: UploadFile
    license: UploadFile
    businessRegistration: UploadFile
    healthAndSafetyCertificates: UploadFile
    taxRegistration: UploadFile

mongodb_uri = 'mongodb+srv://raghugaikwad8641:Raghugaikwad8@userinfo.d4n8sns.mongodb.net/?retryWrites=true&w=majority'
port = 8000
client = MongoClient(mongodb_uri, port)
db = client['Khatejao']
user_collection = db['Restaurant_management']
gridfs = GridFS(db, collection="files")

@app.post("/restaurantsignup")
async def signup(form: SignupForm):
    try:
        user_exists = user_collection.find_one({"email": form.email})
        if user_exists:
            raise HTTPException(status_code=400, detail="User already exists. Please sign in.")

        if not any(char.isdigit() for char in form.password):
            raise HTTPException(status_code=400, detail="Password must contain at least one digit")

        if not any(char.isupper() for char in form.password):
            raise HTTPException(status_code=400, detail="Password must contain at least one uppercase letter")

        user_data = {
            "restaurantName": form.restaurantName,
            "email": form.email,
            "password": form.password,
            "phoneNumber": form.phoneNumber,
            "address": form.address,
        }

        user_collection.insert_one(user_data)

        return {"message": "Signup successful"}

    except Exception as e:
        return {"error": str(e)}

@app.post("/restologin")
def login(form: LoginForm):
    existing_user = user_collection.find_one({"email": form.email})

    if not existing_user:
        raise HTTPException(status_code=404, detail="User not found")

    if existing_user["password"] != form.password:
        raise HTTPException(status_code=401, detail="Invalid password")

    session_token = secrets.token_hex(16)
    token_expiration = datetime.now(timezone.utc) + timedelta(minutes=10)
    user_collection.update_one(
        {"email": form.email},
        {"$set": {"session_token": session_token, "token_expiration": token_expiration}}
    )
    return {"session_token": session_token, "message": "Login successful"}

@app.post("/store-restaurant")
async def store_restaurant(
    form: RestaurantForm,
    photo: UploadFile = File(...),
    license: UploadFile = File(...),
    ownersIdProof: UploadFile = File(...),
    businessRegistration: UploadFile = File(...),
    addressVerification: UploadFile = File(...),
    healthAndSafetyCertificates: UploadFile = File(...),
    taxRegistration: UploadFile = File(...)
):
    try:
        restaurant_data = {
            "restaurantName": form.restaurantName,
            "address": form.address,
            "phoneNumber": form.phoneNumber,
            "email": form.email,
            "password": form.password,
            "cuisineType": form.cuisineType,
            "openingHours": form.openingHours,
            "deliveryTime": form.deliveryTime,
            "averageRating": form.averageRating,
        }
        user_collection.insert_one(restaurant_data)

        photo_id = gridfs.put(photo.file, filename=photo.filename)
        license_id = gridfs.put(license.file, filename=license.filename)
        businessRegistration_id = gridfs.put(businessRegistration.file, filename=businessRegistration.filename)
        healthAndSafetyCertificates_id = gridfs.put(
            healthAndSafetyCertificates.file,
            filename=healthAndSafetyCertificates.filename
        )
        taxRegistration_id = gridfs.put(taxRegistration.file, filename=taxRegistration.filename)

        return {"message": "Restaurant information and files stored successfully"}

    except Exception as e:
        return {"error": str(e)}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
