/**
 * Created by Cedric Zhang on 2016/8/4.
 */
var PASSWORD = require('../settings/pins').PINS.loginpassword;
var code = require('../settings/status_code').code;
var checkPassword = (function () {
    var check = function(inputPassword){
        if(inputPassword.toString() == PASSWORD){
            return code.SUCCESS
        }else{
            return code.WRONG_PSWD
        }
    };

    return{check:check}
}());

exports.checkPassword = checkPassword;