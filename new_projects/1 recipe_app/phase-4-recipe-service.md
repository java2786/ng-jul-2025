# RecipeBook - Phase 4: Recipe Service

## Introduction

Welcome to Phase 4! Now that authentication is complete, it's time to build the Recipe Service. This service will handle all recipe-related operations: fetching recipes, creating new recipes, updating existing ones, deleting recipes, and toggling favorites.

Think of the Recipe Service as the kitchen manager in a restaurant. Just like a kitchen manager handles recipe books, ingredients inventory, and menu updates, our Recipe Service manages all recipe data and operations!

---

## What You'll Learn in This Phase

- Creating services for data management
- Implementing CRUD operations (Create, Read, Update, Delete)
- Working with REST API endpoints
- Using RxJS Observables for async data
- Handling HTTP errors gracefully
- Understanding service methods and their return types

---

## Prerequisites

- Completed Phases 0, 1, 2, and 3
- json-server running on port 3000 with recipe data
- Angular dev server running on port 4200
- Understanding of HTTP methods (GET, POST, PUT, DELETE)

---

## Understanding CRUD Operations

Before we build the service, let's understand what CRUD means:

**CRUD Operations:**

- **C**reate - Add new recipe (HTTP POST)
- **R**ead - Get recipes (HTTP GET)
- **U**pdate - Modify existing recipe (HTTP PUT/PATCH)
- **D**elete - Remove recipe (HTTP DELETE)

**Real-world Example:**

Think of CRUD like managing a physical recipe notebook:
- **Create** - Writing a new recipe on a fresh page
- **Read** - Reading existing recipes from the notebook
- **Update** - Crossing out and rewriting parts of a recipe
- **Delete** - Tearing out a page from the notebook

---

## Step 4.1: Generate Recipe Service

Open terminal in your project folder and run:

```bash
ng generate service services/recipe
```

**What this creates:**
- `src/app/services/recipe.service.ts` - Recipe service file
- `src/app/services/recipe.service.spec.ts` - Testing file

You should see output like:

```
CREATE src/app/services/recipe.service.ts
CREATE src/app/services/recipe.service.spec.ts
```

---

## Step 4.2: Implement Recipe Service

Open `src/app/services/recipe.service.ts` and replace all content with:

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiUrl = 'http://localhost:3000/recipes';

  constructor(private http: HttpClient) { }

  // Get all recipes
  getAllRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Get single recipe by ID
  getRecipeById(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Create new recipe
  createRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(this.apiUrl, recipe).pipe(
      catchError(this.handleError)
    );
  }

  // Update existing recipe
  updateRecipe(id: number, recipe: Recipe): Observable<Recipe> {
    return this.http.put<Recipe>(`${this.apiUrl}/${id}`, recipe).pipe(
      catchError(this.handleError)
    );
  }

  // Delete recipe
  deleteRecipe(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Toggle favorite status
  toggleFavorite(recipe: Recipe): Observable<Recipe> {
    const updatedRecipe = { ...recipe, isFavorite: !recipe.isFavorite };
    return this.http.put<Recipe>(`${this.apiUrl}/${recipe.id}`, updatedRecipe).pipe(
      catchError(this.handleError)
    );
  }

  // Search recipes by title or description
  searchRecipes(searchTerm: string): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.apiUrl}?q=${searchTerm}`).pipe(
      catchError(this.handleError)
    );
  }

  // Filter recipes by cuisine
  filterByCuisine(cuisine: string): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.apiUrl}?cuisine=${cuisine}`).pipe(
      catchError(this.handleError)
    );
  }

  // Filter recipes by category
  filterByCategory(category: string): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.apiUrl}?category=${category}`).pipe(
      catchError(this.handleError)
    );
  }

  // Filter recipes by difficulty
  filterByDifficulty(difficulty: string): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.apiUrl}?difficulty=${difficulty}`).pipe(
      catchError(this.handleError)
    );
  }

  // Get favorite recipes
  getFavoriteRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.apiUrl}?isFavorite=true`).pipe(
      catchError(this.handleError)
    );
  }

  // Get unique cuisines
  getUniqueCuisines(): Observable<string[]> {
    return this.getAllRecipes().pipe(
      map(recipes => {
        const cuisines = recipes.map(r => r.cuisine);
        return [...new Set(cuisines)].sort();
      })
    );
  }

  // Get unique categories
  getUniqueCategories(): Observable<string[]> {
    return this.getAllRecipes().pipe(
      map(recipes => {
        const categories = recipes.map(r => r.category);
        return [...new Set(categories)].sort();
      })
    );
  }

  // Error handling
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error(error.message || 'Server error'));
  }
}
```

---

## Understanding the Recipe Service Code

### Section 1: Imports and Dependencies

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Recipe } from '../models/recipe.model';
```

**What each import does:**

- `Injectable` - Marks class as a service that can be injected
- `HttpClient` - Makes HTTP requests to backend
- `Observable` - Represents async data stream
- `throwError` - Creates an Observable that emits an error
- `catchError` - RxJS operator to handle errors
- `map` - RxJS operator to transform data
- `Recipe` - Our recipe model interface

---

### Section 2: Service Configuration

```typescript
@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiUrl = 'http://localhost:3000/recipes';

  constructor(private http: HttpClient) { }
```

**Explanation:**

- `@Injectable({ providedIn: 'root' })` - Makes service available app-wide
- `apiUrl` - Base URL for recipe endpoints
- `http: HttpClient` - Injected HTTP client for making requests

---

### Section 3: Get All Recipes Method

```typescript
getAllRecipes(): Observable<Recipe[]> {
  return this.http.get<Recipe[]>(this.apiUrl).pipe(
    catchError(this.handleError)
  );
}
```

**What this does:**

1. Makes GET request to `http://localhost:3000/recipes`
2. Expects array of Recipe objects as response
3. If error occurs, calls `handleError` method
4. Returns Observable that emits Recipe array

**HTTP Request:**
```
GET http://localhost:3000/recipes
```

**Response Example:**
```json
[
  {
    "id": 1,
    "title": "Hyderabadi Biryani",
    "description": "Aromatic rice dish...",
    ...
  },
  {
    "id": 2,
    "title": "Masala Dosa",
    ...
  }
]
```

**Real-world Example:**

Imagine asking a librarian: "Show me all cookbooks you have." The librarian goes to the shelf, picks all cookbooks, and brings them to you. Similarly, `getAllRecipes()` asks the server for all recipes and returns them.

---

### Section 4: Get Single Recipe by ID

```typescript
getRecipeById(id: number): Observable<Recipe> {
  return this.http.get<Recipe>(`${this.apiUrl}/${id}`).pipe(
    catchError(this.handleError)
  );
}
```

**What this does:**

1. Makes GET request to `http://localhost:3000/recipes/{id}`
2. Expects single Recipe object as response
3. Uses template literal to build URL with ID

**Example Usage:**
```typescript
// Get recipe with ID 1
this.recipeService.getRecipeById(1).subscribe(recipe => {
  console.log(recipe.title); // "Hyderabadi Biryani"
});
```

**HTTP Request:**
```
GET http://localhost:3000/recipes/1
```

**Real-world Example:**

Like asking a librarian: "Show me cookbook number 5." The librarian finds that specific book and gives it to you.

---

### Section 5: Create New Recipe

```typescript
createRecipe(recipe: Recipe): Observable<Recipe> {
  return this.http.post<Recipe>(this.apiUrl, recipe).pipe(
    catchError(this.handleError)
  );
}
```

**What this does:**

1. Makes POST request to `http://localhost:3000/recipes`
2. Sends recipe data in request body
3. Server creates new recipe and returns it with ID assigned

**Example Usage:**
```typescript
const newRecipe: Recipe = {
  id: 0, // Will be assigned by server
  title: "Pav Bhaji",
  description: "Mumbai street food...",
  // ... other properties
};

this.recipeService.createRecipe(newRecipe).subscribe(created => {
  console.log('Created recipe with ID:', created.id);
});
```

**HTTP Request:**
```
POST http://localhost:3000/recipes
Content-Type: application/json

{
  "title": "Pav Bhaji",
  "description": "Mumbai street food...",
  ...
}
```

**Real-world Example:**

Like writing a new recipe on a card and adding it to your recipe box. The box assigns it a position number automatically.

---

### Section 6: Update Existing Recipe

```typescript
updateRecipe(id: number, recipe: Recipe): Observable<Recipe> {
  return this.http.put<Recipe>(`${this.apiUrl}/${id}`, recipe).pipe(
    catchError(this.handleError)
  );
}
```

**What this does:**

1. Makes PUT request to `http://localhost:3000/recipes/{id}`
2. Replaces entire recipe with new data
3. Returns updated recipe

**Example Usage:**
```typescript
const updatedRecipe: Recipe = {
  id: 1,
  title: "Hyderabadi Biryani (Updated)",
  // ... updated properties
};

this.recipeService.updateRecipe(1, updatedRecipe).subscribe(result => {
  console.log('Recipe updated successfully');
});
```

**PUT vs PATCH:**

- **PUT** - Replaces entire resource
- **PATCH** - Updates only specific fields

We use PUT because we're replacing the whole recipe object.

---

### Section 7: Delete Recipe

```typescript
deleteRecipe(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
    catchError(this.handleError)
  );
}
```

**What this does:**

1. Makes DELETE request to `http://localhost:3000/recipes/{id}`
2. Removes recipe from database
3. Returns void (no data returned)

**Example Usage:**
```typescript
this.recipeService.deleteRecipe(5).subscribe(() => {
  console.log('Recipe deleted successfully');
});
```

**HTTP Request:**
```
DELETE http://localhost:3000/recipes/5
```

**Real-world Example:**

Like removing a recipe card from your recipe box permanently.

---

### Section 8: Toggle Favorite Status

```typescript
toggleFavorite(recipe: Recipe): Observable<Recipe> {
  const updatedRecipe = { ...recipe, isFavorite: !recipe.isFavorite };
  return this.http.put<Recipe>(`${this.apiUrl}/${recipe.id}`, updatedRecipe).pipe(
    catchError(this.handleError)
  );
}
```

**Understanding the spread operator:**

```typescript
const updatedRecipe = { ...recipe, isFavorite: !recipe.isFavorite };
```

This means:
1. Copy all properties from `recipe` object
2. Override `isFavorite` with opposite value
3. If `isFavorite` was `true`, make it `false`
4. If `isFavorite` was `false`, make it `true`

**Example:**

```typescript
// Original recipe
{
  id: 1,
  title: "Biryani",
  isFavorite: false
}

// After spread and toggle
{
  id: 1,
  title: "Biryani",
  isFavorite: true  // Toggled!
}
```

**Real-world Example:**

Like marking a recipe with a star sticker to show it's your favorite, or removing the star if it's already there.

---

### Section 9: Search Recipes

```typescript
searchRecipes(searchTerm: string): Observable<Recipe[]> {
  return this.http.get<Recipe[]>(`${this.apiUrl}?q=${searchTerm}`).pipe(
    catchError(this.handleError)
  );
}
```

**Understanding the query parameter:**

- `?q=${searchTerm}` - json-server's full-text search parameter
- Searches in all text fields (title, description, ingredients, etc.)

**Example Usage:**
```typescript
this.recipeService.searchRecipes('biryani').subscribe(recipes => {
  // Returns all recipes containing 'biryani' in any field
});
```

**HTTP Request:**
```
GET http://localhost:3000/recipes?q=biryani
```

---

### Section 10: Filter Methods

```typescript
filterByCuisine(cuisine: string): Observable<Recipe[]> {
  return this.http.get<Recipe[]>(`${this.apiUrl}?cuisine=${cuisine}`).pipe(
    catchError(this.handleError)
  );
}

filterByCategory(category: string): Observable<Recipe[]> {
  return this.http.get<Recipe[]>(`${this.apiUrl}?category=${category}`).pipe(
    catchError(this.handleError)
  );
}

filterByDifficulty(difficulty: string): Observable<Recipe[]> {
  return this.http.get<Recipe[]>(`${this.apiUrl}?difficulty=${difficulty}`).pipe(
    catchError(this.handleError)
  );
}
```

**What these do:**

Filter recipes based on specific field values.

**Example Usage:**
```typescript
// Get all South Indian recipes
this.recipeService.filterByCuisine('South Indian').subscribe(recipes => {
  // Returns Masala Dosa
});

// Get all breakfast recipes
this.recipeService.filterByCategory('Breakfast').subscribe(recipes => {
  // Returns all breakfast items
});

// Get all easy recipes
this.recipeService.filterByDifficulty('Easy').subscribe(recipes => {
  // Returns recipes marked as Easy
});
```

**HTTP Requests:**
```
GET http://localhost:3000/recipes?cuisine=South%20Indian
GET http://localhost:3000/recipes?category=Breakfast
GET http://localhost:3000/recipes?difficulty=Easy
```

---

### Section 11: Get Favorite Recipes

```typescript
getFavoriteRecipes(): Observable<Recipe[]> {
  return this.http.get<Recipe[]>(`${this.apiUrl}?isFavorite=true`).pipe(
    catchError(this.handleError)
  );
}
```

**What this does:**

Returns only recipes where `isFavorite` is `true`.

**HTTP Request:**
```
GET http://localhost:3000/recipes?isFavorite=true
```

---

### Section 12: Get Unique Values

```typescript
getUniqueCuisines(): Observable<string[]> {
  return this.getAllRecipes().pipe(
    map(recipes => {
      const cuisines = recipes.map(r => r.cuisine);
      return [...new Set(cuisines)].sort();
    })
  );
}

getUniqueCategories(): Observable<string[]> {
  return this.getAllRecipes().pipe(
    map(recipes => {
      const categories = recipes.map(r => r.category);
      return [...new Set(categories)].sort();
    })
  );
}
```

**Understanding the code step-by-step:**

**Step 1:** Get all recipes
```typescript
return this.getAllRecipes().pipe(
```

**Step 2:** Transform the data
```typescript
map(recipes => {
```

**Step 3:** Extract cuisine/category from each recipe
```typescript
const cuisines = recipes.map(r => r.cuisine);
// Result: ["Indian", "South Indian", "North Indian", "Indian", "North Indian"]
```

**Step 4:** Remove duplicates using Set
```typescript
const uniqueCuisines = new Set(cuisines);
// Result: Set {"Indian", "South Indian", "North Indian"}
```

**Step 5:** Convert Set back to array and sort
```typescript
return [...new Set(cuisines)].sort();
// Result: ["Indian", "North Indian", "South Indian"]
```

**Real-world Example:**

Like organizing your recipe box by category tags. You look at all recipes, collect all unique tags, remove duplicates, and sort them alphabetically.

**Example Output:**
```typescript
this.recipeService.getUniqueCuisines().subscribe(cuisines => {
  console.log(cuisines);
  // ["Indian", "North Indian", "South Indian"]
});
```

---

### Section 13: Error Handling

```typescript
private handleError(error: any): Observable<never> {
  console.error('An error occurred:', error);
  return throwError(() => new Error(error.message || 'Server error'));
}
```

**What this does:**

1. Logs error to console for debugging
2. Creates new Error object with message
3. Returns Observable that emits error
4. Allows components to catch and handle errors

**Why is error handling important?**

Without error handling:
- App crashes when API is down
- User sees blank screen
- No indication of what went wrong

With error handling:
- App continues running
- User sees friendly error message
- Errors are logged for debugging

**Example in component:**
```typescript
this.recipeService.getAllRecipes().subscribe({
  next: (recipes) => {
    // Success: show recipes
    this.recipes = recipes;
  },
  error: (error) => {
    // Error: show error message
    this.errorMessage = 'Failed to load recipes. Please try again.';
  }
});
```

---

## Testing the Recipe Service

Let's verify our service works correctly.

### Test 1: Test in Browser Console

Open http://localhost:4200, press F12 for console, and type:

```javascript
// Note: This is just for understanding, we'll test properly from components
```

We can't directly test from console, but we'll test from components in next phase.

### Test 2: Verify Service Creation

Run the app:
```bash
ng serve
```

Check terminal for any compilation errors. You should see:
```
✔ Compiled successfully.
```

---

## Understanding Observable Subscriptions

**Important concept:** Observables are lazy!

```typescript
// This does NOT make the HTTP request
const observable = this.recipeService.getAllRecipes();

// This DOES make the HTTP request
observable.subscribe(recipes => {
  console.log(recipes);
});
```

**Real-world Example:**

Think of Observables like a movie ticket:
- Buying the ticket (creating Observable) doesn't show the movie
- Entering the theater and sitting down (subscribing) starts the movie
- If you don't enter the theater (don't subscribe), the movie doesn't play for you

---

## Common Issues and Troubleshooting

### Issue 1: HttpClient Not Provided

**Error:** `NullInjectorError: No provider for HttpClient`

**Solution:** 

Verify `provideHttpClient()` is in `app.config.ts`:

```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    // ... other providers
  ]
};
```

### Issue 2: CORS Error

**Error:** `Access to XMLHttpRequest has been blocked by CORS policy`

**Solution:**

Make sure json-server is running:
```bash
json-server --watch db.json --port 3000
```

### Issue 3: Import Errors

**Error:** `Cannot find module '../models/recipe.model'`

**Solution:**

Verify `recipe.model.ts` exists in `src/app/models/` folder.

---

## Verification Checklist

Before moving to Phase 5, verify:

- [ ] Recipe service created in `src/app/services/` folder
- [ ] All CRUD methods implemented (get, create, update, delete)
- [ ] Filter and search methods added
- [ ] Toggle favorite method implemented
- [ ] Error handling included
- [ ] No compilation errors in terminal
- [ ] HttpClient properly injected

---

## Service Methods Summary

Here's a quick reference of all methods:

| Method | Purpose | HTTP Method | Returns |
|--------|---------|-------------|---------|
| getAllRecipes() | Get all recipes | GET | Recipe[] |
| getRecipeById(id) | Get one recipe | GET | Recipe |
| createRecipe(recipe) | Create new recipe | POST | Recipe |
| updateRecipe(id, recipe) | Update recipe | PUT | Recipe |
| deleteRecipe(id) | Delete recipe | DELETE | void |
| toggleFavorite(recipe) | Toggle favorite | PUT | Recipe |
| searchRecipes(term) | Search recipes | GET | Recipe[] |
| filterByCuisine(cuisine) | Filter by cuisine | GET | Recipe[] |
| filterByCategory(category) | Filter by category | GET | Recipe[] |
| filterByDifficulty(difficulty) | Filter by difficulty | GET | Recipe[] |
| getFavoriteRecipes() | Get favorites | GET | Recipe[] |
| getUniqueCuisines() | Get unique cuisines | GET | string[] |
| getUniqueCategories() | Get unique categories | GET | string[] |

---

## What's Next?

In **Phase 5**, we'll:
- Create the Recipe List Component
- Display all recipes in beautiful cards
- Show recipe images and details
- Add search functionality
- Implement filters (cuisine, category, difficulty)
- Add statistics dashboard
- Implement favorite toggle

---

## Key Takeaways

1. **Services** encapsulate data access logic
2. **HttpClient** methods return Observables
3. **CRUD operations** use different HTTP methods (GET, POST, PUT, DELETE)
4. **Query parameters** filter and search data
5. **Error handling** makes apps robust and user-friendly
6. **RxJS operators** transform data streams
7. **Observables** are lazy - must subscribe to execute

---

## Practice Exercise

**Challenge:** Add a new method `getRecipesByRating()` that returns recipes with rating above 4.5.

**Hint:** Use a filter on the backend or transform data after fetching.

**Solution:**

```typescript
getHighRatedRecipes(): Observable<Recipe[]> {
  return this.getAllRecipes().pipe(
    map(recipes => recipes.filter(r => r.rating >= 4.5))
  );
}
```

Add this method in `recipe.service.ts` after the `getFavoriteRecipes()` method.

---

## Understanding HTTP Status Codes

When working with APIs, you'll encounter these status codes:

- **200 OK** - Request succeeded
- **201 Created** - Resource created successfully
- **400 Bad Request** - Invalid data sent
- **404 Not Found** - Resource doesn't exist
- **500 Internal Server Error** - Server problem

json-server automatically returns appropriate status codes.

---

## Fun Fact

The concept of RESTful APIs (Representational State Transfer) was introduced by Roy Fielding in his doctoral dissertation in 2000! REST has become the standard for web APIs because of its simplicity and scalability.

In our RecipeBook app, we're using RESTful principles:
- Resources (recipes) have unique URLs
- HTTP methods (GET, POST, PUT, DELETE) perform actions
- Stateless communication (each request is independent)

Just like how Indian recipes have been passed down through generations with standard methods (tadka, dum cooking, etc.), REST provides standard methods for web communication that developers worldwide understand!

---

**Excellent work completing Phase 4!** You've created a comprehensive Recipe Service with all necessary operations. This service will power the entire recipe management functionality of our app. The service is ready to be used by components! Keep all terminals running and proceed to Phase 5 where we'll build the Recipe List Component!
