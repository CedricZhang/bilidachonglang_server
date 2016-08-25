/**
 * Created by Cedric Zhang on 2016/8/24.
 */
var getQuestionById = (function () {
    var conn = require('./connect_db').database.connection;
    var code = require('../settings/status_code').code;
    var get = function (qid, callback) {
        var sql = "SELECT *  FROM  `bilidachonglang`.`questions` WHERE  `qid` = "+qid;
        var _result = {};
        console.info(sql);
        conn.query(sql, function (error, rows, fields) {
            if (!error) {
                _result = {code: code.SUCCESS, data: rows}
            } else {
                console.error("Error querying question by id.. " + error.toString());
                _result = {code: code.QUERY_QUESTION_BY_ID_ERR, error: error.toString()};
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

exports.getQuestionById = getQuestionById;