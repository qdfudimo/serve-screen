const Moment = require('moment');
const formatTime = (time)=>{
    return  Moment(time).format('YYYY-MM-DD')
}
module.exports = {
    formatTime
}