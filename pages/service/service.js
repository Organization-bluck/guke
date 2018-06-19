// pages/service/service.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    card1isSelect:true,
    card2isSelect: false,
    imgs: [
      app.globalData.url + 'ka1.png',
      app.globalData.url + 'ka2.png',
      app.globalData.url + 'select.png',
      app.globalData.url + 'unselset.png',
    ]
  },
  chooseCard(e){
    let index = e.currentTarget.dataset.cardindex;
    if (index == 1){
      this.setData({
        card1isSelect: true,
        card2isSelect: false
      })
    }else{
      this.setData({
        card1isSelect: false,
        card2isSelect: true
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})