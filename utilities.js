getCuisines()
getCategories()

function getCuisines() {
   fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
      .then(r => r.json())
      .then(cuisines => renderCuisineOptions(cuisines))
}

function renderCuisineOptions(cuisines) {
   const cuisineSelect = document.querySelector("#cuisines")
   cuisineSelect.addEventListener("change", getRecipesByCuisine)

   cuisines.meals.forEach(cuisine => {
      const option = document.createElement("option")
      option.value = cuisine.strArea
      option.textContent = cuisine.strArea
      cuisineSelect.append(option)
   })
}

function getCategories() {
    fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
    .then(r => r.json())
    .then(categories => renderCategoryOptions(categories))
}

function renderCategoryOptions(categories) {
    const categorySelect = document.querySelector("#categories")
    categorySelect.addEventListener("change", getRecipesByCategory)
    
    categories.meals.forEach(category => {
       const option = document.createElement("option")
       option.value = category.strCategory
       option.textContent = category.strCategory
       categorySelect.append(option)
    })
    
}
