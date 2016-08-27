/**
 * Created by Cedric Zhang on 2016/8/26.
 */
var addScoreRecord = (function () {
    var conn = require('./connect_db').database.connection;
    var code = require('../settings/status_code').code;
    var add = function (paras, callback) {
        var sql = "INSERT INTO  `bilidachonglang`.`score_record` (`username` ,`datetime` ,`score`)VALUES("+
        
            "'"+paras.userName+"',"+
            "CURRENT_TIMESTAMP ,  '"+paras.score+"');";
        var _result = {};
        console.info(sql);
        conn.query(sql, function (error, rows, fields) {
            if (!error) {
                _result = {code: code.SUCCESS, data: rows}
            } else {
                console.error("Error add score records .. " + error.toString());
                _result = {code: code.ADD_SCORE_RECORDS_ERR, error: error.toString()};
            }
            if (callback && typeof callback == 'function') {
                callback(_result)
            }
        })
    };

    return {
        add: add
    }
}());

exports.addScoreRecord = addScoreRecord;