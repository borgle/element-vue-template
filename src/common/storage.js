/**
 * Created by Yoker.Wu on 2017/9/6.
 */

// 引入前缀这个常量
import { prefix } from './const'

/**
 * 本地存储类
 */
class Storage {
  constructor (type) {
    if (type === 'local') {
      this.store = window.localStorage
    } else if (type === 'session') {
      this.store = window.sessionStorage
    }
    this.prefix = prefix
  }

  set (key, value) {
    let strValue = value
    try {
      strValue = JSON.stringify(value)
    } catch (e) {
    }

    this.store.setItem(encodeURIComponent(this.prefix + key), encodeURIComponent(strValue))

    return this
  }

  get (key) {
    if (!key) {
      throw new Error('没有找到key')
    }
    if (typeof key === 'object') {
      throw new Error('key不能是一个对象')
    }
    let strValue = this.store.getItem(encodeURIComponent(this.prefix + key))

    if (strValue === null) {
      return {}
    }

    try {
      return JSON.parse(decodeURIComponent(strValue))
    } catch (e) {
    }
    return {}
  }

  remove (key) {
    this.store.removeItem(encodeURIComponent(this.prefix + key))
    return this
  }
}

export const localStorage = new Storage('local')
export const sessionStorage = new Storage('session')
