/**
 * Created by Cedric Zhang on 2016/8/24.
 */
var getUncheckedQuestion = (function () {
    var conn = require('./connect_db').database.connection;
    var code = require('../settings/status_code').code;
    var get = function (callback) {
        var sql = "SELECT *  FROM  `bilidachonglang`.`questions` WHERE  `status` = 0 LIMIT 1";
        var _result = {};
        console.info(sql);
        conn.query(sql, function (error, rows, fields) {
            if (!error) {
                _result = {code: code.SUCCESS, data: rows}
            } else {
                console.error("Error querying unchecked question .. " + error.toString());
                _result = {code: code.QUERY_UNCHEKED_QUESTION_ERR, error: error.toString()};
            }
            if (callback && typeof callback == 'function') {
                callback(_result)
            }
        })
    };

    return {
        get: get
    }
}());

exports.getUncheckedQuestion = getUncheckedQuestion;