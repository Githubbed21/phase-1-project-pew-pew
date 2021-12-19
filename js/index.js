const apiHeader = {
  "Content-Type": "application/json",
  Accept: "application/json"
}
//api
const get = (url) => {
  return fetch(url).then(resp => resp.json())
}
const patch = (url, id, bodyObj) => {
  return fetch(url + id, {
    method: "PATCH",
    headers: apiHeader,
    body: JSON.stringify(bodyObj)
  }).then(resp => resp.json())
}
const API = {get, patch}
const gunsURL = 'http://localhost:3000/Guns/'
var typeSet = 'All'
const typeEl = document.querySelector('#type')
const listEl = document.querySelector('#list')
const gunNav = document.querySelector('#gun-nav')
const currentUser = {"id":1, "username": "Dean"}
// const feild = document.querySelector('textarea')
// const backUp = feild.getAttribute('placeholder')
// const btn = document.querySelector('btn')
// const searchBar = document.querySelector('searchbar')


const getAllGuns = () => {
  API.get(gunsURL).then(guns => guns.forEach(gun => gunPreview(gun)))
}


const gunPreview = (gun) => {
if (typeSet == "All") {
  const li = document.createElement('li')
  li.innerText = gun.name 
  li.addEventListener('click', () => gunDetails(gun))
  listEl.append(li)
//  console.log(gun.name);
}
  else if (gun.type == typeSet) {
  const li = document.createElement('li')
  li.innerText = gun.name
  li.addEventListener('click', () => gunDetails(gun))
  listEl.append(li)
//  console.log(gun.name);
  }
}

const getAllTypes = () => {
  API.get(gunsURL).then (type => type.forEach(type => typePreview(type)))
}

const typePreview = (type) => {
  const li = document.createElement('li')
  li.innerText = type.type
  li.addEventListener('click', () => settheType(type.type))
  typeEl.append(li)
}

function settheType(arg) {
  
  typeSet = arg;
  console.log(typeSet);
  while (listEl.firstChild) listEl.removeChild(listEl.firstChild)
  //return arg
   getAllGuns()
   

  }

const gunDetails = (gun) => {
  while (gunNav.firstChild) gunNav.removeChild(gunNav.firstChild)
  const h2 = document.createElement('h2')
  h2.innerText = gun.name  

  const p = document.createElement('p')
  p.innerText = gun.description

  const img = document.createElement('img')
  img.src = gun.img_url
  img.width = 480
  img.border = 5

  

  const button = document.createElement('button')
  if (likeGun) {button.innerText = 'Like'} else {
    button.innerText = 'Liked'
  }

  const usersUl = document.createElement('ul')
  usersUl.id ='users-ul'
  button.addEventListener('click', () => handleButtonClick(gun, usersUl))

  gun.users.forEach(gunUser => {
    const li = document.createElement('li')
    li.innerText = gunUser.username
    li.id =`user-${gunUser.id}`
    usersUl.append(li)
  })

  gunNav.append(img, h2, p, button, usersUl)

/** gunNav.append(img, h2, p) **/
}



const handleButtonClick = (gun, ul) => {
  if (!likeGun(gun)) {
    gun.users.push(currentUser)
    API.patch(gunsURL, gun.id, gun).then(makeLi(ul))
  }
  else {
    gun.users = gun.users.filter(gnUsr => gnUsr.id !== currentUser.id)
    API.patch(gunsURL, gun.id, gun).then(removeLi)
  }
}
  
  const makeLi = (ul) => {
    const li = document.createElement('li')
    li.innerText = currentUser.username
    li.id = `user-${currentUser.id}`
    ul.append(li)
  }
  const removeLi = () => {
    const foundLi = document.querySelector(`#user-${currentUser.id}`)
    foundLi.remove()
  }
  const likeGun = (gun) => {
    return gun.users.find(gunUsr => gunUsr.id === currentUser.id)
  }


getAllTypes()
getAllGuns()