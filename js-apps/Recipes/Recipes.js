let display = document.getElementById("display")

let menu = ["carrot" , "broccoli",  "asparagus" ,"cauliflower" ,"corn" ,"cucumber", "green pepper","lettuce"," mushrooms" ," onion","potato"
   ,"pumpkin" , "red pepper","pizza"
]

let data = []

menu.map( function(dish){
   data+=  `<button class="dropdown-item" type="button"  onclick="choose('${dish}')" >${dish}</button>`
})

display.innerHTML= data

let allRecipes = [ ];


let recipesRow = document.getElementById('recipesRow');
let recipeDetailsDiv = document.getElementById('recipeDetails');

async function getRecipe(term)
{  
let apiResponse = await fetch(`https://forkify-api.herokuapp.com/api/search?&q=${term}`);
      apiResponse = await  apiResponse.json();
      allRecipes = apiResponse.recipes;
      displayAllRecipes();
}

function choose(dish){
    console.log(dish);
       getRecipe(dish);
}

function  displayAllRecipes() { 

   let recipes = ``;
   for (let i = 0; i < allRecipes.length; i++) {
     
      let myId = "'"+allRecipes[i].recipe_id+"'";


      recipes +=` <div onclick="getRecipeDetails(${myId})"  class="col-md-4">
         <div class="recipe">
           <img src="${allRecipes[i].image_url}" class="w-100" alt="">
             <h5 class="color-mine font-weight-bolder py-2">${allRecipes[i].title}</h5>
             <p>${allRecipes[i].publisher}</p>
           </div>
       </div>`;
   }

   recipesRow.innerHTML = recipes;
 }




async function getRecipeDetails(id)
{
   let recipeDetails ; 

   let apiResponse = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`)
      apiResponse = await apiResponse.json();
      recipeDetails = apiResponse.recipe;
      showRecipeDetails(recipeDetails)
     
}

function showRecipeDetails(recipeDetails)
{
   let details = ` <h4 class="color-mine py-2 font-weight-bolder">${recipeDetails.title}</h4>
   <img src="${recipeDetails.image_url}" class="w-100">
   <p class='p-2'>${recipeDetails.publisher}</p>
   <ul>`;
      for (let i = 0; i < recipeDetails.ingredients.length; i++) 
      {
        details +=`<li class='font-weight-bolder py-2'>${recipeDetails.ingredients[i]}</li>`;
      }
      details += `</ul>
         `;

         recipeDetailsDiv.innerHTML = details;
}
