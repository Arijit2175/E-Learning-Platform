import { createContext, useContext, useState, useEffect } from "react";

const CoursesContext = createContext();

export const useCourses = () => {
  const context = useContext(CoursesContext);
  if (!context) {
    throw new Error("useCourses must be used within a CoursesProvider");
  }
  return context;
};

export const CoursesProvider = ({ children }) => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  // Load enrolled courses from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("enrolledCourses");
    if (stored) {
      setEnrolledCourses(JSON.parse(stored));
    }
  }, []);

  // Save to localStorage whenever enrolledCourses changes
  useEffect(() => {
    localStorage.setItem("enrolledCourses", JSON.stringify(enrolledCourses));
  }, [enrolledCourses]);

  const enrollCourse = (course) => {
    const isAlreadyEnrolled = enrolledCourses.some((c) => c.id === course.id);
    
    if (isAlreadyEnrolled) {
      return { success: false, message: "You're already enrolled in this course!" };
    }

    const enrolledCourse = {
      ...course,
      enrolledDate: new Date().toISOString(),
      progress: 0,
      lastAccessed: new Date().toISOString(),
    };

    setEnrolledCourses([...enrolledCourses, enrolledCourse]);
    return { success: true, message: "Successfully enrolled!" };
  };

  const unenrollCourse = (courseId) => {
    setEnrolledCourses(enrolledCourses.filter((c) => c.id !== courseId));
  };

  const updateProgress = (courseId, progress) => {
    setEnrolledCourses(
      enrolledCourses.map((course) =>
        course.id === courseId
          ? { ...course, progress, lastAccessed: new Date().toISOString() }
          : course
      )
    );
  };

  const isEnrolled = (courseId) => {
    return enrolledCourses.some((c) => c.id === courseId);
  };

  const value = {
    enrolledCourses,
    enrollCourse,
    unenrollCourse,
    updateProgress,
    isEnrolled,
  };

  return <CoursesContext.Provider value={value}>{children}</CoursesContext.Provider>;
};
