var app = getApp();
Page({
  dara: {
    items: [
      {
        title: '单行列表',
        extra: '详细信息',
      },
    ],
    items2: [
      {
        title: '多行列表',
        arrow: true,
      },
      {
        title: '多行列表',
        arrow: 'up',
      },
      {
        title: '多行列表',
        arrow: 'down',
      },
      {
        title: '多行列表',
        arrow: 'empty',
      },
      {
        title: '多行列表',
      },
    ],
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
            prizeListTop:'30'
          })
        }
        console.log(res.model);

      }
    })
    that.setData({
      noPrize: query.noPrize
    })
    console.log(query.noPrize);
    my.httpRequest({
      url: app.signInUrl + 'm=huifeng&c=index&a=my_prizes_lists&userid=chen123', // 目标服务器url
      method: 'POST',
      success: (res) => {
        that.setData({
          prizeList: res.data.data
        })
        console.log(res.data);
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
