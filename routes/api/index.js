var express = require('express');
var router = express.Router();
var code = require("../../settings/status_code").code;
var createQuestion = require("../../service/create_question").createQuestion;
var queryAmount = require("../../service/query_amount").queryAmount;
var select10Questions = require("../../service/select_10_questions").select10Questions;
var updateRaisedTimes = require("../../service/update_raised_times").updateRaisedTimes;
var PINS = require("../../settings/pins").PINS;
/* GET create question page. */
router.post('/create', function (req, res) {

    if (req.body &&
        req.body.question &&
        req.body.answer0 &&
        req.body.answer1 &&
        req.body.answer2 &&
        req.body.answer3) {

        createQuestion.create({
            question: req.body.question || "题干",
            answer0: req.body.answer0 || "正确答案",
            answer1: req.body.answer1 || "-",
            answer2: req.body.answer2 || "-",
            answer3: req.body.answer3 || "-",
            uploader: req.body.uploader || "walking shadow"
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
router.post('/query_amount', function (req, res) {
    queryAmount.query(function (result) {
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
});
router.post('/get_questions', function (req, res) {


    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    if (req && req.body && req.body.questionKey && req.body.questionKey == PINS.questionKey) {
        select10Questions.select(function (result) {
            if (result && result.code == code.SUCCESS) {
                var tenQuestions = result.data;
                tenQuestions = shuffle(tenQuestions);
                updateRaisedTimes.update([
                    tenQuestions[0]['qid'],
                    tenQuestions[1]['qid'],
                    tenQuestions[2]['qid'],
                    tenQuestions[3]['qid'],
                    tenQuestions[4]['qid']

                ], function (result) {
                    if (result.code = code.SUCCESS) {
                        res.json(tenQuestions.splice(0, 5))
                    } else {
                        res.json({
                            code: result.code,
                            info: result.error
                        })
                    }
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
            info: "BAD REQUEST."
        })
    }
});
module.exports = router;
