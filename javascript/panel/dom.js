/**
 * Created by Cedric Zhang on 2016/8/4.
 */
var Dom = (function(){

    var showAlert = function (message, closeFunction) {
        var modal = $('#modal');
        modal.find('.modal-dialog').removeClass("modal-sm").removeClass("modal-lg").addClass("modal-sm");
        $('#modal_title').html(message.title || '警告');
        $('#modal_body').html(message.body || '发生错误');

        if (closeFunction && typeof closeFunction == 'function') {
            $(".close-function-trigger").unbind("click").click(
                function () {
                    closeFunction();
                })
        }
        modal.modal();
    };

    var renderQuestion = function(question){
        var htmlUnescape = function (str) {
            return str
                .replace(/&quot;/g, '"')
                .replace(/&#39;/g, "'")
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&amp;/g, '&');
        };

        if(question.length==0){
            $("#question_id").html("N/A 没有未审核的题目");
            return;
        }
        $("#question").val(htmlUnescape(question[0].question || "-"));
        $("#answer0").val(htmlUnescape(question[0].answer0 || "-"));
        $("#answer1").val(htmlUnescape(question[0].answer1 || "-"));
        $("#answer2").val(htmlUnescape(question[0].answer2 || "-"));
        $("#answer3").val(htmlUnescape(question[0].answer3 || "-"));
        $("#uploader").val(htmlUnescape(question[0].uploader || "-"));
        $("#question_id").html(question[0].qid);
    };
    return{showAlert:showAlert,
        renderQuestion:renderQuestion};
}());

exports.Dom = Dom;