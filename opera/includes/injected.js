// window.addEventListener('DOMContentLoaded', function() {
// Use load instead of DOMContentLoaded
window.addEventListener('load', function() {

    // Specify the path to the stylesheet here:

    var path = 'http://localhost:3131/' + window.location.hostname.replace('www.','');
    var subdomain=window.location.pathname.split('/')[1]
    var nextdomain=window.location.pathname.split('/')[2]
    var subpath = 'http://localhost:3131/' + window.location.hostname.replace('www.','')+'.'+subdomain;

    // Error check for the JavaScript filename.
    if (!path) {
        opera.postError('EXTENSION ERROR: No JS file has been specified');
        return;
    }   
    // Send the JS file path to the background script to get the JS.

    var onFile = function(event) {
        var message = event.data;

        // Check this is the correct message and path from the background script.
        if (message.topic === 'LoadedInjectedFile' && (message.data.path === path + '.js' || message.data.path === subpath + '.js' )) {

            var js = message.data.file;

            // Insert the contents of the stylesheet into the <script> element.
            var script = document.createElement('script');
            script.appendChild(document.createTextNode(js));
            document.getElementsByTagName('head')[0].appendChild(script);
        }

        else if (message.topic === 'LoadedInjectedFile' && (message.data.path === path + '.css' || message.data.path === subpath + '.css')) {

            var css = message.data.file;

            // Insert the contents of the stylesheet into the <script> element.
            var style = document.createElement('style');
            style.type = 'text/css';
            style.appendChild(document.createTextNode(css));
            document.getElementsByTagName('head')[0].appendChild(style);
        }
    }

    // On receipt of a message from the background script, execute onFile().
    opera.extension.addEventListener('message', onFile, false);

    var types = ['js','css'];
    for (var i=0; i<types.length; i++)  {
        if (nextdomain) {
                opera.extension.postMessage({
                    topic: 'LoadInjectedFile',
                    data: subpath + '.' + types[i]
                });
            };
        opera.extension.postMessage({
            topic: 'LoadInjectedFile',
            data: path + '.' + types[i]
        });

    };

}, false);
