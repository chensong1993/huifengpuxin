var app=getApp();
Page({
  onLoad(query) {
    var that = this;
    my.httpRequest({
      url: app.signInUrl + 'm=huifeng&c=index&a=prizes&userid=chen123', // 积分兑换奖品列表
      method:'POST',
      success: (res) => {
        that.setData({
          creditsList:res.data.lists
        })
          console.log(res.data.lists);
      },
    });
  },
  onGoBack(e){
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
