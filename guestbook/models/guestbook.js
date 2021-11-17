const mysql = require('mysql2');
const dbconn = require('./dbconn');
const util = require('util');

module.exports = {
    findAll: async function(callback) {
        
        const conn = dbconn();
        const query = util.promisify(conn.query).bind(conn);

        try {
            return await query(
                'select no, name, message, date_format(reg_date, "%Y/%m/%d %H:%i:%s") as regDate from guestbook', 
                []
            );
        } catch (e) {
            console.error(e);
        } finally {
            conn.end();
        }
    },

    insert: async function(guestbook) {
        const conn = dbconn();
        const query = util.promisify(conn.query).bind(conn);

        try {
            return await query(
                'insert into guestbook values(null, ?, ?, ?, now())', // #{name }, #{password }, #{message }
                Object.values(guestbook)
            );
        } catch (e) {
            console.error(e);
        } finally {
            conn.end();
        }
    },

    delete: async function(guestbook) {
        const conn = dbconn();
        const query = util.promisify(conn.query).bind(conn);

        try {
            return await query(
                'delete from guestbook where no=? and password=?',
                Object.values(guestbook)
            );
        } catch (e) {
            console.error(e);
        } finally {
            conn.end();
        }
    }
}