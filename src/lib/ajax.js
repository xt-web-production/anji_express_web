import axios from 'axios';
import config from '@/lib/config'

export const axiosPost = (url, params = {}) => {
  return axios.post(url, params).then((response)=> {
    return response.data;
  })
}
export const axiosPostVail = (url, params = {}) => {
  return axios.post(`${config.host}/queryBaseItemInfo`).then(res=>{
    const _resData = res.data.data
    if(_resData.allowEnter) {
      return axios.post(url, params).then((response)=> {
        return response.data;
      })
    }
    throw res
  })
}
