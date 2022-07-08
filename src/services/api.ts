import axios from 'axios'
import { CKCS_URL } from '../configs'

export const AXIOS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Authorization',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  'Content-Type': 'application/json;charset=UTF-8',
}

const ckcsapi = axios.create({
  baseURL: CKCS_URL,
  headers: AXIOS_HEADERS,
})

ckcsapi.defaults.headers.get['Access-Control-Allow-Origin'] = '*'

export default ckcsapi
