import { Card, CardContent, Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";

const MotionCard = motion(Card);

export default function StatCard({ icon, value, label, color = "#667eea", actionText = null, onAction = null }) {
  return (
    <MotionCard
      whileHover={{ y: -4, boxShadow: 'var(--shadow-md)' }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      sx={{
        background: `linear-gradient(135deg, ${color}10 0%, ${color}04 100%)`,
        border: `1px solid ${color}25`,
        borderRadius: 'var(--radius-lg)',
        overflow: "hidden",
        position: "relative",
        boxShadow: 'var(--shadow-sm)',
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: `linear-gradient(90deg, ${color}, transparent)`,
        },
      }}
    >
      <CardContent sx={{ py: 4, px: 3 }}>
        <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", mb: 3 }}>
          <Box
            sx={{
              fontSize: "2.5rem",
              p: 1.5,
              background: `${color}20`,
              borderRadius: 2,
              lineHeight: 1,
            }}
          >
            {icon}
          </Box>
          {actionText && (
            <Button size="small" variant="text" onClick={onAction} sx={{ color }}>
              {actionText}
            </Button>
          )}
        </Box>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            color,
            mb: 0.5,
          }}
        >
          {value}
        </Typography>
        <Typography variant="body2" sx={{ color: 'var(--color-muted)', fontWeight: 500 }}>
          {label}
        </Typography>
      </CardContent>
    </MotionCard>
  );
}
