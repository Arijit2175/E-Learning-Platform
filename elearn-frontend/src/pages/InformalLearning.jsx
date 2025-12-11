import { Box, Container, Grid } from "@mui/material";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import PageHeader from "../components/PageHeader";
import Section from "../components/Section";
import CourseCardAdvanced from "../components/CourseCardAdvanced";

export default function InformalLearning() {
  const dailyLessons = [
    {
      id: "informal-1",
      title: "5-Minute Python Tip",
      description: "Quick daily Python tips to level up your coding skills",
      category: "Informal Learning",
      level: "Beginner",
      duration: "5 min/day",
      rating: 4.8,
      students: "2,450",
      instructor: "AI Coach",
      icon: "💡",
    },
    {
      id: "informal-2",
      title: "Design Principle: Contrast",
      description: "Learn design principles through daily bite-sized lessons",
      category: "Informal Learning",
      level: "Intermediate",
      duration: "5 min/day",
      rating: 4.6,
      students: "1,820",
      instructor: "AI Coach",
      icon: "🎨",
    },
    {
      id: "informal-3",
      title: "Quick English Grammar",
      description: "Improve your grammar one tip at a time",
      category: "Informal Learning",
      level: "Beginner",
      duration: "5 min/day",
      rating: 4.7,
      students: "3,200",
      instructor: "AI Coach",
      icon: "📚",
    },
    {
      id: "informal-4",
      title: "Mental Health: Stress Management",
      description: "Daily wellness tips for a balanced life",
      category: "Informal Learning",
      level: "All Levels",
      duration: "5 min/day",
      rating: 4.9,
      students: "4,100",
      instructor: "AI Coach",
      icon: "🧘",
    },
    {
      id: "informal-5",
      title: "Productivity Hack of the Day",
      description: "Boost your productivity with daily actionable tips",
      category: "Informal Learning",
      level: "Beginner",
      duration: "5 min/day",
      rating: 4.7,
      students: "2,890",
      instructor: "AI Coach",
      icon: "⚡",
    },
    {
      id: "informal-6",
      title: "Spanish Word of the Day",
      description: "Build your Spanish vocabulary daily",
      category: "Informal Learning",
      level: "Beginner",
      duration: "5 min/day",
      rating: 4.8,
      students: "3,450",
      instructor: "AI Coach",
      icon: "🌍",
    },
    {
      id: "informal-7",
      title: "Quick History Facts",
      description: "Discover fascinating historical facts every day",
      category: "Informal Learning",
      level: "All Levels",
      duration: "5 min/day",
      rating: 4.5,
      students: "2,100",
      instructor: "AI Coach",
      icon: "📖",
    },
    {
      id: "informal-8",
      title: "Business Strategy Tips",
      description: "Learn business strategies through daily insights",
      category: "Informal Learning",
      level: "Intermediate",
      duration: "5 min/day",
      rating: 4.6,
      students: "1,650",
      instructor: "AI Coach",
      icon: "💼",
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box
        sx={{
          flexGrow: 1,
          ml: { xs: 0, md: 25 },
          mt: { xs: 6, md: 8 },
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          minHeight: "100vh",
          py: 4,
        }}
      >
        <Navbar />

        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <PageHeader
            title="Informal Learning"
            subtitle="Self-paced, curiosity-driven learning with daily lessons and quick tips"
            backgroundGradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
          />

          <Section background="transparent">
            <Grid container spacing={3}>
              {dailyLessons.map((lesson, i) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                  <CourseCardAdvanced
                    id={lesson.id}
                    title={lesson.title}
                    description={lesson.description}
                    icon={lesson.icon}
                    category={lesson.category}
                    level={lesson.level}
                    duration={lesson.duration}
                    rating={lesson.rating}
                    students={lesson.students}
                    instructor={lesson.instructor}
                    actionText="Start Learning"
                  />
                </Grid>
              ))}
            </Grid>
          </Section>
        </Container>
      </Box>
    </Box>
  );
}