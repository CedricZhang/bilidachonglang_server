/**
 * Created by Cedric Zhang on 2016/8/24.
 */
var queryAmount = (function () {
    var conn = require('./connect_db').database.connection;
    var code = require('../settings/status_code').code;
    var query = function (callback) {
        var sql = "SELECT status, count(status) as 'amount' FROM `bilidachonglang`.`questions` group by status;";
        var _result = {};
        conn.query(sql, function (error, rows, fields) {
            if (!error) {
                var _data = {};
                for (var rr in rows) {
                    if (rows.hasOwnProperty(rr)) {
                        _data[rows[rr]['status']] = rows[rr]['amount']
                    }
                }
                _result = {code: code.SUCCESS, data: _data}
            } else {
                console.error("Error query question amount .. " + error.toString());
                _result = {code: code.QUERY_QUESTION_AMOUNT_ERR, error: error.toString()};
            }
            if (callback && typeof callback == 'function') {
                callback(_result)
            }
        })
    };

    return {
        query: query
    }
}());

exports.queryAmount = queryAmount;