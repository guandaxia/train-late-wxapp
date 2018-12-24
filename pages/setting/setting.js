// pages/setting/setting.js
const util = require('../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    times:[
      '10分钟',
      '20分钟',
      '30分钟',
    ],
    timeSelect:'10分钟',
    showSetting:true,
    date:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.data.showSetting)
    let date = util.formatDate()
    this.setData({
      date
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  beforeDrive(e){
    let showSetting = e.detail.value
    console.log(showSetting)
    this.setData({
      showSetting
    })
  },

  bindTimeChange(e){
    console.log(e.detail.value)
    let timeSelect = this.data.times[e.detail.value]
    this.setData({
      timeSelect
    })
  },

  selectDate(e){
    console.log(e.detail.value)
    let date = e.detail.value
    this.setData({
      date
    })
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
  onShareAppMessage: function () {
  
  }
})