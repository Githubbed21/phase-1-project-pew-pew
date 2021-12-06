const apiHeader = {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
  //api
  const get = (url) => {
    return fetch(url).then(resp => resp.json())
  }