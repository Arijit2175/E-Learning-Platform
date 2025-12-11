import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Section from "../components/Section";
import SectionTitle from "../components/SectionTitle";
import StatsGrid from "../components/StatsGrid";
import EnrolledCoursesList from "../components/EnrolledCoursesList";
import PageHeader from "../components/PageHeader";
import { useCourses } from "../contexts/CoursesContext";
import { useAuth } from "../contexts/AuthContext";
import { useSidebar } from "../contexts/SidebarContext";

export default function Dashboard() {
  const { enrolledCourses } = useCourses();
  const { user } = useAuth();
  const { isOpen } = useSidebar();
  // Calculate total learning hours (estimate 1 hour per week per course)
  const totalHours = enrolledCourses.reduce((acc, course) => {
    const weeks = parseInt(course.duration) || 0;
    return acc + weeks;
  }, 0);

  // Count completed courses (progress >= 100)
  const completedCourses = enrolledCourses.filter(c => c.progress >= 100).length;

  // Stats data
  const statsData = [
    {
      icon: "📚",
      value: enrolledCourses.length.toString(),
      label: "Courses Enrolled",
      color: "#667eea",
      actionText: "Browse More",
    },
    {
      icon: "⏱️",
      value: `${totalHours}h`,
      label: "Learning Hours",
      color: "#f093fb",
      actionText: "View Stats",
    },
    {
      icon: "🏆",
      value: completedCourses.toString(),
      label: "Certificates Earned",
      color: "#4facfe",
      actionText: "Share",
    },
  ];

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

        {/* Page Header Section */}
        <Section background="transparent" pt={4} pb={2} animated={false}>
          <PageHeader
            title={`Welcome back, ${user?.name || 'Learner'}!`}
            subtitle="Track your learning progress and achievements"
            backgroundGradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          />
        </Section>

        {/* Stats Section */}
        <Section background="transparent" py={{ xs: 4, md: 5 }}>
          <SectionTitle
            title="Your Progress"
            subtitle="Keep track of your learning journey"
            centered
          />
          <StatsGrid stats={statsData} />
        </Section>

        {/* Enrolled Courses Section */}
        <Section background="white" py={{ xs: 4, md: 5 }}>
          <SectionTitle
            title="My Courses"
            subtitle="Continue learning from where you left off"
            centered
          />
          <EnrolledCoursesList courses={enrolledCourses} />
        </Section>
      </Box>
    </Box>
  );
}