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
        // userInfo: {nickName : }
        // userInfo: app.globalData.userInfo
    },

    showTip: function (e) {
        console.log(e)
        wx.showModal({
            title: '提示',
            content: '这是一个模态弹窗',
            success: function (res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    }
})