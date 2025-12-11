import { AppBar, Toolbar, Button, Typography } from "@mui/material";

export default function Navbar() {
  return (
    <AppBar position="sticky" elevation={0} color="transparent">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "600" }}>
          EduSphere
        </Typography>

        <Button href="/" color="inherit">Home</Button>
        <Button href="/login" color="inherit">Login</Button>
        <Button href="/register" color="inherit">Register</Button>
      </Toolbar>
    </AppBar>
  );
}
