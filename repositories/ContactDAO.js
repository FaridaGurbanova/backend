// App Modules
const knex = require("../db");


class ContactDAO {

    insertMessage(messageInfo) {
        return knex.table('message').insert(messageInfo);
    }
}

module.exports = new ContactDAO();