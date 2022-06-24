import axios from 'axios'

export const AXIOS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Authorization',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  'Content-Type': 'application/json;charset=UTF-8',
}

const ckcsapi = axios.create({
  baseURL: 'https://3a79-2804-14c-65a7-8267-d8bd-fde8-1a24-55ed.sa.ngrok.io/ckcs/',
  headers: AXIOS_HEADERS,
})

ckcsapi.defaults.headers.get['Access-Control-Allow-Origin'] = '*'

export default ckcsapi
