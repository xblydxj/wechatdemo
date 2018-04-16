//logs.js
const app = getApp()
var Constants = require('../../utils/Constants.js');
var Util = require('../../utils/util.js');

Page({
  data: {
    AndroidList: [],
    hidden: false,
    nextPage: 1,
  },
  onLoad: function () {
    that = this;
    this.setData({
      nextPage: 1,
    })
    requestAndroid(this.data.nextPage);
  },
  onPullDownRefresh(){
    console.info(e.detail)
    this.setData({
      hidden: false,
    })
    requestAndroid(this.data.nextPage);
  },
  onReachBottom(){
    this.setData({
      hidden: false,
    })
    requestAndroid(this.data.nextPage);
  },
  onItemClick(event){
    console.info(event.currentTarget.id)
    wx.navigateTo({
      url: Constants.PAGE_ARTICLE + '?id=' + event.currentTarget.id
    });
  }
})

var that;

function requestAndroid(page){
  console.info(page);
  wx.request({
    url: 'https://gank.io/api/data/Android/20/' + page,
    header: {},
    success: function (res) {
      res.data.results = modifyTime(res.data.results);
      if (page == 1) {
        that.setData({
          AndroidList: res.data.results,
          nextPage: page + 1,
          hidden: true,
        })
      } else {
        that.setData({
          AndroidList: that.data.AndroidList.concat(res.data.results),
          nextPage: page + 1,
          hidden: true,
        })
      }
    }
  })
}

function modifyTime(AndroidList){
  for(var i=0;i<AndroidList.length;i++){
    AndroidList[i].publishedAt = AndroidList[i].publishedAt.substring(5,10);
  }
  return AndroidList;
}


