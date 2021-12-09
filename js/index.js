const apiHeader = {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
  //api
  const get = (url) => {
    return fetch(url).then(resp => resp.json())
  }
  const patch = (url) => {
    return fetch(url+ {
      method: "PATCH",
      headers: apiHeader,
      body: JSON.stringify(bodyObj)
    }).then(resp => resp.json())
  }
  const API = {get, patch}

  const gunsURL = 'http://localhost:3000/Guns/'
  const listEl = document.querySelector('#list')
  const gunNav = document.querySelector('#gun-nav')

  const getAllGuns = () => {
    API.get(gunsURL).then(guns => guns.forEach(gun => gunPreview(gun)))
  }
  const gunPreview = (gun) => {
    const li = document.createElement('li')
    li.innerText = gun.name
    li.addEventListener('click', () => gunDetails(gun))
    listEl.append(li)
  }
  const gunDetails = (gun) => {
    while (gunNav.firstChild) gunNav.removeChild(gunNav.firstChild)
    const h2 = document.createElement('h2')
    h2.innerText = gun.title
    const p = document.createElement('p')
    p.innerText = gun.description
    const img = document.createElement('img')
    img.src = gun.img_url
  }
  gunNav.append()

  getAllGuns()


  // select tag (drop down menu) drop change event-- other things i could do image and name in grid, click on it to drop down description