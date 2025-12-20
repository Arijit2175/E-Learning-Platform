import { Card, CardContent, Typography, Box, Chip, Stack } from "@mui/material";
import { motion } from "framer-motion";
import { Star } from "@mui/icons-material";

const MotionCard = motion(Card);

export default function CourseCard({ children, title, description, icon, sx }) {
  return (
    <MotionCard
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      sx={{
        minHeight: 320,
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "flex-start",
        background: "linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)",
        border: "1px solid #e5e7eb",
        transition: "all 0.25s ease-out",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        willChange: "transform",
        backfaceVisibility: "hidden",
        transform: "translateZ(0)",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
        },
        "&:hover": {
          boxShadow: "0 12px 32px rgba(102, 126, 234, 0.15)",
          borderColor: "#667eea",
        },
        ...sx,
      }}
    >
      {/* Icon Background */}
      <Box
        sx={{
          background: "transparent",
          py: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          willChange: "transform",
          backfaceVisibility: "hidden",
        }}
      >
        {icon && (
          <Box
            sx={{
              fontSize: "4rem",
              textShadow: "0 2px 4px rgba(102, 126, 234, 0.1)",
              lineHeight: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              willChange: "transform",
              backfaceVisibility: "hidden",
              transform: "translateZ(0)",
            }}
          >
            {icon}
          </Box>
        )}
      </Box>

      <CardContent
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 1.5,
          p: 2.5,
          flex: 1,
          textAlign: "center",
        }}
      >
        {title && (
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              color: "#1f2937",
              fontSize: "1.15rem",
              lineHeight: 1.3,
              textAlign: "center",
            }}
          >
            {title}
          </Typography>
        )}

        {description && (
          <Typography
            variant="body2"
            sx={{
              color: "#6b7280",
              fontSize: "0.9rem",
              lineHeight: 1.6,
              textAlign: "center",
            }}
          >
            {description}
          </Typography>
        )}

        {children && (
          <Box sx={{ mt: "auto", pt: 1 }}>
            {children}
          </Box>
        )}
      </CardContent>
    </MotionCard>
  );
}
