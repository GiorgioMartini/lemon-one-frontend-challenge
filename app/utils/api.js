export function fectchPhotographers(query) {
  const opts = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query })
  };

  return fetch('http://localhost:3001', opts)
    .then(res => res.json())
    .then(json => json.data.allPhotographers)
}

export function removePhotographer(id) {
  const query = `
    mutation {
      removePhotographer(id: "${id}")
    }
  `

  const opts = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query })
  };
  fetch('http://localhost:3001', opts)
    .then(res => res.json())
    .then(json => json.data)
    .catch(console.error)
}

export function addPhotographer(name, id, email, cameras) {
  const camerasStringArray = JSON.stringify(cameras.map( camera => camera.id))
  const query = `
    mutation {
      createPhotographer(
        id: "${id}",
        name: "${name}",
        email: "${email}"
        cameras: ${camerasStringArray}
      ) {
        name
        email
        id
        cameras
      }
    }
  `

  const opts = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query })
  };
  
  return fetch('http://localhost:3001', opts)
    .then(res => res.json())
    .then(json => json.data)
}
