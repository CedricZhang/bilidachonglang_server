/**
 * Created by Cedric Zhang on 2016/8/24.
 */
var Dom = (function () {
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
    var setQuestionAmount = function (para) {
        var toBeChecked = para.toBeChecked;
        var normal = para.normal;
        var shit = para.shit;
        var total = toBeChecked + normal + shit;
        var str = "当前题库中共有 "+total+" 道题，其中一般问题 "+normal+" 道，待审核问题 "+toBeChecked+" 道，废题 "+shit+" 道。";

        $("#question_amount").html(str);

    };
    return {
        showAlert: showAlert
        , setQuestionAmount: setQuestionAmount
    };
}());

exports.Dom = Dom;