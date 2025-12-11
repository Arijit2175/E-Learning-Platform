import { Box, Card, CardContent, Container, Grid, Typography, Chip, Stack, Avatar } from "@mui/material";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import PageHeader from "../components/PageHeader";
import { useAuth } from "../contexts/AuthContext";
import { useSidebar } from "../contexts/SidebarContext";

export default function Profile() {
  const { user } = useAuth();
  const { isOpen } = useSidebar();
  const displayName = user?.name || `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "Learner";

  const detailItems = [
    { label: "Email", value: user?.email || "-" },
    { label: "Role", value: user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : "-" },
    { label: "Joined", value: user?.joinedDate ? new Date(user.joinedDate).toLocaleDateString() : "-" },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box
        sx={{
          flexGrow: 1,
          ml: { xs: 0, md: isOpen ? 25 : 8.75 },
          mt: { xs: 6, md: 8 },
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          minHeight: "100vh",
          transition: "margin-left 0.3s ease",
          pb: 4,
        }}
      >
        <Navbar />

        <Container maxWidth="md" sx={{ mt: 4 }}>
          <PageHeader
            title="Profile"
            subtitle={`You are logged in as ${displayName}`}
            backgroundGradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          />

          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center" sx={{ mb: 3 }}>
                <Avatar sx={{ bgcolor: "#667eea", width: 72, height: 72, fontSize: 28 }}>
                  {displayName?.slice(0, 1).toUpperCase() || "U"}
                </Avatar>
                <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>{displayName}</Typography>
                  <Typography variant="body2" sx={{ color: "#6b7280" }}>{user?.email}</Typography>
                  <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                    {user?.role && <Chip label={user.role} size="small" />}
                  </Stack>
                </Box>
              </Stack>

              <Grid container spacing={2}>
                {detailItems.map((item) => (
                  <Grid item xs={12} sm={6} key={item.label}>
                    <Typography variant="subtitle2" sx={{ color: "#6b7280" }}>
                      {item.label}
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {item.value}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </Box>
  );
}