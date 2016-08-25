var express = require('express');
var router = express.Router();
var code = require("../../settings/status_code").code;
var createQuestion = require("../../service/create_question").createQuestion;
var queryAmount = require("../../service/query_amount").queryAmount;

/* GET create question page. */
router.post('/create', function (req, res) {

    if (req.body &&
        req.body.question &&
        req.body.answer0 &&
        req.body.answer1 &&
        req.body.answer2 &&
        req.body.answer3){

        createQuestion.create({
            question:req.body.question||"题干",
            answer0:req.body.answer0||"正确答案",
            answer1:req.body.answer1||"-",
            answer2:req.body.answer2||"-",
            answer3:req.body.answer3||"-",
            uploader:req.body.uploader||"walking shadow"
        },function (result) {
            if(result && result.code && result.code > 0){
                res.json({
                    code:code.SUCCESS,
                    data:result.data
                })
            }else{
                res.json({
                    code:result.code,
                    info:result.error
                })
            }
        })
    }else{
        res.json({
            code: code.BAD_REQUEST,
            info: '非法请求'
        })
    }
});
router.post('/query_amount',function(req,res){
    queryAmount.query(function (result) {
        if(result && result.code && result.code > 0){
            res.json({
                code:code.SUCCESS,
                data:result.data
            })
        }else{
            res.json({
                code:result.code,
                info:result.error
            })
        }
    })
});
module.exports = router;