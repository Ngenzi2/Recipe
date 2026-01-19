# Recipe Application - Complete Setup

## Project Overview

A modern React application built with Vite that includes a landing page, recipe browsing with search/filter/sort functionality, user authentication, and a dashboard for CRUD operations on recipes.

## Features Implemented

### 1. **Landing Page**

- **Hero Section**: Eye-catching banner with call-to-action button
- **Featured Recipes**: Display of 6 featured recipes from the API
- **Info Section**: Quick overview of app features
- Location: `src/pages/LandingPage.tsx`

### 2. **Recipes Page**

- **Search Functionality**: Search recipes by name
- **Pagination**: Navigate through recipes (12 per page)
- **Sorting**:
  - Sort by: Name, Cuisine, Difficulty, Rating
  - Order: Ascending or Descending
  - Uses API parameters: `sortBy` and `order`
- **Responsive Grid Layout**: Auto-fill grid based on screen size
- Location: `src/pages/RecipesPage.tsx`

### 3. **Authentication**

- **Login Page**: Username/password authentication
- **Demo Credentials**:
  - Username: `emilys`
  - Password: `emilypass`
- **User Profile**: Fetch and display logged-in user info via `/auth/me` endpoint
- **Session Persistence**: User data stored in localStorage
- Location: `src/pages/LoginPage.tsx`

### 4. **Dashboard (CRUD Operations)**

- **User Profile Section**: Display logged-in user info with avatar
- **My Recipes**: Show recipes created by the current user
- **Create Recipe**: Form to add new recipes with:
  - Recipe name, cuisine, prep/cook time
  - Servings, difficulty level, calories
  - Image URL, ingredients, instructions, tags
- **Update Recipe**: Edit existing recipes
- **Delete Recipe**: Remove recipes with confirmation
- **Protected Route**: Only accessible to authenticated users
- Location: `src/pages/Dashboard.tsx`

## Project Structure

```
src/
├── components/
│   └── common/
│       ├── Layout.tsx          # Navbar and Footer components
│       └── RecipeCard.tsx       # Reusable recipe card component
├── features/
│   └── auth/
│       └── authSlice.ts        # Redux slice for auth state
├── pages/
│   ├── LandingPage.tsx
│   ├── RecipesPage.tsx
│   ├── LoginPage.tsx
│   └── Dashboard.tsx
├── services/
│   ├── authApi.ts             # RTK Query API for authentication
│   └── recipesApi.ts          # RTK Query API for recipes
├── store/
│   └── index.ts               # Redux store configuration
├── types/
│   └── index.ts               # TypeScript type definitions
├── utils/
│── App.tsx
├── main.tsx
├── index.css
└── App.css
```

## Technology Stack

- **React 19.2**: UI framework
- **Vite 7.3**: Build tool and dev server
- **Redux Toolkit**: State management
- **RTK Query**: API data fetching and caching
- **TypeScript**: Type safety
- **CSS**: Inline styles for components

## API Integration

### Using RTK Query

All API calls are made through RTK Query:

1. **Recipes API** (`src/services/recipesApi.ts`)
   - Base URL: `https://dummyjson.com`
   - Endpoints:
     - `GET /recipes` - Fetch recipes with pagination, search, sort, order
     - `GET /recipes/{id}` - Fetch single recipe
     - `POST /recipes/add` - Create new recipe
     - `PUT /recipes/{id}` - Update recipe
     - `DELETE /recipes/{id}` - Delete recipe

2. **Auth API** (`src/services/authApi.ts`)
   - Base URL: `https://dummyjson.com`
   - Endpoints:
     - `POST /auth/login` - Login with credentials
     - `GET /auth/me` - Fetch logged-in user profile

### Authorization

- Access token from login is automatically included in headers
- Token stored in Redux state and localStorage

## Path Aliases

Configured to use `@/` for imports:

```typescript
// Instead of:
import { store } from "../../../store";

// Use:
import { store } from "@/store";
```

Configured in:

- `vite.config.ts`: Path resolution
- `tsconfig.app.json`: TypeScript path mapping

## Running the Application

```bash
# Install dependencies
npm install

# Development server
npm run dev
# Server runs on http://localhost:5174

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm lint
```

## Component Hierarchy

```
App (main router)
├── Navbar (navigation)
├── Page Component (based on current route)
│   ├── LandingPage
│   ├── RecipesPage
│   ├── LoginPage
│   └── Dashboard
│       ├── RecipeCard (for each recipe)
│       └── Create/Edit Recipe Form
└── Footer
```

## State Management (Redux)

### Auth State

```typescript
{
  auth: {
    user: LoginResponse | null,
    isAuthenticated: boolean
  }
}
```

### API State (RTK Query)

- `recipesApi`: Caches recipe data
- `authApi`: Caches auth data

## Styling Approach

- **Inline styles**: All components use inline CSS-in-JS for styling
- **Responsive design**: Using CSS Grid and Flexbox
- **Color scheme**: Modern blue/gray palette
- **Consistent spacing**: 1rem base unit

## Authentication Flow

1. User navigates to `/login`
2. Enters credentials
3. API returns access token and user data
4. Token stored in Redux and localStorage
5. User redirected to dashboard
6. Token included in subsequent API requests

## Features by Page

### Landing Page

- ✅ Hero section with branding
- ✅ Featured recipes showcase
- ✅ Feature highlights section
- ✅ Call-to-action buttons

### Recipes Page

- ✅ Search recipes in real-time
- ✅ Sort by multiple fields
- ✅ Order ascending/descending
- ✅ Paginate through results
- ✅ Recipe cards with ratings
- ✅ Click to view details

### Dashboard

- ✅ User profile display
- ✅ Create recipes
- ✅ Edit own recipes
- ✅ Delete own recipes
- ✅ Protected route (auth required)
- ✅ Form validation
- ✅ Success/error handling

## Error Handling

- Login failures display error messages
- API errors logged to console
- Protected routes redirect to login
- Missing images fallback to placeholder
- Form validation on submission

## Future Enhancements

- Add recipe detail page
- Implement favorites/bookmarks
- Add ratings and reviews
- Recipe difficulty filter
- Advanced search with multiple filters
- User profile customization
- Social sharing features
- Mobile app version
