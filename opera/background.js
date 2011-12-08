function loadInjectedJS(event, path) {
    // Function uses path to get JS file
    var req = new XMLHttpRequest();
    req.open('GET', path, false);
    req.send();
    // Error check for reading the JS file.
    if (!req.responseText) {
        opera.postError('EXTENSION ERROR: Can\'t read ' + path);
        return;
    }

    // Send the contents of the JS file to the injected script.
    event.source.postMessage({
        topic: 'LoadedInjectedJS',
        data: {
            js: req.responseText,
            path: path
        }
    });

}

function onMessage(event) {
    var message = event.data;
    
    // Check the correct message has been received and send the JS file path to loadInjectedJS().
    if (message.topic == 'LoadInjectedJS') {
        var path = message.data;
        loadInjectedJS(event, path);
    }
}

window.addEventListener('DOMContentLoaded', function() {
    // On receipt of a message from the injected script, execute onMessage().
    opera.extension.onmessage = onMessage;
}, false);
