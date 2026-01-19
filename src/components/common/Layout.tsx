import { useNavigate } from "react-router-dom";
import type { User } from "@/types"; // Import your User type

interface NavbarProps {
  user: User | null; // Use User type instead of any
  onLogout: () => void;

}

export function Navbar({ user, onLogout }: NavbarProps) {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <nav style={navbarStyles}>
      <div style={navContainerStyles}>
        <h1
          style={{ margin: 0, cursor: "pointer", fontSize: "1.5rem" }}
          onClick={() => handleNavigate("/")}
        >
          🍳 RecipeApp
        </h1>
        <div style={navLinksStyles}>
          <button style={navButtonStyles} onClick={() => handleNavigate("/")}>
            Home
          </button>
          <button
            style={navButtonStyles}
            onClick={() => handleNavigate("/recipes")}
          >
            Recipes
          </button>
          {user ? (
            <>
              <button
                style={navButtonStyles}
                onClick={() => handleNavigate("/dashboard")}
              >
                Dashboard
              </button>
              <span
                style={{
                  color: "white",
                  marginRight: "15px",
                  fontSize: "0.9rem",
                }}
              >
                {user.firstName}
              </span>
              <button
                style={navButtonStyles}
                onClick={() => {
                  onLogout();
                  handleNavigate("/");
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <button
              style={navButtonStyles}
              onClick={() => handleNavigate("/login")}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <footer style={footerStyles}>
      <p>&copy; {new Date().getFullYear()} RecipeApp. All rights reserved.</p>
    </footer>
  );
}

const navbarStyles: React.CSSProperties = {
  backgroundColor: "#0052CC",
  padding: "1rem 0",
  color: "white",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  position: "sticky",
  top: 0,
  zIndex: 1000,
};

const navContainerStyles: React.CSSProperties = {
  maxWidth: "1200px",
  margin: "0 auto",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 1rem",
};

const navLinksStyles: React.CSSProperties = {
  display: "flex",
  gap: "1rem",
  alignItems: "center",
};

const navButtonStyles: React.CSSProperties = {
  backgroundColor: "transparent",
  color: "white",
  border: "1px solid rgba(255,255,255,0.3)",
  padding: "0.5rem 1rem",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "0.9rem",
  fontWeight: 500,
  transition: "all 0.3s ease",
};

const footerStyles: React.CSSProperties = {
  backgroundColor: "#f8f9fa",
  color: "#333",
  textAlign: "center",
  padding: "2rem",
  marginTop: "3rem",
  borderTop: "1px solid #eaeaea",
};
