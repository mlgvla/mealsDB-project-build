// Elements
const cuisineSelect = document.querySelector("#cuisines")
const categorySelect = document.querySelector("#categories")
const recipeContainer = document.querySelector(".recipe-container")
const selectionH1 = document.querySelector(".selection-heading")

// Function Calls
getCuisines()
getCategories()

// Event Listeners
cuisineSelect.addEventListener("change", getRecipesByCuisine)
categorySelect.addEventListener("change", getRecipesByCategory)

function getRecipesByCuisine(e) {
   const cuisine = e.target.value
   fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${cuisine}`)
      .then(r => r.json())
      .then(recipes => displayRecipes(recipes))
}

function getRecipesByCategory(e) {
   const category = e.target.value
   fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .then(r => r.json())
      .then(categories => displayRecipes(categories))
}

function displayRecipes(recipes) {
   recipeContainer.replaceChildren()
   console.log(recipes)
   selectionH1.textContent = cuisineSelect.value || categorySelect.value

   recipes.meals.forEach(recipe => renderRecipeCard(recipe))
}

function renderRecipeCard(recipe) {
   const recipeImg = document.createElement("img")
   recipeImg.src = recipe.strMealThumb
   recipeImg.alt = recipe.strMeal

   const recipeTitle = document.createElement("p")
   recipeTitle.textContent = recipe.strMeal

   const recipeId = recipe.idMeal

   recipeContainer.append(recipeImg, recipeTitle)
}
