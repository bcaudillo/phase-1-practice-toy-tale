let addToy = false;
let toyCollectionDiv = document.querySelector("div#toy-collection")
let toyForm = document.querySelector(".add-toy-form")
//. is a class


//no second arguement means this is an initial get request
//array you can do for each. You cannot for an object
//object use dot notation. Array bracket notation
//object.keys(obj) turns keys into array
//object.values(obj) to turn values into array
fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then((toysArray)=>{
    //Object.keys(obj) or Object.values(obj)
    toysArray.forEach(function(toyObj){
      turnToyToCard(toyObj)
      //possible to do toysArray.forEach(turnToyToCard)

    })
  })
// {}-> <HTML/>
//Goal of fucntion: Turn an object into HTML
function turnToyToCard(toy){
  let toyCardDiv=document.createElement("div")
    toyCardDiv.className ="card"

  let toyNameH2 = document.createElement("h2")
    toyNameH2.innerText=toy.name
  
  let toyImage = document.createElement("img")
    toyImage.src = toy.image
    toyImage.className = "toy-avatar"
    //alt is the alt attribute this is what will show if the image does not load
    toyImage.alt = toy.name
  
  let likesP = document.createElement("p")
    likesP.innerText = `${toy.likes} Likes`

  let likeButton = document.createElement("button")
    likeButton.className = "like-btn"
    likeButton.innerText = "Like <3"


  toyCardDiv.append(toyNameH2, toyImage, likesP,  likeButton)
  //append takes multiple vs appendChild that only takes one arguement. Append does everything appendChild does
  toyCollectionDiv.append(toyCardDiv)


  likeButton.addEventListener("click", function(event){
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
      "Content-type": "application/json"
      },
      body: JSON.stringify({
        likes: toy.likes + 1
      })
    })
      .then(resp => resp.json())
      .then(function(updatedToyObj){
        toy.likes = updatedToyObj.likes
      // changing object
      //toy = updatedToyObj
      //toy is a Plain Old Java Object: different than what you can do with HTML element
      //likesP HTML element
        likesP.innerText = `${updatedToyObj.likes} Likes`
    })
  })//like button event listener ends here

}//turn toy to card ends here

//Stable Element Event Listenr on global level- 90% effective
  //Rare for you to do this inside of another event listener
toyForm.addEventListener("submit", function(e){
  e.preventDefault()
  let name = e.target.name.value
  let image = e.target.image.value
  console.log(name)
  console.log(image)
  //e.target.querySelectorAll("input")<- node list of all inputs. Grab specific by [] notation
  // e.target.querySelector("[name= 'name']")
  newCard(name, image)
  


  })

function newCard(newName, newImage){
  fetch("http://localhost:3000/toys",{
    method:'POST',
    headers: {
      'Content-Type': 'application/json',

    },
    body: JSON.stringify({
      name: newName,
      image: newImage,
      likes: 0
    })
  })
    .then(resp => resp.json())
    .then(function(newToy){
      turnToyToCard(newToy)
    })
}

//Submit event fires on the <form> element itself and not on any <button> or <input type = "submit">

//DOMContentLoaded after the document has been loaded. Then the callback is to be executed. *Browser event. Side effect: open console. Let is block scoped, variables can go in but not out. Inaccessable outside of curly block
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
