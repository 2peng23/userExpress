// insert the database
const pool = require("../../config/db");

const create =  (data, callBack) => {
    pool.query(
        `insert into user(id,username,email,password) values (?,?,?,?)`, //first param is query
        [
            data.id,
            data.username,
            data.email,
            data.password
        ], //second param is the data
        (error, response, fields) => {
            if(error){
                callBack(error)
            }
            return callBack(null, response)
        }
    )
}
const getUsers =  (callBack) => {
    pool.query(
        `select * from user`,
        (error, response, fields) => {
            if(error){
                callBack(error)
            }
            return callBack(null, response)
        }
    )
}
const getUser =  (id, callBack) => {
    pool.query(
        `select * from user where id = ? limit 1`, //first param is query
        [id],
        (error, response, fields) => {
            if(error){
                callBack(error)
            }
            return callBack(null, response)
        }
    )
}

const updateUser =  (id,data, callBack) => {
    pool.query(
        `update user set username = ?, email = ?, password = ? where id = ?`, //first param is query
        [
            data.username,
            data.email,
            data.password,
            id,
        ], //second param is the data
        (error, response, fields) => {
            if(error){
                callBack(error)
            }
            return callBack(null, response)
        }
    )
}

const deleteUser =  (id, callBack) => {
    pool.query(
        `delete from user where id = ? limit 1`, //first param is query
        [
            id,
        ], //second param is the data
        (error, response, fields) => {
            if(error){
                callBack(error)
            }
            return callBack(null, response)
        }
    )
}
const userService = {
    create,
    getUsers,
    getUser,
    updateUser,
    deleteUser
}

module.exports = userService;
    