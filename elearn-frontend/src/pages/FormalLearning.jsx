import { Box, Grid, Container, Tabs, Tab, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import PageHeader from "../components/PageHeader";
import Section from "../components/Section";
import SectionTitle from "../components/SectionTitle";
import CourseCardAdvanced from "../components/CourseCardAdvanced";
import { useSidebar } from "../contexts/SidebarContext";
import { useAuth } from "../contexts/AuthContext";
import TeacherDashboard from "../components/TeacherDashboard";
import StudentFormalDashboard from "../components/StudentFormalDashboard";
import { useFormalEducation } from "../contexts/FormalEducationContext";

export default function FormalLearning() {
  const { isOpen } = useSidebar();
  const { user } = useAuth();
  const { courses, enrollStudent, getStudentEnrollments } = useFormalEducation();
  const [tabValue, setTabValue] = useState(0);
  
  // Detect if user is a teacher based on explicit role
  const isTeacher = user?.role === "teacher";
    if (isTeacher) {
      return (
        <Box sx={{ display: "flex" }}>
          <Sidebar />
          <Box
            sx={{
              flexGrow: 1,
              ml: { xs: 0, md: isOpen ? 25 : 8.75 },
              mt: { xs: 6, md: 8 },
              background: "linear-gradient(135deg, #f8f9fa 0%, #f0f2f5 100%)",
              minHeight: "100vh",
              transition: "margin-left 0.3s ease",
            }}
          >
            <Navbar />
            <TeacherDashboard />
          </Box>
        </Box>
      );
    }
  // Only show teacher-created courses; no fallback demo content
  const catalogCourses = courses;
  const studentEnrollments = getStudentEnrollments(user?.id);

  const handleEnroll = (course) => {
    const result = enrollStudent(user?.id, course.id, `${user?.firstName || ""} ${user?.lastName || ""}`.trim());
    return result;
  };

  // Student view
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box
        sx={{
          flexGrow: 1,
          ml: { xs: 0, md: isOpen ? 25 : 8.75 },
          mt: { xs: 6, md: 8 },
          background: "linear-gradient(135deg, #f8f9fa 0%, #f0f2f5 100%)",
          minHeight: "100vh",
          transition: "margin-left 0.3s ease",
        }}
      >
        <Navbar />

        {/* Tab Navigation */}
        <Section background="transparent" pt={2} pb={0}>
          <Container maxWidth="lg">
            <Tabs 
              value={tabValue} 
              onChange={(e, newValue) => setTabValue(newValue)}
              sx={{ borderBottom: "1px solid #e0e0e0", mb: 2 }}
            >
              <Tab label="My Courses" />
              <Tab label="Browse Courses" />
            </Tabs>
          </Container>
        </Section>

        {/* My Courses Tab */}
        {tabValue === 0 && <StudentFormalDashboard />}

        {/* Browse Courses Tab */}
        {tabValue === 1 && (
          <>
            {/* Page Header */}
            <Section background="transparent" pt={4} pb={2} animated={false}>
          <PageHeader
            title="Formal Learning"
            subtitle="Structured, curriculum-driven courses with certifications"
            backgroundGradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          />
            </Section>

            {/* Courses Grid */}
            <Section background="transparent" py={{ xs: 4, md: 6 }}>
          <SectionTitle
            title="Available Formal Courses"
            subtitle="Choose from our comprehensive collection of formal learning programs"
            centered
          />
          
          <Container maxWidth="lg">
            <Grid container spacing={3}>
              {catalogCourses.length === 0 ? (
                <Box sx={{ width: "100%", textAlign: "center", py: 4 }}>
                  <Typography variant="body1" sx={{ color: "#999" }}>
                    No formal courses available yet. Your teacher will assign courses.
                  </Typography>
                </Box>
              ) : catalogCourses.map((course, i) => {
                const enrolled = studentEnrollments.some((e) => e.courseId === course.id);
                return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                  <CourseCardAdvanced
                    id={course.id}
                    title={course.title}
                    description={course.description}
                    icon={course.icon}
                    category={course.category}
                    level={course.level}
                    duration={course.duration}
                    rating={course.rating}
                    students={course.students}
                    instructor={course.instructor}
                    actionText={enrolled ? "Enrolled" : "Enroll"}
                    enrolledOverride={enrolled}
                    onEnroll={handleEnroll}
                  />
                </Grid>
              );})}
            </Grid>
          </Container>
            </Section>
          </>
        )}
      </Box>
    </Box>
  );
}