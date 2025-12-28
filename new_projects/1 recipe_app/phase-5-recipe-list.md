# RecipeBook - Phase 5: Recipe List Component

## Introduction

Welcome to Phase 5! This is where our app comes to life. We'll create the Recipe List Component that displays all recipes in beautiful cards, provides search and filter functionality, shows statistics, and allows users to mark recipes as favorites.

Think of this component as the main dining hall of a restaurant where all dishes are displayed on a buffet table. Customers can see everything, search for specific items, filter by cuisine type, and mark their favorites!

---

## What You'll Learn in This Phase

- Creating components with complex UI
- Displaying data in card layouts
- Implementing search functionality
- Building filter dropdowns
- Calculating statistics from data
- Handling user interactions (favorite toggle)
- Using ngFor to loop through arrays
- Conditional rendering with ngIf
- Routing to different pages

---

## Prerequisites

- Completed Phases 0-4
- Recipe Service working correctly
- json-server running with recipe data
- Understanding of component communication with services

---

## Step 5.1: Generate Recipe List Component

Open terminal and run:

```bash
ng generate component components/recipe-list
```

**What this creates:**
- `src/app/components/recipe-list/` folder
- `recipe-list.ts` - Component TypeScript file
- `recipe-list.html` - Component template
- `recipe-list.css` - Component styles

---

## Step 5.2: Implement Recipe List Component TypeScript

Open `src/app/components/recipe-list/recipe-list.ts` and replace all content with:

```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { AuthService } from '../../services/auth.service';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.css'
})
export class RecipeListComponent implements OnInit {
  // Data arrays
  recipes: Recipe[] = [];
  filteredRecipes: Recipe[] = [];
  cuisines: string[] = [];
  categories: string[] = [];

  // Filter values
  searchTerm: string = '';
  selectedCuisine: string = '';
  selectedCategory: string = '';
  selectedDifficulty: string = '';

  // Statistics
  totalRecipes: number = 0;
  favoriteCount: number = 0;
  uniqueCuisineCount: number = 0;

  // UI state
  isLoading: boolean = true;
  errorMessage: string = '';
  userName: string = '';

  constructor(
    private recipeService: RecipeService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Check if user is logged in
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    // Get logged in user's name
    this.userName = this.authService.getUserFullName();

    // Load recipes and filters
    this.loadRecipes();
    this.loadFilters();
  }

  // Load all recipes
  loadRecipes(): void {
    this.isLoading = true;
    this.recipeService.getAllRecipes().subscribe({
      next: (data) => {
        this.recipes = data;
        this.filteredRecipes = data;
        this.calculateStatistics();
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load recipes. Please try again.';
        this.isLoading = false;
        console.error('Error loading recipes:', error);
      }
    });
  }

  // Load filter options
  loadFilters(): void {
    // Load cuisines
    this.recipeService.getUniqueCuisines().subscribe({
      next: (data) => {
        this.cuisines = data;
      },
      error: (error) => {
        console.error('Error loading cuisines:', error);
      }
    });

    // Load categories
    this.recipeService.getUniqueCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (error) => {
        console.error('Error loading categories:', error);
      }
    });
  }

  // Calculate statistics
  calculateStatistics(): void {
    this.totalRecipes = this.recipes.length;
    this.favoriteCount = this.recipes.filter(r => r.isFavorite).length;
    this.uniqueCuisineCount = new Set(this.recipes.map(r => r.cuisine)).size;
  }

  // Apply all filters
  applyFilters(): void {
    this.filteredRecipes = this.recipes.filter(recipe => {
      // Search filter
      const matchesSearch = !this.searchTerm || 
        recipe.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(this.searchTerm.toLowerCase());

      // Cuisine filter
      const matchesCuisine = !this.selectedCuisine || 
        recipe.cuisine === this.selectedCuisine;

      // Category filter
      const matchesCategory = !this.selectedCategory || 
        recipe.category === this.selectedCategory;

      // Difficulty filter
      const matchesDifficulty = !this.selectedDifficulty || 
        recipe.difficulty === this.selectedDifficulty;

      return matchesSearch && matchesCuisine && matchesCategory && matchesDifficulty;
    });
  }

  // Handle search input
  onSearch(): void {
    this.applyFilters();
  }

  // Handle cuisine filter change
  onCuisineChange(): void {
    this.applyFilters();
  }

  // Handle category filter change
  onCategoryChange(): void {
    this.applyFilters();
  }

  // Handle difficulty filter change
  onDifficultyChange(): void {
    this.applyFilters();
  }

  // Clear all filters
  clearFilters(): void {
    this.searchTerm = '';
    this.selectedCuisine = '';
    this.selectedCategory = '';
    this.selectedDifficulty = '';
    this.filteredRecipes = this.recipes;
  }

  // Toggle favorite status
  toggleFavorite(recipe: Recipe): void {
    this.recipeService.toggleFavorite(recipe).subscribe({
      next: (updatedRecipe) => {
        // Update recipe in local array
        const index = this.recipes.findIndex(r => r.id === updatedRecipe.id);
        if (index !== -1) {
          this.recipes[index] = updatedRecipe;
        }
        
        // Recalculate statistics
        this.calculateStatistics();
        
        // Reapply filters to update filtered list
        this.applyFilters();
      },
      error: (error) => {
        console.error('Error toggling favorite:', error);
        alert('Failed to update favorite status. Please try again.');
      }
    });
  }

  // Navigate to view recipe
  viewRecipe(id: number): void {
    this.router.navigate(['/recipes', id]);
  }

  // Navigate to add recipe
  addNewRecipe(): void {
    this.router.navigate(['/recipes/add']);
  }

  // Logout
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // Get difficulty badge class
  getDifficultyClass(difficulty: string): string {
    switch(difficulty.toLowerCase()) {
      case 'easy': return 'badge-easy';
      case 'medium': return 'badge-medium';
      case 'hard': return 'badge-hard';
      default: return '';
    }
  }
}
```

---

## Understanding the TypeScript Code

### Section 1: Component Properties

```typescript
recipes: Recipe[] = [];
filteredRecipes: Recipe[] = [];
cuisines: string[] = [];
categories: string[] = [];
```

**Purpose:**

- `recipes` - All recipes from database (original data)
- `filteredRecipes` - Recipes after applying search/filters (displayed data)
- `cuisines` - List of unique cuisines for filter dropdown
- `categories` - List of unique categories for filter dropdown

**Why two arrays (recipes and filteredRecipes)?**

We keep the original data intact in `recipes` and show filtered results in `filteredRecipes`. This allows us to reset filters without re-fetching from server.

**Real-world Example:**

Think of a library:
- `recipes` - All books in the library
- `filteredRecipes` - Books currently on display based on filters
- You can change displays without moving books from storage

---

### Section 2: Filter Properties

```typescript
searchTerm: string = '';
selectedCuisine: string = '';
selectedCategory: string = '';
selectedDifficulty: string = '';
```

**Purpose:**

Store current filter selections. Bound to form controls using [(ngModel)].

---

### Section 3: Statistics Properties

```typescript
totalRecipes: number = 0;
favoriteCount: number = 0;
uniqueCuisineCount: number = 0;
```

**Purpose:**

Display interesting statistics to users about their recipe collection.

---

### Section 4: ngOnInit Lifecycle Hook

```typescript
ngOnInit(): void {
  if (!this.authService.isLoggedIn()) {
    this.router.navigate(['/login']);
    return;
  }

  this.userName = this.authService.getUserFullName();
  this.loadRecipes();
  this.loadFilters();
}
```

**What is ngOnInit?**

- Lifecycle hook that runs once when component is created
- Perfect place for initialization logic
- Runs after constructor

**What happens here:**

1. Check if user is logged in
2. If not logged in, redirect to login page
3. Get user's name from auth service
4. Load recipes from API
5. Load filter options (cuisines, categories)

**Real-world Example:**

Like a restaurant opening for the day:
1. Check if kitchen staff arrived (user logged in)
2. Greet the manager (get user name)
3. Prepare the buffet (load recipes)
4. Set up category labels (load filters)

---

### Section 5: Load Recipes Method

```typescript
loadRecipes(): void {
  this.isLoading = true;
  this.recipeService.getAllRecipes().subscribe({
    next: (data) => {
      this.recipes = data;
      this.filteredRecipes = data;
      this.calculateStatistics();
      this.isLoading = false;
    },
    error: (error) => {
      this.errorMessage = 'Failed to load recipes. Please try again.';
      this.isLoading = false;
      console.error('Error loading recipes:', error);
    }
  });
}
```

**Step-by-step breakdown:**

1. Set `isLoading = true` to show loading spinner
2. Call recipe service to get all recipes
3. On success:
   - Store recipes in both arrays
   - Calculate statistics
   - Hide loading spinner
4. On error:
   - Show error message
   - Hide loading spinner
   - Log error for debugging

---

### Section 6: Calculate Statistics Method

```typescript
calculateStatistics(): void {
  this.totalRecipes = this.recipes.length;
  this.favoriteCount = this.recipes.filter(r => r.isFavorite).length;
  this.uniqueCuisineCount = new Set(this.recipes.map(r => r.cuisine)).size;
}
```

**Understanding each statistic:**

**Total Recipes:**
```typescript
this.totalRecipes = this.recipes.length;
// Simply count of all recipes
```

**Favorite Count:**
```typescript
this.favoriteCount = this.recipes.filter(r => r.isFavorite).length;
// Count recipes where isFavorite is true
```

**Unique Cuisine Count:**
```typescript
this.uniqueCuisineCount = new Set(this.recipes.map(r => r.cuisine)).size;
```

Breaking this down:
1. `this.recipes.map(r => r.cuisine)` - Extract all cuisines: ["Indian", "South Indian", "Indian", "North Indian"]
2. `new Set(...)` - Remove duplicates: {"Indian", "South Indian", "North Indian"}
3. `.size` - Count unique items: 3

---

### Section 7: Apply Filters Method

```typescript
applyFilters(): void {
  this.filteredRecipes = this.recipes.filter(recipe => {
    const matchesSearch = !this.searchTerm || 
      recipe.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      recipe.description.toLowerCase().includes(this.searchTerm.toLowerCase());

    const matchesCuisine = !this.selectedCuisine || 
      recipe.cuisine === this.selectedCuisine;

    const matchesCategory = !this.selectedCategory || 
      recipe.category === this.selectedCategory;

    const matchesDifficulty = !this.selectedDifficulty || 
      recipe.difficulty === this.selectedDifficulty;

    return matchesSearch && matchesCuisine && matchesCategory && matchesDifficulty;
  });
}
```

**Understanding filter logic:**

**Search Filter:**
```typescript
const matchesSearch = !this.searchTerm || 
  recipe.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
  recipe.description.toLowerCase().includes(this.searchTerm.toLowerCase());
```

This means:
- If search term is empty (!this.searchTerm), match everything
- OR if recipe title contains search term (case-insensitive)
- OR if recipe description contains search term

**Cuisine Filter:**
```typescript
const matchesCuisine = !this.selectedCuisine || 
  recipe.cuisine === this.selectedCuisine;
```

This means:
- If no cuisine selected, match everything
- OR if recipe cuisine equals selected cuisine

**Combining filters:**
```typescript
return matchesSearch && matchesCuisine && matchesCategory && matchesDifficulty;
```

Recipe must match ALL filters (AND condition).

**Real-world Example:**

Like filtering books in a library:
- Search: "Find books with 'cooking' in title"
- Cuisine: "Show only Italian books"
- Category: "Show only dessert books"
- Difficulty: "Show only beginner books"

Book must match all criteria to be displayed.

---

### Section 8: Toggle Favorite Method

```typescript
toggleFavorite(recipe: Recipe): void {
  this.recipeService.toggleFavorite(recipe).subscribe({
    next: (updatedRecipe) => {
      const index = this.recipes.findIndex(r => r.id === updatedRecipe.id);
      if (index !== -1) {
        this.recipes[index] = updatedRecipe;
      }
      this.calculateStatistics();
      this.applyFilters();
    },
    error: (error) => {
      console.error('Error toggling favorite:', error);
      alert('Failed to update favorite status. Please try again.');
    }
  });
}
```

**What happens here:**

1. Call service to toggle favorite in database
2. Find recipe in local array using `findIndex`
3. Update local recipe with server response
4. Recalculate statistics (favorite count may change)
5. Reapply filters to update filtered list
6. If error, show alert to user

**Why update local array?**

We could reload all recipes, but that's inefficient. Instead, we update just the changed recipe locally for instant UI feedback.

---

### Section 9: Get Difficulty Class Method

```typescript
getDifficultyClass(difficulty: string): string {
  switch(difficulty.toLowerCase()) {
    case 'easy': return 'badge-easy';
    case 'medium': return 'badge-medium';
    case 'hard': return 'badge-hard';
    default: return '';
  }
}
```

**Purpose:**

Returns CSS class based on difficulty level for badge styling.

**Usage in template:**
```html
<span [class]="'badge ' + getDifficultyClass(recipe.difficulty)">
  {{ recipe.difficulty }}
</span>
```

---

## Step 5.3: Create Recipe List Component HTML

Open `src/app/components/recipe-list/recipe-list.html` and replace all content with:

```html
<div class="recipe-list-container">
  <!-- Header with user info and actions -->
  <div class="list-header">
    <div class="header-left">
      <h2>Welcome, {{ userName }}! 🍴</h2>
      <p>Explore and manage your recipe collection</p>
    </div>
    <div class="header-right">
      <button class="btn btn-primary" (click)="addNewRecipe()">
        + Add New Recipe
      </button>
      <button class="btn btn-danger" (click)="logout()">
        Logout
      </button>
    </div>
  </div>

  <!-- Statistics Cards -->
  <div class="statistics-section">
    <div class="stat-card">
      <div class="stat-icon">📚</div>
      <div class="stat-info">
        <h3>{{ totalRecipes }}</h3>
        <p>Total Recipes</p>
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-icon">❤️</div>
      <div class="stat-info">
        <h3>{{ favoriteCount }}</h3>
        <p>Favorite Recipes</p>
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-icon">🌍</div>
      <div class="stat-info">
        <h3>{{ uniqueCuisineCount }}</h3>
        <p>Unique Cuisines</p>
      </div>
    </div>
  </div>

  <!-- Search and Filters -->
  <div class="filters-section">
    <div class="search-box">
      <input
        type="text"
        class="form-control"
        [(ngModel)]="searchTerm"
        (input)="onSearch()"
        placeholder="Search recipes by title or description..."
      />
    </div>

    <div class="filter-controls">
      <select 
        class="form-control" 
        [(ngModel)]="selectedCuisine" 
        (change)="onCuisineChange()"
      >
        <option value="">All Cuisines</option>
        <option *ngFor="let cuisine of cuisines" [value]="cuisine">
          {{ cuisine }}
        </option>
      </select>

      <select 
        class="form-control" 
        [(ngModel)]="selectedCategory" 
        (change)="onCategoryChange()"
      >
        <option value="">All Categories</option>
        <option *ngFor="let category of categories" [value]="category">
          {{ category }}
        </option>
      </select>

      <select 
        class="form-control" 
        [(ngModel)]="selectedDifficulty" 
        (change)="onDifficultyChange()"
      >
        <option value="">All Difficulties</option>
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>

      <button class="btn btn-secondary" (click)="clearFilters()">
        Clear Filters
      </button>
    </div>
  </div>

  <!-- Loading Indicator -->
  <div class="loading-container" *ngIf="isLoading">
    <div class="loading-spinner"></div>
    <p>Loading delicious recipes...</p>
  </div>

  <!-- Error Message -->
  <div class="alert alert-error" *ngIf="errorMessage">
    {{ errorMessage }}
  </div>

  <!-- Recipes Grid -->
  <div class="recipes-grid" *ngIf="!isLoading && !errorMessage">
    <!-- No recipes message -->
    <div class="no-recipes" *ngIf="filteredRecipes.length === 0">
      <div class="empty-icon">🔍</div>
      <h3>No recipes found</h3>
      <p>Try adjusting your filters or add a new recipe!</p>
    </div>

    <!-- Recipe Cards -->
    <div class="recipe-card" *ngFor="let recipe of filteredRecipes">
      <!-- Recipe Image -->
      <div class="recipe-image-container">
        <img [src]="recipe.imageUrl" [alt]="recipe.title" class="recipe-image">
        <button 
          class="favorite-btn" 
          (click)="toggleFavorite(recipe)"
          [class.favorited]="recipe.isFavorite"
        >
          {{ recipe.isFavorite ? '❤️' : '🤍' }}
        </button>
      </div>

      <!-- Recipe Info -->
      <div class="recipe-info">
        <h3 class="recipe-title">{{ recipe.title }}</h3>
        <p class="recipe-description">{{ recipe.description }}</p>

        <div class="recipe-meta">
          <span class="badge" [class]="getDifficultyClass(recipe.difficulty)">
            {{ recipe.difficulty }}
          </span>
          <span class="meta-item">🌍 {{ recipe.cuisine }}</span>
          <span class="meta-item">⏱️ {{ recipe.cookingTime }} mins</span>
          <span class="meta-item">⭐ {{ recipe.rating }}</span>
        </div>

        <div class="recipe-footer">
          <span class="created-by">By {{ recipe.createdBy }}</span>
          <button class="btn btn-primary btn-sm" (click)="viewRecipe(recipe.id)">
            View Recipe
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
```

---

## Understanding the HTML Template

### Section 1: Header with User Greeting

```html
<div class="list-header">
  <div class="header-left">
    <h2>Welcome, {{ userName }}! 🍴</h2>
    <p>Explore and manage your recipe collection</p>
  </div>
  <div class="header-right">
    <button class="btn btn-primary" (click)="addNewRecipe()">
      + Add New Recipe
    </button>
    <button class="btn btn-danger" (click)="logout()">
      Logout
    </button>
  </div>
</div>
```

**Key elements:**

- `{{ userName }}` - Displays logged-in user's name
- Add Recipe button - Navigates to add recipe page
- Logout button - Logs user out and redirects to login

---

### Section 2: Statistics Dashboard

```html
<div class="stat-card">
  <div class="stat-icon">📚</div>
  <div class="stat-info">
    <h3>{{ totalRecipes }}</h3>
    <p>Total Recipes</p>
  </div>
</div>
```

**Purpose:**

Shows visual dashboard with key metrics:
- Total number of recipes
- Number of favorite recipes
- Count of unique cuisines

---

### Section 3: Search Box

```html
<input
  type="text"
  class="form-control"
  [(ngModel)]="searchTerm"
  (input)="onSearch()"
  placeholder="Search recipes by title or description..."
/>
```

**Understanding the bindings:**

- `[(ngModel)]="searchTerm"` - Two-way binding (updates as user types)
- `(input)="onSearch()"` - Calls method on every keystroke
- Result: Instant search as user types

---

### Section 4: Filter Dropdowns with ngFor

```html
<select 
  class="form-control" 
  [(ngModel)]="selectedCuisine" 
  (change)="onCuisineChange()"
>
  <option value="">All Cuisines</option>
  <option *ngFor="let cuisine of cuisines" [value]="cuisine">
    {{ cuisine }}
  </option>
</select>
```

**Understanding *ngFor:**

- `*ngFor="let cuisine of cuisines"` - Loops through cuisines array
- Creates one `<option>` for each cuisine
- `let cuisine` - Current item in loop
- `[value]="cuisine"` - Sets option value

**Example Output:**
```html
<option value="">All Cuisines</option>
<option value="Indian">Indian</option>
<option value="North Indian">North Indian</option>
<option value="South Indian">South Indian</option>
```

---

### Section 5: Conditional Loading Indicator

```html
<div class="loading-container" *ngIf="isLoading">
  <div class="loading-spinner"></div>
  <p>Loading delicious recipes...</p>
</div>
```

**When shown:**

Only when `isLoading` is `true` (during API call).

---

### Section 6: Recipe Cards Loop

```html
<div class="recipe-card" *ngFor="let recipe of filteredRecipes">
  <!-- Card content -->
</div>
```

**What happens:**

Creates one card for each recipe in `filteredRecipes` array.

---

### Section 7: Dynamic Image and Favorite Button

```html
<div class="recipe-image-container">
  <img [src]="recipe.imageUrl" [alt]="recipe.title" class="recipe-image">
  <button 
    class="favorite-btn" 
    (click)="toggleFavorite(recipe)"
    [class.favorited]="recipe.isFavorite"
  >
    {{ recipe.isFavorite ? '❤️' : '🤍' }}
  </button>
</div>
```

**Understanding the code:**

**Property binding for image:**
```html
[src]="recipe.imageUrl"
```
Dynamically sets image source from recipe data.

**Conditional class:**
```html
[class.favorited]="recipe.isFavorite"
```
Adds `favorited` class if recipe is favorite.

**Ternary operator:**
```html
{{ recipe.isFavorite ? '❤️' : '🤍' }}
```
Shows filled heart if favorite, empty heart if not.

---

### Section 8: Dynamic Badge Styling

```html
<span class="badge" [class]="getDifficultyClass(recipe.difficulty)">
  {{ recipe.difficulty }}
</span>
```

**What happens:**

1. Calls `getDifficultyClass()` method
2. Method returns 'badge-easy', 'badge-medium', or 'badge-hard'
3. Class is applied to badge
4. Badge gets colored (green, yellow, or red)

---

## Step 5.4: Add Recipe List Component Styles

Open `src/app/components/recipe-list/recipe-list.css` and add:

```css
.recipe-list-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
}

/* Header Section */
.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-left h2 {
  color: #ff6b6b;
  font-size: 32px;
  margin: 0 0 5px 0;
}

.header-left p {
  color: #666;
  margin: 0;
}

.header-right {
  display: flex;
  gap: 10px;
}

/* Statistics Section */
.statistics-section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 20px;
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-icon {
  font-size: 48px;
}

.stat-info h3 {
  font-size: 36px;
  color: #ff6b6b;
  margin: 0;
}

.stat-info p {
  color: #666;
  margin: 5px 0 0 0;
  font-size: 14px;
}

/* Filters Section */
.filters-section {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.search-box {
  margin-bottom: 20px;
}

.search-box input {
  width: 100%;
  padding: 14px;
  font-size: 16px;
}

.filter-controls {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
}

.filter-controls select {
  padding: 12px;
}

/* Loading Section */
.loading-container {
  text-align: center;
  padding: 60px 20px;
}

.loading-spinner {
  width: 60px;
  height: 60px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #ff6b6b;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-container p {
  color: #666;
  font-size: 18px;
}

/* No Recipes Message */
.no-recipes {
  text-align: center;
  padding: 80px 20px;
}

.empty-icon {
  font-size: 80px;
  margin-bottom: 20px;
}

.no-recipes h3 {
  color: #333;
  font-size: 28px;
  margin-bottom: 10px;
}

.no-recipes p {
  color: #666;
  font-size: 16px;
}

/* Recipes Grid */
.recipes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
}

/* Recipe Card */
.recipe-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.recipe-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

/* Recipe Image */
.recipe-image-container {
  position: relative;
  height: 250px;
  overflow: hidden;
}

.recipe-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.recipe-card:hover .recipe-image {
  transform: scale(1.1);
}

.favorite-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  background: white;
  border: none;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.favorite-btn:hover {
  transform: scale(1.15);
}

.favorite-btn.favorited {
  animation: heartBeat 0.3s ease;
}

@keyframes heartBeat {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

/* Recipe Info */
.recipe-info {
  padding: 20px;
}

.recipe-title {
  font-size: 22px;
  color: #333;
  margin: 0 0 10px 0;
  font-weight: 700;
}

.recipe-description {
  color: #666;
  font-size: 14px;
  line-height: 1.6;
  margin: 0 0 15px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Recipe Meta */
.recipe-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 15px;
  align-items: center;
}

.meta-item {
  font-size: 14px;
  color: #666;
}

/* Recipe Footer */
.recipe-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;
  border-top: 1px solid #eee;
}

.created-by {
  font-size: 13px;
  color: #999;
}

.btn-sm {
  padding: 8px 16px;
  font-size: 14px;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .statistics-section {
    grid-template-columns: repeat(3, 1fr);
  }

  .filter-controls {
    grid-template-columns: repeat(2, 1fr);
  }

  .recipes-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
}

@media (max-width: 768px) {
  .list-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }

  .header-right {
    width: 100%;
  }

  .header-right button {
    flex: 1;
  }

  .statistics-section {
    grid-template-columns: 1fr;
  }

  .filter-controls {
    grid-template-columns: 1fr;
  }

  .recipes-grid {
    grid-template-columns: 1fr;
  }
}
```

---

## Step 5.5: Update App Routes

Open `src/app/app.routes.ts` and update:

```typescript
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { RecipeListComponent } from './components/recipe-list/recipe-list';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'recipes', component: RecipeListComponent },
  { path: '**', redirectTo: '/login' }
];
```

---

## Testing the Recipe List Component

### Test 1: Login and View Recipes

1. Go to http://localhost:4200
2. Login with credentials:
   - Username: chef@recipes
   - Password: recipe@123
3. You should be redirected to recipe list

**You should see:**
- Welcome message with "Meera Krishnan"
- Three statistic cards showing counts
- Search box and filter dropdowns
- Five recipe cards with images

### Test 2: Test Search

1. Type "dosa" in search box
2. Should show only Masala Dosa
3. Clear search to see all recipes again

### Test 3: Test Cuisine Filter

1. Select "South Indian" from cuisine dropdown
2. Should show only Masala Dosa
3. Select "All Cuisines" to reset

### Test 4: Test Category Filter

1. Select "Dessert" from category dropdown
2. Should show only Gulab Jamun
3. Select "All Categories" to reset

### Test 5: Test Difficulty Filter

1. Select "Easy" from difficulty dropdown
2. Should show only Masala Dosa
3. Select "All Difficulties" to reset

### Test 6: Test Favorite Toggle

1. Click white heart on any recipe card
2. Heart should turn red (filled)
3. Favorite count in statistics should increase by 1
4. Click heart again to unfavorite

### Test 7: Test Multiple Filters

1. Type "indian" in search
2. Select "North Indian" cuisine
3. Select "Main Course" category
4. Should show Paneer Butter Masala and Chole Bhature

### Test 8: Test Clear Filters

1. Apply some filters
2. Click "Clear Filters" button
3. All filters should reset
4. All recipes should be visible

---

## Common Issues and Troubleshooting

### Issue 1: Recipes Not Showing

**Problem:** Empty page, no recipe cards

**Solution:**
1. Check json-server is running
2. Open http://localhost:3000/recipes in browser
3. Verify recipes exist in database
4. Check browser console (F12) for errors

### Issue 2: Images Not Loading

**Problem:** Broken image icons

**Solution:**
1. Check internet connection (images from Unsplash)
2. Verify `imageUrl` in db.json is correct
3. Try different image URLs if needed

### Issue 3: Filters Not Working

**Problem:** Filters don't change displayed recipes

**Solution:**
1. Check all filter methods are called correctly
2. Verify `(change)` events are bound
3. Check `applyFilters()` method logic

### Issue 4: Favorite Toggle Not Working

**Problem:** Heart click doesn't change status

**Solution:**
1. Verify recipe service has `toggleFavorite()` method
2. Check API endpoint responds correctly
3. Look for errors in console

---

## Verification Checklist

Before moving to Phase 6, verify:

- [ ] Recipe list displays all 5 recipes in cards
- [ ] Statistics show correct counts
- [ ] Search filters recipes as you type
- [ ] Cuisine filter works correctly
- [ ] Category filter works correctly
- [ ] Difficulty filter works correctly
- [ ] Multiple filters work together
- [ ] Clear filters resets everything
- [ ] Favorite toggle changes heart icon
- [ ] Favorite count updates when toggling
- [ ] Recipe images display correctly
- [ ] Logout button works
- [ ] No errors in console

---

## What's Next?

In **Phase 6**, we'll:
- Create the View Recipe Component
- Display full recipe details
- Show ingredients as bullet list
- Show instructions as numbered steps
- Add edit and delete buttons
- Implement navigation between pages

---

## Key Takeaways

1. **ngOnInit** is perfect for loading initial data
2. **ngFor** loops create repeated elements from arrays
3. **Two-way binding** [(ngModel)] keeps form and data in sync
4. **Filters** can be combined using AND logic
5. **Property binding** dynamically sets element properties
6. **Event binding** responds to user interactions
7. **Conditional rendering** shows/hides elements based on state
8. **Statistics** can be calculated from data arrays

---

## Practice Exercise

**Challenge:** Add a sorting feature that allows users to sort recipes by rating (highest to lowest).

**Hint:**
1. Add a sort dropdown in filters section
2. Add `sortBy` property in component
3. Create `sortRecipes()` method
4. Sort `filteredRecipes` array

**Solution:**

In `recipe-list.ts`:
```typescript
sortBy: string = '';

onSortChange(): void {
  if (this.sortBy === 'rating') {
    this.filteredRecipes.sort((a, b) => b.rating - a.rating);
  } else if (this.sortBy === 'title') {
    this.filteredRecipes.sort((a, b) => a.title.localeCompare(b.title));
  }
}
```

In `recipe-list.html`:
```html
<select class="form-control" [(ngModel)]="sortBy" (change)="onSortChange()">
  <option value="">No Sorting</option>
  <option value="rating">Sort by Rating</option>
  <option value="title">Sort by Title</option>
</select>
```

---

## Fun Fact

Did you know that the three statistics we show (Total Recipes, Favorites, Unique Cuisines) follow the "Rule of Three" in UI design? Studies show that humans can easily process and remember three items at a glance. That's why we see "Top 3" lists everywhere!

In our RecipeBook app, we used emojis for visual appeal:
- 📚 Book for total recipes (like a cookbook)
- ❤️ Heart for favorites (universal symbol of love)
- 🌍 Globe for cuisines (representing world cuisines)

These visual cues help users understand information faster - just like how Indian thali presentations use different compartments to organize various dishes for easy identification!

---

**Outstanding work completing Phase 5!** You've created a beautiful, functional recipe list with search, filters, statistics, and favorite toggling. This is the heart of our application! Keep all terminals running and proceed to Phase 6 where we'll build the detailed recipe view!
