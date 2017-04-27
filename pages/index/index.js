//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '「专心做重要的小事」',
    userInfo: {
    }
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs?id=1&nidaye=2'
      // url: '../one_word/one_word'
    })
  },
  openMenu: function() {
    wx.navigateTo({
      url: '../menu/menu'
      // url: '../logs/logs?id=1&nidaye=2'
    })
  },
  onLoad: function (options) {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
