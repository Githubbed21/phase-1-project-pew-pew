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
  const listEl = document.querySelector('#list')
  const gunNav = document.querySelector('#gun-nav')
  const feild = document.querySelector('textarea')
  const backUp = feild.getAttribute('placeholder')
  const btn = document.querySelector('btn')
  const searchBar = document.querySelector('searchbar')
  const currentUser = {'id':1, "username": 'Dean'}
  let gunsUrl = [];
  
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
    h2.innerText = gun.name

    const p = document.createElement('p')
    p.innerText = gun.description

    const img = document.createElement('img')
    img.src = gun.img_url
    img.width = 480
    img.border = 5
    
    const usersUl = document.createElement('ul')
    usersUl.id = 'users-ul'

    button.addEventListener('click', () => handleButtonClick(gun, usersUl))
    gun.users.forEach(gunUser => {
        const li = document.createElement('li')
        li.innerText = gunUser.username
        li.id = `user-${gunUser.id}`
        usersUl.append(li)
      })
      gunNav.append(img, h2, p, button)
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
    
    
    // searchBar.addEventListener('keyup', (e) => {
    //     const searchString = e.target.value.toLowerCase();
    //     //if searchStr is uppercase -> lowercase
    //     //if searchStr is lowercase -> lowercase
    //     const filterGuns = guns.filter((gun) => {
    //      return (
    //        guns.name.toLowerCase().includes( searchString) || 
    //        guns.type.toLowerCase().includes(searchString)
    //      )
    //     })
    //     displayGuns(filterGuns);
    // })

    
  feild.onfocus = function() {
    this.setAttribute('placeholder', '');
    this.style.borderColor = '#333';
  }
  
  feild.onblur = function() {
    this.setAttribute('placeholder', backUp)
    
  }

    const addComment =
    
  getAllGuns()


  // select tag (drop down menu) drop change event-- other things i could do image and name in grid, click on it to drop down description
