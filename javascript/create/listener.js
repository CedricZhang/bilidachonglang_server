/**
 * Created by Cedric Zhang on 2016/8/24.
 */
var Listener = function () {

    var Dom = require("./dom").Dom;
    var Data = require("./data").Data;

    var setSubmitListener = function () {

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


        $("#submit").click(function () {
            var question = htmlEscape($("#question").val()).trim();
            var answer0 = htmlEscape($("#answer0").val()).trim();
            var answer1 = htmlEscape($("#answer1").val()).trim();
            var answer2 = htmlEscape($("#answer2").val()).trim();
            var answer3 = htmlEscape($("#answer3").val()).trim();
            var uploader = htmlEscape($("#uploader").val()).trim();
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
            if (question.length == 0 || answer0.length == 0 || answer1.length == 0 || answer2.length == 0 || answer3.length == 0) {
                Dom.showAlert({
                    title: '提交失败！',
                    body: "请将题目内容和四个答案填写完整！"
                });
                return;
            }

            Data.upload({
                question: question,
                answer0: answer0,
                answer1: answer1,
                answer2: answer2,
                answer3: answer3,
                uploader: uploader,
                status:status
            }, function (result) {
                if (result && result.code && result.code > 0) {
                    Dom.showAlert({
                        title: "提交成功！",
                        body: "问题提交成功，问题ID：" + (result.data['qid'] || "未知") + "，请等待审核。"
                    }, function () {
                        location.reload();
                    })
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

    var setQuestionChangeListener = function(){

        $('#question').bind('input propertychange', function() {
            $("#question_count").html($(this).val().length)
        });

    };
    var init = function () {
        setSubmitListener();
        setQuestionChangeListener();
        Data.queryAmount(function (result) {
            if (result && result.code && result.code > 0) {
                Dom.setQuestionAmount(
                    {
                        toBeChecked: result.data['0'] || 0,
                        normal: result.data['1'] || 0,
                        shit: result.data['2'] || 0

                    }
                )

            }
            else {
                Dom.showAlert({
                    title: '查询题库数量失败！',
                    body: result.info
                })
            }

        })
    };

    return {
        init: init
    }
}();

exports.Listener = Listener;