const axios = require('axios');
const {
    EpidemicSituationUrl
} = require("../config/api")
const {
    formatTime
} = require("../util/moment")
const {
    writeFileData
} = require("../util/index")
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
                let {
                    chinaTotal = {}, chinaDayList = {}, lastUpdateTime = "", overseaLastUpdateTime = "", areaTree = []
                } = data.data || {}
                let {
                    today = {},
                        total = {},
                        extData = {}
                } = chinaTotal;
                today.noSymptom = extData.incrNoSymptom || 0
                //现有确诊数=累计确诊数-累计死亡数-累计治愈数
                total.storeConfirm = total.confirm - total.dead - total.heal
                total.noSymptom = extData.noSymptom || 0
                let chinaTodyData = {
                    total,
                    today,
                    chinaDayList,
                    lastUpdateTime,
                    overseaLastUpdateTime: overseaLastUpdateTime
                }
                let areaList = {}
                //获取国内城市数据以及国外数据前30
                if (areaTree && areaTree.length) {
                    let index = 0
                    let chinaCityData = areaTree && areaTree.find((item, i) => {
                        if (item.name == "中国") {
                            index = i
                            return item
                        }
                    });
                    areaTree.splice(index, 1)
                    areaTree.sort((a, b) => b.today.confirm - a.today.confirm)
                    let areaTreeList = areaTree.slice(0, 30);
                    areaList = {
                        chinaCityData,
                        areaTreeList
                    }
                    writeFileData("areaData", name, areaList)
                }
                writeFileData("chinaData", name, chinaTodyData)
                // let chinaTodyData = data.data.chinaTotal;
                //第一段代码可以这样写，第三个参数设置为"\t"（第二个参数一定要补，可以写成""，也可以为null）
                // fs.writeFileSync(configFile, JSON.stringify(data.data || [], "", "\t"))
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