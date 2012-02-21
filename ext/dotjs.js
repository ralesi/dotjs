function dotjs(url) {
    $.ajax({
  url: 'http://localhost:3131/'+url.replace('www.','')+'.css',
  dataType: 'text',
  success: function(d) {
    $('head').prepend('<style type="text/css">' + d + '</style>')
  },
  error: function(){
    console.log('no dotjs server found at localhost:3131')
  }
});
$.ajax({
  url: 'http://localhost:3131/'+url.replace('www.','')+'.js',
  dataType: 'text',
  success: function(d){
    $(function(){ eval(d) })
  },
  error: function(){
    console.log('no dotjs server found at localhost:3131')
  }
})
}

// subdomain=window.location.pathname.split('/')[1]
// if (subdomain) {
// dotjs(window.location.host+'.'+subdomain)
// }
// dotjs(window.location.host)

url = document.URL.split('/')

if (url[0].indexOf('http') == 0) {
    if (url[3]) {
        dotjs(url[2]+'.'+url[3])
    }
    dotjs(url[2])
}

