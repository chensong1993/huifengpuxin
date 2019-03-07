var app = getApp();
Page({
  onLoad(query) {
    var that = this;
    //判断手机型号
    my.getSystemInfo({
      success: (res) => {
        if (res.model == 'iPhone X' || res.model == 'iPhone Xs' || res.model == 'iPhone Xr' || res.model == 'iPhone Xs Max') {
          that.setData({
            xScrollViewHeight: '800',
            prizeListTop: '90',
            GoBack: '70',
            availableIntegral: '165',
            xRedeemTop: '30'
          })
        }
        console.log(res.model);

      }
    })
    that.onShowPrizeList();
  },
  onShowPrizeList() {
    var that = this;
    my.httpRequest({
      url: app.signInUrl + 'm=huifeng&c=index&a=prizes&userid=' + app.userId, // 积分兑换奖品列表
      method: 'POST',
      success: (res) => {
        that.setData({
          creditsList: res.data.lists,
          score: res.data.score
        })
        console.log(res.data.lists);
      },
    });
  },
  onGoBack(e) {
    my.navigateBack({
      delta: 1
    });
    console.log("123");
  },
  //提交手机号
  onSubmitPhoneNum(e) {
    var that = this;
    that.setData({
      isCondition: 'noShow'
    })
  },
  //弹窗关闭按钮
  //积分兑现提醒
  onFinish() {
    this.setData({
      isCondition: -1,
      barrierbedShow: -1
    })
  },
  //展示兑换窗口
  showDuihan(e) {
    var that = this;
    that.data.prizeId = e.target.dataset.prizeid;
    console.log(e.target.dataset.status);
   
      that.setData({
        isCondition: 1,
        barrierbedShow: 1
      })
    
  },
  //兑换成功
  onSuccessful() {

  },
  //是否兑换
  onisRedeem(e) {
    var that = this;
    my.httpRequest({
      url: app.signInUrl + 'm=huifeng&c=index&a=prize_exchange&userid=' + app.userId + '&prize_id=' + that.data.prizeId, // 兑换奖品url
      method: "POST",
      success: (res) => {
        switch (res.data.state) {
          case 200:
            that.setData({
              isCondition: 2,
              barrierbedShow: 1
            })
            that.onShowPrizeList();
            break;
          case 202:
            that.setData({
              isCondition: 0,
              barrierbedShow: 1
            })
            my.showToast({
              content: '不在活动期内，无法兑换'
            });
            break;
          case 203:
            that.setData({
              isCondition: 0,
              barrierbedShow: 1
            })
            my.showToast({
              content: '无兑奖奖品'
            });
            break;
          case 204:
            that.setData({
              isCondition: 0,
              barrierbedShow: 1
            })
            my.showToast({
              content: '不在该奖品兑换期内'
            });
            break;
          case 205:
            that.setData({
              isCondition: 0,
              barrierbedShow: 1
            })
            my.showToast({
              content: '奖品已经兑完了'
            });
            break;
          case 206:
            that.setData({
              isCondition: 0,
              barrierbedShow: 1
            })
            my.showToast({
              content: '积分不够'
            });
            break;
          case 207:
            that.setData({
              isCondition: 0,
              barrierbedShow: 1
            })
            my.showToast({
              content: '只能兑换2件商品'
            });
            break;
          default:
            that.setData({
              isCondition: 0,
              barrierbedShow: 1
            })
            break;

        }
        console.log(res.data.state);
      },
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
    var that = this;
    my.httpRequest({
      url: app.signInUrl + 'm=huifeng&c=index&a=share&userid=' + app.userId, // 分享de积分
      method: 'POST',
      success: (res) => {
        that.setData({
          isCondition: -1,
          barrierbedShow: -1,
          score: res.data.data.total_score
        })
        if (res.data.data.share_score > 0) {
          my.showToast({
            content: '领取积分成功'
          });
        } else {
          my.showToast({
            content: '每天分享只能得一次积分'
          });
        }

        console.log(res.data.data.total_score);
      },
    });

    // 返回自定义分享信息
    return {
      title: 'My App',
      desc: 'My App description',
      path: 'pages/index/index',
    };
  },
});
