//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  onShow: function (options) {
    console.log(options)
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData: {
    userInfo: null
  },
  toPage: function (url_, success_, fail_, complete_) {
    wx.navigateTo({
      url: url_,
      success: function (res) {
        if (typeof success_ == "function") {
          success_(res)
        }
      },
      fail: function (res) {
        if (typeof fail_ == "function") {
          fail_(res)
        }
      },
      complete: function (res) {
        if (typeof complete_ == "function") {
          complete_(res)
        }
      }
    })
  },


})