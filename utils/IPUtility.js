// App Modules
const config = require('../config');
const request = require('./Request');

class IPUtility {

    fetchIpInfo(ip) {
        return new Promise((resolve, reject) => {
            request.get(config.ipStack.server + ip + '?access_key=' + config.ipStack.access_key)
            .then((resonse) => {
                resolve(resonse.data);
            })
            .catch((error) => {
                reject(error);
            })
        })
    }

    stringify(info) {
        const infoStr = "IP: " + info.ip + '\n' +
                        "Country: " + info.country_name + '\n' +
                        "City: " + info.city + '\n' +
                        "latitude: " + info.latitude + '\n' +
                        "longitude: " + info.longitude;

        return infoStr;
    }
};

module.exports = new IPUtility();