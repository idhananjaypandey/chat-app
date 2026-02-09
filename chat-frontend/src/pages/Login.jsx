import { useState } from "react";
import { login } from "../api/auth";
import { useNavigate, Link } from "react-router-dom";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography
} from "@mui/material";

export default function Login() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(form);

    localStorage.setItem("token", res.token);
    localStorage.setItem("username", res.username);
    localStorage.setItem("name", res.name);

    


    navigate("/chat");
  };

  return (
    <div style={styles.center}>
      <Card sx={styles.card}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              fullWidth
              margin="normal"
              onChange={e => setForm({ ...form, username: e.target.value })}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              onChange={e => setForm({ ...form, password: e.target.value })}
            />

            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
              type="submit"
            >
              Login
            </Button>
          </form>

          <Typography align="center" sx={{ mt: 2 }}>
            New user? <Link to="/">Signup</Link>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

const styles = {
  center: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6f8"
  },
  card: {
    width: 360,
    boxShadow: 5
  }
};
