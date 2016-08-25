/**
 * Created by Cedric Zhang on 2016/8/24.
 */
var createQuestion = (function () {
    var conn = require('./connect_db').database.connection;
    var code = require('../settings/status_code').code;
    var create = function (paras, callback) {
        var sql = "INSERT INTO `bilidachonglang`.`questions` " +
            "(`question`, `answer0`, `answer1`, `answer2`, `answer3`, `uploader`)" +
            " VALUES ('" +
            (paras.question || "题干内容") + "','" +
            (paras.answer0 || "正确答案" ) + "','" +
            (paras.answer1 || "" ) + "','" +
            (paras.answer2 || "" ) + "','" +
            (paras.answer3 || "" ) + "','" +
            (paras.uploader || "walking shadow" ) + "');";
        var _result = {};
        console.info(sql);
        conn.query(sql, function (error, rows, fields) {
            if (!error) {
                _result = {code: code.SUCCESS, data: {qid:rows.insertId}}
            } else {
                console.error("Error creating question .. " + error.toString());
                _result = {code: code.CREATE_QUESTION_ERR, error: error.toString()};
            }
            if (callback && typeof callback == 'function') {
                callback(_result)
            }
        })
    };

    return {
        create: create
    }
}());

exports.createQuestion = createQuestion;