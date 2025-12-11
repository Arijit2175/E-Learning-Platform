import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Stack,
  TextField,
  IconButton,
  Divider,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Avatar,
} from "@mui/material";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import PageHeader from "../components/PageHeader";
import { useSidebar } from "../contexts/SidebarContext";
import { useAuth } from "../contexts/AuthContext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import SendIcon from "@mui/icons-material/Send";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import CodeIcon from "@mui/icons-material/Code";
import BrushIcon from "@mui/icons-material/Brush";
import ScienceIcon from "@mui/icons-material/Science";
import PsychologyIcon from "@mui/icons-material/Psychology";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";

const DEFAULT_POSTS = [
  {
    id: "post-1",
    title: "AI prompt: turn requirements into UI wireframes in minutes",
    body: "I pair Figma+GPT. Paste the problem, ask for flow, refine prompts, export components.",
    topic: "Tech",
    type: "post",
    creator: "Maya Patel",
    creatorRole: "Mentor",
    likes: 42,
    comments: [
      { id: "c1", author: "Leo", text: "Tried this for a hackathon. Massive time saver." },
      { id: "c2", author: "Ananya", text: "Share your prompt template?" },
    ],
    saves: 12,
    createdAt: "2025-01-05T10:00:00Z",
    tags: ["AI", "UI", "productivity"],
  },
  {
    id: "post-2",
    title: "60s micro-tutorial: Flexbox mental model",
    body: "Think rows/columns as axes. justify-content aligns on main axis, align-items on cross axis. Gap beats margins.",
    topic: "Tech",
    type: "video",
    media: "shorts://flexbox",
    creator: "Samir Khan",
    creatorRole: "Student",
    likes: 31,
    comments: [],
    saves: 9,
    createdAt: "2025-01-06T08:00:00Z",
    tags: ["CSS", "layout", "quick-tip"],
  },
  {
    id: "post-3",
    title: "Daily study hack: 25/5 rule",
    body: "25 minutes deep work + 5 minute reset. Stack 3 rounds, then a longer break.",
    topic: "Daily learning tips",
    type: "note",
    creator: "Nora Lee",
    creatorRole: "Student",
    likes: 18,
    comments: [],
    saves: 6,
    createdAt: "2025-01-04T12:00:00Z",
    tags: ["productivity", "habits"],
  },
  {
    id: "post-4",
    title: "Soft-skills quick tip: disagreeing with care",
    body: "Lead with agreement, offer a why, invite them in: 'I like X. I wonder if Y helps because Z. What do you think?'",
    topic: "Soft skills",
    type: "post",
    creator: "Alex Morgan",
    creatorRole: "Mentor",
    likes: 22,
    comments: [],
    saves: 7,
    createdAt: "2025-01-03T17:00:00Z",
    tags: ["communication", "teams"],
  },
  {
    id: "post-5",
    title: "Beginner Python: list vs tuple cheat",
    body: "If you need mutate: list. Need hashable/keys: tuple. Memory-light & safe: tuple.",
    topic: "Tech",
    type: "code",
    creator: "Priya Desai",
    creatorRole: "Mentor",
    likes: 54,
    comments: [{ id: "c5", author: "Dev", text: "Great mnemonic." }],
    saves: 20,
    createdAt: "2025-01-02T09:00:00Z",
    tags: ["python", "basics", "cheatsheet"],
  },
];

const TOPICS = ["All", "Tech", "Arts", "Science", "Soft skills", "Daily learning tips"];
const SORTS = [
  { value: "recent", label: "Most recent" },
  { value: "upvotes", label: "Most upvoted" },
  { value: "comments", label: "Most commented" },
];

const topicIcon = {
  Tech: <CodeIcon fontSize="small" />,
  Arts: <BrushIcon fontSize="small" />,
  Science: <ScienceIcon fontSize="small" />,
  "Soft skills": <PsychologyIcon fontSize="small" />,
  "Daily learning tips": <TipsAndUpdatesIcon fontSize="small" />,
};

export default function InformalLearning() {
  const { isOpen } = useSidebar();
  const { user } = useAuth();

  const [posts, setPosts] = useState(() => {
    const stored = localStorage.getItem("informalPosts");
    return stored ? JSON.parse(stored) : DEFAULT_POSTS;
  });
  const [saved, setSaved] = useState(() => {
    const stored = localStorage.getItem("informalSaved");
    return stored ? JSON.parse(stored) : [];
  });
  const [followingTopics, setFollowingTopics] = useState(() => {
    const stored = localStorage.getItem("informalFollowTopics");
    return stored ? JSON.parse(stored) : ["Tech", "Daily learning tips"];
  });
  const [followingCreators, setFollowingCreators] = useState(() => {
    const stored = localStorage.getItem("informalFollowCreators");
    return stored ? JSON.parse(stored) : [];
  });
  const [filterTopic, setFilterTopic] = useState("All");
  const [sortBy, setSortBy] = useState("recent");
  const [search, setSearch] = useState("");
  const [composer, setComposer] = useState({ title: "", body: "", topic: "Tech", type: "post" });
  const [commentDraft, setCommentDraft] = useState({});

  useEffect(() => {
    localStorage.setItem("informalPosts", JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem("informalSaved", JSON.stringify(saved));
  }, [saved]);

  useEffect(() => {
    localStorage.setItem("informalFollowTopics", JSON.stringify(followingTopics));
  }, [followingTopics]);

  useEffect(() => {
    localStorage.setItem("informalFollowCreators", JSON.stringify(followingCreators));
  }, [followingCreators]);

  const filtered = useMemo(() => {
    let data = [...posts];
    if (filterTopic !== "All") data = data.filter((p) => p.topic === filterTopic);
    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter((p) => p.title.toLowerCase().includes(q) || p.body.toLowerCase().includes(q) || p.tags?.some((t) => t.toLowerCase().includes(q)));
    }
    data.sort((a, b) => {
      if (sortBy === "upvotes") return (b.likes || 0) - (a.likes || 0);
      if (sortBy === "comments") return (b.comments?.length || 0) - (a.comments?.length || 0);
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    return data;
  }, [posts, filterTopic, sortBy, search]);

  const trendingTopics = useMemo(() => {
    const counts = posts.reduce((acc, p) => {
      acc[p.topic] = (acc[p.topic] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4);
  }, [posts]);

  const badges = useMemo(() => {
    const contributions = posts.filter((p) => p.authorId === user?.id).length;
    const comments = Object.values(commentDraft).length;
    const likesGiven = posts.reduce((acc, p) => acc + (p.likers?.includes(user?.id) ? 1 : 0), 0);
    return [
      contributions > 0 && { label: "Contributor", icon: <FlashOnIcon fontSize="small" /> },
      likesGiven > 5 && { label: "Helper", icon: <FavoriteIcon fontSize="small" /> },
      contributions > 3 && { label: "Top Insight", icon: <WhatshotIcon fontSize="small" /> },
      comments > 3 && { label: "Community Mentor", icon: <ChatBubbleOutlineIcon fontSize="small" /> },
    ].filter(Boolean);
  }, [posts, user?.id, commentDraft]);

  const handleLike = (id) => {
    setPosts((prev) =>
      prev.map((p) => {
        const liked = p.likers?.includes(user?.id);
        const likers = liked ? p.likers.filter((x) => x !== user?.id) : [...(p.likers || []), user?.id];
        return p.id === id ? { ...p, likes: liked ? p.likes - 1 : p.likes + 1, likers } : p;
      })
    );
  };

  const handleSave = (id) => {
    setSaved((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const handleComment = (id) => {
    const text = (commentDraft[id] || "").trim();
    if (!text) return;
    const newComment = {
      id: `c-${Date.now()}`,
      author: user?.firstName || "You",
      text,
    };
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, comments: [...(p.comments || []), newComment] } : p)));
    setCommentDraft((prev) => ({ ...prev, [id]: "" }));
  };

  const handleAddPost = () => {
    if (!composer.title.trim() || !composer.body.trim()) return;
    const newPost = {
      id: `post-${Date.now()}`,
      title: composer.title,
      body: composer.body,
      topic: composer.topic,
      type: composer.type,
      creator: `${user?.firstName || "You"} ${user?.lastName || ""}`.trim(),
      creatorRole: user?.role === "teacher" ? "Mentor" : "Student",
      likes: 0,
      comments: [],
      saves: 0,
      createdAt: new Date().toISOString(),
      tags: [],
      authorId: user?.id,
    };
    setPosts((prev) => [newPost, ...prev]);
    setComposer({ title: "", body: "", topic: composer.topic, type: "post" });
  };

  const handleFollowTopic = (topic) => {
    if (followingTopics.includes(topic)) return;
    setFollowingTopics((prev) => [...prev, topic]);
  };

  const handleFollowCreator = (creator) => {
    if (!creator || followingCreators.includes(creator)) return;
    setFollowingCreators((prev) => [...prev, creator]);
  };

  const formatDate = (iso) => new Date(iso).toLocaleString();

  const aiActions = ["Summarize", "Explain simply", "Related concepts", "Make flashcards"];

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box
        sx={{
          flexGrow: 1,
          ml: { xs: 0, md: isOpen ? 25 : 8.75 },
          mt: { xs: 6, md: 8 },
          background: "linear-gradient(135deg, #f7f9fc 0%, #eef2f7 100%)",
          minHeight: "100vh",
          transition: "margin-left 0.3s ease",
          pb: 4,
        }}
      >
        <Navbar />

        <Container maxWidth="xl" sx={{ mt: 4 }}>
          <PageHeader
            title="Informal Learning"
            subtitle="A modern, free-flow feed for micro-learning, tips, and peer knowledge"
            backgroundGradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
          />

          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid item xs={12} md={8}>
              <Card sx={{ mb: 2 }}>
                <CardContent>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems={{ xs: "flex-start", sm: "center" }}>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      {TOPICS.map((t) => (
                        <Chip
                          key={t}
                          label={t}
                          icon={t !== "All" ? topicIcon[t] : undefined}
                          color={filterTopic === t ? "primary" : "default"}
                          onClick={() => setFilterTopic(t)}
                          sx={{ borderRadius: "999px" }}
                        />
                      ))}
                    </Stack>
                    <FormControl size="small" sx={{ minWidth: 160, ml: "auto" }}>
                      <InputLabel>Sort</InputLabel>
                      <Select value={sortBy} label="Sort" onChange={(e) => setSortBy(e.target.value)}>
                        {SORTS.map((s) => (
                          <MenuItem key={s.value} value={s.value}>{s.label}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Stack>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Search posts, tips, topics..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    sx={{ mt: 2 }}
                  />
                </CardContent>
              </Card>

              <Card sx={{ mb: 3, border: "1px solid #e5e7eb" }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                    Share something quick
                  </Typography>
                  <Stack spacing={2}>
                    <TextField
                      label="Title"
                      value={composer.title}
                      onChange={(e) => setComposer({ ...composer, title: e.target.value })}
                      fullWidth
                    />
                    <TextField
                      label="Your note, tip, or snippet"
                      value={composer.body}
                      onChange={(e) => setComposer({ ...composer, body: e.target.value })}
                      fullWidth
                      multiline
                      rows={3}
                    />
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                      <FormControl size="small" sx={{ minWidth: 140 }}>
                        <InputLabel>Topic</InputLabel>
                        <Select value={composer.topic} label="Topic" onChange={(e) => setComposer({ ...composer, topic: e.target.value })}>
                          {TOPICS.filter((t) => t !== "All").map((t) => (
                            <MenuItem key={t} value={t}>{t}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <FormControl size="small" sx={{ minWidth: 140 }}>
                        <InputLabel>Type</InputLabel>
                        <Select value={composer.type} label="Type" onChange={(e) => setComposer({ ...composer, type: e.target.value })}>
                          <MenuItem value="post">Post</MenuItem>
                          <MenuItem value="video">Short video</MenuItem>
                          <MenuItem value="note">Note</MenuItem>
                          <MenuItem value="code">Code snippet</MenuItem>
                        </Select>
                      </FormControl>
                      <Box sx={{ flexGrow: 1 }} />
                      <Button variant="contained" onClick={handleAddPost} startIcon={<SendIcon />}>Post</Button>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>

              <Stack spacing={2}>
                {filtered.map((post) => (
                  <Card key={post.id} sx={{ border: "1px solid #e5e7eb" }}>
                    <CardContent>
                      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
                        <Avatar sx={{ bgcolor: "#4facfe" }}>{(post.creator || "?").slice(0,1)}</Avatar>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{post.title}</Typography>
                          <Typography variant="caption" sx={{ color: "#6b7280" }}>
                            {post.creator} • {post.creatorRole} • {formatDate(post.createdAt)}
                          </Typography>
                        </Box>
                        <Chip size="small" label={post.topic} icon={topicIcon[post.topic]} />
                      </Stack>

                      <Typography variant="body2" sx={{ color: "#374151", mb: 1.5 }}>
                        {post.body}
                      </Typography>

                      {post.type === "video" && (
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "#2563eb", mb: 1 }}>
                          <PlayCircleOutlineIcon fontSize="small" />
                          <Typography variant="caption">Short video</Typography>
                        </Box>
                      )}

                      {post.type === "code" && (
                        <Box sx={{ background: "#0f172a", color: "#e2e8f0", p: 1.5, borderRadius: 1, fontSize: 13, mb: 1.5 }}>
                          {post.body}
                        </Box>
                      )}

                      {post.tags && post.tags.length > 0 && (
                        <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 1 }}>
                          {post.tags.map((t) => (
                            <Chip key={t} label={t} size="small" variant="outlined" />
                          ))}
                        </Stack>
                      )}

                      <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
                        <IconButton onClick={() => handleLike(post.id)} color={post.likers?.includes(user?.id) ? "primary" : "default"}>
                          {post.likers?.includes(user?.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                        </IconButton>
                        <Typography variant="caption">{post.likes}</Typography>

                        <IconButton onClick={() => handleSave(post.id)} color={saved.includes(post.id) ? "primary" : "default"}>
                          {saved.includes(post.id) ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                        </IconButton>
                        <Typography variant="caption">Save</Typography>

                        <IconButton>
                          <ChatBubbleOutlineIcon />
                        </IconButton>
                        <Typography variant="caption">{post.comments?.length || 0}</Typography>

                        <Box sx={{ flexGrow: 1 }} />
                        <Stack direction="row" spacing={1}>
                          {aiActions.map((a) => (
                            <Chip key={a} label={a} size="small" variant="outlined" />
                          ))}
                        </Stack>
                      </Stack>

                      <Box sx={{ mt: 1.5 }}>
                        <Stack spacing={1}>
                          {(post.comments || []).map((c) => (
                            <Box key={c.id} sx={{ background: "#f8fafc", p: 1, borderRadius: 1 }}>
                              <Typography variant="caption" sx={{ fontWeight: 700 }}>{c.author}</Typography>
                              <Typography variant="caption" sx={{ ml: 1 }}>{c.text}</Typography>
                            </Box>
                          ))}
                          <Stack direction="row" spacing={1} alignItems="center">
                            <TextField
                              size="small"
                              fullWidth
                              placeholder="Add a comment"
                              value={commentDraft[post.id] || ""}
                              onChange={(e) => setCommentDraft((prev) => ({ ...prev, [post.id]: e.target.value }))}
                            />
                            <IconButton onClick={() => handleComment(post.id)} color="primary">
                              <SendIcon fontSize="small" />
                            </IconButton>
                          </Stack>
                        </Stack>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </Grid>

            <Grid item xs={12} md={4}>
              <Stack spacing={2}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Trending topics</Typography>
                    <Stack spacing={1}>
                      {trendingTopics.map(([t, count]) => (
                        <Stack key={t} direction="row" justifyContent="space-between" alignItems="center">
                          <Stack direction="row" spacing={1} alignItems="center">
                            {topicIcon[t]}
                            <Typography variant="body2">{t}</Typography>
                          </Stack>
                          <Chip size="small" label={`${count} posts`} />
                        </Stack>
                      ))}
                    </Stack>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Following</Typography>
                    <Typography variant="caption" sx={{ color: "#6b7280" }}>Topics</Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 1 }}>
                      {followingTopics.map((t) => (
                        <Chip key={t} label={t} size="small" onClick={() => handleFollowTopic(t)} />
                      ))}
                    </Stack>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="caption" sx={{ color: "#6b7280" }}>Creators</Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      {followingCreators.length === 0 ? (
                        <Typography variant="caption" sx={{ color: "#94a3b8" }}>Follow someone from a post</Typography>
                      ) : (
                        followingCreators.map((c) => <Chip key={c} label={c} size="small" />)
                      )}
                    </Stack>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>My Library</Typography>
                    {saved.length === 0 ? (
                      <Typography variant="caption" sx={{ color: "#94a3b8" }}>Save posts to revisit later.</Typography>
                    ) : (
                      <Stack spacing={1}>
                        {saved.map((id) => {
                          const p = posts.find((x) => x.id === id);
                          if (!p) return null;
                          return (
                            <Stack key={id} direction="row" justifyContent="space-between" alignItems="center">
                              <Typography variant="body2">{p.title}</Typography>
                              <Chip label={p.topic} size="small" />
                            </Stack>
                          );
                        })}
                      </Stack>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Badges</Typography>
                    {badges.length === 0 ? (
                      <Typography variant="caption" sx={{ color: "#94a3b8" }}>Engage to earn badges.</Typography>
                    ) : (
                      <Stack direction="row" spacing={1} flexWrap="wrap">
                        {badges.map((b) => (
                          <Chip key={b.label} icon={b.icon} label={b.label} />
                        ))}
                      </Stack>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>AI Smart Companion</Typography>
                    <Typography variant="body2" sx={{ color: "#4b5563", mb: 1 }}>
                      Use quick actions on any post to summarize, simplify, or create flashcards.
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      {aiActions.map((a) => (
                        <Chip key={a} label={a} variant="outlined" />
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}