/**
 * Created by Cedric Zhang on 2016/8/24.
 */
var code = require("../settings/status_code").code;
var database = (function(){
    var mysql = require("mysql");
    var dbSetting = require("../settings/pins").PINS.db;
    var connection = mysql.createConnection({
        host : dbSetting.host ,
        user : dbSetting.user ,
        password : dbSetting.password ,
        database : dbSetting.database
    });
    connection.connect(function(error){
        if (error) {
            console.error("Error connecting database ... " + error.toString());
            return code.CONNE_TO_DB_ERR;
        }
    });

    return {
        connection:connection
    }
}());

exports.database = database;