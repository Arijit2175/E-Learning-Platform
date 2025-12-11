import { Card, CardContent } from "@mui/material";
import { motion } from "framer-motion";

export default function CourseCard({ children, sx }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card
        sx={{
          minHeight: 150,
          borderRadius: 3,
          boxShadow: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          ...sx,
        }}
      >
        <CardContent sx={{ width: "100%", textAlign: "center" }}>
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
}
