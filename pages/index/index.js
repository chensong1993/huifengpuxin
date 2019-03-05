
var app = getApp();

Page({
  data: {
    indicatorDots: false,
    autoplay: false,
    duration: 500,
    days: [],
    cur_year: 0,
    cur_month: 0,
    count: 0,
    activityRule: -1
  },
  onLoad(e) {
    var that = this;
    //判断手机型号
    my.getSystemInfo({
      success: (res) => {
        if (res.model == 'iPhone X' || res.model == 'iPhone Xs' || res.model == 'iPhone Xr' || res.model == 'iPhone Xs Max') {
          that.setData({
            phoneTop: '0',
            modelHeight: '75',
            signXHeight: '45',
            prizeXHeight: '140',
            ruleXHeight: '-110',
            tipTop: '75',
            tipCloseBottom: '215',
            activityRuleBottom: '200',
            specialXTop: '385'
          })
        }
        console.log(res.model);

      }
    })
    const date = new Date();
    const cur_year = date.getFullYear();
    const cur_month = date.getMonth() + 1;

    that.data.year = date.getFullYear();
    that.data.month = cur_month;
    that.data.day = (date.getDate() < 10 ? "0" : "") + date.getDate();
    var dates = date.getFullYear() + "-" + ((date.getMonth() + 1) < 10 ? "0" : "") + (date.getMonth() + 1) + "-" + (date.getDate() < 10 ? "0" : "") + date.getDate();
    that.data.dates = dates;
    const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
    that.calculateEmptyGrids(cur_year, cur_month);
    that.calculateDays(cur_year, cur_month);
    //获取当前用户当前任务的签到状态
    that.onGetSignUp(cur_year, cur_month);
    that.setData({
      cur_year,
      cur_month,
      weeks_ch
    })

    my.httpRequest({
      url: app.signInUrl + 'm=huifeng&c=index&a=load_init&userid=' + app.userId, // 获取活动时间
      method: 'GET',
      success: (res) => {
        that.data.currentDate = res.data.data.currtime;
        that.data.startTime = res.data.data.starttime;
        that.data.endTime = res.data.data.endtime;
      }
    });



  },
  //特殊日签到成功提醒
  onSpecialDayShow() {
    specialdayShow: -1
  },
  //补签
  onNotSignin(e) {
    var that = this;
    var day = e.target.dataset.clickdate;
    var signtype = e.target.dataset.signtype;
    // my.httpRequest({
    //   url: app.signInUrl + 'm=huifeng&c=index&a=use_retroactive_card&retroactive_time=2019-02-28&userid=chen123',
    //   method: 'POST',
    //   success(res) {
    //     console.log(res.data.data.state);
    //   }, fail() {

    //   }
    // })

    //系统时间
    var systemtime = Date.parse(that.data.dbCurrtime);
    day = (day < 10 ? "0" : "") + day
    var currentTime = Date.parse(that.data.currentTimeZero + "-" + day);
    var starttime = Date.parse(that.data.startTime);
    var endtime = Date.parse(that.data.endTime);
    console.log(that.data.currentTimeZero + "-" + day + "   " + that.data.dates);
    console.log(signtype);
    switch (signtype) {
      case 0:
        my.showToast({
          content: "活动未开始"
        })
        break;
      case 1:

        // if (starttime<=currentTime) {
        //   if (currentTime <= endtime) {
        console.log("进入签到器");
        if ((starttime <= currentTime <= endtime) && currentTime < systemtime) {
          my.showToast({
            content: "ok"
          })
        } else {
          if (currentTime == systemtime) {
            my.showToast({
              content: "不能补签当天"
            })
          } else {
            my.showToast({
              content: "不能补签未来"
            })
          }

          //   }
          // }


        }


        break;
      case 2:
        my.showToast({
          content: "该日为活动日"
        })
        break;
      case 3:
        my.showToast({
          content: "已签到"
        })
        break;
      case 4:
        my.showToast({
          content: "特殊日已签到"
        })
        break;
    }

    // if (day != "202") {
    //   if (currentTime <= systemtime) {

    //   } else {
    //     my.showToast({
    //       content: "当前时间不可补签"
    //     })
    //   }
    // } else {
    //   my.showToast({
    //     content: "当日已签到"
    //   })
    // }

    console.log(day);
  },
  // 获取当月共多少天
  getThisMonthDays: function (year, month) {
    return new Date(year, month, 0).getDate()
  },

  // 获取当月第一天星期几
  getFirstDayOfWeek: function (year, month) {
    return new Date(Date.UTC(year, month - 1, 1)).getDay();
  },

  // 计算当月1号前空了几个格子，把它填充在days数组的前面
  calculateEmptyGrids: function (year, month) {

    var that = this;
    //计算每个月时要清零
    that.setData({
      days: []
    });
    const firstDayOfWeek = this.getFirstDayOfWeek(year, month);
    if (firstDayOfWeek > 0) {
      for (let i = 0; i < firstDayOfWeek; i++) {
        var obj = {
          date: null,
          type: 1
        }
        that.data.days.push(obj);
      }
      that.setData({
        days: that.data.days
      });
      console.log(that.data.days);
      //清空
    } else {
      that.setData({
        days: []
      });
    }

    my.httpRequest({
      url: app.signInUrl + 'm=huifeng&c=index&a=load_init&userid=' + app.userId, // 获取活动时间
      method: 'GET',
      success: (res) => {
        var time = res.data.data;
        var currtime = time.currtime.substring(6, 7);
        var starttimeM = time.starttime.substring(6, 7);
        starttimeM = parseInt(starttimeM);
        var endtimeM = time.endtime.substring(6, 7);
        endtimeM = parseInt(endtimeM);
        var lists = [];
        var activity = endtimeM - starttimeM + 1;
        that.data.dbCurrtime = time.currtime;
        that.setData({
          activityList: activity
        })
        console.log(starttimeM + "   " + endtimeM);
        for (let j = starttimeM; j < endtimeM + 1; j++) {
          var list = {
            date: j
          }
          lists.push(list);

        }

        for (let k = 0; k < lists.length + 1; k++) {
          if (lists[k].date == currtime) {
            that.setData({
              currindex: k
            })
            console.log(k);
          }
        }
      }
    });
  },
  //获取当前用户该任务的签到数组
  onGetSignUp: function (year, month) {
    var that = this;
    var signList;
    var current;
    var year;
    var month;
    var lists;
    var daysArr = that.data.days;
    var SignOk;
    var signTotalDay;

    var currentTime = year + "-" + month;
    that.data.currentyear = year;
    that.data.currentmonth = month;
    
    //补签时间引用
    var currentTimeZero = year + "-" + (month < 10 ? "0" : "") + month;
    that.data.currentTimeZero = currentTimeZero;
    console.log(currentTime + "666666");
    that.data.currentTime = currentTime;
    // let res = my.getStorageSync({
    //   key: currentTime + "chen123",
    //   success: function (res) {
    //     that.setData({
    //       days: res.data.days
    //     })
    //     console.log("wushuhus");
    //   },
    //   fail: function (res) {

    my.showLoading({
      content: '加载中...',
    });
    my.httpRequest({
      url: app.signInUrl + 'm=huifeng&c=index&a=index&userid=' + app.userId + '&time=' + currentTime, // 签到列表
      method: 'GET',
      success: (res) => {
        signList = res.data.data;
        //积分
        that.setData({
          score:signList.score
        })
        // lists= res.data.data.date;
        current = new Date(signList.date.replace(/-/g, "/"));
        year = current.getFullYear();
        month = current.getMonth() + 1;
        //当前时间
        //var currentTime = year + "-" + month;
        //系统时间
        var systemtime = that.data.year + "-" + that.data.month;
        console.log(systemtime + "77777");
        that.setData({
          signTotalDay: signList.sign_total_day
        })
        //console.log(new Date().getTime(systemtime)+"  "+new Date().getTime(year + "-0" + month));
        if (systemtime == currentTime) {
          if (signList.is_sign == true) {
            that.setData({
              SignOk: true
            })
            console.log("true");
          } else {
            that.setData({
              SignOk: false
            })
            console.log("false");
          }
        }
        console.log(that.data.cur_year + " " + that.data.cur_month);
        // }
        lists = signList.lists;
        console.log(lists);
        var siginin = [];
        var obj;
        for (var k = 0; k < lists.length; k++) {
          console.log(lists[k].type);
          if (lists[k].type == "4") {
            obj = {
              signList: lists[k].time,
              type: 4
            }
            console.log("444");
              siginin.push(obj);
          }
          if (lists[k].type == "3") {
            obj = {
              signList: lists[k].time,
              type: 3
            }
            console.log("33333");
              siginin.push(obj);
          }
          if (lists[k].type == "2") {
            obj = {
              signList: lists[k].time,
              type: 2
            }
            siginin.push(obj);
            console.log("2222");
          }
          
         
        }
         
        console.log(year+'   '+that.data.cur_year+'  '+month+  +that.data.cur_month);
        if (year == that.data.cur_year && month == that.data.cur_month) {

          for (var j = 0; j < daysArr.length; j++) {
            for (var i = 0; i < siginin.length; i++) {
              if (daysArr[j].date == siginin[i].signList) {
                console.log( siginin[i].signList+"  0000000");
                daysArr[j].type = siginin[i].type;
                my.hideLoading();
              
              }
 //console.log(siginin[i].type);
            }
            console.log(daysArr[j].date);
          }
          
          that.setData({
            days: daysArr
          });
          //同步缓存签到数据
          // my.setStorageSync({
          //   key: currentTime + "chen123",
          //   data: {
          //     days: daysArr
          //   }
          // });
          console.log("daysArr");
        }
      },
      fail() {
        my.hideLoading();
      }
    });
    //  }
    //});

    setTimeout(function () {
      my.hideLoading();
    }, 2000)

  },
  // 绘制当月天数占的格子，并把它放到days数组中
  calculateDays: function (year, month) {

    var that = this;
    const thisMonthDays = this.getThisMonthDays(year, month);
    //console.log(thisMonthDays + "  444444");
    for (let i = 1; i <= thisMonthDays; i++) {
      var obj = {
        date: i,
        type: 1
      }
      that.data.days.push(obj);
    }
    that.setData({
      days: that.data.days
    });

  },


  // 切换控制年月，上一个月，下一个月
  handleCalendar: function (e) {
    // const handle = e.currentTarget.dataset.handle;
    const handle = e;
    const cur_year = this.data.cur_year;
    const cur_month = this.data.cur_month;
    if (handle === 'prev') {
      let newMonth = cur_month - 1;
      let newYear = cur_year;
      if (newMonth < 1) {
        newYear = cur_year - 1;
        newMonth = 12;
      }
      this.calculateEmptyGrids(newYear, newMonth);
      this.calculateDays(newYear, newMonth);
      this.onGetSignUp(newYear, newMonth);
      this.setData({
        cur_year: newYear,
        cur_month: newMonth
      })
       console.log(newYear + "  " + newMonth+"prev");
    } else if (handle === 'current') {
      this.calculateEmptyGrids(this.data.year, this.data.month);
      this.calculateDays(this.data.year, this.data.month);
      this.onGetSignUp(this.data.year, this.data.month);
      this.setData({
        cur_year: this.data.year,
        cur_month: this.data.month
      })

      console.log(this.data.year + "  " + this.data.month + 'current');
    } else {
      let newMonth = cur_month + 1;
      let newYear = cur_year;
      if (newMonth > 12) {
        newYear = cur_year + 1;
        newMonth = 1;
      }
      this.calculateEmptyGrids(newYear, newMonth);
      this.calculateDays(newYear, newMonth);
      this.onGetSignUp(newYear, newMonth);
      this.setData({
        cur_year: newYear,
        cur_month: newMonth
      })

       console.log(newYear + "  " + newMonth);
    }
  },


  intervalChange(e) {
    //  my.showLoading({
    //   content: '加载中...'
    // });
    var that = this;

    //that.handleCalendar();
    var index = e.detail.current;
    var currindex = that.data.currindex;
    if (index > currindex) {
      that.handleCalendar("next");

    } else if (index == currindex) {
      that.handleCalendar("current");

    } else {
      that.handleCalendar("prev");

    }

    // console.log(index);
  },

  //活動規則
  onRule() {
    this.setData({
      activityRule: 1
    })
    // my.navigateTo({
    //   url: "../rules/rules"
    // });
  },
  //签到提醒
  onTipClose(e) {
    var that = this;
    that.setData({
      tipShow: -1
    })
  },
  //奖品查询
  onPrizeQuery() {
    my.navigateTo({
      url: "../prize/prize?noPrize=1"
    });
  },
  //积分兑换
  oncreditsExchange() {
    my.navigateTo({
      url: "../creditsExchange/creditsExchange"
    });
  },
  onSignIn(e) {
    var that = this;
    var year = that.data.cur_year;
    var month = that.data.cur_month;
    var date = Date.parse(that.data.dates);
    var currentDate = Date.parse(that.data.currentDate);
    console.log(date);

    if (date == currentDate) {
      console.log("00000000000000000");
      my.httpRequest({
        url: app.signInUrl + 'm=huifeng&c=index&a=sign_in&userid=' + app.userId, // 签到
        method: 'POST',
        success: (res) => {
          that.onGetSignUp(year, month);
          that.setData({
            tipShow:1
          })
          my.showToast({
            content: "签到成功"
          });
          console.log("签到成功");
        }
      });
    }


  },
  //回到首页
  onGoHome() {
    var that = this;
    that.setData({
      tipShow: -1
    })
  },
  //活动规则隐藏
  activityRuleFinish() {
    this.setData({
      activityRule: -1,

    })
  },
  onReady() {
    // 页面加载完成
    var that = this;


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
  onShareAppMessage(e) {

    return {
      title: 'My App',
      desc: 'My App description',
      path: 'pages/index/index',
      success() {
        console.log("okokokokokokokokokok");
      },
      fail() {
        console.log("errrrrr");
      }
    };
  },

});
