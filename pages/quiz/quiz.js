var app = getApp()

function parserData(page) {
    var data = page.data.quiz
    var index = page.data.current_index

    var l = data.words_list
    var current_word_ = l[index]
    var fuzzy = []
    var tong = new Array(l.length)
    while (fuzzy.length < 3) {
        var r = parseInt(Math.random() * l.length)
        if (r != index && r < l.length && !tong[r]) {
            fuzzy.push(l[r].mean)
            tong[r] = true
        }
    }
    fuzzy.push(current_word_.mean)

    var r = parseInt(Math.random() * 3)
    var t = fuzzy[r]
    fuzzy[r] = fuzzy[3]
    fuzzy[3] = t

    page.setData({
        hideQuiz: false,
        hideMeansBtn: false,
        hideMeans: true,
        fuzzy_mean: fuzzy,
        current_word: current_word_,
        current_index: index,
        right_index: r,
    })
}

function nextWord_(page, complete) {
    page.data.current_index += 1
    if (page.data.current_index >= page.data.words_size) {
        //TODO submit score
        if (complete) {
            complete()
        }
    } else {
        parserData(page)
    }
}

Page({
    onLoad: function (options) {
        // 生命周期函数--监听页面加载
        var that = this
        this.setData({
            userInfo: app.globalData.userInfo
        })
        wx.showNavigationBarLoading()
        wx.showLoading({
            title: '测验准备中...',
        })
        wx.setNavigationBarTitle({
            title: '准备开始'
        })
        wx.request({
            url: 'http://127.0.0.1:5000/api/get_last_quiz',
            data: {},
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                wx.hideNavigationBarLoading()
                wx.hideLoading()
                wx.setNavigationBarTitle({
                    title: '测验'
                })
                if (res.data) {
                    that.data.quiz = res.data
                    that.data.words_size = res.data.words_list.length
                    parserData(that)
                    that.setData({})
                } else {
                    //TODO
                }
            },
            fail: function (res) {
                wx.hideNavigationBarLoading()
                wx.hideLoading()
                wx.showToast({
                    title: '出错啦，请重试',
                    icon: 'loading',
                })
            },
        })
    },

    onReady: function () {

    },
    data: {

        quiz: null,
        current_index: 0,
        current_word: null,
        right_index: -1,
        fuzzy_mean: [],
        words_size: -1,
        hideMeans: true,
        hideMeansBtn: false,
        hideQuiz: true,
    },

    selectWord: function (event) {
        console.log(event.target.id)
        console.log(this.data.current_word)
        nextWord_(this, function c_() {
            console.log('ok complete!')
        })
    },
    showMeans: function () {
        this.setData({
            hideMeans: false,
            hideMeansBtn: true,
        })
    },

    nextWord: function () {
        nextWord_(this, function c_() {
            console.log('ok complete!')
        })
    },

})