// pages/list/list.js
const request = require('../../utils/request.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    station: [],
    trainNumber: '',
    show: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let trainNumber = options.id
    let that = this
    console.log(options)
    wx.setNavigationBarTitle({
      title: trainNumber
    })

    let option = {
      url: '/trainTime',
      method: 'POST',
      data: {
        'train_number': trainNumber
      }
    }
    request(option, (res) => {
      if (res.data.code == 0) {
        let trainInfo = res.data.data.train_info
        wx.setStorageSync('train_info', JSON.stringify(trainInfo))
        that.setData({
          station: trainInfo || [],
          trainNumber: trainNumber,
          show: true
        })
      } else {
        wx.showModal({
          title: '错误',
          content: res.data.msg,
          showCancel: false
        })
      }
    })

    // wx.getStorage({
    //   key: 'train_info',
    //   success: function (res) {
    //     let trainInfo = JSON.parse(res.data)
    //     console.log(trainInfo)
    //     that.setData({
    //       station: trainInfo || [],
    //       trainNumber: trainNumber
    //     })
    //   }
    // })
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
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

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

    let option = {
      url: '/trainLate',
      method: 'POST',
      data: {
        'train_number': trainNumber,
        'station': station
      }
    }
    request(option, (res) => {
      wx.showModal({
        content: res.data.data.train_info,
        showCancel: false
      })
    })
  }

})
