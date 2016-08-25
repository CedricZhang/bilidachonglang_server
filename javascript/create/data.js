/**
 * Created by Cedric Zhang on 2016/8/24.
 */
var Data = function(){
    var upload = function(para,callback){
        var _result = {};
        $.ajax({
            url:'/api/create',
            type:'POST',
            data:{
                question:para.question||"题目内容",
                answer0:para.answer0||"正确答案",
                answer1:para.answer1||"-",
                answer2:para.answer2||"-",
                answer3:para.answer3||"-",
                uploader:para.uploader||"walking shadow"

            },
            success:function(result){
                if(result){
                    _result = result
                }
            },
            error:function(error){
                _result.code='-99999';
                _result.info='提交问题时服务端发生错误';
                _result.data=error;
            },
            complete:function(){
                if(callback && typeof callback == 'function'){
                    callback(_result);
                }
            }
        })
    };

    var queryAmount = function(callback){
        var _result = {};
        $.ajax({
            url:'/api/query_amount',
            type:'POST',
            success:function(result){
                if(result){
                    _result = result
                }
            },
            error:function(error){
                _result.code='-99999';
                _result.info='查询问题数量时服务端发生错误';
                _result.data=error;
            },
            complete:function(){
                if(callback && typeof callback == 'function'){
                    callback(_result);
                }
            }
        })
    };
    return{
        upload:upload,
        queryAmount:queryAmount
    }
}();

exports.Data = Data;