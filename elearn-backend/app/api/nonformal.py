from fastapi import APIRouter, HTTPException, Depends
from app.db import get_db_connection
from app.api.auth import get_current_user

router = APIRouter(prefix="/nonformal", tags=["nonformal"])

# --- Courses ---
@router.get("/courses/")
def list_nonformal_courses():
    conn = get_db_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="DB connection error")
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM nonformal_courses")
    courses = cursor.fetchall()
    cursor.close()
    conn.close()
    return courses

# --- Enrollments ---
@router.get("/enrollments/")
def list_nonformal_enrollments(user=Depends(get_current_user)):
    conn = get_db_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="DB connection error")
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM nonformal_enrollments WHERE user_id=%s", (user["id"],))
    enrollments = cursor.fetchall()
    cursor.close()
    conn.close()
    return enrollments

@router.post("/enrollments/")
def enroll_nonformal_course(course_id: int, user=Depends(get_current_user)):
    conn = get_db_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="DB connection error")
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO nonformal_enrollments (user_id, course_id) VALUES (%s, %s)",
        (user["id"], course_id)
    )
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "Enrolled successfully"}

# --- Progress ---
@router.get("/progress/")
def get_nonformal_progress(user=Depends(get_current_user)):
    conn = get_db_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="DB connection error")
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM nonformal_progress WHERE user_id=%s", (user["id"],))
    progress = cursor.fetchall()
    cursor.close()
    conn.close()
    return progress

# --- Certificates ---
@router.get("/certificates/")
def get_nonformal_certificates(user=Depends(get_current_user)):
    conn = get_db_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="DB connection error")
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM nonformal_certificates WHERE user_id=%s", (user["id"],))
    certificates = cursor.fetchall()
    cursor.close()
    conn.close()
    return certificates
