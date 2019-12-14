import axios from 'axios'

const url = 'http://localhost:5000/api/charts/'

class ChartsService {
  static getLastChart(clientIP) {
    let query = "?limit=1"
    if (clientIP) query += `&clientIP=${clientIP}`
    return axios.get(`${url}${query}`)
      .then(res => {
        return res.data[0] || null
      })
  }

  static fetchCharts(clientIP) {
    let query = ""
    if (clientIP) query = `?clientIP=${clientIP}`
    return axios.get(`${url}${query}`)
      .then(res => {
        return res.data
      })
  }

  static getChart(chartId) {
    return axios.get(`${url}${chartId}`)
      .then(res => {
        return res.data[0] || null
      })
  }

  static deleteChart(id) {
    return axios.delete(`${url}${id}`)
  }
}

export default ChartsService
