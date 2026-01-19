import { useNavigate } from "react-router-dom";
import { useGetRecipesQuery } from "@/services/recipesApi";
import { RecipeCard } from "@/components/common/RecipeCard";


export function LandingPage(){
  const navigate = useNavigate();
  const { data: recipesData } = useGetRecipesQuery({ skip: 0, limit: 6 });

  const handleNavigate = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <div style={containerStyles}>
      {/* Hero Section */}
      <section style={heroSectionStyles}>
        <div style={heroContentStyles}>
          <h1 style={heroTitleStyles}>Welcome to RecipeApp</h1>
          <p style={heroSubtitleStyles}>
            Discover, share, and cook amazing recipes from around the world
          </p>
          <button
            style={heroButtonStyles}
            onClick={() => handleNavigate("/recipes")}
          >
            Explore Recipes
          </button>
        </div>
      </section>

      {/* Featured Recipes Section */}
      <section style={sectionStyles}>
        <h2 style={sectionTitleStyles}>Featured Recipes</h2>
        {recipesData ? (
          <div style={gridStyles}>
            {recipesData.recipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onView={() => handleNavigate(`/recipe/${recipe.id}`)}
              />
            ))}
          </div>
        ) : (
          <p>Loading recipes...</p>
        )}
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <button
            style={secondaryButtonStyles}
            onClick={() => handleNavigate("/recipes")}
          >
            View All Recipes
          </button>
        </div>
      </section>

      {/* Info Section */}
      <section style={infoSectionStyles}>
        <div style={infoColumnStyles}>
          <h3>🔍 Search & Filter</h3>
          <p>Find recipes by name, cuisine, or difficulty level</p>
        </div>
        <div style={infoColumnStyles}>
          <h3>⭐ Rate & Review</h3>
          <p>Read ratings and reviews from other users</p>
        </div>
        <div style={infoColumnStyles}>
          <h3>📝 Create & Share</h3>
          <p>Share your own recipes with the community</p>
        </div>
      </section>
    </div>
  );
}

const containerStyles: React.CSSProperties = {
  minHeight: "100vh",
};

const heroSectionStyles: React.CSSProperties = {
  backgroundColor: "#0052CC",
  color: "white",
  padding: "80px 20px",
  textAlign: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "350px",
};

const heroContentStyles: React.CSSProperties = {
  maxWidth: "600px",
};

const heroTitleStyles: React.CSSProperties = {
  fontSize: "3rem",
  fontWeight: "bold",
  marginBottom: "1rem",
};

const heroSubtitleStyles: React.CSSProperties = {
  fontSize: "1.3rem",
  marginBottom: "2rem",
  opacity: 0.95,
  lineHeight: "1.6",
};

const heroButtonStyles: React.CSSProperties = {
  padding: "12px 30px",
  fontSize: "1rem",
  backgroundColor: "white",
  color: "#0052CC",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "all 0.3s ease",
};

const sectionStyles: React.CSSProperties = {
  maxWidth: "1200px",
  margin: "4rem auto",
  padding: "0 1rem",
};

const sectionTitleStyles: React.CSSProperties = {
  fontSize: "2rem",
  color: "#333",
  marginBottom: "2rem",
  textAlign: "center",
  fontWeight: "bold",
};

const gridStyles: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
  gap: "2rem",
  marginBottom: "2rem",
};

const secondaryButtonStyles: React.CSSProperties = {
  padding: "10px 25px",
  fontSize: "1rem",
  backgroundColor: "#0052CC",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "all 0.3s ease",
};

const infoSectionStyles: React.CSSProperties = {
  backgroundColor: "#f8f9fa",
  padding: "4rem 1rem",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "2rem",
  maxWidth: "1200px",
  margin: "0 auto",
};

const infoColumnStyles: React.CSSProperties = {
  textAlign: "center",
  color: "#333",
};
