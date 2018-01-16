import axios from 'axios';
import { MessageBox } from 'mint-ui';
export const axiosPost = (url, params = {}) => {
  return axios.post(url, params).then((response)=> {
    const res = response.data;
    if (res.code == '-1') {
      // window.location.href = '#/'
      // MessageBox('提示', '直播还没开始！')
      throw res;
    }
    if (res.code == '1') {
      return res
    }
    throw res;
  })
}
