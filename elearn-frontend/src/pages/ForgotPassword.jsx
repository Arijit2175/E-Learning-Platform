import { Box, Container, Button, Typography, Card, CardContent, Link, Alert } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import FormInput from "../components/FormInput";
import PageHeader from "../components/PageHeader";
import { useAuth } from "../contexts/AuthContext";
import { useState, useEffect } from "react";

const MotionCard = motion(Card);

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    // Validate email
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setSuccess(true);
      setEmail("");
      setLoading(false);
    }, 1500);
  };

  return (
    <Box>
      <Navbar />
      <Box
        sx={{
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          minHeight: "100vh",
          py: 4,
          pt: { xs: 10, md: 12 },
        }}
      >
        <Container maxWidth="sm" sx={{ mt: 4 }}>
          <PageHeader
            title="Reset Your Password"
            subtitle="Enter your email to receive password reset instructions"
            backgroundGradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
          />

          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            sx={{
              borderRadius: 3,
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
              background: "white",
            }}
          >
            <CardContent sx={{ p: 4 }}>
              {/* Logo */}
              <Box sx={{ textAlign: "center", mb: 3 }}>
                <Box sx={{ fontSize: "3rem", mb: 1 }}>🔑</Box>
              </Box>

              {/* Success Message */}
              {success && (
                <Alert severity="success" sx={{ mb: 3 }}>
                  ✓ Check your email for password reset instructions! We've sent a link to reset your password.
                </Alert>
              )}

              {/* Error Message */}
              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}

              {/* Form */}
              {!success ? (
                <form onSubmit={handleSubmit}>
                  <FormInput
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your registered email"
                    fullWidth
                    sx={{ mb: 3 }}
                  />

                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                      color: "white",
                      py: 1.5,
                      fontWeight: 700,
                      fontSize: "1rem",
                      borderRadius: 2,
                      textTransform: "none",
                      mb: 2,
                      "&:hover": {
                        background: "linear-gradient(135deg, #2d8fd4 0%, #00c8d8 100%)",
                      },
                    }}
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send Reset Link"}
                  </Button>

                  <Typography variant="body2" sx={{ textAlign: "center", color: "#666", mb: 2 }}>
                    Remember your password?{" "}
                    <Link
                      href="/login"
                      sx={{
                        color: "#4facfe",
                        fontWeight: 600,
                        textDecoration: "none",
                        cursor: "pointer",
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      Back to Login
                    </Link>
                  </Typography>

                  <Typography variant="body2" sx={{ textAlign: "center", color: "#666" }}>
                    Don't have an account?{" "}
                    <Link
                      href="/register"
                      sx={{
                        color: "#4facfe",
                        fontWeight: 600,
                        textDecoration: "none",
                        cursor: "pointer",
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      Sign up here
                    </Link>
                  </Typography>
                </form>
              ) : (
                <Box sx={{ textAlign: "center" }}>
                  <Box sx={{ fontSize: "3rem", mb: 2 }}>✅</Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: "#2c3e50" }}>
                    Check Your Email
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#666", mb: 3 }}>
                    We've sent password reset instructions to your email. Please check your inbox and follow the link to reset your password.
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#999", mb: 3 }}>
                    If you don't see the email, check your spam folder.
                  </Typography>

                  <Button
                    fullWidth
                    variant="outlined"
                    sx={{
                      color: "#4facfe",
                      borderColor: "#4facfe",
                      py: 1.5,
                      fontWeight: 700,
                      fontSize: "1rem",
                      borderRadius: 2,
                      textTransform: "none",
                      mt: 3,
                      "&:hover": {
                        background: "#4facfe20",
                        borderColor: "#4facfe",
                      },
                    }}
                    onClick={() => navigate("/login")}
                  >
                    Back to Login
                  </Button>
                </Box>
              )}
            </CardContent>
          </MotionCard>

          {/* Info Box */}
          <Box
            sx={{
              mt: 4,
              p: 3,
              background: "rgba(255,255,255,0.8)",
              backdropFilter: "blur(10px)",
              borderRadius: 2,
              border: "1px solid rgba(255,255,255,0.5)",
            }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#2c3e50", mb: 1 }}>
              💡 Password Reset Tips:
            </Typography>
            <Typography variant="caption" sx={{ color: "#666", display: "block", mb: 0.5 }}>
              • Check your email (including spam) within 10 minutes
            </Typography>
            <Typography variant="caption" sx={{ color: "#666", display: "block", mb: 0.5 }}>
              • Reset links expire after 24 hours for security
            </Typography>
            <Typography variant="caption" sx={{ color: "#666", display: "block" }}>
              • Create a strong password with letters, numbers, and symbols
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
