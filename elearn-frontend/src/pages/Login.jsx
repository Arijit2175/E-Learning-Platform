import { Box, Container, Button, Typography, Card, CardContent, Link, Alert } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import FormInput from "../components/FormInput";
import PageHeader from "../components/PageHeader";
import { useAuth } from "../contexts/AuthContext";
import { useState, useEffect } from "react";

const MotionCard = motion(Card);

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login, isAuthenticated } = useAuth();
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
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (email && password) {
        login(email, password);
        setLoading(false);
        navigate("/dashboard");
      } else {
        setError("Please enter valid credentials");
        setLoading(false);
      }
    }, 1000);
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
            title="Welcome Back"
            subtitle="Sign in to your account to continue learning"
            backgroundGradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
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
                <Box sx={{ fontSize: "3rem", mb: 1 }}>🔐</Box>
                <Typography variant="h6" sx={{ color: "#2c3e50", fontWeight: 700 }}>
                  Login to EduSphere
                </Typography>
              </Box>

              {/* Error Alert */}
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              {/* Form */}
              <Box component="form" onSubmit={handleSubmit}>
                <FormInput
                  label="Email Address"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <FormInput
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                {/* Remember & Forgot */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                    fontSize: "0.9rem",
                  }}
                >
                  <Typography variant="caption">
                    <input type="checkbox" id="remember" />
                    <label htmlFor="remember" style={{ marginLeft: 6 }}>
                      Remember me
                    </label>
                  </Typography>
                  <Link 
                    href="/forgot-password" 
                    sx={{ 
                      color: "#667eea", 
                      textDecoration: "none",
                      cursor: "pointer",
                      "&:hover": { textDecoration: "underline" }
                    }}
                  >
                    Forgot Password?
                  </Link>
                </Box>

                {/* Login Button */}
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    type="submit"
                    disabled={loading}
                    sx={{
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      color: "white",
                      fontWeight: 700,
                      py: 1.5,
                      borderRadius: 2,
                      mb: 2,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        boxShadow: "0 8px 24px rgba(102, 126, 234, 0.3)",
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    {loading ? "Signing in..." : "Sign In"}
                  </Button>
                </motion.div>

                {/* Signup Link */}
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="body2" sx={{ color: "#666" }}>
                    Don't have an account?{" "}
                    <Link href="/register" sx={{ color: "#667eea", fontWeight: 700 }}>
                      Sign up here
                    </Link>
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </MotionCard>

          {/* Features */}
          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Typography variant="body2" sx={{ color: "#666", mb: 2 }}>
              Need help?
            </Typography>
            <Link href="/contact" sx={{ color: "#667eea", mr: 2, textDecoration: "none" }}>
              Contact Support
            </Link>
            <Link href="/" sx={{ color: "#667eea", textDecoration: "none" }}>
              Back to Home
            </Link>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}