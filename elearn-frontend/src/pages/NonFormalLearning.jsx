import { Box, Container, Grid } from "@mui/material";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import PageHeader from "../components/PageHeader";
import Section from "../components/Section";
import CourseCardAdvanced from "../components/CourseCardAdvanced";
import { useSidebar } from "../contexts/SidebarContext";

export default function NonFormalLearning() {
  const { isOpen } = useSidebar();
  const nonFormalCourses = [
    {
      id: "nonformal-1",
      title: "UI/UX Design Bootcamp",
      description: "Become a professional designer in 8 weeks",
      icon: "🎨",
      level: "Beginner",
      duration: "8 weeks",
      category: "Non-Formal Learning",
      rating: 4.7,
      students: "2,850",
      instructor: "Amanda Davis",
    },
    {
      id: "nonformal-2",
      title: "Digital Marketing Masterclass",
      description: "SEO, Social Media, and Content Marketing",
      icon: "📢",
      level: "Beginner",
      duration: "6 weeks",
      category: "Non-Formal Learning",
      rating: 4.6,
      students: "3,200",
      instructor: "Kevin Martinez",
    },
    {
      id: "nonformal-3",
      title: "Entrepreneurship Intensive",
      description: "From idea to market in 4 weeks",
      icon: "🚀",
      level: "All Levels",
      duration: "4 weeks",
      category: "Non-Formal Learning",
      rating: 4.8,
      students: "1,950",
      instructor: "Rachel Green",
    },
    {
      id: "nonformal-4",
      title: "Video Production Workshop",
      description: "Create professional videos from scratch",
      icon: "🎬",
      level: "Beginner",
      duration: "5 weeks",
      category: "Non-Formal Learning",
      rating: 4.5,
      students: "1,450",
      instructor: "Tom Hardy",
    },
    {
      id: "nonformal-5",
      title: "Graphic Design Bootcamp",
      description: "Adobe Creative Suite mastery",
      icon: "✏️",
      level: "Beginner",
      duration: "8 weeks",
      category: "Non-Formal Learning",
      rating: 4.7,
      students: "2,600",
      instructor: "Jessica Parker",
    },
    {
      id: "nonformal-6",
      title: "Content Writing Intensive",
      description: "Master copywriting and storytelling",
      icon: "📝",
      level: "Beginner",
      duration: "6 weeks",
      category: "Non-Formal Learning",
      rating: 4.6,
      students: "2,100",
      instructor: "Mark Thompson",
    },
    {
      id: "nonformal-7",
      title: "SEO & SEM Workshop",
      description: "Organic and paid search optimization",
      icon: "🔍",
      level: "Intermediate",
      duration: "4 weeks",
      category: "Non-Formal Learning",
      rating: 4.5,
      students: "1,800",
      instructor: "Laura White",
    },
    {
      id: "nonformal-8",
      title: "Email Marketing Bootcamp",
      description: "Build and optimize email campaigns",
      icon: "📧",
      level: "Beginner",
      duration: "3 weeks",
      category: "Non-Formal Learning",
      rating: 4.4,
      students: "1,550",
      instructor: "Chris Evans",
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
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          minHeight: "100vh",
          py: 4,
          transition: "margin-left 0.3s ease",
        }}
      >
        <Navbar />

        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <PageHeader
            title="Non-Formal Learning"
            subtitle="Flexible, skill-focused workshops and bootcamps"
            backgroundGradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
          />

          <Section background="transparent">
            <Grid container spacing={3}>
              {nonFormalCourses.map((course, i) => (
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
                    actionText="Enroll Now"
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