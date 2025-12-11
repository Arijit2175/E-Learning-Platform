import { Card, CardContent, Box, Typography, Chip, Button, LinearProgress, Snackbar, Alert } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useCourses } from "../contexts/CoursesContext";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const MotionCard = motion(Card);

export default function CourseCardAdvanced({
  id,
  title,
  description,
  icon,
  category,
  level,
  duration,
  students,
  rating,
  progress,
  instructor,
  showProgress = false,
  actionText = "Enroll Now",
  onEnroll,
  enrolledOverride,
}) {
  const { enrollCourse, isEnrolled } = useCourses();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const enrolled = enrolledOverride !== undefined ? enrolledOverride : isEnrolled(id);

  const handleEnroll = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (onEnroll) {
      const result = onEnroll({ id, title, description, icon, category, level, duration, instructor, rating });
      setSnackbar({
        open: true,
        message: result?.message || (result?.success ? "Enrolled" : "Unable to enroll"),
        severity: result?.success ? "success" : "info",
      });
      if (result?.success) {
        setTimeout(() => navigate("/formal"), 1200);
      }
      return;
    }

    const courseData = { id, title, description, icon, category, level, duration, instructor, rating };
    const result = enrollCourse(courseData);
    
    setSnackbar({
      open: true,
      message: result.message,
      severity: result.success ? "success" : "info",
    });

    if (result.success) {
      setTimeout(() => navigate("/dashboard"), 1500);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  const getLevelColor = (level) => {
    switch (level?.toLowerCase()) {
      case "beginner":
        return "#10b981";
      case "intermediate":
        return "#f59e0b";
      case "advanced":
        return "#ef4444";
      default:
        return "#667eea";
    }
  };

  const categoryGradients = {
    formal: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    nonformal: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    informal: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  };

  const getBg = (cat) => {
    if (cat?.toLowerCase().includes("formal")) return categoryGradients.formal;
    if (cat?.toLowerCase().includes("non")) return categoryGradients.nonformal;
    return categoryGradients.informal;
  };

  return (
    <MotionCard
      whileHover={{ y: -12, boxShadow: "0 20px 50px rgba(0,0,0,0.15)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        overflow: "hidden",
        border: "1px solid rgba(0,0,0,0.08)",
        background: "white",
      }}
    >
      {/* Header with Icon */}
      <Box
        sx={{
          background: getBg(category),
          py: 4,
          px: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "3rem",
          position: "relative",
          overflow: "hidden",
          "&::after": {
            content: '""',
            position: "absolute",
            top: "-50%",
            right: "-50%",
            width: "200px",
            height: "200px",
            background: "rgba(255,255,255,0.1)",
            borderRadius: "50%",
          },
        }}
      >
        <Box sx={{ position: "relative", zIndex: 1 }}>{icon}</Box>
      </Box>

      <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 2 }}>
        {/* Category & Level */}
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          <Chip
            label={category}
            size="small"
            sx={{
              fontWeight: 600,
              background: "rgba(102, 126, 234, 0.1)",
              color: "#667eea",
            }}
          />
          <Chip
            label={level}
            size="small"
            sx={{
              fontWeight: 600,
              background: `${getLevelColor(level)}20`,
              color: getLevelColor(level),
            }}
          />
        </Box>

        {/* Title & Description */}
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700, color: "#2c3e50", mb: 0.5 }}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: "#7f8c8d", lineHeight: 1.6 }}>
            {description}
          </Typography>
        </Box>

        {/* Course Meta */}
        {instructor && (
          <Typography variant="caption" sx={{ color: "#667eea", fontWeight: 600 }}>
            👨‍🏫 {instructor}
          </Typography>
        )}

        {/* Progress Bar (for enrolled courses) */}
        {showProgress && progress !== undefined && (
          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography variant="caption" sx={{ color: "#666" }}>
                Progress
              </Typography>
              <Typography variant="caption" sx={{ fontWeight: 700, color: "#667eea" }}>
                {progress}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 6,
                borderRadius: 3,
                background: "#eee",
                "& .MuiLinearProgress-bar": {
                  background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
                  borderRadius: 3,
                },
              }}
            />
          </Box>
        )}

        {/* Stats */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pt: 1 }}>
          <Box sx={{ display: "flex", gap: 1.5, fontSize: "0.85rem", color: "#666" }}>
            {students && <span>👥 {students}</span>}
            {duration && <span>⏱️ {duration}</span>}
          </Box>
          {rating && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <StarIcon sx={{ fontSize: "1rem", color: "#ffc107" }} />
              <Typography variant="caption" sx={{ fontWeight: 700 }}>
                {rating}
              </Typography>
            </Box>
          )}
        </Box>
      </CardContent>

      {/* Action Button */}
      <CardContent sx={{ pt: 0 }}>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleEnroll}
            disabled={enrolled}
            startIcon={enrolled ? <CheckCircleIcon /> : null}
            sx={{
              background: enrolled 
                ? "linear-gradient(135deg, #10b981 0%, #059669 100%)" 
                : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              fontWeight: 700,
              py: 1.2,
              "&:disabled": {
                color: "white",
                opacity: 0.9,
              },
            }}
          >
            {enrolled ? "Enrolled" : actionText}
          </Button>
        </motion.div>
      </CardContent>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </MotionCard>
  );
}
