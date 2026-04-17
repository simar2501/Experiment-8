import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";

function Dashboard() {
  const [data, setData] = useState("");
  const [error, setError] = useState("");
  const [tokenDisplay, setTokenDisplay] = useState("");

  const token = sessionStorage.getItem("token");
  const username = sessionStorage.getItem("username");

  useEffect(() => {
  if (!token) {
    window.location.href = "/";
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  const fetchProtectedData = async () => {
    setError("");
    setData("");

    try {
      const res = await axios.get("http://localhost:8080/protected", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setData(res.data.message);
    } catch (err) {
      if (err.response?.status === 401) {
        setError("❌ 401 Unauthorized — Token expired or invalid.");
      } else {
        setError("❌ Something went wrong. Try again.");
      }
    }
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    window.location.href = "/";
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", backgroundColor: "#f0f2f5" }}
    >
      <Card sx={{ minWidth: 500, boxShadow: 5, borderRadius: 3 }}>
        <CardContent sx={{ padding: 4 }}>

          {/* Header */}
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            📊 Dashboard
          </Typography>

          {/* Welcome message */}
          <Typography variant="body1" color="text.secondary" mb={1}>
            Welcome, <b>{username || "User"}</b>! You are logged in.
          </Typography>

          {/* Token display */}
          <Chip
            label={"🔑 Token: " + tokenDisplay}
            color="success"
            variant="outlined"
            sx={{ mb: 2, fontSize: "11px" }}
          />

          <Divider sx={{ mb: 3 }} />

          {/* Action Buttons */}
          <div className="d-flex gap-3 mb-3">
            <Button
              variant="contained"
              color="success"
              onClick={fetchProtectedData}
              sx={{ borderRadius: 2 }}
            >
              🔓 Fetch Protected Data
            </Button>

            <Button
              variant="contained"
              color="error"
              onClick={logout}
              sx={{ borderRadius: 2 }}
            >
              🚪 Logout
            </Button>
          </div>

          {/* Success Response */}
          {data && (
            <Alert severity="success" sx={{ mt: 2 }}>
              <b>Response:</b> {data}
            </Alert>
          )}

          {/* Error Response */}
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

        </CardContent>
      </Card>
    </div>
  );
}

export default Dashboard;