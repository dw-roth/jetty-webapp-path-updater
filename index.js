var xmldom = require('xmldom').DOMParser,
    xmlserializer = require('xmldom').XMLSerializer,
    fs = require('fs');

function usage() {
    console.log('usage: node index.js configFile newPath');
    console.log('example: node index.js config.xml release_05_04_16.00.d');
}

if (process.argv.length !== 4) {
    usage();
    process.exit(1);
}

fs.readFile(process.argv[2], 'utf-8',  function (err, data) {
    var doc = new xmldom().parseFromString(data, 'text/xml');
    doc.getElementsByTagName('Property')[0].parentNode.lastChild.data = process.argv[3];
    var serial = new xmlserializer();
    var docAsString =serial.serializeToString(doc);
    fs.writeFile(process.argv[2], docAsString, function (err) {
        if (err) {
            console.log('update failed: ' + err);
            process.exit(1);
        } 

        console.log('success');
    });
});


