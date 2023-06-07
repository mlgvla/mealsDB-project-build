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

   cuisineSelect.value = ""
   categorySelect.value = ""
}

function renderRecipeCard(recipe) {
    //destructure properties
   const recipeId = recipe.idMeal

   const recipeImg = document.createElement("img")
   recipeImg.src = recipe.strMealThumb
   recipeImg.alt = recipe.strMeal
   recipeImg.addEventListener("click", e => getRecipeDetails(e, recipeId))

   const recipeTitle = document.createElement("p")
   recipeTitle.textContent = recipe.strMeal

   recipeContainer.append(recipeImg, recipeTitle)
}

function getRecipeDetails(e, id) {
   fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(r => r.json())
      .then(recipe => renderRecipeDetails(recipe.meals[0]))
}

function renderRecipeDetails(recipe) {
    //destructure properties
   console.log(recipe)
   let nameH1 = document.createElement("h1")
   let cuisineP = document.createElement("p")
   let categoryP = document.createElement("p")
   let recipeImg = document.createElement("img")
   let ingredientsP = document.createElement("p") // will need to parse these
   let instructionsP = document.createElement("p")
   let youTubeLink = document.createElement("a")

   nameH1.textContent = recipe.strMeal
   cuisineP.textContent = recipe.strArea
   categoryP.textContent = recipe.strCategory
   recipeImg.src = recipe.strMealThumb
   ingredientsP.textContent = "To be replaced with parsed ingredients"
   instructionsP = recipe.strInstructions
   youTubeLink.href = recipe.strYoutube
   youTubeLink.textContent = `${recipe.strMeal} on YouTube`


   selectionH1.textContent = ""
   recipeContainer.replaceChildren()
   recipeContainer.append(
      recipeImg,
      nameH1,
      cuisineP,
      categoryP,
      ingredientsP,
      instructionsP,
      youTubeLink
   )
}
