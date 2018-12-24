// pages/feedback/feedback.js

import {http} from '../../utils/http.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    feedBackArray: ['未找到车次', '时刻信息不准确', '新功能建议', '使用问题', '其他'],
    type:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  bindPickerChange(e){
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      type: e.detail.value
    })
  },

  submit({detail}){
    console.log(detail.value)
    let content = detail.value.content

    if(content == undefined || content == ''){
      wx.showToast({
        title: '请输入反馈内容',
        icon:'none'
      })
      return
    }

    http('/feedback', {
      content,
      type: this.data.type
    }).then(res=>{
      wx.showToast({
        title: '提交成功',
      })
      setTimeout(()=>{
        wx.navigateBack({
          delta:1
        })
      }, 1000)
    })
  }

})