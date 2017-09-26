const constant = require('../common/constant.js')
const md5 = require('md5.js')

var request = function (option, successCallBack) {
  console.log(option)
  wx.showToast({
    title: '查询中……',
    icon: 'loading'
  })

  if (option.data !== undefined) {
    option.data._token = token(option.data)
  }

  wx.request({
    url: constant.url + option.url,
    data: option.data,
    method: option.method ? option.method : 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: option.header, // 设置请求的 header
    success: successCallBack,
    fail: function (res) {
      // fail
      console.log(res)
    },
    complete: function () {
      // complete
      wx.hideToast()
    }
  })
}

function token (data) {
  if (data === undefined || data == null) {
    return ''
  }

  let newkey = Object.keys(data).sort()　　 // 先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
  let str = ''
  let value = ''
  for (let i = 0; i < newkey.length; i++) { // 遍历newkey数组
    value = data[newkey[i]]
    if (typeof value === 'object') {
      continue
    }
    str += newkey[i] + ':' + value + ',' // 向新创建的对象中按照排好的顺序依次增加键值对
  }
  str = str.slice(0, -1)
  return md5(str)
}

module.exports = request
