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

// Recipe Array for 

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
   // hide the recipe card
   recipeContainer.replaceChildren()

   selectionH1.textContent = cuisineSelect.value || categorySelect.value

   recipes.meals.forEach(recipe => renderRecipeCard(recipe))

   cuisineSelect.value = ""
   categorySelect.value = ""
}

function renderRecipeCard(recipe) {
   // hide the recipes container
   const { idMeal, strMealThumb, strMeal } = recipe

   const recipeId = idMeal

   const cardDiv = document.createElement("div")
   cardDiv.classList.add("card")

   const recipeImg = document.createElement("img")
   recipeImg.src = strMealThumb
   recipeImg.alt = strMeal
   // maybe make this click event on the entire card
   recipeImg.addEventListener("click", e => getRecipeDetails(e, recipeId))

   const recipeTitleDiv = document.createElement("div")
   recipeTitleDiv.classList.add("recipe-title")
   const recipeTitle = document.createElement("h3")
   recipeTitle.textContent = strMeal

   recipeTitleDiv.append(recipeTitle)

   cardDiv.append(recipeImg, recipeTitleDiv)
   recipeContainer.append(cardDiv)
}

function getRecipeDetails(e, id) {
   fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(r => r.json())
      .then(recipe => renderRecipeDetails(recipe.meals[0]))
}

function renderRecipeDetails(recipe) {
   recipeContainer.replaceChildren()
   const {
      strMeal,
      strArea,
      strCategory,
      strMealThumb,
      strInstructions,
      strYoutube,
   } = recipe

   // Ingredients Area
   let ingredients = parseIngredients(recipe)
   let ingredientPs = ingredients.map(ingredient => {
      let ingredientP = document.createElement("p")
      ingredientP.textContent = ingredient
      return ingredientP
   })
   let ingredientsArea = document.querySelector(".detail-ingredients")
   ingredientsArea.replaceChildren()
   ingredientsArea.append(...ingredientPs)

   // Title Area
   const title = document.createElement("p")
   title.textContent = strMeal
   let titleArea = document.querySelector(".detail-title")
   titleArea.replaceChildren()
   titleArea.append(title)

   // Image Area
   document.querySelector(".detail-image").style.backgroundImage =
      "url(" + strMealThumb + ")"
   document.querySelector(".detail-instructions").textContent = strInstructions

   // let nameH1 = document.createElement("h1")
   // let cuisineP = document.createElement("p")
   // let categoryP = document.createElement("p")
   // let recipeImg = document.createElement("img")
   // let ingredientsP = document.createElement("p") // will need to parse these
   // let instructionsP = document.createElement("p")
   // let youTubeLink = document.createElement("a")

   // nameH1.textContent = strMeal
   // cuisineP.textContent = strArea
   // categoryP.textContent = strCategory
   // recipeImg.src = strMealThumb
   // ingredientsP.textContent = "To be replaced with parsed ingredients"
   // instructionsP = strInstructions
   // youTubeLink.href = strYoutube
   // youTubeLink.textContent = `${strMeal} on YouTube`

   // selectionH1.textContent = ""
   // recipeContainer.replaceChildren()
   // recipeContainer.append(
   //    recipeImg,
   //    nameH1,
   //    cuisineP,
   //    categoryP,
   //    ingredientsP,
   //    instructionsP,
   //    youTubeLink
   // )
}
