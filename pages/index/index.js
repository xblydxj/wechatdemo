const app = getApp()
var Constants = require('../../utils/Constants.js');
var Util = require('../../utils/util.js');

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    modalHidden: true,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    meizhi: [],
    current: 0,
    isScroll: true,
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    that = this;
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    requestMeizhi();
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  imageError: function (e) {
    this.setData({
      meizhi: ['../logo.png', '../logo.png', '../logo.png', '../logo.png', '../logo.png']
    })
  },
  EventHandle:function(event){
    console.info(event)
      this.setData({
        current: event.detail.current,
      })
  },
  onImageClick: function (event) {
    this.setData({
       modalHidden: false,
       isScroll: false,
    })
  },
  onConfirmClick: function (event) {
    this.setData({ 
      modalHidden: true,
      isScroll: true
    });
  },
  enterMain: function(e) {
    wx.navigateTo({
      url: Constants.PAGE_MAIN,
    })
  },

  /**
     * 生命周期函数--监听页面显示
     */
  onShow: function () {
    this.setData({
      isScroll: true,
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      isScroll: false,
    })
  },
});
var that;

function requestMeizhi() {
  wx.request({
    url: "https://gank.io/api/data/福利/8/1",
    header: {
      "Content-Type": "application/json"
    },
    success: function (res) {
      if (res == null ||
        res.data == null ||
        res.data.results == null ||
        res.data.results.length <= 0) {
        console.error(Constants.ERROR_DATA_IS_NULL);
        return;
      }
      that.setData({
        meizhi: res.data.results,
      })
    }
  });
}



