//index.js
//获取应用实例
import WxValidate from '../../utils/WxValidate.js'
const app = getApp()

Page({
  data: {
    submitHidden:true,
    formValue:{},
    name:'',
    tel: '',
    email: '',
    msg: '',
    imgs:[
      app.globalData.url + 'icon-name.png',
      app.globalData.url + 'icon-number.png',
      app.globalData.url + 'icon-email.png',
      app.globalData.url + 'icon-beizhu.png',
    ]
  },
  WxValidate:null,
  onLoad: function () {
    this.WxValidate = new WxValidate(
      {
        name: {
          required: true,
          minlength: 2,
          maxlength: 10,
        },
        tel: {
          required: true,
          tel: true,
          maxlength: 11,
          number: true
        },
        email: {
          required: true,
          email: true,
          maxlength: 100,
        },
        msg: {
          required: true,
          maxlength: 100,
        }
      }, 
      {
        name: {
          required: '请填写您的姓名',
          name: '请输入正确的姓名',
        },
        tel: {
          required: '请填写您的手机号',
          tel: '请输入正确的手机号',
        },
        email: {
          required: '请输入电子邮箱',
          email: '请输入正确的电子邮箱',
        },
        msg: {
          required: '请输入备注说明'
        }
      }
    )
  },
  //事件处理函数
  formSubmit(e) {
    //提交错误描述
    if (!this.WxValidate.checkForm(e)) {
      const error = this.WxValidate.errorList[0]
      // `${error.param} : ${error.msg} `
      wx.showToast({
        title: `${error.msg} `,
        icon:"none",
        mask:true,
        duration: 1000
      })
      return false
    }
    this.setData({ submitHidden: false, formValue: e.detail.value })
    var that = this;
    wx.request({
      url: 'https://www.yingshangyan.com/wxapi/health/addinfo',
      data: {
        message_name: e.detail.value.name,
        message_phone: e.detail.value.tel,
        message_email: e.detail.value.email,
        message_content: e.detail.value.msg
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (requestRes) {
        wx.showToast({
          icon:'success',
          title: '提交成功',
          mask:true
        })
        that.setData({
          submitHidden: true,
          name: '',
          tel: '',
          email: '',
          msg: ''
        })
      },
      fail: function () {
      },
      complete: function () {
      }
    })
  },
  reset(){
    this.setData({
      formValue:{}
    })
  },
  // authorization(){
  //   wx.checkSession({
  //     success: function () {
  //       //session 未过期，并且在本生命周期一直有效
  //     },
  //     fail: function () {
  //       console.log(11)
  //       //登录态过期
  //       //重新登录
  //       wx.login({
  //         success: res => {
  //           wx.request({
  //             url: 'https://www.yingshangyan.com/wxapi/login',
  //             header: {
  //               'content-type': 'application/json'
  //             },
  //             data: {
  //               code: res.code
  //             },
  //             success(res) {
  //               // wx.setStorageSync('__userid__', userid)
  //               console.log(res.data)
  //             }
  //           })
  //           wx.getUserInfo({
  //               success: function (userResult) {
  //                   // 发送 res.code 到后台换取 openId, sessionKey, unionId
  //                   if (res.code) {
  //                       //发起网络请求
  //                       var header = {};

  //                       header['X-WX-Code'] = res.code;
  //                       header['X-WX-Encrypted-Data'] = userResult.encryptedData;
  //                       header['X-WX-IV'] = userResult.iv;
  //                       wx.request({
  //                           url: 'https://www.yingshangyan.com/wxapi/login',
  //                           header: header,
  //                           data: {
  //                               code: res.code
  //                           },
  //                           success(res){
  //                             var userid = res.data.data.userinfo
  //                             wx.setStorageSync('__userid__', userid)
  //                             //console.log(res.data.data.userinfo)
  //                           }
  //                       })
  //                   } else {
  //                       console.log('获取用户登录态失败！' + res.errMsg)
  //                   }
  //               },

  //               fail: function (userError) {
  //                   console.log('ERR_WX_GET_USER_INFO', '获取微信用户信息失败，请检查网络状态');
  //               },
  //           });

  //         }
  //       })
  //     }
  //   })
  // }
})
