from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "EduSphere Backend API is running!"}
