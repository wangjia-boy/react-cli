'use strict'
// 获取hash
export function getHash(name, url = window.location.hash) {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  let r = url.substr(1).match(reg)
  return r !== null ? unescape(r[2]) : null
}
// 获取参数
export function getParams(name, url = window.location.search) {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  let r = url.substr(1).match(reg)
  return r !== null ? unescape(r[2]) : null
}
// 拼接参数
export function setParams(url, param) {
  let args = ''
    , link = ''
  for (let key in param) {
    args += '&' + key + '=' + param[key]
  }
  link = url + '?' + args.substr(1)
  return link.replace(' ', '')
}
// 首字母大写
export function firstUpperCase(str) {
  return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
}
// 补零
function fillZero(val) {
  return val < 10 ? '0' + val : val
}
// sleep
export function sleep(delay) {
  return new Promise((resolve, reject) => setTimeout(resolve, delay))
}
// 时间转毫秒数
export function getTime(time) {
  return +new Date(`2001/01/01 ${time}`) - +new Date('2001/01/01 00:00:00')
}
// 毫秒数转时间
export function getMSFormat(ms) {
  if (ms >= 1000) {
    let total = ms / 1000 // 总秒数
      , day = parseInt(total / (24 * 60 * 60)) //计算整数天数
      , afterDay = total - day * 24 * 60 * 60 //取得算出天数后剩余的秒数
      , hour = parseInt(afterDay / (60 * 60)) //计算整数小时数
      , afterHour = total - day * 24 * 60 * 60 - hour * 60 * 60 //取得算出小时数后剩余的秒数
      , min = parseInt(afterHour / 60) //计算整数分
      , afterMin = Math.floor(total - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60) //取得算出分后剩余的秒数
      , hh = 0
    if (day) {
      hh = day * 24
    }
    hh += hour
    return `${fillZero(hh)}:${fillZero(min)}:${fillZero(afterMin)}`
  } else {
    return `00:00:00`
  }
}
// 获取某月的天数
export function getDays(year, month) {
  return new Date(year, month, 0).getDate()
}
// 获取某月某日是周几
export function getWeekends(year, month, i) {
  return new Date(year, month - 1, i).getDay()
}
// 倒计时
export function getCountDown(date) {
  let ms = (Date.parse(date)) - (new Date().getTime())
  if (ms >= 0) {
    return {
      'dd': Math.floor(ms / (1000 * 60 * 60 * 24)),
      'hh': fillZero(Math.floor(ms / (1000 * 60 * 60)) % 24),
      'mm': fillZero(Math.floor(ms / (1000 * 60)) % 60),
      'ss': fillZero(Math.floor(ms / 1000) % 60)
    };
  } else {
    return false
  }
}
// 随机ID
export function randomID() {
  return Math.random().toString(36).substring(2)
}
// 千分位数字
export function thousands(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
// 获取随机数
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
// 随机生成颜色码
export function getRandomColor() {
  return '#' + (function (h) {
    return new Array(7 - h.length).join('0') + h
  })((Math.random() * 0x1000000 << 0).toString(16))
}
// 数组乱序
export function shuffle(arr) {
  let _arr = arr.slice()
  for (let i = 0, l = _arr.length; i < l; i++) {
    let j = getRandom(0, i), t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}
// 防抖
export function debounce(func, delay) {
  let timer
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
// 数组求和
export function arraySum(arr) {
  if (!arr.length) {
    return 0
  } else if (arr.length === 1) {
    return arr[0] - 0
  } else {
    return arr[0] - 0 + arraySum(arr.slice(1))
  }
}
// 深拷贝对象
export function deepCopy(values) {
  let copy
  if (null == values || 'object' != typeof values) {
    return values
  }

  if (values instanceof Date) {
    copy = new Date()
    copy.setTime(values.getTime())
    return copy
  }

  if (values instanceof Array) {
    copy = []
    for (let i = 0, len = values.length; i < len; i++) {
      copy[i] = deepClone(values[i])
    }
    return copy
  }

  if (values instanceof Object) {
    copy = {}
    for (let attr in values) {
      if (values.hasOwnProperty(attr)) copy[attr] = deepClone(values[attr])
    }
    return copy
  }
}
// 时间戳转字符串
export function timeToStr(timestamp, type = 'time') {
  if (!timestamp) return '-'
  let dt = new Date(timestamp)
    , year = dt.getFullYear()
    , month = fillZero(dt.getMonth() + 1)
    , day = fillZero(dt.getDate())
    , hour = fillZero(dt.getHours())
    , minute = fillZero(dt.getMinutes())
    , second = fillZero(dt.getSeconds())
  if (type === 'time') {
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`
  } else if (type === 'date') {
    return `${year}-${month}-${day}`
  }
}
// 计算两个日期之间相差天数，xxxx-xx-xx格式
export function dateDiff(startDate, endDate) {
  let startTime = new Date(Date.parse(startDate.replace(/-/g, '/'))).getTime()
    , endTime = new Date(Date.parse(endDate.replace(/-/g, '/'))).getTime()
    , dates = Math.abs((startTime - endTime)) / (1000 * 60 * 60 * 24)
  return dates
}
// 获得字符长度
export function getByteLen(val) {
  let len = 0
  for (let i = 0, l = val.length; i < l; i++) {
    let a = val.charAt(i)
    if (a.match(/[^\x00-\xff]/ig) != null) {
      len += 2
    } else {
      len += 1
    }
  }
  return len
}
// 日期格式化
Date.prototype.Format = function (format) {
  let o = {
    'M+': this.getMonth() + 1, // month
    'd+': this.getDate(), // day
    'h+': this.getHours(), // hour
    'm+': this.getMinutes(), // minute
    's+': this.getSeconds(), // second
    'q+': Math.floor((this.getMonth() + 3) / 3), // quarter
    'S': this.getMilliseconds() // millisecond
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  return format
}
// 获得密码强度
export function pwdIntensity(pwd) {
  let intensity = 0
  if (pwd.length < 6 || pwd.length > 32) {
    return intensity
  }
  if (/[a-z]/.test(pwd)) {
    intensity++
  }
  if (/[A-Z]/.test(pwd)) {
    intensity++
  }
  if (/[0-9]/.test(pwd)) {
    intensity++
  }
  if (/[`_~!@#$%^&;.*()-+=|"':,?]/.test(pwd)) {
    intensity++
  }
  return intensity
}
// 随机字符串生成
export function randomString(len) {
  len = len || 32;
  let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  let maxPos = $chars.length
  let str = ''
  for (let i = 0; i < len; i++) {
    str += $chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return str
}
// 匹配整数
export function isInteger(val) {
  return /^(-|\+)?\d+$/.test(val)
}
// 获取窗口可视范围的高度
export function getClientHeight() {
  let clientHeight = 0, doc = document
  if (doc.body.clientHeight && doc.documentElement.clientHeight) {
    clientHeight = (doc.body.clientHeight < doc.documentElement.clientHeight) ? doc.body.clientHeight : doc.documentElement.clientHeight
  } else {
    clientHeight = (doc.body.clientHeight > doc.documentElement.clientHeight) ? doc.body.clientHeight : doc.documentElement.clientHeight
  }
  return clientHeight
}
// 获取滚动条距顶部高度
export function getScrollTop() {
  return document.documentElement.scrollTop || document.body.scrollTop
}
// 设置滚动条距顶部高度
export function setScrollTop(y) {
  window.scrollTo(0, y)
}
// 获取当前滚动条位置
export function getScrollPosition() {
  let win = window
  return {
    x: win.pageXOffset !== undefined ? win.pageXOffset : win.scrollLeft,
    y: win.pageYOffset !== undefined ? win.pageYOffset : win.scrollTop
  }
}
// 滚动到指定元素区域
export function smoothScroll(element) {
  document.querySelector(element).scrollIntoView({
    behavior: 'smooth'
  })
}
// 平滑滚动到页面顶部
export function scrollToTop() {
  const top = document.documentElement.scrollTop || document.body.scrollTop
  if (top > 0) {
    window.requestAnimationFrame(scrollToTop)
    window.scrollTo(0, top - top / 8)
  }
}
// 转文字大小字节到KB,MB,GB并保留两位小数
export function formatFileSize(fileSize) {
  let size
  if (fileSize < 1024) {
    return fileSize + 'B'
  } else if (fileSize < (1024 * 1024)) {
    size = fileSize / 1024
    size = size.toFixed(2)
    return size + 'KB'
  } else if (fileSize < (1024 * 1024 * 1024)) {
    size = fileSize / (1024 * 1024)
    size = size.toFixed(2)
    return size + 'MB'
  } else {
    size = fileSize / (1024 * 1024 * 1024)
    size = size.toFixed(2)
    return size + 'GB'
  }
}
// 判断元素是否在视口中
export function elementIsVisibleInViewport(el) {
  const { top, left, bottom, right } = el.getBoundingClientRect()
  const { innerHeight, innerWidth } = window
  return ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) && ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
}
// 时间戳转化为多久前
export function timeFormat(timestamp) {
  let mistiming = Math.round((Date.now() - timestamp) / 1000)
    , arrr = ['年', '个月', '星期', '天', '小时', '分钟', '秒']
    , arrn = [31536000, 2592000, 604800, 86400, 3600, 60, 1]
  for (let i = 0; i < arrn.length; i++) {
    let inm = Math.floor(mistiming / arrn[i])
    if (inm != 0) {
      return inm + arrr[i] + '前'
    }
  }
}
// 根据身份证获取年龄
export function IdCard(card) {
  let _dt = new Date()
    , month = _dt.getMonth() + 1
    , day = _dt.getDate()
    , age = _dt.getFullYear() - card.substring(6, 10) - 1;
  if (card.substring(10, 12) < month || card.substring(10, 12) == month && card.substring(12, 14) <= day) {
    age++
  }
  return age
}
// 复制字符串到剪切板
export function copyString(str) {
  const doc = document
    , el = doc.createElement('textarea')
  el.value = str
  el.setAttribute('readonly', '')
  el.style.position = 'absolute'
  el.style.left = '-9999px'
  el.style.top = '-9999px'
  doc.body.appendChild(el)
  const selected = doc.getSelection().rangeCount > 0 ? doc.getSelection().getRangeAt(0) : false
  el.select()
  doc.execCommand('copy')
  doc.body.removeChild(el)
  if (selected) {
    doc.getSelection().removeAllRanges()
    doc.getSelection().addRange(selected)
  }
}
// 判断数据类型
export function typeJudge(val, type) {
  const dataType = Object.prototype.toString.call(val).replace(/\[object (\w+)\]/, '$1').toLowerCase()
  return type ? dataType === type : dataType
}
// 数字转大写人名币
export function toCHS(num) {
  if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(num)) {
    return '非法数字'
  }
  let unit = '千百拾亿千百拾万千百拾元角分',
    str = ''
  num += '00'
  let p = num.indexOf('.')
  if (p >= 0) {
    num = num.substring(0, p) + num.substr(p + 1, 2)
  }
  unit = unit.substr(unit.length - num.length)
  for (let i = 0; i < num.length; i++) {
    str += '零壹贰叁肆伍陆柒捌玖'.charAt(num.charAt(i)) + unit.charAt(i)
  }
  return str.replace(/零(千|百|拾|角)/g, '零').replace(/(零)+/g, '零').replace(/零(万|亿|元)/g, '$1').replace(/(亿)万|壹(拾)/g, '$1$2').replace(/^元零?|零分/g, '').replace(/元$/g, '元整')
}

let cookies = {
  getItem: function (sKey) {
    if (!sKey) {
      return null
    }
    return decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null
  },
  setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
      return false
    }
    let sExpires = ''
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires = vEnd === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : '; max-age=' + vEnd
          break
        case String:
          sExpires = '; expires=' + vEnd
          break
        case Date:
          sExpires = '; expires=' + vEnd.toUTCString()
          break
      }
    }
    document.cookie = encodeURIComponent(sKey) + '=' + encodeURIComponent(sValue) + sExpires + (sDomain ? '; domain=' + sDomain : '') + (sPath ? '; path=' + sPath : '') + (bSecure ? '; secure' : '')
    return true
  },
  removeItem: function (sKey, sPath, sDomain) {
    if (!this.hasItem(sKey)) {
      return false
    }
    document.cookie = encodeURIComponent(sKey) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' + (sDomain ? '; domain=' + sDomain : '') + (sPath ? '; path=' + sPath : '')
    return true
  },
  hasItem: function (sKey) {
    if (!sKey) {
      return false
    }
    return (new RegExp('(?:^|;\\s*)' + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=')).test(document.cookie)
  },
  keys: function () {
    let aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '').split(/\s*(?:\=[^;]*)?;\s*/)
    for (let nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) {
      aKeys[nIdx] = decodeURIComponent(aKeys[nIdx])
    }
    return aKeys
  }
}
// base64中文转码
let Base64 = {
  encode(str) {
      return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
          function toSolidBytes(match, p1) {
              return String.fromCharCode('0x' + p1)
          }))
  },
  decode(str) {
      return decodeURIComponent(atob(str).split('').map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      }).join(''))
  }
}

export {
  fillZero, getRandom, cookies, Base64
}
