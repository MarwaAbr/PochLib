
let principalTitle =document.getElementsByClassName("title");
let principalTitleText = '<p>';
principalTitleText+= '<img src="logo-page.png" alt="logo" id= "logoImg" />';
principalTitleText+= '<h1>Poch`Lib</h1>';
principalTitleText += '</p>';
principalTitle[0].innerHTML = principalTitleText;      //titre de la page avec le logo


var newDiv = document.createElement("div");
newDiv.setAttribute ("id", "newDiv");
let elts = document.getElementsByClassName('h2');
elts[0].after(newDiv);

newButton ("addButton", "Ajouter un livre", newDiv);   // bouton "Ajouter un livre"   
addButton.style.display= "block";   

var contentDiv = document.createElement("div");       
let theContent = document.getElementById ("content");
content.appendChild(contentDiv);
contentDiv.setAttribute ("id", "contentDiv");

verifReload();                                        // Vérifier si la page est Rechargée et récuperation de la session

bookDeletion();                                       // En cas de suppression des livres récupérés


addButton.addEventListener('click', function() {     // On écoute l'événement click button"Ajouter un livre"
  
addButton.style.display= "none";

let formSearch = document.createElement("form");
newDiv.appendChild(formSearch);


newForm (formSearch, "title","titleField","Titre du livre*"); //Création de deux input dans la formulaire formSearch
newForm(formSearch,"author", "authorField","Auteur*");


let research= document.createElement ("p");
research.setAttribute ("id", "researchButtons");
newDiv.appendChild(research);


newButton ("buttonResearch", "Rechercher",research); //boutons "Rechercher" et "Cancel"
newButton ("buttonCancel", "Annuler",research);


var newResearch = document.createElement("div");
newDiv.after(newResearch);

buttonResearch.addEventListener('click', function() { // On écoute l'événement click button"Rechercher"

let title = titleField.value;
let author = authorField.value;
if (title!= '' && author!='' ){
   fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${title},inauthor:${author}&Key=AIzaSyBSCkoZa48-eZeJfUz72GlTkhUIFCS6lxg`)    // Requet fetch à l'API Google Books
 
  .then(function(res) {
    if (res.ok) {
      return res.json();
     console.log(res.json);
    }
  })
  .then(function(value) {
    console.log(value);
   
    displayResult (value, newResearch);            // affichage des résultats de la recherche (les livres)


    let buttonBook =document.getElementsByClassName('faClickable');
    let bookSection = document.getElementsByClassName('bookResult');
bookSelect (contentDiv, buttonBook, bookSection, value);  //Ajout ou suppression d'un livre à la Poch'liste

  })

  .catch(function(err) {

    console.log(err);
    // Une erreur est survenue
  });
 
}

else  { newResearch.innerHTML = '<h4 style="color:red">*Chmaps Obligatoires</h4>';}

});


buttonCancel.addEventListener('click', function() {  //on écote click button "Annuler"

newDiv.removeChild(formSearch); 
newDiv.removeChild(research); 

let elm = document.getElementById("myBooks");
elm.removeChild(newResearch); 
addButton.style.display= "block";
    });

});

                                 /**** Les fonctions appelées****/

function displayResult (resultValue, researchDiv){  /*Affichage des livres trouvés*/
    let affichage = '<hr>';
    affichage += '<h2>Resultats de recherche </h2>';
    if (resultValue.totalItems =='0')
        { researchDiv.innerHTML = '<h3>"Aucun livre n’a été trouvé"</h3>';}
    else {
      affichage += '<div id= "books">';
    for (let number of resultValue.items) {
    affichage+= `<section class="bookResult" id=${number.id}>`;
 affichage+= '<i class="fas fa-bookmark faClickable"></i>'; 
    affichage+= `<h3>Titre: ${number.volumeInfo.title}</h3>`;

    affichage+= `<h3 id="bookId">id: ${number.id}</h3>`;
    affichage+= `<h3>Auteur: ${number.volumeInfo.authors[0]}</h3>`;

      if (number.volumeInfo.description === undefined) 
        {affichage+= '<p>Description: Information manquante</p>';}
      else if (number.volumeInfo.description.length<= 200)
        {affichage+= `<p>Descrition: ${number.volumeInfo.description}</p>`;}
      else {affichage+= `<p>Descrition: ${number.volumeInfo.description.substr(0,200)}...</p>`;}

      if (number.volumeInfo.imageLinks === undefined) {affichage+='<p style="text-align:center"><img src ="unavailable1.png" class= "imageBook"/></p>';}

      else {affichage+= `<p style="text-align:center"><img src= ${number.volumeInfo.imageLinks.smallThumbnail} alt = "image" class= "imageBook"/></p>`;}

    
    affichage+= '</section>';
}
   affichage += '</div>';
   researchDiv.innerHTML = affichage;

}}

function newButton (buttonId, buttonText, buttonBlock){ /*création d'un nouveau bouton*/

var buttonResearch = document.createElement("button") ;
buttonResearch.setAttribute ("id", buttonId);

var tx = document.createTextNode(buttonText);  
    buttonResearch.appendChild(tx);  
   buttonBlock.appendChild(buttonResearch);
}

function newForm (formSearch, name, id, labelTxt){    /*formulaire de recherche*/
    let myForm= document.createElement("p");
formSearch.appendChild(myForm);
var newField = document.createElement("input") ;
    newField.setAttribute("type","search");
    newField.setAttribute("name",name);
    newField.setAttribute("id",id);
    newField.style = "margin:1%";
var newLabel = document.createElement("label");
    newLabel.style ="text-align:left; margin-left:1%";
    var lt = document.createTextNode(labelTxt); 
    newLabel.appendChild(lt);
    newLabel.setAttribute("for",id);
    myForm.appendChild(newLabel);
    myForm.appendChild(newField);

}

function bookSelect (contentDiv, buttonBook, bookSection, value){ /*Ajout ou suppression d'un livre de la Poch'liste*/
    
   
for (let i=0; i< buttonBook.length; i++ ){
  
buttonBook[i].addEventListener('click',function(){                      //Ajout d'un Livre
buttonBook [i].style. color =  "#98abef" ;
sectionId=bookSection[i].getAttribute ("id");
let myId = document.getElementById (`sectionthis${sectionId}`);

 if (contentDiv.contains(myId)){setTimeout(function() {alert('Vous ne pouvez pas ajouter deux fois le même livre')});

}

else {
var mySection = bookSection[i].cloneNode(true);
mysectionIdd= mySection.getAttribute;

mySection.setAttribute("id", `sectionthis${sectionId}`);
  contentDiv.appendChild(mySection);
var trashBook = document.createElement ("i");
trashBook.setAttribute("class", "fas fa-trash trashIcon");
  trashBook.setAttribute("id", `this${sectionId}`);
 mySection.replaceChild(trashBook,buttonBook[value.items.length]);

  sessionStorage.setItem(`sectionthis${sectionId}`, mySection.outerHTML);
console.log(`sectionthis${sectionId}`);
  
console.log (`this${sectionId}`);
 trashBook.addEventListener ('click',function(){                      //Suppression d'un livre
   
  contentDiv.removeChild(mySection);
thisSection= mySection.getAttribute ("id");
console.log (thisSection);
  sessionStorage.removeItem(thisSection);
  buttonBook [i].style. color =  "blue" ;
 });


}

   });

}}

function verifReload(){ //vérifier si la page est rechargée et récuperation de sessionStorage

if (performance.navigation.type == performance.navigation.TYPE_RELOAD) { //en cas de réchargement de la page
 let storageAffich ="";
  
  for (const [key, value] of Object.entries(sessionStorage)) { // récupération de la poch'liste
    
  console.log (storageAffich);
    console.log({key, value});
    let storage = sessionStorage.getItem(key);
     storageAffich += storage;
     
}

 contentDiv.innerHTML=storageAffich; 
}}

function bookDeletion() { //suppression d'un ou plusieurs livres récuperés de Session Storage
for (const [key, value] of Object.entries(sessionStorage)) { 
    

     let sectionId = document.getElementById (key);
     console.log (sectionId);
     let trashBookId =key.slice(7);
     console.log (trashBookId);
     var trashBookStorage  = document.getElementById (trashBookId);
     trashBookStorage.addEventListener ('click', function(){
    contentDiv.removeChild(sectionId);
    sessionStorage.removeItem(key);
     });
}}