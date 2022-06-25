const os = require('os');
const fs = require('fs');
const path = require('path');

function getIp(){
    var nets = os.networkInterfaces()
    var results = {};

    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
            // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
            const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
            if (net.family === familyV4Value && !net.internal) {
                if (!results[name]) {
                    results[name] = [];
                }
                results[name].push(net.address);
            }
        }
    }

    return results["en0"][0]
}
function getServices(){
    var retArr = []
  
    if(!fs.existsSync("services")) return retArr
   
    fs.readdirSync("services").forEach(f=>{
        
        var retObj = JSON.parse(fs.readFileSync("services/" + f +"/config.json", "utf8"))
        retObj.name = f
        retObj.port = 0;
        retArr.push(retObj)
    })
    return retArr

    
}

function getOwnServices(){
    var retArr = []

    if(!fs.existsSync("ownServices")) return retArr

    fs.readdirSync("ownServices").forEach(f=>{
        
        var retObj = JSON.parse(fs.readFileSync("ownServices/" + f +"/config.json", "utf8"))
        retObj.name = f
        retArr.push(retObj)
    })
    return retArr

    
}
function getFunctions() {
    
}

module.exports = {
    getIp,
    getServices,
    getOwnServices,
    getFunctions
}