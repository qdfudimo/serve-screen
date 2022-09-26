const {
  formatTime
} = require("./moment")
const fs = require('fs')
const path = require('path')
/**
 * 写入文件数据
 * @param file 文件夹名
 * @param name 文件名
 * @param data 写入数据
 * @returns 疫情数据
 */
function writeFileData(file, name, data) {
  try {
    const configFile = path.resolve(__dirname, `../json/${file}/${name}.json`);
    //第一段代码可以这样写，第三个参数设置为"\t"（第二个参数一定要补，可以写成""，也可以为null）
    fs.writeFileSync(configFile, JSON.stringify(data || [], "", "\t"))
  } catch (error) {
    console.log(error);
  }
}
/**
 * 查询文件是否存在
 * @param file 文件夹名
 * @param name 文件名
 * @returns false true
 */
function checkDirFile(file, fileName) {
  try {
    const configFile = path.resolve(__dirname, `../json/${file}/${fileName}.json`)
    let checkDir = fs.existsSync(configFile);
    return checkDir
  } catch (error) {
    console.log(error);
  }
}
/**
 * 读取文件内容
 * @param file 文件夹名
 * @param name 文件名
 * @returns false true
 */
function redDirFile(file, fileName) {
  try {
    const configFile = path.resolve(__dirname, `../json/${file}/${fileName}.json`)
    const fileData = fs.readFileSync(configFile, 'utf-8');
    return fileData
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  writeFileData,
  redDirFile,
  checkDirFile
}