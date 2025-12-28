# RecipeBook - Phase 6: View Recipe Component

## Introduction

Welcome to Phase 6! In this phase, we'll create the View Recipe Component that displays complete recipe details including ingredients, step-by-step instructions, cooking information, and action buttons for editing and deleting recipes.

Think of this component as the detailed recipe page in a cookbook. When you select a recipe from the index, you flip to its full page showing all ingredients, instructions, and cooking tips!

---

## What You'll Learn in This Phase

- Creating components with route parameters
- Reading route parameters to load data
- Displaying multi-line text as formatted lists
- Converting string data to arrays
- Implementing delete functionality with confirmation
- Navigating between related pages
- Working with detailed data views

---

## Prerequisites

- Completed Phases 0-5
- Recipe list displaying correctly
- Understanding of Angular routing
- Recipe service working properly

---

## Step 6.1: Generate View Recipe Component

Open terminal and run:

```bash
ng generate component components/view-recipe
```

**What this creates:**
- `src/app/components/view-recipe/` folder
- `view-recipe.ts` - Component TypeScript file
- `view-recipe.html` - Component template
- `view-recipe.css` - Component styles

---

## Step 6.2: Implement View Recipe Component TypeScript

Open `src/app/components/view-recipe/view-recipe.ts` and replace all content with:

```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-view-recipe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-recipe.html',
  styleUrl: './view-recipe.css'
})
export class ViewRecipeComponent implements OnInit {
  recipe: Recipe | null = null;
  recipeId: number = 0;
  isLoading: boolean = true;
  errorMessage: string = '';
  
  // Formatted arrays
  ingredientsList: string[] = [];
  instructionsList: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) { }

  ngOnInit(): void {
    // Get recipe ID from route parameters
    this.route.params.subscribe(params => {
      this.recipeId = +params['id']; // + converts string to number
      this.loadRecipe();
    });
  }

  // Load recipe details
  loadRecipe(): void {
    this.isLoading = true;
    this.recipeService.getRecipeById(this.recipeId).subscribe({
      next: (data) => {
        this.recipe = data;
        this.formatRecipeData();
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load recipe details. Please try again.';
        this.isLoading = false;
        console.error('Error loading recipe:', error);
      }
    });
  }

  // Format ingredients and instructions into arrays
  formatRecipeData(): void {
    if (this.recipe) {
      // Split ingredients by newline character
      this.ingredientsList = this.recipe.ingredients
        .split('\n')
        .filter(item => item.trim() !== '');

      // Split instructions by newline character
      this.instructionsList = this.recipe.instructions
        .split('\n')
        .filter(item => item.trim() !== '');
    }
  }

  // Navigate to edit page
  editRecipe(): void {
    this.router.navigate(['/recipes/edit', this.recipeId]);
  }

  // Delete recipe with confirmation
  deleteRecipe(): void {
    const confirmDelete = confirm(
      `Are you sure you want to delete "${this.recipe?.title}"? This action cannot be undone.`
    );

    if (confirmDelete) {
      this.recipeService.deleteRecipe(this.recipeId).subscribe({
        next: () => {
          alert('Recipe deleted successfully!');
          this.router.navigate(['/recipes']);
        },
        error: (error) => {
          alert('Failed to delete recipe. Please try again.');
          console.error('Error deleting recipe:', error);
        }
      });
    }
  }

  // Navigate back to recipe list
  goBack(): void {
    this.router.navigate(['/recipes']);
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

  // Toggle favorite status
  toggleFavorite(): void {
    if (this.recipe) {
      this.recipeService.toggleFavorite(this.recipe).subscribe({
        next: (updatedRecipe) => {
          this.recipe = updatedRecipe;
        },
        error: (error) => {
          console.error('Error toggling favorite:', error);
          alert('Failed to update favorite status. Please try again.');
        }
      });
    }
  }
}
```

---

## Understanding the TypeScript Code

### Section 1: Route Parameters

```typescript
ngOnInit(): void {
  this.route.params.subscribe(params => {
    this.recipeId = +params['id'];
    this.loadRecipe();
  });
}
```

**Understanding route parameters:**

When user navigates to `/recipes/3`, the URL contains:
- `/recipes/` - Base route
- `3` - Recipe ID parameter

**How to read the parameter:**

```typescript
this.route.params.subscribe(params => {
  this.recipeId = +params['id'];
});
```

**What the `+` does:**

The `+` operator converts string to number:
- `params['id']` returns `"3"` (string)
- `+params['id']` returns `3` (number)

**Real-world Example:**

Think of route parameters like apartment numbers on an envelope:
- "Building 5, Apartment 301" → Building is route, 301 is parameter
- Mailman (component) reads parameter to deliver to correct apartment
- In our case, recipe ID tells us which recipe to load

---

### Section 2: Format Recipe Data

```typescript
formatRecipeData(): void {
  if (this.recipe) {
    this.ingredientsList = this.recipe.ingredients
      .split('\n')
      .filter(item => item.trim() !== '');

    this.instructionsList = this.recipe.instructions
      .split('\n')
      .filter(item => item.trim() !== '');
  }
}
```

**Understanding string splitting:**

Our database stores ingredients as a single string:
```
"2 cups Rice\n500g Chicken\n1 cup Yogurt"
```

**After splitting:**
```typescript
["2 cups Rice", "500g Chicken", "1 cup Yogurt"]
```

**Step-by-step breakdown:**

**Step 1:** Split by newline
```typescript
this.recipe.ingredients.split('\n')
```

**Step 2:** Filter out empty items
```typescript
.filter(item => item.trim() !== '')
```

This removes any blank lines or whitespace-only items.

**Real-world Example:**

Like converting a shopping list from a paragraph to bullet points:
- **Before:** "Milk, Bread, Eggs, Butter"
- **After:** 
  - Milk
  - Bread
  - Eggs
  - Butter

---

### Section 3: Delete Recipe with Confirmation

```typescript
deleteRecipe(): void {
  const confirmDelete = confirm(
    `Are you sure you want to delete "${this.recipe?.title}"? This action cannot be undone.`
  );

  if (confirmDelete) {
    this.recipeService.deleteRecipe(this.recipeId).subscribe({
      next: () => {
        alert('Recipe deleted successfully!');
        this.router.navigate(['/recipes']);
      },
      error: (error) => {
        alert('Failed to delete recipe. Please try again.');
        console.error('Error deleting recipe:', error);
      }
    });
  }
}
```

**Understanding confirm dialog:**

```typescript
const confirmDelete = confirm('Are you sure?');
```

- Shows browser confirmation dialog
- Returns `true` if user clicks OK
- Returns `false` if user clicks Cancel

**Optional chaining:**

```typescript
this.recipe?.title
```

The `?.` operator safely accesses properties:
- If `recipe` is null, returns undefined (no error)
- If `recipe` exists, returns its title

**Flow:**
1. Show confirmation dialog
2. If confirmed, call delete API
3. On success, show success message and navigate to list
4. On error, show error message

---

## Step 6.3: Create View Recipe Component HTML

Open `src/app/components/view-recipe/view-recipe.html` and replace all content with:

```html
<div class="view-recipe-container">
  <!-- Loading Indicator -->
  <div class="loading-container" *ngIf="isLoading">
    <div class="loading-spinner"></div>
    <p>Loading recipe details...</p>
  </div>

  <!-- Error Message -->
  <div class="alert alert-error" *ngIf="errorMessage && !isLoading">
    {{ errorMessage }}
    <button class="btn btn-primary" (click)="goBack()">
      Back to Recipes
    </button>
  </div>

  <!-- Recipe Details -->
  <div class="recipe-details" *ngIf="recipe && !isLoading">
    <!-- Header Section -->
    <div class="recipe-header">
      <div class="header-content">
        <button class="btn btn-secondary back-btn" (click)="goBack()">
          ← Back to Recipes
        </button>
        
        <div class="title-section">
          <h1>{{ recipe.title }}</h1>
          <button 
            class="favorite-btn-large"
            (click)="toggleFavorite()"
            [class.favorited]="recipe.isFavorite"
          >
            {{ recipe.isFavorite ? '❤️ Favorited' : '🤍 Add to Favorites' }}
          </button>
        </div>

        <p class="recipe-description">{{ recipe.description }}</p>

        <div class="recipe-badges">
          <span class="badge" [class]="getDifficultyClass(recipe.difficulty)">
            {{ recipe.difficulty }}
          </span>
          <span class="info-badge">🌍 {{ recipe.cuisine }}</span>
          <span class="info-badge">🍽️ {{ recipe.category }}</span>
          <span class="info-badge">⏱️ {{ recipe.cookingTime }} mins</span>
          <span class="info-badge">👥 {{ recipe.servings }} servings</span>
          <span class="info-badge">⭐ {{ recipe.rating }}/5</span>
        </div>

        <div class="action-buttons">
          <button class="btn btn-warning" (click)="editRecipe()">
            ✏️ Edit Recipe
          </button>
          <button class="btn btn-danger" (click)="deleteRecipe()">
            🗑️ Delete Recipe
          </button>
        </div>
      </div>

      <div class="header-image">
        <img [src]="recipe.imageUrl" [alt]="recipe.title">
      </div>
    </div>

    <!-- Recipe Content Grid -->
    <div class="recipe-content-grid">
      <!-- Ingredients Section -->
      <div class="content-section">
        <h2>📝 Ingredients</h2>
        <div class="ingredients-list">
          <ul>
            <li *ngFor="let ingredient of ingredientsList">
              {{ ingredient }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Instructions Section -->
      <div class="content-section full-width">
        <h2>👨‍🍳 Cooking Instructions</h2>
        <div class="instructions-list">
          <ol>
            <li *ngFor="let instruction of instructionsList">
              {{ instruction }}
            </li>
          </ol>
        </div>
      </div>
    </div>

    <!-- Recipe Meta Information -->
    <div class="recipe-meta-info">
      <div class="meta-card">
        <strong>Created By:</strong>
        <p>{{ recipe.createdBy }}</p>
      </div>
      <div class="meta-card">
        <strong>Created Date:</strong>
        <p>{{ recipe.createdDate }}</p>
      </div>
      <div class="meta-card">
        <strong>Recipe ID:</strong>
        <p>#{{ recipe.id }}</p>
      </div>
    </div>
  </div>
</div>
```

---

## Understanding the HTML Template

### Section 1: Recipe Header with Image

```html
<div class="recipe-header">
  <div class="header-content">
    <!-- Title, description, badges, buttons -->
  </div>
  <div class="header-image">
    <img [src]="recipe.imageUrl" [alt]="recipe.title">
  </div>
</div>
```

**Layout:**
- Left side: Recipe information and actions
- Right side: Large recipe image
- Creates professional two-column layout

---

### Section 2: Ingredients with ngFor

```html
<ul>
  <li *ngFor="let ingredient of ingredientsList">
    {{ ingredient }}
  </li>
</ul>
```

**What happens:**

If `ingredientsList` is:
```typescript
["2 cups Rice", "500g Chicken", "1 cup Yogurt"]
```

Output becomes:
```html
<ul>
  <li>2 cups Rice</li>
  <li>500g Chicken</li>
  <li>1 cup Yogurt</li>
</ul>
```

---

### Section 3: Instructions with Numbered List

```html
<ol>
  <li *ngFor="let instruction of instructionsList">
    {{ instruction }}
  </li>
</ol>
```

**Why `<ol>` instead of `<ul>`?**

- `<ol>` - Ordered list (1, 2, 3...)
- `<ul>` - Unordered list (bullets)

Instructions need to be followed in order, so we use `<ol>`.

---

### Section 4: Conditional Favorite Button Text

```html
<button 
  class="favorite-btn-large"
  (click)="toggleFavorite()"
  [class.favorited]="recipe.isFavorite"
>
  {{ recipe.isFavorite ? '❤️ Favorited' : '🤍 Add to Favorites' }}
</button>
```

**Dynamic text:**
- If favorited: Shows "❤️ Favorited"
- If not favorited: Shows "🤍 Add to Favorites"

---

## Step 6.4: Add View Recipe Component Styles

Open `src/app/components/view-recipe/view-recipe.css` and add:

```css
.view-recipe-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* Loading Section */
.loading-container {
  text-align: center;
  padding: 80px 20px;
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

/* Recipe Details */
.recipe-details {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Recipe Header */
.recipe-header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  padding: 40px;
  background: linear-gradient(135deg, #fff5f5 0%, #ffe5e5 100%);
}

.back-btn {
  margin-bottom: 20px;
}

.title-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
  gap: 20px;
}

.recipe-header h1 {
  color: #ff6b6b;
  font-size: 42px;
  margin: 0;
  flex: 1;
}

.favorite-btn-large {
  background: white;
  border: 2px solid #ff6b6b;
  color: #ff6b6b;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.favorite-btn-large:hover {
  background: #ff6b6b;
  color: white;
  transform: scale(1.05);
}

.favorite-btn-large.favorited {
  background: #ff6b6b;
  color: white;
}

.recipe-description {
  color: #666;
  font-size: 18px;
  line-height: 1.8;
  margin-bottom: 20px;
}

.recipe-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 25px;
}

.info-badge {
  background: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  color: #333;
  border: 1px solid #ddd;
}

.action-buttons {
  display: flex;
  gap: 12px;
}

.action-buttons button {
  flex: 1;
}

.header-image {
  height: 100%;
  min-height: 400px;
}

.header-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Recipe Content Grid */
.recipe-content-grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 30px;
  padding: 40px;
}

.content-section {
  background: #f9f9f9;
  padding: 30px;
  border-radius: 12px;
}

.content-section.full-width {
  grid-column: 1 / -1;
}

.content-section h2 {
  color: #ff6b6b;
  font-size: 28px;
  margin: 0 0 20px 0;
  padding-bottom: 15px;
  border-bottom: 3px solid #ff6b6b;
}

/* Ingredients List */
.ingredients-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.ingredients-list li {
  padding: 12px 0;
  padding-left: 30px;
  position: relative;
  font-size: 16px;
  color: #333;
  line-height: 1.6;
  border-bottom: 1px solid #e0e0e0;
}

.ingredients-list li:last-child {
  border-bottom: none;
}

.ingredients-list li:before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #2ecc71;
  font-weight: bold;
  font-size: 18px;
}

/* Instructions List */
.instructions-list ol {
  counter-reset: instruction-counter;
  list-style: none;
  padding: 0;
  margin: 0;
}

.instructions-list li {
  counter-increment: instruction-counter;
  padding: 20px 0;
  padding-left: 60px;
  position: relative;
  font-size: 16px;
  color: #333;
  line-height: 1.8;
  border-bottom: 1px solid #e0e0e0;
}

.instructions-list li:last-child {
  border-bottom: none;
}

.instructions-list li:before {
  content: counter(instruction-counter);
  position: absolute;
  left: 0;
  top: 15px;
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
}

/* Recipe Meta Information */
.recipe-meta-info {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 0 40px 40px;
}

.meta-card {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.meta-card strong {
  color: #ff6b6b;
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.meta-card p {
  color: #333;
  font-size: 18px;
  margin: 0;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .recipe-header {
    grid-template-columns: 1fr;
  }

  .header-image {
    min-height: 300px;
  }

  .recipe-content-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .recipe-header h1 {
    font-size: 32px;
  }

  .title-section {
    flex-direction: column;
  }

  .favorite-btn-large {
    width: 100%;
  }

  .action-buttons {
    flex-direction: column;
  }

  .recipe-meta-info {
    grid-template-columns: 1fr;
  }

  .instructions-list li {
    padding-left: 50px;
  }

  .instructions-list li:before {
    width: 35px;
    height: 35px;
    font-size: 16px;
  }
}
```

---

## Step 6.5: Update App Routes

Open `src/app/app.routes.ts` and update:

```typescript
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { RecipeListComponent } from './components/recipe-list/recipe-list';
import { ViewRecipeComponent } from './components/view-recipe/view-recipe';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'recipes', component: RecipeListComponent },
  { path: 'recipes/:id', component: ViewRecipeComponent },
  { path: '**', redirectTo: '/login' }
];
```

**Understanding the route with parameter:**

```typescript
{ path: 'recipes/:id', component: ViewRecipeComponent }
```

- `:id` is a route parameter (placeholder)
- Matches URLs like: /recipes/1, /recipes/5, /recipes/99
- Parameter value is accessible via ActivatedRoute

---

## Testing the View Recipe Component

### Test 1: View Recipe from List

1. Go to recipe list: http://localhost:4200/recipes
2. Click "View Recipe" on any recipe card
3. Should navigate to view page showing full details

**You should see:**
- Recipe title and image
- Full description
- All badges (difficulty, cuisine, category, time, servings, rating)
- Ingredients as bulleted list with checkmarks
- Instructions as numbered list with circular badges
- Edit and Delete buttons
- Back button

### Test 2: Direct URL Navigation

1. Type in browser: http://localhost:4200/recipes/2
2. Should show Masala Dosa recipe details

### Test 3: Toggle Favorite

1. View any recipe
2. Click "Add to Favorites" button
3. Button should change to "Favorited" with filled heart
4. Click again to unfavorite

### Test 4: Edit Button

1. View any recipe
2. Click "✏️ Edit Recipe" button
3. Should navigate to edit page (we'll build this in Phase 8)

### Test 5: Delete Recipe

1. View any recipe
2. Click "🗑️ Delete Recipe" button
3. Should show confirmation dialog
4. Click "Cancel" - nothing happens
5. Click button again, then "OK"
6. Should show success alert
7. Should navigate back to recipe list
8. Deleted recipe should not appear in list anymore

### Test 6: Back Button

1. View any recipe
2. Click "← Back to Recipes" button
3. Should navigate back to recipe list

---

## Common Issues and Troubleshooting

### Issue 1: Recipe Not Loading

**Problem:** Blank page or loading forever

**Solution:**
1. Check recipe ID exists in database
2. Verify json-server is running
3. Check browser console for errors
4. Verify route parameter is correct

### Issue 2: Ingredients/Instructions Not Formatted

**Problem:** Shows as single paragraph instead of list

**Solution:**
1. Check `formatRecipeData()` method is called
2. Verify database has `\n` newline characters
3. Check split logic is correct

### Issue 3: Image Not Displaying

**Problem:** Broken image icon

**Solution:**
1. Check internet connection
2. Verify imageUrl in database
3. Try different image URL

### Issue 4: Delete Not Working

**Problem:** Delete button doesn't work

**Solution:**
1. Verify recipe service has deleteRecipe method
2. Check API responds correctly
3. Ensure confirmation dialog shows

---

## Verification Checklist

Before moving to Phase 7, verify:

- [ ] Can navigate to view recipe from list
- [ ] Recipe details display correctly
- [ ] Image loads properly
- [ ] Ingredients show as bulleted list
- [ ] Instructions show as numbered list
- [ ] All badges display correctly
- [ ] Favorite button toggles correctly
- [ ] Edit button navigates (even if page doesn't exist yet)
- [ ] Delete shows confirmation dialog
- [ ] Delete removes recipe and navigates back
- [ ] Back button works correctly
- [ ] No errors in console

---

## What's Next?

In **Phase 7**, we'll:
- Create the Add Recipe Component
- Build comprehensive form with all fields
- Add image upload functionality
- Implement form validation
- Handle recipe creation
- Navigate to view page after creation

---

## Key Takeaways

1. **Route parameters** pass data through URLs
2. **ActivatedRoute** reads route parameters
3. **String splitting** converts text to arrays
4. **Conditional rendering** shows different content based on state
5. **Confirmation dialogs** prevent accidental actions
6. **Formatted lists** make content more readable
7. **Grid layouts** create professional multi-column designs

---

## Practice Exercise

**Challenge:** Add a print button that opens a printer-friendly version of the recipe.

**Hint:**
1. Add print button in action buttons
2. Use `window.print()` JavaScript function
3. Add CSS media query for print styling

**Solution:**

In `view-recipe.ts`:
```typescript
printRecipe(): void {
  window.print();
}
```

In `view-recipe.html`:
```html
<button class="btn btn-secondary" (click)="printRecipe()">
  🖨️ Print Recipe
</button>
```

In `view-recipe.css`:
```css
@media print {
  .action-buttons,
  .back-btn,
  .favorite-btn-large {
    display: none;
  }
}
```

---

## Fun Fact

The numbered circles for cooking instructions use CSS counters - a feature that automatically numbers elements without JavaScript! This technique has been available since CSS2.1 (released in 2004) but is still underutilized.

In our RecipeBook app, we styled instruction numbers like:
- Red gradient circles
- White text
- Auto-incrementing numbers
- Professional cookbook appearance

This is similar to how traditional Indian cooking manuscripts used numbered verses (shlokas) to describe cooking techniques - the ancient way of creating step-by-step instructions!

---

**Excellent work completing Phase 6!** You've created a beautiful detailed recipe view that showcases recipes like a professional cookbook. Users can now see complete recipe information, toggle favorites, and delete recipes. Keep all terminals running and proceed to Phase 7 where we'll build the Add Recipe Component!
