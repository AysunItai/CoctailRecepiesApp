const search=document.getElementById('search'),
submit=document.getElementById('submit'),
random=document.getElementById('random'),
coctailsEl=document.getElementById('coctails'),
resultHeading=document.getElementById('result-heading'),
single_coctailEl=document.getElementById('single-coctail');


//search coctails and fetch from API;

function searchCoctails(e){
    e.preventDefault();
    single_coctailEl.innerHTML='';
    const term=search.value;
    
if(term.trim()){
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${term}`)
    .then(res=>res.json())
    .then(data=>{
        
        resultHeading.innerHTML=`<h3>Search results for '${term}':</h3>`;
        if(data.drinks===null){
            resultHeading.innerHTML=`<p>There are no search results.Try again!!!</p>`;
          }else{
        coctailsEl.innerHTML=data.drinks.map(drink =>
            `<div class="coctail">
            <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}"/>
            <div class="coctail-info" data-coctailID="${drink.idDrink}">
            <h3>${drink.strDrink}</h3>
            </div>
            </div>`
        ).join('');
          }
    })
    search.value='';


}else{
   alert( 'please enter a search value!');
}
}

//get coctail by ID
function getCoctailByID(coctailID){
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${coctailID}`)
    .then(res=>res.json())
    .then(data=>{
        const coctail =data.drinks[0];
        addCoctailToDOM(coctail);
        
        
        })
        
        var elmntToView = document.getElementById("single-coctail");
        elmntToView.scrollIntoView(); 
}
//fetch random meal
function getRandomCoctail(){
    //clear coctailss and heading
    coctailsEl.innerHTML='';
    resultHeading.innerHTML='';
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
    .then(res => res.json())
    .then(data => {
        const coctail=data.drinks[0];
        const ingredients=[];

        for(let i=1;i<=15;i++){
         if(coctail[`strIngredient${i}`]){
             ingredients.push(`${coctail[`strIngredient${i}`]}-${coctail[`strMeasure${i}`]}`);
         }else{
             break;
         }
        }
        single_coctailEl.innerHTML=` 
        <div class="single-coctail" id="single-coctail">
        <h1>${coctail.strDrink}</h1>
        <img src="${coctail.strDrinkThumb}" alt="${coctail.strDrink}" />
        
        <div class="main">
        <h2>Ingredients</h2>
        <ul>
        ${ingredients.map(ing=>`<li>${ing}</li>`).join('')}
        </ul>
        <p>
        ${coctail.strInstructions}</p>
        </div>
        
        </div>
        `;
        
    })

}

//ADD COCTAIL TO DOM

function addCoctailToDOM(coctail){
    const ingredients=[];

    for(let i=1;i<=15;i++){
     if(coctail[`strIngredient${i}`]){
         ingredients.push(`${coctail[`strIngredient${i}`]}-${coctail[`strMeasure${i}`]}`);
     }else{
         break;
     }
    }
    single_coctailEl.innerHTML=` 
    <div class="single-coctail" id="single-coctail">
    <h1>${coctail.strDrink}</h1>
    <img src="${coctail.strDrinkThumb}" alt="${coctail.strDrink}" />
    
    <div class="main">
    <h2>Ingredients</h2>
    <ul>
    ${ingredients.map(ing=>`<li>${ing}</li>`).join('')}
    </ul>
    <p>
    ${coctail.strInstructions}</p>
    </div>
    <button class="single-coctail-btn">Go Back To Search Results</button>
    </div>
    `;

    var elmntToView = document.getElementById("single-coctail");
elmntToView.scrollIntoView(); 
const singleCoctailBtn=document.querySelector(".single-coctail-btn");


singleCoctailBtn.addEventListener('click',()=>{
    coctailsEl.scrollIntoView();
})
  }


submit.addEventListener('submit',searchCoctails);
random.addEventListener('click',getRandomCoctail);
coctailsEl.addEventListener('click',(e)=>{
   /*  if(e.target.classList.contains('coctail-info')){
        single_coctailEl.scrollIntoView();
        const coctailID=e.target.getAttribute('data-coctailID');
        getCoctailByID(coctailID);
        console.log(coctailID)
    } */

    const coctailInfo = e.composedPath().find(item =>{
        if(item.classList){
            return item.classList.contains('coctail-info');
        }else{
            return false;
        }
    });
 if(coctailInfo){
     const coctailID=coctailInfo.getAttribute('data-coctailid');
    
     getCoctailByID(coctailID);
 }  
 var elmntToView = document.getElementById("single-coctail");
elmntToView.scrollIntoView(); 
    
      
})