from fastapi import APIRouter, HTTPException, Depends, Request
from app.db import get_db_connection
from app.api.auth import get_current_user

from pydantic import BaseModel

# --- Request Models ---
class EnrollRequest(BaseModel):
    course_id: str

print("nonformal.py loaded")

router = APIRouter(prefix="/nonformal", tags=["nonformal"])


# --- Progress ---
@router.get("/progress/")
def get_nonformal_progress(user=Depends(get_current_user)):
    conn = get_db_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="DB connection error")
    cursor = conn.cursor(dictionary=True)
    cursor.execute("""
        SELECT e.id, e.course_id, e.progress, c.title FROM enrollments e
        JOIN courses c ON e.course_id = c.id
        WHERE e.user_id = %s AND c.type = 'non-formal'""", (user["id"],))
    progress = cursor.fetchall()
    cursor.close()
    conn.close()
    return progress

# --- Courses ---
@router.get("/courses/")
def list_nonformal_courses():
    conn = get_db_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="DB connection error")
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM courses WHERE type = 'non-formal'")
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
    cursor.execute("""
        SELECT e.* FROM enrollments e
        JOIN courses c ON e.course_id = c.id
        WHERE e.user_id = %s AND c.type = 'non-formal'""", (user["id"],))
    enrollments = cursor.fetchall()
    cursor.close()
    conn.close()
    return enrollments

@router.post("/enrollments/")
def enroll_nonformal_course(data: EnrollRequest, user=Depends(get_current_user)):
    print("[DEBUG] enroll_nonformal_course called with:", data)
    course_id = data.course_id
    try:
        course_id_int = int(course_id) if course_id.isdigit() else int(course_id.split('-')[-1])
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid course_id format")
    conn = get_db_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="DB connection error")
    cursor = conn.cursor()
    cursor.execute("SELECT id FROM courses WHERE id=%s AND type='non-formal'", (course_id,))
    if not cursor.fetchone():
        cursor.close()
        conn.close()
        raise HTTPException(status_code=400, detail="Course is not non-formal or does not exist")
    cursor.execute("SELECT id FROM enrollments WHERE user_id=%s AND course_id=%s", (user["id"], course_id))
    if cursor.fetchone():
        cursor.close()
        conn.close()
        raise HTTPException(status_code=400, detail="Already enrolled")
    cursor.execute(
        "INSERT INTO enrollments (user_id, course_id, progress) VALUES (%s, %s, %s)",
        (user["id"], course_id, 0)
    )
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "Enrolled successfully, progress initialized"}

@router.put("/progress/")
async def update_nonformal_progress(request: Request, user=Depends(get_current_user)):
    data = await request.json()
    course_id = data.get("course_id")
    lesson_index = data.get("lesson_index")
    conn = get_db_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="DB connection error")
    cursor = conn.cursor()
    cursor.execute(
        "UPDATE enrollments SET progress=%s WHERE user_id=%s AND course_id=%s",
        (lesson_index, user["id"], course_id)
    )
    conn.commit()

# --- Certificates ---
@router.get("/certificates/")
def get_nonformal_certificates(user=Depends(get_current_user)):
    conn = get_db_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="DB connection error")
    cursor = conn.cursor(dictionary=True)
    # Get certificates for non-formal courses
    cursor.execute("""
        SELECT certificates.* FROM certificates
        JOIN courses c ON certificates.course_id = c.id
        WHERE certificates.user_id = %s AND c.type = 'non-formal'""", (user["id"],))
    certificates = cursor.fetchall()
    cursor.close()
    conn.close()
    return certificates
