const {
    formatTime,
    formatBeforetTime
} = require("../util/moment")
const {
    checkDirFile,
    redDirFile,
} = require("../util/index")

function commonRouter(FileFolderName) {
    // const FileFolderName = "chinaData"
    // router.prefix('/comic_admin_users') 生成路由前缀
    let fileName = formatTime();
    // console.log(checkDirFile("areaData", fileName));
    let yqData = ""
    if (checkDirFile(FileFolderName, fileName)) {
        yqData = redDirFile(FileFolderName, fileName);
    } else if (checkDirFile(FileFolderName, formatBeforetTime())) {
        yqData = redDirFile(FileFolderName, formatBeforetTime());
    } else {
        yqData = redDirFile(FileFolderName, "2022");
    }
    return JSON.parse(yqData)
}
module.exports = {
    commonRouter
};