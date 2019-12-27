import axios from 'axios'

const url = 'https://cors-anywhere.herokuapp.com/http://api.ipify.org/?format=json'

class IpService {
  static getClientIP() {
    return axios.get(url)
      .then(res => {
        return res.data
      })
  }
}

export default IpService
