var express = require('express');
var router = express.Router();
var code = require("../../settings/status_code").code;
var getUncheckedQuestion = require("../../service/get_unchecked_question").getUncheckedQuestion;
var getQuestionById = require("../../service/get_question_by_id").getQuestionById;
var updateQuestion = require("../../service/update_question").updateQuestion;
router.post('/get_unchecked_question', function (req, res) {
    getUncheckedQuestion.get(function (result) {
        if (result && result.code && result.code > 0) {
            res.json({
                code: code.SUCCESS,
                data: result.data
            })
        } else {
            res.json({
                code: result.code,
                info: result.error
            })
        }
    });
});
router.post('/get_question_by_id', function (req, res) {
    if (req && req.body && req.body.qid) {
        getQuestionById.get(req.body.qid
            , function (result) {
                if (result && result.code && result.code > 0) {
                    res.json({
                        code: code.SUCCESS,
                        data: result.data
                    })
                } else {
                    res.json({
                        code: result.code,
                        info: result.error
                    })
                }
            });
    } else {
        res.json({
            code: code.BAD_REQUEST,
            info: "BAD REQUEST"
        })
    }

});

router.post('/update_question', function (req, res) {

    if (req.body &&
        req.body.question &&
        req.body.answer0 &&
        req.body.answer1 &&
        req.body.answer2 &&
        req.body.answer3 &&
        req.body.qid && req.body.status) {

        updateQuestion.update({
            question: req.body.question || "题干",
            answer0: req.body.answer0 || "正确答案",
            answer1: req.body.answer1 || "-",
            answer2: req.body.answer2 || "-",
            answer3: req.body.answer3 || "-",
            uploader: req.body.uploader || "walking shadow",
            qid:req.body.qid,
            status:req.body.status
        }, function (result) {
            if (result && result.code && result.code > 0) {
                res.json({
                    code: code.SUCCESS,
                    data: result.data
                })
            } else {
                res.json({
                    code: result.code,
                    info: result.error
                })
            }
        })
    } else {
        res.json({
            code: code.BAD_REQUEST,
            info: '非法请求'
        })
    }
});

module.exports = router;
