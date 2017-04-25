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
        hideMeans: true,
        words_mean: [
            {
                mean: 'word1'
            },
            {
                mean: 'word2'
            },
            {
                mean: 'word3'
            },
            {
                mean: 'word4'
            }
        ]
    },

    showMeans: function () {
        var hide = this.data.hideMeans
        this.setData({
            hideMeans: !hide
        })
    }
})