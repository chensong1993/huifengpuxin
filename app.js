App({
  signInUrl:"http://192.168.1.31/zhumin/ali_action/index.php?",
  userId:"chen126",
  onLaunch(options) {
    // 第一次打开
    // options.query == {number:1}
    console.info('App onLaunch');
  },
  onShow(options) {
    // 从后台被 scheme 重新打开
    // options.query == {number:1}
  },
});
