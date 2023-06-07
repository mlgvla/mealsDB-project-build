// Elements
const cuisineSelect = document.querySelector("#cuisines")
const categorySelect = document.querySelector("#categories")

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
      .then(recipes => console.log(recipes))
}

function getRecipesByCategory(e) {
   const category = e.target.value
   fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .then(r => r.json())
      .then(categories => console.log(categories))
}
