/**
 * Created by Cedric Zhang on 2016/8/25.
 */

var select10Questions = (function () {
    var conn = require('./connect_db').database.connection;
    var code = require('../settings/status_code').code;
    var select = function (callback) {
        var sql = "SELECT *  FROM  `bilidachonglang`.`questions` WHERE `status`=1 ORDER BY `raised_times` ASC LIMIT 10";
        var _result = {};
        console.info(sql);
        conn.query(sql, function (error, rows, fields) {
            if (!error) {
                _result = {code: code.SUCCESS, data: rows}
            } else {
                console.error("Error selecting 10 questions.. " + error.toString());
                _result = {code: code.SELECT_10_QUESTIONS_ERR, error: error.toString()};
            }
            if (callback && typeof callback == 'function') {
                callback(_result)
            }
        })
    };

    return {
        select: select
    }
}());

exports.select10Questions = select10Questions;