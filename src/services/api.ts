import axios from 'axios'
import { CKEDITOR_API, APIGW_PRELUDE_AUTH_TOKEN } from '../configs'

export const AXIOS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  // eslint-disable-next-line quote-props
  'Authorization': `Bearer ${APIGW_PRELUDE_AUTH_TOKEN}`,
  'Content-Type': 'application/json;charset=UTF-8',
}

const ckcsapi = axios.create({
  baseURL: CKEDITOR_API,
  headers: AXIOS_HEADERS,
})

export default ckcsapi
