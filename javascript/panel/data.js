/**
 * Created by Cedric Zhang on 2016/8/4.
 */
var Data = (function () {
    var getUncheckedQuestion = function (callback) {
        var _result = {};
        $.ajax({
            url: '/private_api/get_unchecked_question',
            type: 'POST',
            success: function (result) {
                if (result) {
                    _result = result
                }
            },
            error: function (error) {
                _result.code = '-99999';
                _result.info = '获取未审核的问题时服务端发生错误';
                _result.data = error;
            },
            complete: function () {
                if (callback && typeof callback == 'function') {
                    callback(_result);
                }
            }
        })
    };
    var getQuestionById = function (qid, callback) {
        var _result = {};
        $.ajax({
            url: '/private_api/get_question_by_id',
            type: 'POST',
            data: {
                qid: qid
            },
            success: function (result) {
                if (result) {
                    _result = result
                }
            },
            error: function (error) {
                _result.code = '-99999';
                _result.info = '根据qid获取的问题时服务端发生错误';
                _result.data = error;
            },
            complete: function () {
                if (callback && typeof callback == 'function') {
                    callback(_result);
                }
            }
        })
    };
    var updateQuestion = function (para, callback) {
        var _result = {};
        $.ajax({
            url: '/private_api/update_question',
            type: 'POST',
            data: {
                question: para.question || "题目内容",
                answer0: para.answer0 || "正确答案",
                answer1: para.answer1 || "-",
                answer2: para.answer2 || "-",
                answer3: para.answer3 || "-",
                uploader: para.uploader || "walking shadow",
                qid: para.qid,
                status:para.status

            },
            success: function (result) {
                if (result) {
                    _result = result
                }
            },
            error: function (error) {
                _result.code = '-99999';
                _result.info = '根据qid获取的问题时服务端发生错误';
                _result.data = error;
            },
            complete: function () {
                if (callback && typeof callback == 'function') {
                    callback(_result);
                }
            }
        })
    };
    return {
        getUncheckedQuestion: getUncheckedQuestion,
        getQuestionById: getQuestionById,
        updateQuestion: updateQuestion
    }
}());

exports.Data = Data;