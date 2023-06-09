// Elements
const cuisineSelect = document.querySelector("#cuisines")
const categorySelect = document.querySelector("#categories")
const recipeContainer = document.querySelector(".recipe-container")
const selectionH1 = document.querySelector(".selection-heading")
const recipeDetailsContainer = document.querySelector(
   ".recipe-details-container"
)
const welcomeSection = document.querySelector(".welcome")
const featuredRecipeDiv = document.querySelector(".featured")

// Function Calls
showWelcome()
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
   welcomeSection.style.display = "none"
   recipeDetailsContainer.style.display = "none"
   recipeContainer.replaceChildren()

   selectionH1.textContent = cuisineSelect.value || categorySelect.value

   recipes.meals.forEach(recipe => renderRecipeCard(recipe))

   cuisineSelect.value = ""
   categorySelect.value = ""
}

function renderRecipeCard(recipe, featured = false) {
   const { idMeal, strMealThumb, strMeal } = recipe

   const recipeId = idMeal

   const cardDiv = document.createElement("div")
   cardDiv.classList.add("card")
   cardDiv.addEventListener("click", e => getRecipeDetails(e, recipeId))

   const recipeImg = document.createElement("img")
   recipeImg.src = strMealThumb
   recipeImg.alt = strMeal

   const recipeTitleDiv = document.createElement("div")
   recipeTitleDiv.classList.add("recipe-title")
   const recipeTitle = document.createElement("h3")
   recipeTitle.textContent = strMeal

   recipeTitleDiv.append(recipeTitle)

   cardDiv.append(recipeImg, recipeTitleDiv)

   if (featured) {
      featuredRecipeDiv.append(cardDiv)
   } else {
      recipeContainer.append(cardDiv)
   }
}

function getRecipeDetails(e, id) {
   fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(r => r.json())
      .then(recipe => renderRecipeDetails(recipe.meals[0]))
}

function renderRecipeDetails(recipe) {
   welcomeSection.style.display = "none"
   recipeContainer.replaceChildren()
   recipeDetailsContainer.style.display = "grid"
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
   let ingredientsTitle = document.createElement("h3")
   ingredientsTitle.textContent = "Ingredients"
   ingredientsTitle.style.textDecoration = "underline"
   let ingredientsArea = document.querySelector(".detail-ingredients")
   ingredientsArea.replaceChildren()
   ingredientsArea.append(ingredientsTitle, ...ingredientPs)

   // Title Area
   const title = document.createElement("p")
   title.textContent = strMeal
   let titleArea = document.querySelector(".detail-title")
   titleArea.replaceChildren()
   titleArea.append(title)

   // Image Area
   document.querySelector(".detail-image").style.backgroundImage =
      "url(" + strMealThumb + ")"

   // Directions Area
   const directionsTitle = document.createElement("h3")
   directionsTitle.textContent = "Directions"
   directionsTitle.style.textDecoration = "underline"
   const directionsP = document.createElement("p")
   directionsP.textContent = strInstructions
   document
      .querySelector(".detail-instructions")
      .append(directionsTitle, directionsP)

   // Resources Area
   const youTubeLink = document.createElement("a")
   youTubeLink.href = strYoutube
   youTubeLink.textContent = `How to Make ${strMeal} on YouTube.`
   const cuisineCategory = document.createElement("p")
   cuisineCategory.textContent = `(Cuisine: ${strArea}, Category: ${strCategory})`
   document.querySelector(".detail-resources").append(youTubeLink, cuisineCategory)

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
