let addToy = false;
let totalToys = 8

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
  getAllToys()
});

document.querySelector('.add-toy-form').addEventListener("submit", handleSubmit)


function handleSubmit(e){
  e.preventDefault()
  totalToys++
  let toyObj = {
    id:totalToys,
    name:e.target.name.value,
    image:e.target.image.value,
    likes:0
  }
  renderToy(toyObj)
  postToy(toyObj)
}

function postToy(toyObj){
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(toyObj)
  }) 
  .then(res => res.json())
  .then(toy => console.log(toy))
}

function renderToy(toyItem) {
  let card = document.createElement('div')
  card.className = 'card'
  card.id = toyItem.id
  card.innerHTML = `
    <h2>${toyItem.name}</h2>
    <img src=${toyItem.image} class="toy-avatar" />
    <p><span class="like-count">${toyItem.likes}</span>Likes</p>
    <button class="like-btn" id="${toyItem.id}">Like ❤️</button>
  `
  document.querySelector('#toy-collection').appendChild(card)
  card.querySelector('.like-btn').addEventListener('click', () => {
    toyItem.likes++
    card.querySelector('span').textContent = toyItem.likes
    updateToy(toyItem)
  });
}

function updateToy(toyObj) {
  console.log(toyObj.id)
  fetch(`http://localhost:3000/toys/${toyObj.id}`, {
    method: 'PATCH',
    headers:{
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": toyObj.likes
    })
  })
  .then(res => res.json())
  .then(toy => console.log(toy))

}

function getAllToys() {
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(toyData => toyData.forEach(toy => renderToy(toy)))
}
