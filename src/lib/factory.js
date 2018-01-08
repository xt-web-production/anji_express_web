export const getParam = (url,name)=> {
    var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i");
    if (reg.test(url)) return unescape(RegExp.$2.replace(/\+/g, " "));
    return "";
}

export const itemNames = {
  '1' : '开场节目',
  '2' : '表演2',
  '3' : '表演3',
  '4' : '表演4',
  '5' : '表演5',
  '6' : '表演6',
  '7' : '表演7',
  '8' : '表演8'
}
