#  RecipeApp

A modern, full-featured recipe management application built with React, TypeScript, and Redux. Discover, create, and share recipes with a beautiful and intuitive interface.

**Live Demo:** https://recipemangement.netlify.app/

---

##  Features

### User Authentication

- **Secure Login/Logout**: User authentication with JWT tokens
- **Persistent Sessions**: User data is stored securely using Redux
- **Role-Based Access**: Protected dashboard for authenticated users only
- **Demo Credentials**: Easy testing with pre-configured demo accounts

### Recipe Discovery

- **Browse Recipes**: Explore thousands of recipes with detailed information
- **Advanced Search**: Find recipes by name, cuisine, or difficulty level
- **Sorting & Filtering**: Sort by name, cuisine, difficulty, or rating
- **Pagination**: Smooth browsing through recipe collections
- **Recipe Details**: View comprehensive recipe information including ingredients, instructions, prep time, cook time, and nutritional info

### Recipe Management (Dashboard)

- **Create Recipes**: Add new recipes with detailed information
- **Edit Recipes**: Update existing recipes you've created
- **Delete Recipes**: Remove recipes from your collection
- **My Recipes**: View all recipes you've created in one place
- **Real-time Updates**: See changes immediately without page refresh

### User Experience

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, intuitive interface with smooth interactions
- **Real-time Data Sync**: Automatic cache invalidation for instant updates
- **Protected Routes**: Secure navigation with automatic redirects for unauthenticated users
- **Fast Performance**: Optimized with Vite for lightning-fast load times

---

##  Technologies Used

### Frontend

- **React 19.2.0** - Modern UI library with latest features
- **TypeScript 5.9** - Type-safe JavaScript for better code quality
- **Vite 7.2** - Lightning-fast build tool and dev server
- **React Router DOM 6.28** - Client-side routing and navigation
- **Redux Toolkit 2.0** - State management with modern patterns

### State Management & API

- **Redux Toolkit** - Simplified Redux implementation
- **RTK Query** - Powerful data fetching and caching library
- **React-Redux 9.1** - Official React bindings for Redux

### Styling

- **CSS-in-JS** - Inline styles with TypeScript support for component styling

### Development Tools

- **ESLint** - Code quality and consistency
- **TypeScript** - Type checking and better developer experience
- **Babel React Compiler** - Fast Refresh for development

### Backend/API

- **DummyJSON API** - Mock API for recipes and authentication

---

##
### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Recipe
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

### Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint for code quality
npm run lint
```

### Project Structure

```
Recipe/
├── src/
│   ├── pages/              # Page components
│   │   ├── LandingPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── Dashboard.tsx
│   │   └── RecipesPage.tsx
│   ├── components/         # Reusable components
│   │   └── common/
│   │       ├── Layout.tsx  # Navbar & Footer
│   │       └── RecipeCard.tsx
│   ├── features/           # Redux features
│   │   └── auth/
│   │       └── authSlice.ts
│   ├── services/           # API services (RTK Query)
│   │   ├── authApi.ts
│   │   └── recipesApi.ts
│   ├── store/              # Redux store configuration
│   ├── types/              # TypeScript type definitions
│   └── utils/              # Helper utilities
├── public/                 # Static assets
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
├── eslint.config.js        # ESLint configuration
└── package.json            # Project dependencies
```

---

##  Security Features

- **Protected Routes**: Dashboard accessible only to authenticated users
- **Automatic Redirects**: Unauthenticated users are redirected to login
- **Secure Token Storage**: JWT tokens stored in Redux state
- **Cache Invalidation**: Automatic data refresh after mutations
- **Type Safety**: Full TypeScript coverage for reduced runtime errors

---

##  Deployment

The application is deployed on **Netlify** and automatically builds from the main branch.

**Live URL:** https://recipemangement.netlify.app/

### Build Configuration

- Build Command: `npm run build`
- Build Directory: `dist`
- Runtime: Node.js

---

##  Demo Credentials

Test the app with these demo credentials:

- **Username**: `emilys`
- **Password**: `emilyspass`

---

##  Key Implementation Highlights

### React Router Integration

- Client-side routing with React Router v6
- Protected route component for authentication checks
- Automatic redirects for unauthorized access

### State Management

- Redux Toolkit for global state
- RTK Query for API caching and synchronization
- Real-time updates with automatic cache invalidation

### API Integration

- RTK Query for optimized data fetching
- Automatic refetch after mutations
- Cache control headers for fresh data
- Type-safe API calls with TypeScript

### Performance

- Code splitting with Vite
- Fast Refresh for development
- Optimized bundle size
- Efficient re-rendering with React memoization

---

##  Troubleshooting

### Port Already in Use

If port 5173 is already in use, Vite will automatically use the next available port.

### Login Issues

Ensure you're using the correct demo credentials: `emilys` / `emilyspass`

### Recipe Not Showing

Try refreshing the page or checking browser console for API errors.

---

##  Support

For issues or questions, please create an issue in the repository.

---

##  License

This project is open source and available under the MIT License.

---

##  Acknowledgments

- [DummyJSON](https://dummyjson.com/) for the mock API
- [React](https://react.dev/) team for the amazing framework
- [Vite](https://vitejs.dev/) for the incredible build tool
- [Redux](https://redux.js.org/) for state management
