var app = getApp()
Page({
    onLoad: function (options) {
        // 生命周期函数--监听页面加载
        console.log(app.globalData.userInfo)
        this.setData({
            userInfo: app.globalData.userInfo
        })
    },
    data: {

    },

    startChange: function () {
        wx.navigateTo({
          url: '../one_word/one_word',
          success: function(res){
            // success
          },
          fail: function(res) {
            // fail
          },
          complete: function(res) {
            // complete
          }
        })
    }
})