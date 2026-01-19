import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetRecipesQuery } from "@/services/recipesApi";
import { RecipeCard } from "@/components/common/RecipeCard";



export function RecipesPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [skip, setSkip] = useState(0);
  const [sortBy, setSortBy] = useState<string>("name");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const limit = 12;

  const { data: recipesData, isLoading } = useGetRecipesQuery({
    skip,
    limit,
    search,
    sortBy,
    order,
  });

  const totalPages = recipesData ? Math.ceil(recipesData.total / limit) : 0;
  const currentPage = Math.floor(skip / limit) + 1;

  const handlePreviousPage = () => {
    if (skip >= limit) {
      setSkip(skip - limit);
    }
  };

  const handleNextPage = () => {
    if (skip + limit < (recipesData?.total || 0)) {
      setSkip(skip + limit);
    }
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <div style={containerStyles}>
      <div style={contentStyles}>
        <h1 style={pageTitle}>Recipes</h1>

        {/* Search and Filter Section */}
        <div style={filterSectionStyles}>
          <div style={searchContainerStyles}>
            <input
              type="text"
              placeholder="Search recipes..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setSkip(0);
              }}
              style={searchInputStyles}
            />
          </div>

          <div style={sortContainerStyles}>
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setSkip(0);
              }}
              style={selectStyles}
            >
              <option value="name">Sort by Name</option>
              <option value="cuisine">Sort by Cuisine</option>
              <option value="difficulty">Sort by Difficulty</option>
              <option value="rating">Sort by Rating</option>
            </select>

            <select
              value={order}
              onChange={(e) => setOrder(e.target.value as "asc" | "desc")}
              style={selectStyles}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>

        {/* Recipes Grid */}
        {isLoading ? (
          <p style={{ textAlign: "center", padding: "2rem" }}>
            Loading recipes...
          </p>
        ) : recipesData && recipesData.recipes.length > 0 ? (
          <>
            <div style={gridStyles}>
              {recipesData.recipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onView={() => handleNavigate(`/recipe/${recipe.id}`)}
                />
              ))}
            </div>

            {/* Pagination */}
            <div style={paginationStyles}>
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                style={paginationButtonStyles}
              >
                ← Previous
              </button>
              <span style={pageInfoStyles}>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                style={paginationButtonStyles}
              >
                Next →
              </button>
            </div>
          </>
        ) : (
          <p style={{ textAlign: "center", padding: "2rem" }}>
            No recipes found. Try adjusting your search.
          </p>
        )}
      </div>
    </div>
  );
}

const containerStyles: React.CSSProperties = {
  minHeight: "calc(100vh - 200px)",
  backgroundColor: "#f8f9fa",
  padding: "2rem 0",
};

const contentStyles: React.CSSProperties = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "0 1rem",
};

const pageTitle: React.CSSProperties = {
  fontSize: "2.5rem",
  color: "#333",
  marginBottom: "2rem",
  fontWeight: "bold",
};

const filterSectionStyles: React.CSSProperties = {
  backgroundColor: "white",
  padding: "1.5rem",
  borderRadius: "8px",
  marginBottom: "2rem",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "1rem",
};

const searchContainerStyles: React.CSSProperties = {
  gridColumn: "span 1",
};

const searchInputStyles: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem",
  fontSize: "1rem",
  border: "1px solid #ddd",
  borderRadius: "4px",
  boxSizing: "border-box",
};

const sortContainerStyles: React.CSSProperties = {
  display: "flex",
  gap: "1rem",
  gridColumn: "auto",
};

const selectStyles: React.CSSProperties = {
  flex: 1,
  padding: "0.75rem",
  fontSize: "1rem",
  border: "1px solid #ddd",
  borderRadius: "4px",
};

const gridStyles: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
  gap: "2rem",
  marginBottom: "2rem",
};

const paginationStyles: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "1rem",
  padding: "2rem",
  backgroundColor: "white",
  borderRadius: "8px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
};

const paginationButtonStyles: React.CSSProperties = {
  padding: "0.75rem 1.5rem",
  backgroundColor: "#0052CC",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "1rem",
  fontWeight: "bold",
  transition: "all 0.3s ease",
};

const pageInfoStyles: React.CSSProperties = {
  fontWeight: "bold",
  color: "#333",
};
