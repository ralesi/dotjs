window.addEventListener('DOMContentLoaded', function() {
    // Specify the path to the stylesheet here:
    var path = 'http://localhost:3131/' + window.location.hostname.replace('www.','') + '.js';

    // Error check for the JavaScript filename.
    if (!path) {
        opera.postError('EXTENSION ERROR: No JS file has been specified');
        return;
    }

    var onJS = function(event) {
        var message = event.data;

        // Check this is the correct message and path from the background script.
        if (message.topic === 'LoadedInjectedJS' && message.data.path === path) {
            // Remove the message listener so it doesn't get called again.
            opera.extension.removeEventListener('message', onJS, false);

            var js = message.data.js;

            // Create a <script> element and add it to the <head> element of the current page.
            // Insert the contents of the stylesheet into the <script> element.
            var script = document.createElement('script');
            script.appendChild(document.createTextNode(js));
            document.getElementsByTagName('head')[0].appendChild(script);
        }
    }

    // On receipt of a message from the background script, execute onJS().
    opera.extension.addEventListener('message', onJS, false);

    // Send the JS file path to the background script to get the JS.
    opera.extension.postMessage({
        topic: 'LoadInjectedJS',
        data: path
    });

}, false);
