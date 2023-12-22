const searchButton = document.querySelector(".search-btn");
const inputBox = document.querySelector("#input-box");
const randomMeal = document.getElementById("random-meal");
const relatedMeals = document.getElementById("related-meals");
const ingredientsDiv = document.getElementById('Sudhan')
const ingredientsDiv2 = document.getElementById('Sudhan2')

// Fetching the URL from the other server
let url = "https://www.themealdb.com/api/json/v1/1/random.php";

fetch(url)
.then((response) => response.json())
.then((data) => {
    let myDish = data.meals[0];
    randomMeal.innerHTML = `
    <div class="meal">
    <span style="background-image: url(${myDish.strMealThumb})"></span>
    <span>${myDish.strMeal}</span>
    <span>${myDish.strArea}</span>
    </div>`;
    let a = "<ul>"
    for(let i = 1 ; i <= 20 ; i++){
        const ingredient = myDish[`strIngredient${i}`]
        if (ingredient){
            a+= `<li>${ingredient}\n</li>`
        }
    }
    a += "</ul>  "
    let ingredientHtml = `<h2>Receipe Name : ${myDish.strMeal}</h2>
    ${a}`
    let stepsHtml = `<h3>Follow these steps to get your fanstastic dish:</h3>
    <p>${myDish.strInstructions}<p>`
    
    ingredientsDiv.innerHTML = ingredientHtml
    ingredientsDiv2.innerHTML = stepsHtml
});
console.log(randomMeal);


searchButton.addEventListener('click', function() {
    let searchQuery = inputBox.value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`)
    .then((response) => response.json())
    .then((data) => {
        relatedMeals.innerHTML = '';
        if (data.meals) {
            data.meals.slice(0, 12).forEach(meal => { 
                relatedMeals.innerHTML += `
                <div class="meal" dataMealId = "${meal.idMeal}">
                <span style="background-image: url(${meal.strMealThumb})"></span>
                <span>${meal.strMeal}</span>
                <span>${meal.strArea}</span>
                

                </div>`;
                
            });
        } else {
            relatedMeals.innerHTML = '<h3>Sorry, we couldn\'t find any meals matching your search query.</h3>';
        }
    });
});

const popUp = document.getElementById('pop-up');
const body = document.body;
const overlay = document.getElementById('overlay')
randomMeal.addEventListener("click", function(){
    popUp.style.display = "block";
})
popUp.addEventListener("click", function(){
    popUp.style.display = "none";
})
relatedMeals.addEventListener("click", function(){
    popUp.style.display = "block";
})







