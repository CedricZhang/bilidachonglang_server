/**
 * Created by Cedric Zhang on 2016/8/26.
 */
var getTop10 = (function () {
    var conn = require('./connect_db').database.connection;
    var code = require('../settings/status_code').code;
    var get = function (callback) {
        var sql = "SELECT username,SUM(score)as total FROM `score_record` WHERE 1 GROUP BY username ORDER BY total DESC limit 10";
        var _result = {};
        console.info(sql);
        conn.query(sql, function (error, rows, fields) {
            if (!error) {
                _result = {code: code.SUCCESS, data: rows}
            } else {
                console.error("Error querying top 10 user .. " + error.toString());
                _result = {code: code.GET_TOP_10_ERR, error: error.toString()};
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

exports.getTop10 = getTop10;