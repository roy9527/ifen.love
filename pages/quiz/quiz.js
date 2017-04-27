var app = getApp()

function parserData(page) {
    var data = page.data.quiz
    var index = page.data.current_index
    console.log(data)
    
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
    console.log(fuzzy)
    page.setData({
        current_index: index,
        fuzzy_mean: fuzzy,
        current_word: current_word_,
        hideQuiz: false
    })
}

Page({
    onLoad: function (options) {
        // 生命周期函数--监听页面加载
        var that = this
        this.setData({
            userInfo: app.globalData.userInfo
        })
        wx.showNavigationBarLoading()
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
                wx.setNavigationBarTitle({
                    title: '测验'
                }) 
                if (res.data) {
                    that.data.quiz = res.data
                    that.data.words_size = res.data.words_list.length
                    parserData(that)
                } else {
                    //TODO
                }

            },
            fail: function (res) {
                wx.hideNavigationBarLoading()
            },
        })
    },

    onReady: function () {

    },
    data: {

        quiz: null,
        current_index: 0,
        current_word: null,
        fuzzy_mean: [],
        words_size: -1,
        hideMeans: true,
        hideQuiz: true,
    },

    showMeans: function () {
        var hide = this.data.hideMeans
        this.setData({
            hideMeans: !hide
        })
    },

    nextWord: function () {
        this.data.current_index += 1
        if(this.data.current_index >= this.data.words_size) {
            //TODO submit score
            console.log('ok complete!')
        }else {
            parserData(this)
        }
    }
})