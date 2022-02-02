let display = document.getElementById("display")

let menu = ["carrot" , "broccoli",  "asparagus" ,"cauliflower" ,"corn" ,"cucumber", "green pepper","lettuce"," mushrooms" ," onion","potato"
   ,"pumpkin" , "red pepper","pizza ","tomato" , "beetroot" , "brussel sprouts" , "peas" , "zucchini" , "radish" , "sweet potato" ,"artichoke","leek"
   ,"cabbage" , "celery" , "chili" , "garlic" ,"basil" , "coriander"
]






let data = []

menu.map( function(dish){
   data+=  `<a  href="#data">
   <button id="but"  class="btn btn-secondary m-2"  onclick="choose('${dish}')" >${dish}</button>
   </a>
  `
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


      recipes +=`
     
      <div onclick="getRecipeDetails(${myId})"  class="col-md-4 mt-4">
            <div class="text">
                    <h5 class="text-info font-weight-bolder py-2">${allRecipes[i].title}</h5> 
       <p>${allRecipes[i].publisher}</p>
      </div>
      <a name="data" href="#details">  <img src="${allRecipes[i].image_url}" class="img-fluid  pointer" alt="">     </a>
    </div>

       `;
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
   let details = ` <a name="details"><h4 class="color-mine py-2 font-weight-bolder">${recipeDetails.title}</h4>
   <div>
   <img src="${recipeDetails.image_url}" class="w-100 ">
   <p class='p-2'>${recipeDetails.publisher}</p>
   <ul>`;
      for (let i = 0; i < recipeDetails.ingredients.length; i++) 
      {
        details +=`<li class='font-weight-bolder py-2'>${recipeDetails.ingredients[i]}</li>`;
      }
      details += `</ul> </div></a>
         `;

         recipeDetailsDiv.innerHTML = details;
}

// function search () {
//    let search = document.getElementById("search").value
//    let searched = []
//    let results =""
//    for (let i = 0 ; i<menu.length; i++ ) {
 
//      if (menu[i].toUpperCase().includes(search.trim().toUpperCase()) ) {
//        searched.push(menu[i]) ;
//      }  
//    }
//    for (let i = 0 ; i<searched.length; i++ ) {
//       results += `<h5 >${searched[i]}</h5>`
//    }
//    document.getElementById("results").innerHTML=results
//    console.log(results)
// }
