import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetMeQuery } from "@/services/authApi";
import {
  useGetRecipesQuery,
  useCreateRecipeMutation,
  useUpdateRecipeMutation,
  useDeleteRecipeMutation,
} from "@/services/recipesApi";
import { RecipeCard } from "@/components/common/RecipeCard";
import type { RootState } from "@/store";
import type { Recipe, CreateRecipeRequest } from "@/types";

export function Dashboard() {
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth);
  const [showForm, setShowForm] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [formData, setFormData] = useState<CreateRecipeRequest>({
    name: "",
    ingredients: [],
    instructions: [],
    prepTimeMinutes: 0,
    cookTimeMinutes: 0,
    servings: 1,
    difficulty: "easy",
    cuisine: "",
    caloriesPerServing: 0,
    tags: [],
    image: "",
  });

  const { data: userData } = useGetMeQuery();
  const { data: recipesData, refetch: refetchRecipes } = useGetRecipesQuery({
    skip: 0,
    limit: 100,
  });
  const [createRecipe] = useCreateRecipeMutation();
  const [updateRecipe] = useUpdateRecipeMutation();
  const [deleteRecipe] = useDeleteRecipeMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingRecipe) {
        await updateRecipe({
          id: editingRecipe.id,
          ...formData,
        }).unwrap();
      } else {
        await createRecipe(formData).unwrap();
      }
      // Refetch recipes to ensure the new recipe appears in the list
      await refetchRecipes();
      resetForm();
    } catch (error) {
      console.error("Error saving recipe:", error);
    }
  };

  const handleEdit = (recipe: Recipe) => {
    setEditingRecipe(recipe);
    setFormData({
      name: recipe.name,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      prepTimeMinutes: recipe.prepTimeMinutes,
      cookTimeMinutes: recipe.cookTimeMinutes,
      servings: recipe.servings,
      difficulty: recipe.difficulty,
      cuisine: recipe.cuisine,
      caloriesPerServing: recipe.caloriesPerServing,
      tags: recipe.tags,
      image: recipe.image,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this recipe?")) {
      try {
        await deleteRecipe(id).unwrap();
        // Refetch recipes to ensure the deleted recipe is removed from the list
        await refetchRecipes();
      } catch (error) {
        console.error("Error deleting recipe:", error);
      }
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingRecipe(null);
    setFormData({
      name: "",
      ingredients: [],
      instructions: [],
      prepTimeMinutes: 0,
      cookTimeMinutes: 0,
      servings: 1,
      difficulty: "easy",
      cuisine: "",
      caloriesPerServing: 0,
      tags: [],
      image: "",
    });
  };

  if (!auth.isAuthenticated) {
    return (
      <div style={containerStyles}>
        <div style={messageBoxStyles}>
          <h2>Access Denied</h2>
          <p>Please log in to access the dashboard.</p>
          <button style={buttonStyles} onClick={() => navigate("/login")}>
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyles}>
      <div style={contentStyles}>
        {/* User Profile Section */}
        <section style={profileSectionStyles}>
          <h1 style={titleStyles}>Dashboard</h1>
          {userData && (
            <div style={userInfoStyles}>
              <img
                src={userData.image}
                alt={userData.firstName}
                style={avatarStyles}
              />
              <div>
                <h2>
                  {userData.firstName} {userData.lastName}
                </h2>
                <p>{userData.email}</p>
              </div>
            </div>
          )}
        </section>

        {/* My Recipes Section */}
        <section style={sectionStyles}>
          <div style={sectionHeaderStyles}>
            <h2>My Recipes ({recipesData?.recipes.length})</h2>
            <button
              style={createButtonStyles}
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? "✕ Cancel" : "+ Create Recipe"}
            </button>
          </div>

          {showForm && (
            <form style={formStyles} onSubmit={handleSubmit}>
              <h3>{editingRecipe ? "Edit Recipe" : "Create New Recipe"}</h3>

              <div style={formRowStyles}>
                <div style={formGroupStyles}>
                  <label style={labelStyles}>Recipe Name*</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    style={inputStyles}
                    required
                  />
                </div>
                <div style={formGroupStyles}>
                  <label style={labelStyles}>Cuisine*</label>
                  <input
                    type="text"
                    value={formData.cuisine}
                    onChange={(e) =>
                      setFormData({ ...formData, cuisine: e.target.value })
                    }
                    style={inputStyles}
                    required
                  />
                </div>
              </div>

              <div style={formRowStyles}>
                <div style={formGroupStyles}>
                  <label style={labelStyles}>Prep Time (min)</label>
                  <input
                    type="number"
                    value={formData.prepTimeMinutes}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        prepTimeMinutes: parseInt(e.target.value) || 0,
                      })
                    }
                    style={inputStyles}
                  />
                </div>
                <div style={formGroupStyles}>
                  <label style={labelStyles}>Cook Time (min)</label>
                  <input
                    type="number"
                    value={formData.cookTimeMinutes}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        cookTimeMinutes: parseInt(e.target.value) || 0,
                      })
                    }
                    style={inputStyles}
                  />
                </div>
                <div style={formGroupStyles}>
                  <label style={labelStyles}>Servings</label>
                  <input
                    type="number"
                    value={formData.servings}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        servings: parseInt(e.target.value) || 1,
                      })
                    }
                    style={inputStyles}
                  />
                </div>
              </div>

              <div style={formRowStyles}>
                <div style={formGroupStyles}>
                  <label style={labelStyles}>Difficulty</label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) =>
                      setFormData({ ...formData, difficulty: e.target.value })
                    }
                    style={inputStyles}
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
                <div style={formGroupStyles}>
                  <label style={labelStyles}>Calories per Serving</label>
                  <input
                    type="number"
                    value={formData.caloriesPerServing}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        caloriesPerServing: parseInt(e.target.value) || 0,
                      })
                    }
                    style={inputStyles}
                  />
                </div>
              </div>

              <div style={formGroupStyles}>
                <label style={labelStyles}>Image URL</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  style={inputStyles}
                />
              </div>

              <div style={formGroupStyles}>
                <label style={labelStyles}>Ingredients (comma separated)</label>
                <textarea
                  value={formData.ingredients.join(", ")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      ingredients: e.target.value
                        .split(",")
                        .map((i) => i.trim()),
                    })
                  }
                  style={textareaStyles}
                  rows={3}
                />
              </div>

              <div style={formGroupStyles}>
                <label style={labelStyles}>
                  Instructions (comma separated)
                </label>
                <textarea
                  value={formData.instructions.join(", ")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      instructions: e.target.value
                        .split(",")
                        .map((i) => i.trim()),
                    })
                  }
                  style={textareaStyles}
                  rows={3}
                />
              </div>

              <div style={formGroupStyles}>
                <label style={labelStyles}>Tags (comma separated)</label>
                <input
                  type="text"
                  value={formData.tags.join(", ")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tags: e.target.value.split(",").map((t) => t.trim()),
                    })
                  }
                  style={inputStyles}
                />
              </div>

              <div style={formActionsStyles}>
                <button type="submit" style={submitButtonStyles}>
                  {editingRecipe ? "Update Recipe" : "Create Recipe"}
                </button>
                <button
                  type="button"
                  style={cancelButtonStyles}
                  onClick={resetForm}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {recipesData &&
          recipesData.recipes &&
          recipesData.recipes.length > 0 ? (
            <div style={gridStyles}>
              {recipesData.recipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onEdit={() => handleEdit(recipe)}
                  onDelete={() => handleDelete(recipe.id)}
                  showActions={true}
                />
              ))}
            </div>
          ) : (
            <p style={emptyMessageStyles}>
              You haven't created any recipes yet.{" "}
              <button
                style={linkButtonStyles}
                onClick={() => setShowForm(true)}
              >
                Create one now!
              </button>
            </p>
          )}
        </section>
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

const profileSectionStyles: React.CSSProperties = {
  backgroundColor: "white",
  padding: "2rem",
  borderRadius: "8px",
  marginBottom: "2rem",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
};

const titleStyles: React.CSSProperties = {
  fontSize: "2.5rem",
  color: "#333",
  marginBottom: "1.5rem",
  fontWeight: "bold",
};

const userInfoStyles: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "1.5rem",
};

const avatarStyles: React.CSSProperties = {
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  objectFit: "cover",
  border: "2px solid #0052CC",
};

const sectionStyles: React.CSSProperties = {
  backgroundColor: "white",
  padding: "2rem",
  borderRadius: "8px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
};

const sectionHeaderStyles: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "2rem",
  borderBottom: "1px solid #eee",
  paddingBottom: "1rem",
};

const createButtonStyles: React.CSSProperties = {
  padding: "0.75rem 1.5rem",
  backgroundColor: "#0052CC",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "all 0.3s ease",
};

const formStyles: React.CSSProperties = {
  backgroundColor: "#f0f0f0",
  padding: "1.5rem",
  borderRadius: "8px",
  marginBottom: "2rem",
};

const formRowStyles: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "1rem",
  marginBottom: "1rem",
};

const formGroupStyles: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
};

const labelStyles: React.CSSProperties = {
  marginBottom: "0.5rem",
  color: "#333",
  fontWeight: "bold",
};

const inputStyles: React.CSSProperties = {
  padding: "0.75rem",
  fontSize: "1rem",
  border: "1px solid #ddd",
  borderRadius: "4px",
};

const textareaStyles: React.CSSProperties = {
  padding: "0.75rem",
  fontSize: "1rem",
  border: "1px solid #ddd",
  borderRadius: "4px",
  fontFamily: "inherit",
};

const formActionsStyles: React.CSSProperties = {
  display: "flex",
  gap: "1rem",
  marginTop: "1rem",
};

const submitButtonStyles: React.CSSProperties = {
  flex: 1,
  padding: "0.75rem",
  backgroundColor: "#0052CC",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "1rem",
  transition: "all 0.3s ease",
};

const cancelButtonStyles: React.CSSProperties = {
  flex: 1,
  padding: "0.75rem",
  backgroundColor: "#ccc",
  color: "#333",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "1rem",
  transition: "all 0.3s ease",
};

const gridStyles: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
  gap: "2rem",
};

const emptyMessageStyles: React.CSSProperties = {
  textAlign: "center",
  padding: "2rem",
  color: "#666",
};

const linkButtonStyles: React.CSSProperties = {
  background: "none",
  border: "none",
  color: "#0052CC",
  cursor: "pointer",
  textDecoration: "underline",
  fontWeight: "bold",
};

const messageBoxStyles: React.CSSProperties = {
  backgroundColor: "white",
  padding: "2rem",
  borderRadius: "8px",
  textAlign: "center",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  color: "#333",
};

const buttonStyles: React.CSSProperties = {
  padding: "0.75rem 1.5rem",
  backgroundColor: "#0052CC",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "all 0.3s ease",
};
