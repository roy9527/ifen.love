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
        app.toPage('../quiz/quiz')
    },

    onReady:function() {
        wx.setNavigationBarTitle({
            title: '准备开始'
        })
    }
})