/**
 * Created by Cedric Zhang on 2016/8/4.
 */
var Listener = (function () {
    var Data = require('./data').Data;
    var Dom = require('./dom').Dom;

    var showUncheckQuestion = function () {
        Data.getUncheckedQuestion(function (result) {
            if (result && result.code && result.code > 0) {
                Dom.renderQuestion(result.data);
            }

        });
    };

    var getQuestionById = function (qid) {
        Data.getQuestionById(qid, function (result) {
            if (result && result.code && result.code > 0) {
                if (result.data.length) {
                    Dom.renderQuestion(result.data);
                } else {
                    Dom.showAlert({
                        title: "错误",
                        body: "该qid不存在"
                    })
                }

            }
        })
    };

    var setRetriveListener = function () {
        $("#retrive").click(function () {
            var qid = $("#qid").val();
            if (qid && parseInt(qid)) {
                location.href = '/panel?qid=' + qid
            }
        })

    };

    var setSubmitButtonListener = function () {

        var checkSqlValid = function (text) {
            var re = /select|update|delete|exec|count|’|;/i;
            if (re.test(text)) {
                return false;
            }
            return true;
        };
        var htmlEscape = function (str) {
            return str
                .replace(/&/g, '&amp;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');
        };

        // I needed the opposite function today, so adding here too:
        var htmlUnescape = function (str) {
            return str
                .replace(/&quot;/g, '"')
                .replace(/&#39;/g, "'")
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&amp;/g, '&');
        };

        $(".submit-button").click(function () {
            var status = ($(this).attr("id") == 'pass' ? 1 : 2);
            var question = htmlEscape($("#question").val()).trim();
            var answer0 = htmlEscape($("#answer0").val()).trim();
            var answer1 = htmlEscape($("#answer1").val()).trim();
            var answer2 = htmlEscape($("#answer2").val()).trim();
            var answer3 = htmlEscape($("#answer3").val()).trim();
            var uploader = htmlEscape($("#uploader").val()).trim();
            var qid = parseInt($("#question_id").html());

            if (!checkSqlValid(question)) {
                Dom.showAlert({
                    title: '提交失败！',
                    body: "题干中不可以有奇怪的单词和字符！"
                });
                return;
            }
            if (!checkSqlValid(answer0)) {
                Dom.showAlert({
                    title: '提交失败！',
                    body: "正确答案中不可以有奇怪的单词和字符！"
                });
                return;
            }
            if (!checkSqlValid(answer1)) {
                Dom.showAlert({
                    title: '提交失败！',
                    body: "错误答案1中不可以有奇怪的单词和字符！"
                });
                return;
            }
            if (!checkSqlValid(answer2)) {
                Dom.showAlert({
                    title: '提交失败！',
                    body: "错误答案2中不可以有奇怪的单词和字符！"
                });
                return;
            }
            if (!checkSqlValid(answer3)) {
                Dom.showAlert({
                    title: '提交失败！',
                    body: "错误答案3中不可以有奇怪的单词和字符！"
                });
                return;
            }
            if (!checkSqlValid(uploader)) {
                Dom.showAlert({
                    title: '提交失败！',
                    body: "出题人中不可以有奇怪的单词和字符！"
                });
                return;
            }
            if (!qid || question.length == 0 || answer0.length == 0 || answer1.length == 0 || answer2.length == 0 || answer3.length == 0) {
                Dom.showAlert({
                    title: '提交失败！',
                    body: "!qid || question.length == 0 || answer0.length == 0 || answer1.length == 0 || answer2.length == 0 || answer3.length == 0"
                });
                return;
            }

            Data.updateQuestion({
                question: question,
                answer0: answer0,
                answer1: answer1,
                answer2: answer2,
                answer3: answer3,
                uploader: uploader,
                status: status,
                qid: qid
            }, function (result) {
                if (result && result.code && result.code > 0) {
                    Dom.showAlert({
                        title: "提交成功！",
                        body: "提交成功！"
                    });
                    showUncheckQuestion();
                }
                else {
                    Dom.showAlert({
                        title: '提交失败！',
                        body: result.info
                    })
                }
            })
        })
    };

    var init = function () {
        var getParameter = function (name) {
            var url = document.location.href;
            var start = url.indexOf("?") + 1;
            if (start == 0) {
                return "";
            }
            var value = "";
            var queryString = url.substring(start);
            var paraNames = queryString.split("&");
            for (var i = 0; i < paraNames.length; i++) {
                if (name == getParameterName(paraNames[i])) {
                    value = getParameterValue(paraNames[i])
                }
            }
            return value;
        };

        function getParameterName(str) {
            var start = str.indexOf("=");
            if (start == -1) {
                return str;
            }
            return str.substring(0, start);
        }

        function getParameterValue(str) {
            var start = str.indexOf("=");
            if (start == -1) {
                return "";
            }
            return str.substring(start + 1);
        }


        setRetriveListener();


        if (getParameter('qid') && parseInt(getParameter('qid'))) {
            getQuestionById(getParameter('qid'))
        } else {
            showUncheckQuestion();
        }

        setSubmitButtonListener();

    };

    return {init: init}
})();

exports.Listener = Listener;