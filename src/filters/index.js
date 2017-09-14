/**
 * Created by Yoker.Wu on 2017/9/6.
 */
import * as utils from '../common/utils'

/**
 * 时间格式化为间隔表示
 * @param timestamp 一个时间数字
 * @returns {string}
 */
export function timeAgo (timestamp) {
  const between = Date.now() / 1000 - Number(timestamp)
  if (between < 3600) {
    return Math.floor(between / 60) + ' minute'
  } else if (between < 86400) {
    return Math.floor(between / 3600) + ' hour'
  } else {
    return Math.floor(between / 86400) + ' day'
  }
}

/**
 * 将一个 datetime 格式话为时间格式的字符串
 * @param datetime
 * @param fmt 支持 yyyy-MM-dd EEE HH:mm:ss.S qq
 * @returns {格式化后的字符串}
 */
export function timeFormat (datetime, fmt) {
  return utils.timeFormat(datetime, fmt)
}

/**
 * 获取unix时间戳
 * @param datetime
 * @returns {*}
 */
export function getTimeStamp (datetime) {
  return utils.getTimeStamp(datetime)
}

/**
 * 状态文本表示
 * @param value 状态值
 * @returns 文本表示的内容
 */
export function statusText (value) {
  if (value === 1) {
    return '启用'
  } else if (value === 0) {
    return '禁用'
  } else {
    return '未知状态'
  }
}
