# RecipeBook - Phase 1: Project Setup and Foundation

## Introduction

Welcome to Phase 1! Now that our backend is ready, it's time to create our Angular 20 application. In this phase, we'll set up the project foundation, create model files, configure HTTP communication, and establish our app's branding.

Think of this phase as building the foundation and frame of a house. Just like a strong foundation supports the entire building, a well-structured Angular project makes development smooth and maintainable.

---

## What You'll Learn in This Phase

- Creating an Angular 20 project with standalone components
- Understanding Angular project structure
- Creating TypeScript model interfaces
- Configuring HttpClient for API calls
- Setting up global styles and branding
- Implementing app-wide layout

---

## Prerequisites

- Node.js and npm installed (version 18 or higher)
- Angular CLI installed globally
- json-server running from Phase 0
- Basic understanding of TypeScript

---

## Step 1.1: Install Angular CLI (If Not Already Installed)

First, let's make sure you have the latest Angular CLI installed globally:

```bash
npm install -g @angular/cli@20
```

**Verification:** Check Angular CLI version:

```bash
ng version
```

You should see Angular CLI version 20.x.x

---

## Step 1.2: Create Angular Project

Navigate to a folder where you want to create your project, then run:

```bash
ng new recipe-app
```

**You'll be asked several questions. Answer them as follows:**

1. **Would you like to add Angular routing?** → Type `y` and press Enter
2. **Which stylesheet format would you like to use?** → Select `CSS` and press Enter

The CLI will create the project and install all dependencies. This may take a few minutes.

**What this creates:**
- A new folder named `recipe-app`
- Complete Angular project structure
- All necessary dependencies
- Routing configuration
- Basic app structure with standalone components

---

## Step 1.3: Navigate to Project and Understand Structure

```bash
cd recipe-app
```

Let's understand the project structure:

```
recipe-app/
│
├── src/
│   ├── app/
│   │   ├── app.component.ts      # Main app component
│   │   ├── app.component.html    # Main app template
│   │   ├── app.component.css     # Main app styles
│   │   └── app.routes.ts         # Routing configuration
│   │
│   ├── index.html                # Main HTML file
│   ├── main.ts                   # Application entry point
│   └── styles.css                # Global styles
│
├── angular.json                  # Angular configuration
├── package.json                  # Dependencies
└── tsconfig.json                 # TypeScript configuration
```

**Real-world Example:**

Think of this structure like organizing a restaurant:
- `src/app/` - The kitchen where all cooking (logic) happens
- `app.component.ts` - Head chef managing the kitchen
- `app.routes.ts` - Menu directing customers to different sections
- `styles.css` - Restaurant's decoration and ambiance

---

## Step 1.4: Create Models Folder and Files

Models define the structure of our data. Let's create a `models` folder:

```bash
# Create models folder
mkdir src/app/models

# Create model files (Windows users use 'type nul >' instead of 'touch')
touch src/app/models/user.model.ts
touch src/app/models/recipe.model.ts
```

---

## Step 1.5: Create User Model

Open `src/app/models/user.model.ts` and add:

```typescript
export interface User {
  id: number;
  username: string;
  password: string;
  fullName: string;
  email: string;
}
```

**Understanding the Model:**

- `export interface` - Makes this interface available to other files
- `User` - Name of our interface (always use PascalCase)
- Properties match exactly with our db.json structure
- All properties have specific types (number, string)

**Why use interfaces?**

Interfaces provide type safety. If you try to assign a string to `id` (which should be a number), TypeScript will show an error immediately. This prevents bugs before they happen!

---

## Step 1.6: Create Recipe Model

Open `src/app/models/recipe.model.ts` and add:

```typescript
export interface Recipe {
  id: number;
  title: string;
  description: string;
  ingredients: string;
  instructions: string;
  cookingTime: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  category: string;
  imageUrl: string;
  createdBy: string;
  createdDate: string;
  rating: number;
  isFavorite: boolean;
}
```

**Understanding Each Property:**

- `id` - Unique identifier (1, 2, 3...)
- `title` - Recipe name ("Hyderabadi Biryani")
- `description` - Brief description
- `ingredients` - List of ingredients (stored as multi-line string)
- `instructions` - Step-by-step cooking instructions
- `cookingTime` - Time in minutes (90, 30, 40...)
- `servings` - Number of people it serves (4, 6...)
- `difficulty` - "Easy", "Medium", or "Hard"
- `cuisine` - Type of cuisine ("Indian", "South Indian"...)
- `category` - "Breakfast", "Main Course", "Dessert"
- `imageUrl` - URL of recipe image
- `createdBy` - Name of person who added recipe
- `createdDate` - Date recipe was added
- `rating` - Rating out of 5 (4.5, 4.8...)
- `isFavorite` - Whether user marked it as favorite

---

## Step 1.7: Configure HttpClient in App Config

Angular 20 uses standalone components with a new configuration approach. We need to configure HttpClient in the app config.

Open `src/app/app.config.ts` and modify it:

```typescript
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient()
  ]
};
```

**What we changed:**

1. Added `provideHttpClient` import
2. Added `provideHttpClient()` to providers array

**Why this is important:**

HttpClient is Angular's built-in service for making HTTP requests. Without this configuration, we can't communicate with our json-server API.

**Real-world Example:**

Think of HttpClient as a waiter in a restaurant. Without the waiter (HttpClient), the kitchen (your app) can't communicate with the customers (backend API) to take orders or serve dishes!

---

## Step 1.8: Create Global Styles

Open `src/styles.css` and replace all content with:

```css
/* Global Reset and Base Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
  min-height: 100vh;
  color: #333;
}

/* Global Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* Global Card Styles */
.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 24px;
  margin-bottom: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}

/* Global Button Styles */
.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  text-align: center;
}

.btn-primary {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);
  color: white;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #ee5a6f 0%, #c92a3a 100%);
  transform: scale(1.05);
}

.btn-secondary {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: white;
}

.btn-secondary:hover {
  background: linear-gradient(135deg, #00f2fe 0%, #0099cc 100%);
  transform: scale(1.05);
}

.btn-success {
  background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
  color: white;
}

.btn-success:hover {
  background: linear-gradient(135deg, #27ae60 0%, #229954 100%);
  transform: scale(1.05);
}

.btn-danger {
  background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
  color: white;
}

.btn-danger:hover {
  background: linear-gradient(135deg, #c0392b 0%, #a93226 100%);
  transform: scale(1.05);
}

.btn-warning {
  background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%);
  color: white;
}

.btn-warning:hover {
  background: linear-gradient(135deg, #e67e22 0%, #d35400 100%);
  transform: scale(1.05);
}

/* Form Styles */
.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #333;
}

.form-control {
  width: 100%;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

.form-control:focus {
  outline: none;
  border-color: #ff6b6b;
}

textarea.form-control {
  resize: vertical;
  min-height: 100px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Alert Styles */
.alert {
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-weight: 500;
}

.alert-success {
  background-color: #d4edda;
  color: #155724;
  border-left: 4px solid #28a745;
}

.alert-error {
  background-color: #f8d7da;
  color: #721c24;
  border-left: 4px solid #dc3545;
}

.alert-info {
  background-color: #d1ecf1;
  color: #0c5460;
  border-left: 4px solid #17a2b8;
}

.alert-warning {
  background-color: #fff3cd;
  color: #856404;
  border-left: 4px solid #ffc107;
}

/* Badge Styles */
.badge {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
}

.badge-easy {
  background-color: #2ecc71;
  color: white;
}

.badge-medium {
  background-color: #f39c12;
  color: white;
}

.badge-hard {
  background-color: #e74c3c;
  color: white;
}

/* Utility Classes */
.text-center {
  text-align: center;
}

.mt-20 {
  margin-top: 20px;
}

.mb-20 {
  margin-bottom: 20px;
}

.flex {
  display: flex;
}

.justify-between {
  justify-content: space-between;
}

.justify-center {
  justify-content: center;
}

.align-center {
  align-items: center;
}

.gap-10 {
  gap: 10px;
}

.gap-20 {
  gap: 20px;
}

/* Grid Layout */
.grid {
  display: grid;
  gap: 20px;
}

.grid-2 {
  grid-template-columns: repeat(2, 1fr);
}

.grid-3 {
  grid-template-columns: repeat(3, 1fr);
}

.grid-4 {
  grid-template-columns: repeat(4, 1fr);
}

/* Responsive Design */
@media (max-width: 768px) {
  .grid-2,
  .grid-3,
  .grid-4 {
    grid-template-columns: 1fr;
  }
  
  .container {
    padding: 10px;
  }
}
```

**Understanding the Styles:**

1. **Global Reset** - Removes default margins and paddings
2. **Body Background** - Beautiful peachy gradient
3. **Card Component** - Reusable white cards with hover effects
4. **Button Styles** - Different colored buttons for different actions
5. **Form Styles** - Consistent form input styling
6. **Badge Styles** - For difficulty levels (Easy=Green, Medium=Yellow, Hard=Red)
7. **Utility Classes** - Quick styling classes like text-center, flex, etc.
8. **Responsive Grid** - Mobile-friendly layout

---

## Step 1.9: Update App Component HTML

Open `src/app/app.component.html` and replace all content with:

```html
<div class="app-container">
  <header class="app-header">
    <div class="container">
      <div class="header-content">
        <h1 class="app-title">🍳 RecipeBook</h1>
        <p class="app-subtitle">Your Digital Recipe Collection</p>
      </div>
    </div>
  </header>

  <main class="app-main">
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  </main>

  <footer class="app-footer">
    <div class="container">
      <p>© 2025 RecipeBook - Created by Meera Krishnan | Pune, India</p>
    </div>
  </footer>
</div>
```

**Understanding the Template:**

- `<header>` - Top section with app name and tagline
- `<router-outlet>` - Placeholder where routed components will appear
- `<footer>` - Bottom section with copyright info

**Real-world Example:**

Think of `<router-outlet>` as a TV screen. The header and footer are like the TV frame (always visible), while the screen shows different channels (components) based on what you select!

---

## Step 1.10: Add App Component Styles

Open `src/app/app.component.css` and add:

```css
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);
  color: white;
  padding: 30px 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.header-content {
  text-align: center;
}

.app-title {
  font-size: 48px;
  font-weight: 700;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.app-subtitle {
  font-size: 18px;
  margin: 10px 0 0 0;
  opacity: 0.95;
  font-weight: 300;
}

.app-main {
  flex: 1;
  padding: 40px 0;
}

.app-footer {
  background-color: #2c3e50;
  color: white;
  padding: 20px 0;
  text-align: center;
  margin-top: auto;
}

.app-footer p {
  margin: 0;
  font-size: 14px;
}
```

**Styling Breakdown:**

- **Header** - Red/orange gradient matching our theme
- **Title** - Large, bold, with text shadow for depth
- **Main** - Flexible section that grows to fill available space
- **Footer** - Dark background, always at bottom

---

## Step 1.11: Test the Application

Let's run the application and see our foundation:

```bash
ng serve
```

**What this does:**
- Compiles the Angular application
- Starts a development server
- Watches for file changes
- Automatically reloads browser when you save changes

You should see output like:

```
** Angular Live Development Server is listening on localhost:4200 **
✔ Compiled successfully.
```

**Open your browser and navigate to:** http://localhost:4200

**You should see:**
- Red gradient header with "🍳 RecipeBook" title
- "Your Digital Recipe Collection" subtitle
- Peachy gradient background
- Footer with copyright information

---

## Verification Checklist

Before moving to Phase 2, verify:

- [ ] Angular project created successfully
- [ ] `models` folder exists with `user.model.ts` and `recipe.model.ts`
- [ ] HttpClient is configured in `app.config.ts`
- [ ] Global styles are applied in `styles.css`
- [ ] App component shows RecipeBook header and footer
- [ ] Application runs without errors on http://localhost:4200
- [ ] Browser console shows no errors (Press F12 to check)

---

## Common Issues and Troubleshooting

### Issue 1: Port 4200 Already in Use

**Error:** `Port 4200 is already in use`

**Solution:** Use a different port:

```bash
ng serve --port 4201
```

### Issue 2: Module Not Found Errors

**Error:** `Cannot find module '@angular/...'`

**Solution:** Reinstall dependencies:

```bash
npm install
```

### Issue 3: Styles Not Showing

**Problem:** App looks plain, no colors or gradients

**Solution:** 
1. Make sure you saved `styles.css`
2. Hard refresh browser (Ctrl + Shift + R)
3. Check browser console for CSS errors

---

## Project Structure Overview

After completing Phase 1, your project structure should look like:

```
recipe-app/
│
├── src/
│   ├── app/
│   │   ├── models/
│   │   │   ├── user.model.ts       ✅ User interface
│   │   │   └── recipe.model.ts     ✅ Recipe interface
│   │   │
│   │   ├── app.component.ts        ✅ Updated with imports
│   │   ├── app.component.html      ✅ Header, router, footer
│   │   ├── app.component.css       ✅ App-specific styles
│   │   ├── app.config.ts           ✅ HttpClient configured
│   │   └── app.routes.ts           ⏳ Will configure in later phases
│   │
│   └── styles.css                  ✅ Global styles added
│
└── (other configuration files)
```

---

## What's Next?

In **Phase 2**, we'll:
- Create the Authentication Service
- Implement login logic with API calls
- Store logged-in user information
- Create guards for protected routes

---

## Key Takeaways

1. **Angular CLI** automates project creation with best practices
2. **Models (interfaces)** provide type safety and code documentation
3. **HttpClient** is configured in app config for API communication
4. **Global styles** create consistent look across the application
5. **Component structure** separates concerns (TS, HTML, CSS)
6. **Router outlet** allows dynamic component loading

---

## Practice Exercise

**Challenge:** Create a new model called `review.model.ts` in the models folder with these properties:
- id (number)
- recipeId (number)
- userName (string)
- rating (number)
- comment (string)
- reviewDate (string)

**Solution:**

```typescript
export interface Review {
  id: number;
  recipeId: number;
  userName: string;
  rating: number;
  comment: string;
  reviewDate: string;
}
```

---

## Fun Fact

Did you know that the cooking pot emoji (🍳) we used in our title is actually a "frying pan" emoji? In many cultures, the frying pan represents home cooking and comfort food - just like our RecipeBook app represents comfort in organizing your favorite recipes!

The peachy gradient background we chose (`#ffecd2` to `#fcb69f`) is inspired by the warm colors of Indian spices like turmeric and paprika!

---

**Excellent work completing Phase 1!** Your Angular foundation is solid. The application structure is in place, models are defined, and the app looks beautiful with RecipeBook branding. Keep both terminals running (json-server and ng serve) and proceed to Phase 2!
