var app = getApp();
Page({
  data: {

  },
  nItemClick(ev) {
    my.alert({
      content: `点击了第${ev.index}行`,
    });
  },
  onLoad(query) {
    var that = this;
    //判断手机型号
    my.getSystemInfo({
      success: (res) => {
        if (res.model == 'iPhone X' || res.model == 'iPhone Xs' || res.model == 'iPhone Xr' || res.model == 'iPhone Xs Max') {
          that.setData({
            shareBottom: '260',
            goBackNo: '165',
            goBackIs: '125',
            xScrollViewHeight: '790',
            prizeListTop: '30',
            xRedeemTop: '20'
          })
        }
        console.log(res.model);

      }
    })
    that.setData({
      noPrize: query.noPrize
    })
    console.log(query.noPrize);
    that.onPrizeList();
  },
  onPrizeList() {
    var that = this;
    my.httpRequest({
      url: app.signInUrl + 'm=huifeng&c=index&a=my_prizes_lists&userid=' + app.userId, // 我的奖品url
      method: 'POST',
      success: (res) => {
        that.setData({
          prizeList: res.data.data.lists
        })
        console.log(res.data.data.lists);
      },
    });
  },
  //使用奖品
  onUsePrize(e) {
    var that = this;
    var prizeId = e.target.dataset.prizeid;
    console.log(prizeId);
    my.httpRequest({
      url: app.signInUrl + 'm=huifeng&c=index&a=use_prize&userid=' + app.userId + '&user_prize_id=' + prizeId, // 使用奖品url
      method: 'POST',
      success: (res) => {

        switch (res.data.state) {
          case 200:
            that.setData({
              useState: 1
            })
            that.onPrizeList();
            my.showToast({
              content: '使用成功'
            });
            break;
          case 202:
            that.setData({
              useState: -1
            })
            my.showToast({
              content: '不在活动期内'
            });
            break;
          case 203:
            console.log(res.data.state);
            that.setData({
              useState: -1,
              phoneTipShow: 1,
              barrierbedShow: 1
            })

            break;
          case 204:
            that.setData({
              useState: -1
            })
            my.showToast({
              content: '该奖品不能使用'
            });
            break;
          case 205:
            that.setData({
              useState: -1
            })
            my.showToast({
              content: '该奖品已经使用'
            });
            break;
          case 402:
            that.setData({
              useState: -1
            })
            my.showToast({
              content: '请重新授权'
            });
            break;
          case 403:
            that.setData({
              useState: -1
            })
            my.showToast({
              content: '活动未开始'
            });
            break;
          default:
            that.setData({
              useState: -1
            })
            my.showToast({
              content: '使用失败'
            });
            break
        }
        console.log(res.data.data.lists);
      },
    });
  },
  //获取手机号
  onPhoneContent(e) {
    var that = this;
    that.setData({
      value: e.detail.value
    })
  },
  //手机号
  onSubmitPhoneNum(e) {
    var that = this;
    console.log(that.data.value);
    my.httpRequest({
      url: app.signInUrl + 'm=huifeng&c=index&a=bind_phone&phone=' + that.data.value + '&userid=' + app.userId, // 我的奖品url
      method: 'POST',
      success: (res) => {
        if (res.data.state == 200) {

          that.setData({
            phoneTipShow: -1,
            barrierbedShow: -1
          })

          my.showToast({
            content: '绑定成功'
          });
        } else {
          that.setData({
            phoneTipShow: -1,
            barrierbedShow: -1
          })
          my.showToast({
            content: '绑定失败'
          });
        }
      },
    });

  },
  onGoBack(e) {
    my.navigateBack({
      delta: 1
    });
  },
  onReady() {
    // 页面加载完成
  },
  onShow() {
    // 页面显示
  },
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面被关闭
  },
  onTitleClick() {
    // 标题被点击
  },
  onPullDownRefresh() {
    // 页面被下拉
  },
  onReachBottom() {
    // 页面被拉到底部
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: 'My App',
      desc: 'My App description',
      path: 'pages/index/index',
    };
  },
});
