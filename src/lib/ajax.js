import axios from 'axios';
export const axiosPost = (url, params) => {
  return axios.post(url, params).then((response)=> {
    const res = response.data;
    if (res.code == '-1') {
      window.location.href = '#/'
      throw res;
    }
    if (res.code == '1') {
      return res
    }
    throw res;
  })
}
