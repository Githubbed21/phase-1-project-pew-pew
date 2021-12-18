const apiHeader = {
  "Content-Type": "application/json",
  Accept: "application/json"
}
//api
const get = (url) => {
  return fetch(url).then(resp => resp.json())
}
const patch = (url, bodyObj) => {
  return fetch(url+ {
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
const feild = document.querySelector('textarea')
// const backUp = feild.getAttribute('placeholder')
const btn = document.querySelector('btn')
// const searchBar = document.querySelector('searchbar')
// const currentUser = {'id':1, "username": 'Dean'}


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
  while (listEl.firstChild) listEl.removeChild(listEl.firstChild)
  // return arg
  getAllGuns()
  console.log(typeSet);

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
 
    gunNav.append(img, h2, p)
  }
  
  const handleButtonClick = (gun, ul) => {
    if (!likeGun(gun)) {
      gun.push()
      API.patch(gunsURL, gun.id, gun).then(makeLi(ul))
    }
    else {
      gun.users = gun.users.filter(gnUsr => gnUsr.id !== currentUser.id)
      API.patch( gun.id, gun).then(removeLi)
    }
    
    const button = document.createElement('button')
    if (likeGun) {button.innerText = 'Like'} else {
      button.innerText = 'Liked'
    }
    const likeGun = (gun) => {
      return gun.users.find(gunUsr => gunUsr.id === currentUser.id)
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


//const addComment =

getAllTypes()
getAllGuns()