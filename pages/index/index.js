// index.js
// 获取应用实例
const app = getApp()
import {http} from '../../utils/http.js'

Page({
  data: {
    queryHistory: [],
    input: '',
    showClear: false,
    showKeyboard: false
  },
  // 事件处理函数
  onLoad: function () {
    let that = this
    wx.getStorage({
      key: 'query_history',
      success: function (res) {
        that.setData({
          queryHistory: res.data || []
        })
      }
    })
  },
  pageTap: function () {
    // 在页面空白处点击时隐藏小键盘
    this.setData({
      showKeyboard: false
    })
  },
  clearInput: function () {
    console.log('clear')
    this.setData({
      input: '',
      showClear: false
    })
  },
  bindKeyInput: function () {
    console.log('key input')
    let showKeyboard = this.data.showKeyboard
    this.setData({
      showKeyboard: !showKeyboard
    })
  },
  // 字母按键
  letterButton: function (event) {
    let data = event.currentTarget.dataset
    console.log(data.letter)
    this.setData({
      input: data.letter,
      showClear: true
    })
  },
  // 数字按键
  numberButton: function (event) {
    let data = event.currentTarget.dataset
    console.log(data.number)
    let input = this.data.input

    input = input + data.number
    if (input.length > 6) {
      return
    }

    this.setData({
      input: input,
      showClear: true
    })
  },
  hideKeyboard: function () {
    this.setData({
      showKeyboard: false
    })
  },
  delInput: function () {
    let input = this.data.input
    let newInput = input.substring(0, input.length - 1)

    this.setData({
      input: newInput,
      showClear: newInput.length  // 最后一个数字时隐藏删除按钮
    })
  },
  formSubmit: function (e) {
    let trainNumber
    trainNumber = e.detail.value.train_number

    trainNumber = this.check(trainNumber)
    if (!trainNumber) {
      wx.showModal({
        title: '错误',
        content: '请输入正确的车次号',
        showCancel: false
      })
      return
    }

    http('/getStationStopInfo', { 'train_number': trainNumber}, 'POST')
      .then(res=>{
        console.log(res)
        let trainInfo = res.train_info
        wx.setStorageSync('train_info', JSON.stringify(trainInfo))

        let startStation = trainInfo[0].station_name
        let endStation = trainInfo[0].end_station_name
        let historyInfo = {
          'train_number': trainNumber,
          'start': startStation,
          'end': endStation
        }

        let queryHistory = this.data.queryHistory
        if (!queryHistory[0] || (queryHistory[0].train_number !== historyInfo.train_number)) {
          let length = queryHistory.unshift(historyInfo)
          console.log(length)
          if (length > 5) {
            queryHistory.splice(5, length - 5)
            console.log(queryHistory)
          }

          wx.setStorageSync('query_history', queryHistory)
          this.setData({
            queryHistory: queryHistory,
            input: '',
            showClear: false
          })
        }

        wx.navigateTo({
          url: '../list/list?id=' + trainNumber
        })
      }).catch(error=>{
        wx.showToast({
          title: error,
          icon:'none'
        })
      })

  },
  query: function (event) {
    let data = event.currentTarget.dataset
    let trainNumber = data.number

    wx.navigateTo({
      url: '../list/list?id=' + trainNumber
    })
  },

  check: function (str) {
    if (str.length === 0) {
      return false
    }
    let reg = /^[cdglkytzCDGLKYTZ\d]\d{1,5}$/
    let r = str.match(reg)
    if (r == null) {
      return false
    }

    return str[0].toUpperCase() + str.slice(1)
  }

})
