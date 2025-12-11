import React, { useState } from "react";
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  LinearProgress,
  Grid,
  Chip,
} from "@mui/material";
import {
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Timer as TimerIcon,
  EmojiEvents as TrophyIcon,
} from "@mui/icons-material";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useSidebar } from "../contexts/SidebarContext";
import { useFormalEducation } from "../contexts/FormalEducationContext";
import { useAuth } from "../contexts/AuthContext";
import { useParams } from "react-router-dom";

export default function QuizPage() {
  const { courseId, quizId } = useParams();
  const { isOpen } = useSidebar();
  const { user } = useAuth();
  const { getCourseById, submitQuiz, getStudentEnrollments } = useFormalEducation();

  const course = getCourseById(courseId);
  const quiz = course?.quizzes?.find((q) => q.id === quizId);
  const enrollment = getStudentEnrollments(user?.id)?.find((e) => e.courseId === courseId);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(quiz?.duration * 60 || 1800);

  if (!course || !quiz) {
    return (
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1, ml: { xs: 0, md: isOpen ? 25 : 8.75 }, mt: { xs: 6, md: 8 }, p: 4 }}>
          <Navbar />
          <Alert severity="error">Quiz not found</Alert>
        </Box>
      </Box>
    );
  }

  const questions = quiz.questions || [];
  const handleAnswerChange = (answer) => {
    setAnswers({ ...answers, [currentQuestion]: answer });
  };

  const handleSubmitQuiz = () => {
    // Calculate score
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) {
        correctCount++;
      }
    });
    const calculatedScore = Math.round((correctCount / questions.length) * 100);
    setScore(calculatedScore);

    submitQuiz(enrollment?.id, quizId, {
      answers,
      score: calculatedScore,
      submittedAt: new Date().toISOString(),
    });
    setQuizSubmitted(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const question = questions[currentQuestion];
  const answered = answers[currentQuestion] !== undefined;
  const totalAnswered = Object.keys(answers).length;

  if (quizSubmitted) {
    const passed = score >= 60;
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
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 2,
          }}
        >
          <Navbar />
          <Container maxWidth="sm">
            <Card
              sx={{
                textAlign: "center",
                borderRadius: "15px",
                p: 4,
                background: passed ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" : "#ffebee",
                color: passed ? "white" : "inherit",
              }}
            >
              {passed ? (
                <>
                  <TrophyIcon sx={{ fontSize: 80, mb: 2, color: "gold" }} />
                  <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
                    Congratulations!
                  </Typography>
                  <Typography variant="h2" sx={{ fontWeight: "bold", mb: 3, color: "gold" }}>
                    {score}%
                  </Typography>
                </>
              ) : (
                <>
                  <ErrorIcon sx={{ fontSize: 80, mb: 2, color: "#d32f2f" }} />
                  <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
                    Quiz Completed
                  </Typography>
                  <Typography variant="h2" sx={{ fontWeight: "bold", mb: 3, color: "#d32f2f" }}>
                    {score}%
                  </Typography>
                </>
              )}

              <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
                {passed
                  ? "Great job! You've passed the quiz."
                  : "Keep practicing! Review the material and try again."}
              </Typography>

              <Box sx={{ mb: 3, textAlign: "left" }}>
                <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 2 }}>
                  Quiz Results:
                </Typography>
                <Grid container spacing={2}>
                  {[
                    { label: "Total Questions", value: questions.length },
                    { label: "Correct Answers", value: Math.round((score / 100) * questions.length) },
                    { label: "Score", value: `${score}%` },
                    { label: "Pass Rate", value: passed ? "✓ Passed" : "✗ Failed" },
                  ].map((result, idx) => (
                    <Grid item xs={6} key={idx}>
                      <Card sx={{ p: 2, textAlign: "center" }}>
                        <Typography variant="caption" sx={{ opacity: 0.8 }}>
                          {result.label}
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                          {result.value}
                        </Typography>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>

              <Box sx={{ display: "flex", gap: 2 }}>
                <Button variant="outlined" fullWidth sx={{ color: "white", borderColor: "white" }}>
                  Return to Course
                </Button>
                <Button variant="contained" fullWidth sx={{ background: "white", color: "#667eea" }}>
                  View Solutions
                </Button>
              </Box>
            </Card>
          </Container>
        </Box>
      </Box>
    );
  }

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
          pb: 4,
        }}
      >
        <Navbar />

        <Container maxWidth="lg" sx={{ py: 4 }}>
          {/* Quiz Header */}
          <Card
            sx={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              mb: 4,
              borderRadius: "15px",
            }}
          >
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
                {quiz.title}
              </Typography>
              <Grid container spacing={3} sx={{ mt: 1 }}>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    Total Questions
                  </Typography>
                  <Typography variant="h6">{questions.length}</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    Time Limit
                  </Typography>
                  <Typography variant="h6">{quiz.duration || 30} min</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    Passing Score
                  </Typography>
                  <Typography variant="h6">{quiz.passingScore || 60}%</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    Progress
                  </Typography>
                  <Typography variant="h6">{totalAnswered} / {questions.length} answered</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Quiz Content */}
          <Grid container spacing={3}>
            {/* Main Question Area */}
            <Grid item xs={12} md={8}>
              <Card sx={{ borderRadius: "15px", mb: 3 }}>
                <CardContent>
                  {/* Progress Bar */}
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                      <Typography variant="subtitle2">
                        Question {currentQuestion + 1} of {questions.length}
                      </Typography>
                      <Typography variant="subtitle2" sx={{ color: answered ? "#4caf50" : "#ff9800" }}>
                        {answered ? "Answered" : "Not Answered"}
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={((currentQuestion + 1) / questions.length) * 100}
                      sx={{ height: 8, borderRadius: "5px" }}
                    />
                  </Box>

                  {/* Question */}
                  <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
                    {question.question}
                  </Typography>

                  {/* Options */}
                  <RadioGroup
                    value={answers[currentQuestion] || ""}
                    onChange={(e) => handleAnswerChange(e.target.value)}
                  >
                    {question.options?.map((option, idx) => (
                      <FormControlLabel
                        key={idx}
                        value={option}
                        control={<Radio />}
                        label={option}
                        sx={{
                          mb: 2,
                          p: 2,
                          borderRadius: "10px",
                          border: "1px solid #e0e0e0",
                          transition: "all 0.3s",
                          "&:hover": {
                            backgroundColor: "#f5f5f5",
                          },
                          ...(answers[currentQuestion] === option && {
                            backgroundColor: "#e3f2fd",
                            borderColor: "#667eea",
                          }),
                        }}
                      />
                    ))}
                  </RadioGroup>

                  {/* Navigation Buttons */}
                  <Box sx={{ display: "flex", gap: 2, mt: 4, justifyContent: "space-between" }}>
                    <Button
                      variant="outlined"
                      onClick={handlePreviousQuestion}
                      disabled={currentQuestion === 0}
                    >
                      Previous
                    </Button>
                    {currentQuestion === questions.length - 1 ? (
                      <Button
                        variant="contained"
                        onClick={handleSubmitQuiz}
                        sx={{
                          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        }}
                      >
                        Submit Quiz
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        onClick={handleNextQuestion}
                        sx={{
                          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        }}
                      >
                        Next
                      </Button>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Sidebar - Question Navigator */}
            <Grid item xs={12} md={4}>
              <Card sx={{ borderRadius: "15px", position: "sticky", top: 100 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                    Question Navigator
                  </Typography>
                  <Grid container spacing={1}>
                    {questions.map((_, idx) => (
                      <Grid item xs={3} key={idx}>
                        <Button
                          fullWidth
                          variant={currentQuestion === idx ? "contained" : "outlined"}
                          onClick={() => setCurrentQuestion(idx)}
                          sx={{
                            aspectRatio: "1",
                            borderRadius: "10px",
                            background:
                              currentQuestion === idx
                                ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                                : answers[idx]
                                ? "#e8f5e9"
                                : "white",
                            color: currentQuestion === idx ? "white" : "inherit",
                          }}
                          endIcon={
                            answers[idx] && currentQuestion !== idx ? (
                              <CheckCircleIcon sx={{ fontSize: 16 }} />
                            ) : null
                          }
                        >
                          {idx + 1}
                        </Button>
                      </Grid>
                    ))}
                  </Grid>

                  <Box sx={{ mt: 3, p: 2, backgroundColor: "#f5f5f5", borderRadius: "10px" }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1 }}>
                      Summary
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                      <CheckCircleIcon sx={{ fontSize: 18, color: "#4caf50" }} />
                      <Typography variant="caption">
                        {totalAnswered} answered
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <ErrorIcon sx={{ fontSize: 18, color: "#ff9800" }} />
                      <Typography variant="caption">
                        {questions.length - totalAnswered} unanswered
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
