const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : 'faridagurbanova.com',
      user : 'root',
      password : '1234',
      database : 'faridagurbanova_pw'
    }
});

module.exports = knex;