// App Modules
const knex = require("../db");


class LogDAO {

    insertLog(log) {
        return knex.table('visitor').insert(log);
    }
}

module.exports = new LogDAO();