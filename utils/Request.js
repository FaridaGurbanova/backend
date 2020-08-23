// Public Modules
const axios = require('axios');


class Request {

    post(url, data) {
        return new Promise((resolve, reject) => {
            axios.post(url, data)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        })
    }
  
    get(url) {
        return new Promise((resolve, reject) => {
            axios.get(url)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    reject(error);
                });
        })
    }
}

module.exports = new Request();


