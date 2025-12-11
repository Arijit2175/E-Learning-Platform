import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import HeroSection from "../components/HeroSection";
import CourseCard from "../components/CourseCard";
import AnimatedButton from "../components/AnimatedButton";
import { Box, Grid } from "@mui/material";

export default function Home() {
  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <Box sx={{ flexGrow: 1, ml: 25, mt: 8, p: 3 }}>
        {/* Navbar */}
        <Navbar />

        {/* Hero Section */}
        <HeroSection
          title="Welcome to E-Learning Platform"
          subtitle="Learn anytime, anywhere. Choose your path:"
        />

        {/* Course Buttons / Cards */}
        <Grid container spacing={3} sx={{ mt: 3 }}>
          {[
            { title: "Formal Learning", link: "/formal" },
            { title: "Non-Formal Learning", link: "/nonformal" },
            { title: "Informal Learning", link: "/informal" },
            { title: "AI Tutor", link: "/ai" },
          ].map((course, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <CourseCard>
                <AnimatedButton
                  text={course.title}
                  href={course.link}
                  sx={{ width: "100%", height: 150, fontSize: "1.2rem" }}
                />
              </CourseCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

