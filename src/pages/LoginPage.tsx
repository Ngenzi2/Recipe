import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "@/services/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "@/features/auth/authSlice";
import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";



// Define error type for RTK Query
interface ApiError {
  data?: {
    message?: string;
  };
}

export function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await login({ username, password });
      console.log({ response });
      dispatch(setUser(response.data!));

      navigate("/dashboard");
    } catch (err) {
      // Type-safe error handling
      if (isFetchBaseQueryError(err)) {
        // Error from RTK Query
        const errorData = err.data as ApiError;
        setError(errorData?.data?.message || "Login failed. Please try again.");
      } else if (isSerializedError(err)) {
        // Serialized error
        setError(err.message || "Login failed. Please try again.");
      } else {
        // Unknown error
        setError("Login failed. Please try again.");
      }
    }
  };

  return (
    <div style={containerStyles}>
      <div style={formContainerStyles}>
        <h1 style={titleStyles}>Login</h1>
        <form onSubmit={handleSubmit}>
          {error && <div style={errorStyles}>{error}</div>}

          <div style={formGroupStyles}>
            <label style={labelStyles}>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              style={inputStyles}
              required
              disabled={isLoading}
            />
          </div>

          <div style={formGroupStyles}>
            <label style={labelStyles}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              style={inputStyles}
              required
              disabled={isLoading}
            />
          </div>

          <button type="submit" style={submitButtonStyles} disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div style={demoInfoStyles}>
          <h3>Demo Credentials:</h3>
          <p>
            Username: <strong>emilys</strong>
          </p>
          <p>
            Password: <strong>emilyspass</strong>{" "}
            {/* Fixed: dummyjson uses 'emilyspass' */}
          </p>
        </div>
      </div>
    </div>
  );
}

// Type guards for error handling
function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === "object" && error != null && "status" in error;
}

function isSerializedError(error: unknown): error is SerializedError {
  return typeof error === "object" && error != null && "message" in error;
}

const containerStyles: React.CSSProperties = {
  minHeight: "calc(100vh - 200px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#f8f9fa",
  padding: "2rem",
};

const formContainerStyles: React.CSSProperties = {
  backgroundColor: "white",
  padding: "2rem",
  borderRadius: "8px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  width: "100%",
  maxWidth: "400px",
};

const titleStyles: React.CSSProperties = {
  fontSize: "2rem",
  color: "#333",
  marginBottom: "1.5rem",
  textAlign: "center",
  fontWeight: "bold",
};

const formGroupStyles: React.CSSProperties = {
  marginBottom: "1.5rem",
};

const labelStyles: React.CSSProperties = {
  display: "block",
  marginBottom: "0.5rem",
  color: "#333",
  fontWeight: "bold",
};

const inputStyles: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem",
  fontSize: "1rem",
  border: "1px solid #ddd",
  borderRadius: "4px",
  boxSizing: "border-box",
  transition: "border-color 0.3s ease",
};

const submitButtonStyles: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem",
  fontSize: "1rem",
  backgroundColor: "#0052CC",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "all 0.3s ease",
};

const errorStyles: React.CSSProperties = {
  backgroundColor: "#fef2f2",
  color: "#dc2626",
  padding: "0.75rem",
  borderRadius: "4px",
  marginBottom: "1rem",
  textAlign: "center",
  border: "1px solid #fecaca",
};

const demoInfoStyles: React.CSSProperties = {
  marginTop: "2rem",
  padding: "1rem",
  backgroundColor: "#f0f9ff",
  borderRadius: "4px",
  fontSize: "0.9rem",
  color: "#0369a1",
  border: "1px solid #bae6fd",
};
