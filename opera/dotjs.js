// ==UserScript==
// @include     *
// ==/UserScript==
window.addEventListener('DOMContentLoaded', function(){
  (function(){
    function dotjs($){
      $.ajax({
        url: 'http://localhost:3131/' + location.hostname.replace('www.','') + '.js',
        dataType: 'text',
        success: function(d){
          $(function(){ eval(d) })
        },
        error: function(){
          console.log('no dotjs server found at localhost:3131')
        }
      })
    }
    
    if (!jQuery) {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status < 200 || this.status >= 300) {
            return console.log('no dotjs server found at localhost:3131, or missing jquery')
          }
          eval(xhr.responseText)
          jQuery.noConflict()(dotjs)
        }
      }
      xhr.open('GET', "http://localhost:3131/jquery.js");
      xhr.send();
    } else {
      jQuery(dotjs)
    }
  })();
}, false);