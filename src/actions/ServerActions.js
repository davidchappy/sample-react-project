// Dummy data in place of server pull
// import sampleData from './serverData.json'
import axios from 'axios'

export function getServerData() {
  // Access server data with preferred method here 
  // axios is available for AJAX requests

  // Guest access - no saved design
  return new Promise((resolve, reject) => {
    // axios.get('/api/app')
    axios.get('./serverData.json')
      .then(response => {
        console.log(response.data)
        resolve(response.data)
      })
      .catch(error => {
        console.error(error)
        resolve("There was an error: ", error)
      })
  })
}

export function sendState(state) {
  return new Promise((resolve, reject) => {
    axios.post('./designs', state)
    .then(response => {
      const message = 'Design Saved successfully'
      const type = 'success'
      const content = response.data
      resolve({ message, type, content })
    })
    .catch(error => {
      console.error(error)
      // const message = `${error.message}: ${error.response.statusText}`
      const message = "Couldn't save your design. Please try again a little later."
      const type = 'error'
      resolve({ message, type })
    })
  })
}