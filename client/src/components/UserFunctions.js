import axios from 'axios'

export const register = newUser => {
  return axios
    .post('users/register', {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      password: newUser.password
    })
    .then(response => {
      console.log('Registered')
    })
}

export const login = user => {
  return axios
    .post('users/login', {
      email: user.email,
      password: user.password
    })
    .then(response => {
      localStorage.setItem('usertoken', response.data)
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}


export const add_new_item = add_item => {
  return axios
    .post('users/add_items', {      
      name: add_item.name,
      publisher:add_item.publisher,
      description: add_item.description,
      img: add_item.img,
      publisher_id: add_item.publisher_id
    })
    .then(response => {
      console.log('item inserted')
    })
}

export const add_new_page = add_item => {
  return axios
    .post('http://localhost:5000/users/add_pages', add_item, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      console.log('Page inserted');
    })
    .catch(err => {
      console.error(err);
    });
}



export const update_req = update => {
  return axios
    .put('/users/edit', { 
      id:update.id,     
      name: update.name,
      publisher:update.publisher,
      description: update.description,
      img: update.img,
     // publisher_id: add_item.publisher_id
    })
    .then(response => {
      console.log('item updated')
    })
} 