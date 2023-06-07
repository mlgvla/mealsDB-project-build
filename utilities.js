


// Fetch Functions
function getCuisines() {
   fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
      .then(r => r.json())
      .then(cuisines => renderCuisineOptions(cuisines))
}
function getCategories() {
   fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
      .then(r => r.json())
      .then(categories => renderCategoryOptions(categories))
}

// Render Functions
function renderCuisineOptions(cuisines) {
   cuisines.meals.forEach(cuisine => {
      const option = document.createElement("option")
      option.value = cuisine.strArea
      option.textContent = cuisine.strArea
      cuisineSelect.append(option)
   })
}

function renderCategoryOptions(categories) {
   categories.meals.forEach(category => {
      const option = document.createElement("option")
      option.value = category.strCategory
      option.textContent = category.strCategory
      categorySelect.append(option)
   })
}
