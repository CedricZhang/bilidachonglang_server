/**
 * Created by Cedric Zhang on 2016/8/24.
 */
var updateQuestion = (function () {
    var conn = require('./connect_db').database.connection;
    var code = require('../settings/status_code').code;
    var update = function (paras, callback) {
        var sql =
            "UPDATE  `bilidachonglang`.`questions` SET  " +
            "`status` =  '" + (paras.status || 0) + "'," +
            "`question` =  '" + (paras.question || "题干内容") + "'," +
            "`answer0` =  '" + (paras.answer0 || "正确答案" ) + "'," +
            "`answer1` =  '" + (paras.answer1 || "" ) + "'," +
            "`answer2` =  '" + (paras.answer2 || "" ) + "'," +
            "`answer3` =  '" + (paras.answer3 || "" ) + "'," +
            "`uploader` =  '" + (paras.uploader || "" ) + "' " +
            "WHERE  `questions`.`qid` =" + paras.qid + ";";

        var _result = {};
        console.info(sql);
        conn.query(sql, function (error, rows, fields) {
            if (!error) {
                _result = {code: code.SUCCESS, data: rows}
            } else {
                console.error("Error updating question .. " + error.toString());
                _result = {code: code.UPDATE_QUESTION_ERR, error: error.toString()};
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

exports.updateQuestion = updateQuestion;