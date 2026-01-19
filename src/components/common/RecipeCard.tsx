import type { Recipe } from "@/types";

interface RecipeCardProps {
  recipe: Recipe;
  onView?: (recipe: Recipe) => void;
  onEdit?: (recipe: Recipe) => void;
  onDelete?: (id: number) => void;
  showActions?: boolean;
}

export function RecipeCard({
  recipe,
  onView,
  onEdit,
  onDelete,
  showActions = false,
}: RecipeCardProps) {
  return (
    <div style={cardStyles}>
      <img
        src={recipe.image}
        alt={recipe.name}
        style={imageStyles}
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            "https://via.placeholder.com/250x200?text=No+Image";
        }}
      />
      <div style={contentStyles}>
        <h3 style={{ margin: "0.5rem 0", color: "#2c3e50" }}>{recipe.name}</h3>
        <p
          style={{ margin: "0.25rem 0", color: "#7f8c8d", fontSize: "0.85rem" }}
        >
          {recipe.cuisine} • {recipe.difficulty}
        </p>
        <div style={tagsContainerStyles}>
          {recipe.tags.slice(0, 2).map((tag) => (
            <span key={tag} style={tagStyles}>
              {tag}
            </span>
          ))}
        </div>
        <div style={infoStyles}>
          <span>⏱️ {recipe.prepTimeMinutes + recipe.cookTimeMinutes} min</span>
          <span>👥 {recipe.servings} servings</span>
        </div>
        <div style={ratingStyles}>
          ⭐ {recipe.rating?.toFixed(1) || "N/A"} ({recipe.reviewCount || 0}{" "}
          reviews)
        </div>
        {showActions && (
          <div style={actionsStyles}>
            {onView && (
              <button style={actionButtonStyles} onClick={() => onView(recipe)}>
                View
              </button>
            )}
            {onEdit && (
              <button style={actionButtonStyles} onClick={() => onEdit(recipe)}>
                Edit
              </button>
            )}
            {onDelete && (
              <button
                style={{ ...actionButtonStyles, backgroundColor: "#e74c3c" }}
                onClick={() => onDelete(recipe.id)}
              >
                Delete
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const cardStyles: React.CSSProperties = {
  backgroundColor: "white",
  borderRadius: "8px",
  overflow: "hidden",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  cursor: "pointer",
  height: "100%",
};

const imageStyles: React.CSSProperties = {
  width: "100%",
  height: "200px",
  objectFit: "cover",
};

const contentStyles: React.CSSProperties = {
  padding: "1rem",
};

const tagsContainerStyles: React.CSSProperties = {
  display: "flex",
  gap: "0.25rem",
  margin: "0.5rem 0",
  flexWrap: "wrap",
};

const tagStyles: React.CSSProperties = {
  backgroundColor: "#f0f0f0",
  color: "#333",
  padding: "0.25rem 0.5rem",
  borderRadius: "4px",
  fontSize: "0.75rem",
};

const infoStyles: React.CSSProperties = {
  display: "flex",
  gap: "1rem",
  fontSize: "0.9rem",
  color: "#666",
  margin: "0.5rem 0",
};

const ratingStyles: React.CSSProperties = {
  fontSize: "0.9rem",
  color: "#0052CC",
  marginBottom: "0.5rem",
  fontWeight: "bold",
};

const actionsStyles: React.CSSProperties = {
  display: "flex",
  gap: "0.5rem",
  marginTop: "1rem",
};

const actionButtonStyles: React.CSSProperties = {
  flex: 1,
  padding: "0.5rem",
  backgroundColor: "#0052CC",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "0.85rem",
  fontWeight: "bold",
  transition: "all 0.3s ease",
};
