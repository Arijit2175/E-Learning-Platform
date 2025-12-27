


import { useState, useEffect, useRef } from "react";
import { Box, Typography, IconButton, Avatar, CircularProgress, Tooltip, Button, List, ListItem, ListItemText, TextField, Paper } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import Sidebar from "../components/Sidebar";

const API_URL = "http://127.0.0.1:8000";
const emojiList = ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "😊", "😇", "🙂", "🙃", "😉", "😍", "🥰", "🤩", "🤔", "🤓", "😎", "🤖", "🎓", "📚", "💡", "🔥", "✨", "👍", "👏", "🙌"];

export default function AITutor() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [showEmojis, setShowEmojis] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    fetch(`${API_URL}/ai-tutor-chats/`)
      .then(res => res.json())
      .then(data => setChats(data));
  }, []);

  useEffect(() => {
    if (currentChatId) {
      fetch(`${API_URL}/ai-tutor-chats/${currentChatId}`)
        .then(res => res.json())
        .then(chat => setMessages(JSON.parse(chat.messages || "[]")));
    } else {
      setMessages([]);
    }
  }, [currentChatId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);
    const res = await fetch(`${API_URL}/ai-tutor/ask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });
    const data = await res.json();
    setLoading(false);

    const newMessage = { role: "user", content: question };
    const aiMessage = { role: "ai", content: data.answer };
    const updatedMessages = [...messages, newMessage, aiMessage];
    setMessages(updatedMessages);

    if (currentChatId) {
      await fetch(`${API_URL}/ai-tutor-chats/${currentChatId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: JSON.stringify(updatedMessages) }),
      });
    } else {
      const chatTitle = `Chat ${new Date().toLocaleString()}`;
      const res = await fetch(`${API_URL}/ai-tutor-chats/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ student_id: 1, chat_title: chatTitle, messages: JSON.stringify(updatedMessages) }),
      });
      const chat = await res.json();
      setCurrentChatId(chat.id);
      setChats(prev => [chat, ...prev]);
    }
    setQuestion("");
  };

  const handleDeleteChat = async (chatId) => {
    await fetch(`${API_URL}/ai-tutor-chats/${chatId}`, { method: "DELETE" });
    setChats(prev => prev.filter(c => c.id !== chatId));
    if (currentChatId === chatId) {
      setCurrentChatId(null);
      setMessages([]);
    }
  };

  const handleEmojiClick = (emoji) => {
    setQuestion((prev) => prev + emoji);
    setShowEmojis(false);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", background: "#f7f9fc" }}>
      <Sidebar />
      <Box sx={{ display: "flex", flexGrow: 1, height: "100vh" }}>
        {/* Sidebar for chat history */}
        <Box sx={{ width: 280, bgcolor: "#fff", borderRight: "1px solid #e5e7eb", p: 2, display: { xs: "none", md: "block" } }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Chats</Typography>
          <List>
            {chats.map(chat => (
              <ListItem
                key={chat.id}
                button={true}
                selected={currentChatId === chat.id}
                onClick={() => setCurrentChatId(chat.id)}
                secondaryAction={
                  <IconButton edge="end" onClick={() => handleDeleteChat(chat.id)}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText primary={chat.chat_title} />
              </ListItem>
            ))}
          </List>
          <Box sx={{ mt: 4 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>Recommendations</Typography>
            <List>
              <ListItem><ListItemText primary="Ask for summaries or explanations." /></ListItem>
              <ListItem><ListItemText primary="Try practice questions." /></ListItem>
              <ListItem><ListItemText primary="Use emojis for fun!" /></ListItem>
            </List>
          </Box>
        </Box>
        {/* Main chat area */}
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", height: "100vh", position: "relative" }}>
          <Box sx={{ flexGrow: 1, overflowY: "auto", px: { xs: 1, md: 6 }, pt: 4, pb: 10 }}>
            {messages.length === 0 ? (
              <Typography variant="body1" sx={{ color: "#94a3b8", textAlign: "center", mt: 8 }}>
                Start a conversation with your AI Tutor!
              </Typography>
            ) : (
              messages.map((msg, idx) => (
                <Box key={idx} sx={{ display: "flex", mb: 3, justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                  {msg.role === "ai" && (
                    <Avatar sx={{ bgcolor: "#ffd700", mr: 2 }}>{"🤖"}</Avatar>
                  )}
                  <Paper
                    elevation={2}
                    sx={{
                      px: 2.5,
                      py: 1.5,
                      maxWidth: "70%",
                      bgcolor: msg.role === "user" ? "#e0e7ff" : "#fff",
                      color: "#222",
                      borderRadius: msg.role === "user" ? "18px 18px 0 18px" : "18px 18px 18px 0",
                      fontSize: "1.08rem",
                      wordBreak: "break-word",
                    }}
                  >
                    {msg.content}
                  </Paper>
                  {msg.role === "user" && (
                    <Avatar sx={{ bgcolor: "#667eea", ml: 2 }}>{"👤"}</Avatar>
                  )}
                </Box>
              ))
            )}
            <div ref={chatEndRef} />
          </Box>
          {/* Chat input fixed at bottom */}
          <Box sx={{ position: "absolute", bottom: 0, left: 0, right: 0, bgcolor: "#f7f9fc", px: { xs: 1, md: 6 }, py: 2, borderTop: "1px solid #e5e7eb" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <TextField
                placeholder="Type your message..."
                value={question}
                onChange={e => setQuestion(e.target.value)}
                fullWidth
                multiline
                minRows={1}
                maxRows={4}
                InputProps={{
                  endAdornment: (
                    <Tooltip title="Add emoji">
                      <IconButton onClick={() => setShowEmojis((v) => !v)}>
                        <EmojiEmotionsIcon />
                      </IconButton>
                    </Tooltip>
                  ),
                }}
                sx={{ bgcolor: "#fff", borderRadius: 2 }}
              />
              <Button
                variant="contained"
                onClick={handleAsk}
                disabled={loading || !question.trim()}
                sx={{ minWidth: 80, height: 48, fontWeight: 600, fontSize: "1rem" }}
              >
                {loading ? <CircularProgress size={24} /> : "Send"}
              </Button>
            </Box>
            {showEmojis && (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1, mb: 1, bgcolor: "#fff", borderRadius: 2, p: 1 }}>
                {emojiList.map((emoji) => (
                  <Button key={emoji} onClick={() => handleEmojiClick(emoji)} sx={{ minWidth: 32, fontSize: 22 }}>{emoji}</Button>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}