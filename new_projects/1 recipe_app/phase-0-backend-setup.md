# RecipeBook - Phase 0: Backend Setup with json-server  
  
## Introduction  
  
Welcome to the Recipe Sharing Application development series! Before we start building our Angular application, we need to set up a mock backend using json-server. This will act as our REST API for managing recipes and user authentication.  
  
Think of json-server as a temporary restaurant kitchen that serves data instead of food. Just like a real kitchen stores ingredients and recipes, our json-server will store user information and recipe data.  
  
---  
  
## What You'll Learn in This Phase  
  
- How to install and configure json-server  
- Creating a complete database file with users and recipes  
- Testing REST API endpoints  
- Understanding JSON data structure for recipes  
  
---  
  
## Prerequisites  
  
- Node.js installed on your system  
- Basic understanding of JSON format  
- Terminal/Command Prompt access  
  
---  
  
## Step 0.1: Install json-server Globally  
  
Open your terminal and run the following command:  
  
```bash  
npm install -g json-server  
```  
  
**What this does:** Installs json-server as a global package so you can use it from anywhere on your system.  
  
**Verification:** Check if json-server is installed correctly:  
  
```bash  
json-server --version  
```  
  
You should see a version number like `0.17.4` or similar.  
  
---  
  
## Step 0.2: Create Project Folder and Database File  
  
Let's create a folder for our backend setup.  
  
```bash  
mkdir recipe-backend  
cd recipe-backend  
```  
  
Now create a file named `db.json` in this folder:  
  
```bash  
# On Windows  
type nul > db.json  
  
# On Mac/Linux  
touch db.json  
```  
  
---  
  
## Step 0.3: Add Complete Database Content  
  
Open `db.json` in any text editor and paste the following complete database structure:  
  
```json  
{  
  "users": [  
    {  
      "id": 1,  
      "username": "chef@recipes",  
      "password": "recipe@123",  
      "fullName": "Meera Krishnan",  
      "email": "meera@recipes.com"  
    }  
  ],  
  "recipes": [  
    {  
      "id": 1,  
      "title": "Hyderabadi Biryani",  
      "description": "Aromatic and flavorful rice dish layered with marinated chicken and fragrant spices. A royal dish from the Nizams of Hyderabad.",  
      "ingredients": "2 cups Basmati Rice\n500g Chicken\n2 large Onions (sliced)\n1 cup Yogurt\n2 tbsp Ginger-Garlic Paste\n4 Green Chilies\n1/2 cup Mint Leaves\n1/2 cup Coriander Leaves\n4 tbsp Biryani Masala\n1 tsp Red Chili Powder\n1/2 tsp Turmeric Powder\n4 tbsp Ghee\nSaffron soaked in Milk\nSalt to taste",  
      "instructions": "1. Wash and soak basmati rice for 30 minutes\n2. Marinate chicken with yogurt, ginger-garlic paste, biryani masala, and salt for 1 hour\n3. Deep fry sliced onions until golden brown and crispy\n4. In a heavy-bottomed pot, layer the marinated chicken\n5. Add half of the fried onions, mint, and coriander leaves\n6. Parboil the rice until 70% cooked and drain\n7. Layer the rice over the chicken\n8. Top with remaining fried onions, saffron milk, and ghee\n9. Cover with tight lid and cook on high heat for 3 minutes\n10. Reduce to low heat and cook for 45 minutes\n11. Let it rest for 10 minutes before opening\n12. Gently mix and serve hot with raita",  
      "cookingTime": 90,  
      "servings": 4,  
      "difficulty": "Medium",  
      "cuisine": "Indian",  
      "category": "Main Course",  
      "imageUrl": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800",  
      "createdBy": "Meera Krishnan",  
      "createdDate": "2025-01-15",  
      "rating": 4.8,  
      "isFavorite": false  
    },  
    {  
      "id": 2,  
      "title": "Masala Dosa",  
      "description": "Crispy South Indian crepe filled with spiced potato filling. A breakfast favorite across India, especially popular in Chennai and Bangalore.",  
      "ingredients": "For Dosa Batter:\n2 cups Rice\n1 cup Urad Dal\n1/2 tsp Fenugreek Seeds\nSalt to taste\n\nFor Potato Filling:\n4 large Potatoes (boiled and mashed)\n2 Onions (chopped)\n2 Green Chilies (chopped)\n1 tsp Mustard Seeds\n1 tsp Urad Dal\n10 Curry Leaves\n1/2 tsp Turmeric Powder\n2 tbsp Oil\nSalt to taste",  
      "instructions": "1. Soak rice, urad dal, and fenugreek seeds separately for 6 hours\n2. Grind urad dal until fluffy and frothy\n3. Grind rice to a smooth batter\n4. Mix both batters, add salt, and ferment overnight\n5. For filling: Heat oil, add mustard seeds and urad dal\n6. Add curry leaves, onions, and green chilies, sauté until golden\n7. Add turmeric powder and mashed potatoes, mix well\n8. Heat a dosa tawa, pour a ladle of batter\n9. Spread in circular motion to make thin crepe\n10. Drizzle oil around edges and cook until crispy\n11. Place potato filling in center\n12. Fold and serve hot with coconut chutney and sambar",  
      "cookingTime": 30,  
      "servings": 4,  
      "difficulty": "Easy",  
      "cuisine": "South Indian",  
      "category": "Breakfast",  
      "imageUrl": "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=800",  
      "createdBy": "Meera Krishnan",  
      "createdDate": "2025-01-16",  
      "rating": 4.5,  
      "isFavorite": true  
    },  
    {  
      "id": 3,  
      "title": "Paneer Butter Masala",  
      "description": "Rich and creamy North Indian curry with soft paneer cubes in tomato-cashew gravy. A vegetarian delight popular in restaurants across India.",  
      "ingredients": "250g Paneer (cubed)\n4 large Tomatoes\n10 Cashew Nuts\n2 Onions (chopped)\n2 tbsp Butter\n1 tbsp Oil\n1 tbsp Ginger-Garlic Paste\n1 tsp Red Chili Powder\n1 tsp Garam Masala\n1/2 tsp Kasuri Methi\n1/2 cup Fresh Cream\n2 tbsp Honey\nSalt to taste\nCoriander Leaves for garnish",  
      "instructions": "1. Blanch tomatoes and blend with soaked cashews to smooth paste\n2. Heat butter and oil in a pan\n3. Add chopped onions and sauté until golden\n4. Add ginger-garlic paste and cook for 2 minutes\n5. Pour the tomato-cashew paste\n6. Add red chili powder, salt, and cook for 10 minutes\n7. Add garam masala and kasuri methi\n8. Add honey for balanced sweetness\n9. Pour fresh cream and mix well\n10. Gently add paneer cubes\n11. Simmer for 5 minutes\n12. Garnish with coriander and serve with naan or rice",  
      "cookingTime": 40,  
      "servings": 4,  
      "difficulty": "Medium",  
      "cuisine": "North Indian",  
      "category": "Main Course",  
      "imageUrl": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800",  
      "createdBy": "Meera Krishnan",  
      "createdDate": "2025-01-17",  
      "rating": 4.7,  
      "isFavorite": true  
    },  
    {  
      "id": 4,  
      "title": "Gulab Jamun",  
      "description": "Soft milk-solid dumplings soaked in rose-flavored sugar syrup. The king of Indian desserts, loved at every celebration from Diwali to weddings.",  
      "ingredients": "For Jamuns:\n1 cup Milk Powder\n1/4 cup All-Purpose Flour\n1/4 tsp Baking Soda\n2 tbsp Ghee\n4 tbsp Milk (for binding)\nGhee for deep frying\n\nFor Sugar Syrup:\n2 cups Sugar\n2 cups Water\n4 Cardamom Pods\n1 tsp Rose Water\nFew Saffron Strands",  
      "instructions": "1. Mix milk powder, flour, and baking soda in a bowl\n2. Add ghee and rub until mixture resembles breadcrumbs\n3. Add milk gradually and knead into soft dough\n4. Cover and rest for 15 minutes\n5. Meanwhile, prepare sugar syrup by boiling sugar and water\n6. Add cardamom and saffron to syrup\n7. Simmer until slightly sticky consistency\n8. Add rose water and keep syrup warm\n9. Divide dough into small equal portions\n10. Roll into smooth balls without cracks\n11. Heat ghee on medium heat\n12. Fry jamuns until deep golden brown\n13. Drain and immediately add to warm syrup\n14. Soak for minimum 2 hours before serving",  
      "cookingTime": 60,  
      "servings": 6,  
      "difficulty": "Medium",  
      "cuisine": "Indian",  
      "category": "Dessert",  
      "imageUrl": "https://images.unsplash.com/photo-1571942676516-bcab84649e44?w=800",  
      "createdBy": "Meera Krishnan",  
      "createdDate": "2025-01-18",  
      "rating": 4.9,  
      "isFavorite": false  
    },  
    {  
      "id": 5,  
      "title": "Chole Bhature",  
      "description": "Spicy chickpea curry served with fluffy deep-fried bread. A hearty North Indian combination popular in Punjab and Delhi, perfect for weekend breakfast.",  
      "ingredients": "For Chole:\n2 cups Chickpeas (soaked overnight)\n2 large Onions (chopped)\n3 Tomatoes (pureed)\n2 tbsp Ginger-Garlic Paste\n2 tsp Chole Masala\n1 tsp Cumin Seeds\n2 Bay Leaves\n1 tsp Red Chili Powder\n1 tsp Amchur Powder\n2 Tea Bags\n3 tbsp Oil\nSalt to taste\n\nFor Bhature:\n2 cups All-Purpose Flour\n1/2 cup Yogurt\n1 tsp Sugar\n1/2 tsp Baking Soda\n1/4 tsp Baking Powder\nOil for deep frying",  
      "instructions": "1. Pressure cook soaked chickpeas with tea bags for 4 whistles\n2. Heat oil, add cumin seeds and bay leaves\n3. Add chopped onions, sauté until golden\n4. Add ginger-garlic paste and cook for 2 minutes\n5. Add tomato puree and cook until oil separates\n6. Add chole masala, red chili powder, and salt\n7. Add boiled chickpeas with some cooking water\n8. Simmer for 20 minutes, add amchur powder\n9. For bhature: Mix flour, yogurt, sugar, baking soda, and baking powder\n10. Knead into soft dough and rest for 2 hours\n11. Divide into portions and roll into oval shapes\n12. Deep fry in hot oil until puffed and golden\n13. Drain on paper towels\n14. Serve hot chole with bhature, onions, and pickle",  
      "cookingTime": 120,  
      "servings": 4,  
      "difficulty": "Hard",  
      "cuisine": "North Indian",  
      "category": "Main Course",  
      "imageUrl": "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800",  
      "createdBy": "Meera Krishnan",  
      "createdDate": "2025-01-19",  
      "rating": 4.6,  
      "isFavorite": false  
    }  
  ]  
}  
```  
  
**Understanding the Structure:**  
  
- **users array:** Contains user login credentials  
  - username: chef@recipes  
  - password: recipe@123  
    
- **recipes array:** Contains 5 sample Indian recipes  
  - Each recipe has complete details including ingredients and step-by-step instructions  
  - Ingredients are separated by newline characters (\n)  
  - Instructions are numbered steps separated by newlines  
  - Images from Unsplash (free stock photos)  
  
---  
  
## Step 0.4: Start json-server  
  
Run the following command in your terminal (make sure you're in the recipe-backend folder):  
  
```bash  
json-server --watch db.json --port 3000  
```  
  
**What this does:** Starts a REST API server on port 3000 that watches your db.json file for changes.  
  
You should see output like:  
  
```  
\{^_^}/ hi!  
  
Loading db.json  
Done  
  
Resources  
http://localhost:3000/users  
http://localhost:3000/recipes  
  
Home  
http://localhost:3000  
```  
  
**Keep this terminal open!** The server must keep running while you develop the Angular application.  
  
---  
  
## Step 0.5: Test the API Endpoints  
  
Let's verify that our backend is working correctly. Open a new terminal (don't close the json-server terminal) and test these endpoints:  
  
### Test 1: Get All Recipes  
  
```bash  
curl http://localhost:3000/recipes  
```  
  
**Expected Result:** You should see all 5 recipes in JSON format.  
  
### Test 2: Get Single Recipe  
  
```bash  
curl http://localhost:3000/recipes/1  
```  
  
**Expected Result:** Details of Hyderabadi Biryani recipe.  
  
### Test 3: Get Users (for login)  
  
```bash  
curl http://localhost:3000/users?username=chef@recipes&password=recipe@123  
```  
  
**Expected Result:** User object with id, username, password, fullName, and email.  
  
### Test 4: Search Recipes by Title  
  
```bash  
curl http://localhost:3000/recipes?title_like=Dosa  
```  
  
**Expected Result:** Masala Dosa recipe.  
  
### Test 5: Filter by Cuisine  
  
```bash  
curl http://localhost:3000/recipes?cuisine=South%20Indian  
```  
  
**Expected Result:** Masala Dosa recipe.  
  
---  
  
## Step 0.6: Test Using Browser (Alternative Method)  
  
You can also test by opening these URLs in your browser:  
  
1. **All Recipes:** http://localhost:3000/recipes  
2. **Single Recipe:** http://localhost:3000/recipes/1  
3. **Filter by Difficulty:** http://localhost:3000/recipes?difficulty=Easy  
4. **Search by Title:** http://localhost:3000/recipes?title_like=Biryani  
  
---  
  
## Understanding REST API Endpoints  
  
json-server automatically creates these endpoints:  
  
| Method | Endpoint | Purpose |  
|--------|----------|---------|  
| GET | /recipes | Get all recipes |  
| GET | /recipes/1 | Get recipe by ID |  
| GET | /recipes?cuisine=Indian | Filter recipes |  
| POST | /recipes | Create new recipe |  
| PUT | /recipes/1 | Update complete recipe |  
| PATCH | /recipes/1 | Update partial recipe |  
| DELETE | /recipes/1 | Delete recipe |  
  
**Real-world Example:**  
  
Think of these endpoints like different counters at a restaurant:  
- GET /recipes - Menu board showing all dishes  
- GET /recipes/1 - Detailed description of one specific dish  
- POST /recipes - Chef adding a new dish to menu  
- PUT /recipes/1 - Completely changing a recipe  
- DELETE /recipes/1 - Removing a dish from menu  
  
---  
  
## Common Issues and Troubleshooting  
  
### Issue 1: Port 3000 Already in Use  
  
**Error Message:** `Port 3000 is already in use`  
  
**Solution:** Use a different port:  
  
```bash  
json-server --watch db.json --port 3001  
```  
  
Don't forget to update the API URL in your Angular app later!  
  
### Issue 2: json-server Command Not Found  
  
**Error Message:** `json-server is not recognized as internal or external command`  
  
**Solution:**   
1. Reinstall json-server globally: `npm install -g json-server`  
2. Close and reopen your terminal  
3. Try again  
  
### Issue 3: Cannot Find db.json  
  
**Error Message:** `Cannot find module 'db.json'`  
  
**Solution:** Make sure you're in the correct folder where db.json exists. Use `cd recipe-backend` to navigate.  
  
---  
  
## Verification Checklist  
  
Before moving to Phase 1, make sure:  
  
- [ ] json-server is running without errors  
- [ ] You can see the welcome message with available endpoints  
- [ ] GET http://localhost:3000/recipes returns 5 recipes  
- [ ] GET http://localhost:3000/users returns 1 user  
- [ ] The terminal with json-server is kept open  
  
---  
  
## What's Next?  
  
In **Phase 1**, we'll:  
- Create the Angular 20 project  
- Set up the project structure  
- Create model files for Recipe and User  
- Configure HttpClient for API communication  
- Add global styles with RecipeBook branding  
  
---  
  
## Key Takeaways  
  
1. **json-server** is a quick way to create a REST API without writing backend code  
2. The **db.json** file acts as your database  
3. All CRUD operations are automatically available  
4. Query parameters allow filtering and searching  
5. Keep the server running while developing your Angular app  
  
---  
  
## Fun Fact  
  
Did you know? The recipes we've added represent different regions of India:  
- **Hyderabadi Biryani** - From Hyderabad (Telangana)  
- **Masala Dosa** - From South India (Tamil Nadu/Karnataka)  
- **Paneer Butter Masala** - From North India (Punjab)  
- **Gulab Jamun** - Pan-Indian dessert  
- **Chole Bhature** - From Punjab/Delhi  
  
Each recipe tells a story of India's rich culinary heritage!  
  
---  
  
**Great job completing Phase 0!** Your backend is now ready. Keep the json-server running and proceed to Phase 1 where we'll start building the Angular application.  
