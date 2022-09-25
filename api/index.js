const axios = require('axios');
const {
    EpidemicSituationUrl
} = require("../config/api")
const {
    formatTime
} = require("../util/moment")
const fs = require('fs')
const path = require('path')
const getData = () => {
    return axios({
        url: EpidemicSituationUrl,
        method: "get",
        json: true,
    }).then(res => {
        if (res.status == 200) {
            let data = res.data || {};
            // let name =Moment().format('YYYY-MM-DD HH:mm:ss');
            let name = data.data.lastUpdateTime || ""
            try {
                if (!name) return {}
                name = formatTime(name)
                const configFile = path.resolve(__dirname, `../json/${name}.json`)
                //第一段代码可以这样写，第三个参数设置为"\t"（第二个参数一定要补，可以写成""，也可以为null）
                fs.writeFileSync(configFile, JSON.stringify(data.data || [], "", "\t"))
                console.log(`${name}.json 写入成功`);
                return data.data
            } catch (error) {
                console.log(error);
                return null
            }
        } else {
            return null
        }
    }).catch(() => {
        console.log(error);
        return null
    })
}
// getData()
module.exports = {
    getData
}