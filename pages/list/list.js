// pages/list/list.js
import {http} from '../../utils/http.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    station: [],
    trainNumber: '',
    show: false,
    height: 850,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let deviceInfo = wx.getSystemInfoSync()
    console.log(deviceInfo)
    let height = deviceInfo.windowHeight * 1.5
    this.setData({
      height
    })

    let trainNumber = options.id
    let that = this
    console.log(options)
    wx.setNavigationBarTitle({
      title: trainNumber
    })

    http('/trainTime', { 'train_number': trainNumber }, 'POST')
      .then(res => {
        console.log(res)
        let trainInfo = res.train_info
        wx.setStorageSync('train_info', JSON.stringify(trainInfo))
        this.setData({
          station: trainInfo || [],
          trainNumber: trainNumber,
          show: true
        })
      })

    wx.getStorage({
      key: 'train_info',
      success: function (res) {
        let trainInfo = JSON.parse(res.data)
        console.log(trainInfo)
        that.setData({
          station: trainInfo || [],
          trainNumber: trainNumber
        })
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: this.data.trainNumber,
      path: '/pages/list/list?id=' + this.data.trainNumber,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },

  query: function (event) {
    let data = event.currentTarget.dataset
    let station = data.station
    let trainNumber = this.data.trainNumber

    http('/trainLate', {
      'train_number': trainNumber,
      'station': station
    }, 'POST')
      .then(res => {
        wx.showModal({
          content: res.train_info,
          showCancel: false
        })
      })
  }

})
