import { useState } from "react";
import { signup } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography
} from "@mui/material";

export default function Signup() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(form);
    navigate("/login");
  };

  return (
    <div style={styles.center}>
      <Card sx={styles.card}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Signup
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              onChange={e => setForm({ ...form, name: e.target.value })}
            />

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
              Signup
            </Button>
          </form>

          <Typography align="center" sx={{ mt: 2 }}>
            Already have an account? <Link to="/login">Login</Link>
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
