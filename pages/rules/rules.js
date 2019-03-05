Page({
  onLoad(query) {
    // 页面加载
    my.httpRequest({
      url: 'http://192.168.1.150/test/?m=MaYi&c=index&a=index&userid=zhumin00003', // 目标服务器url
      method: 'GET',
      success: (res) => {
        consloe.info(res)
      },
    });
  },
  onFinish(e){
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
