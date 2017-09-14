/**
 * Created by Yoker.Wu on 2017/9/14.
 */

/**
 * 将一个 datetime 格式话为时间格式的字符串。format支持：年(yy) 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
 * @param datetime
 * @param format 格式化字符串，支持 yyyy-MM-dd EEE HH:mm:ss.S qq
 * @returns 格式化后的字符串
 */
export function timeFormat (datetime, format) {
  let obj = datetime === undefined ? new Date() : datetime
  obj = (typeof obj === 'number' || typeof obj === 'string') ? new Date(obj) : obj
  format = format || 'yyyy-MM-dd HH:mm:ss'
  var o = {
    'M+': obj.getMonth() + 1, // 月份
    'd+': obj.getDate(), // 日
    'H+': obj.getHours(), // 小时
    'm+': obj.getMinutes(), // 分
    's+': obj.getSeconds(), // 秒
    'q+': Math.floor((obj.getMonth() + 3) / 3), // 季度
    'S': obj.getMilliseconds() // 毫秒
  }
  var week = {
    '0': '\u65e5',
    '1': '\u4e00',
    '2': '\u4e8c',
    '3': '\u4e09',
    '4': '\u56db',
    '5': '\u4e94',
    '6': '\u516d'
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (obj.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  if (/(E+)/.test(format)) {
    format = format.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '\u661f\u671f' : '\u5468') : '') + week[obj.getDay() + ''])
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return format
}

/**
 * 获取unix时间戳
 * @param time '20160126 12:00:00', '2016-01-26 12:00:00', '2016.01.26 12:00:00', '20160126', '2016-05-23 13:58:02.0'
 */
export function getTimeStamp (datetime) {
  if (typeof time !== 'string') return

  if (datetime.length > 19) { // 2016-05-23 13:58:02.0
    datetime = datetime.substring(0, 19)
  }

  let pattern = new RegExp('\\-|\\.', 'g')
  if (pattern.test(datetime)) {
    return Math.round(Date.parse(datetime.replace(pattern, '/')))
  } else {
    let y = datetime.slice(0, 4)
    let m = datetime.slice(4, 6)
    let d = datetime.slice(6, 8)
    Math.round(Date.parse(y + '/' + m + '/' + d))
  }
}

/**
 * 获取浏览器参数
 * @param name
 * @returns {*}
 */
export function getUrlParam (name) { // 'null' 会返回string
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)') // 构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg) // 匹配目标参数
  if (r !== null) return decodeURIComponent(r[2])
  return null // 返回参数值
}

/**
 * 获取浏览器参数
 * @param name
 * @returns {*}
 */
export function getHttpParams (name) {
  var r = new RegExp('(\\?|#|&)' + name + '=([^&#]*)(&|#|$)')
  var m = location.href.match(r)
  return decodeURIComponent(!m ? '' : m[2])
}
