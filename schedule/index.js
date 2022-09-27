const schedule = require('node-schedule');
const {
    getData
} = require("../api")
const {
    formatBeforetTime,
    formatTime
} = require("../util/moment")
const {
    checkDirFile,
    emptyDir,
} = require("../util/index")
/**
 * 定时任务调接口
 */
function scheduleCronstyle() {
    schedule.scheduleJob('30 0 10 * * *', function () {
        console.log('scheduleCronstyle:' + new Date());
        getData()
    });
    schedule.scheduleJob('30 0 14 * * *', function () {
        console.log('scheduleCronstyle:' + new Date());
        getData()
    });
}
/**
 * 定时任务删除上一天json文件
 */
function scheduleDelFile() {
    schedule.scheduleJob('30 3 16 * * *', function () {
        let fileName = formatBeforetTime();
        let fileNamepre = formatTime();
        if (checkDirFile("areaData", fileNamepre) && checkDirFile("areaData", fileName)) {
            emptyDir("areaData", fileName)
            console.log(`删除文件areaData${fileName}`);
        }else {
            console.log(`没有删除文件areaData`);
        }
        if (checkDirFile("chinaData", fileNamepre) && checkDirFile("chinaData", fileName)) {
            emptyDir("chinaData", fileName)
            console.log(`删除文件chinaData${fileName}`);
        }

    });
}
module.exports = {
    scheduleCronstyle,
    scheduleDelFile
}
/**
 * *  *  *  *  *  *
┬ ┬ ┬ ┬ ┬ ┬
│ │ │ │ │  |
│ │ │ │ │ └ day of week (0 - 7) (0 or 7 is Sun)
│ │ │ │ └───── month (1 - 12)
│ │ │ └────────── day of month (1 - 31)
│ │ └─────────────── hour (0 - 23)
│ └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, OPTIONAL)
6个占位符从左到右分别代表：秒、分、时、日、月、周几
'*'表示通配符，匹配任意，当秒是'*'时，表示任意秒数都触发，其它类推
下面可以看看以下传入参数分别代表的意思
每分钟的第30秒触发： '30 * * * * *'
每小时的1分30秒触发 ：'30 1 * * * *'
每天的凌晨1点1分30秒触发 ：'30 1 1 * * *'
每月的1日1点1分30秒触发 ：'30 1 1 1 * *'
2016年的1月1日1点1分30秒触发 ：'30 1 1 1 2016 *'
每周1的1点1分30秒触发 ：'30 1 1 * * 1'
 */