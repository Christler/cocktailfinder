const drinkDetail = document.getElementById("drink-detail"),
      drinkDetailImage = document.getElementById("drink-detail-img"),
      drinkDetailTitle = document.getElementById("drink-detail-title"),
      instructions = document.getElementById("instructions"),
      ingredients = document.getElementById("ingredients"),
      searchType = document.getElementById("search-type");

//fetch to get api data
function getDrinks(){
  closeDetail();
  let url = "";

  if(searchType.value === "drink-name"){
    url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
  }

  if(searchType.value === "ingredient"){
    url = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=";
  }

  let drinksContainer = document.getElementById("dinksContainer");
  drinksContainer.innerHTML = "";
  let search = document.getElementById('searchInput').value;

  fetch(url + search, {mode: 'cors'})
    .then(function(response) {return response.json()})
    .then(function(data) {
      let drinksLength = data.drinks.length;
      for(i = 0; i < drinksLength; i++){

        drinksContainer.innerHTML += `
          <div class="col-sm">
            <a href="#search-section" class="text-decoration-none" onclick="getDrinkDetails(${data.drinks[i].idDrink})">
            <div class="card bg-light mb-3 shadow p-3 mb-5 rounded">
              <img class="card-image" src="${data.drinks[i].strDrinkThumb}">  
              <div class="card-body text-center">
                <h5>${data.drinks[i].strDrink}</h5>
              </div>
            </div>
            </a>
          </div>
        `
      }
    })
}

function getDrinkDetails(drinkId){

  fetch("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drinkId, {mode: 'cors'})
    .then(function(response) {return response.json()})
    .then(function(data) {

      drinkDetailImage.src = data.drinks[0].strDrinkThumb;
      drinkDetailTitle.innerHTML = data.drinks[0].strDrink;
      instructions.innerHTML = data.drinks[0].strInstructions;
      ingredients.innerHTML = "";

      for(let j = 1; j <= 15; j++){
           let measureKey = "strMeasure" + j;
           let measurement = (data.drinks[0][measureKey] != null) ? data.drinks[0][measureKey] : "";
           let ingredientKey = "strIngredient" + j;
           let ingredient = (data.drinks[0][ingredientKey] != null) ? data.drinks[0][ingredientKey] : "";
          
           if(measurement + ingredient != ""){
              ingredients.innerHTML += "<li>" + measurement + " " + ingredient + "</li>";
           }
         } 

      drinkDetail.style.display = "block";
    })
}

function closeDetail(){
  drinkDetail.style.display = "none";
}

function randomDrink(){
  fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php", {mode: 'cors'})
    .then(function(response) {return response.json()})
    .then(function(data) {
      let drinkId = data.drinks[0].idDrink;
      getDrinkDetails(drinkId);
    });
}
