/**
 * Created by Cedric Zhang on 2016/8/24.
 */
module.exports = {
    entry: {
        create: "./javascript/create/index.js",
        panel: "./javascript/panel/index.js",
        login:"./javascript/login/index.js"
        // tencent:"./javascript/panel/tencent/index.js"
        //page2: ["./entry1", "./entry2"]
    },
    output: {
        path: "./public/javascripts",
        publicPath: "./public/",
        filename: "[name].bundle.js"
        //chunkFilename: "[id].bundle.js"
    }
};