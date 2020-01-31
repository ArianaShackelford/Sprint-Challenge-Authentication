const db = require('../database/dbConfig.js')

module.exports = {
    insert,
    findById,
    findBy
}

function insert(newUser) {
    return db('users')
    .insert(newUser, 'id')
    .then(ids => {
        const [id] = ids;
        return findById(id);
    })
};

function findById(id){
    return db('users')
        .select('id', 'username')
        .where({id})
        .first();
};

function findBy(filter){
    return db('users')
        .select('id', 'username', 'password')
        .where(filter);
};