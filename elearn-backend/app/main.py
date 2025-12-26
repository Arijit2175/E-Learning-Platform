
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import auth, courses, enrollments, assignments, lessons, attendance, quizzes, resources, certificates, ai_tutor_chats, class_schedules, contact_messages, nonformal, user, forgot_password


app = FastAPI()

# CORS setup for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(user.router)
app.include_router(forgot_password.router)
app.include_router(courses.router)
app.include_router(enrollments.router)
app.include_router(assignments.router)
app.include_router(lessons.router)
app.include_router(attendance.router)
app.include_router(quizzes.router)
app.include_router(resources.router)
app.include_router(certificates.router)
app.include_router(ai_tutor_chats.router)
app.include_router(class_schedules.router)
app.include_router(contact_messages.router)
app.include_router(nonformal.router)

@app.get("/")
def read_root():
    return {"message": "EduSphere Backend API is running!"}
