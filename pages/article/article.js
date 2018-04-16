Page({
  data: {
    url: '',
    title: '',
    isCopy: false,
  },
  onLoad: function (options) {
    console.info(options.id);
    console.info(options.title);
    this.setData({
      url: options.id,
      title: options.title,
    })
  },
  onClick: function(event){
    wx.setClipboardData({
      data: this.data.url,
      })
    this.setData({
      isCopy: true,
    })
    wx.getClipboardData({
      success: function(res) {
        console.info(res)
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})