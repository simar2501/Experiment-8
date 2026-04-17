import React, { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await axios.post("http://localhost:8080/login", {
        username,
        password,
      });

      if (res.data.token) {
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("username", username);
        window.location.href = "/dashboard";
      }
    } catch (err) {
      setError("❌ Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", backgroundColor: "#f0f2f5" }}
    >
      <Card sx={{ minWidth: 400, boxShadow: 5, borderRadius: 3 }}>
        <CardContent sx={{ padding: 4 }}>

          {/* Header */}
          <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
            🔐 Login
          </Typography>
          <Typography variant="body2" align="center" color="text.secondary" mb={3}>
            Experiment 8 — JWT Frontend
          </Typography>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {/* Username Field */}
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            margin="normal"
            onChange={(e) => setUsername(e.target.value)}
          />

          {/* Password Field */}
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Login Button */}
          <Button
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 3, borderRadius: 2, padding: "12px" }}
            onClick={login}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

          {/* Demo Credentials */}
          <Typography variant="caption" display="block" align="center" mt={2} color="text.secondary">
            Demo: username: <b>user123</b> | password: <b>password123</b>
          </Typography>

        </CardContent>
      </Card>
    </div>
  );
}

export default Login;