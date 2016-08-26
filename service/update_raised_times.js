/**
 * Created by Cedric Zhang on 2016/8/25.
 */
var updateRaisedTimes = (function () {
    var conn = require('./connect_db').database.connection;
    var code = require('../settings/status_code').code;
    var update = function (qids,callback) {
        var sql = "UPDATE `bilidachonglang`.`questions` SET raised_times = raised_times + 1 WHERE `qid` in ("+qids.join()+")";
        var _result = {};
        console.info(sql);
        conn.query(sql, function (error, rows, fields) {
            if (!error) {
                _result = {code: code.SUCCESS, data: rows}
            } else {
                console.error("Error updating raised times by id.. " + error.toString());
                _result = {code: code.UPDATE_RAISED_TIMES_ERR, error: error.toString()};
            }
            if (callback && typeof callback == 'function') {
                callback(_result)
            }
        })
    };

    return {
        update: update
    }
}());

exports.updateRaisedTimes = updateRaisedTimes;