
'use strict';

const utils = {
  //面包屑
  breadcrumb: function (route) {
    const arr = [];
    for(let i = 0, len = route.matched.length; i < len; i++){
      const item = route.matched[i];
      arr.push({
        name: item.name ? item.name : item.meta.title,
        path: item.path
      })
    }
    const breadItem = [...new Set(arr)];
    const breadObj = {};
    switch (breadItem.length){
      case 1:
        breadObj.firstItem = breadItem[0].name;
        break;
      case 2:
        breadObj.firstItem = breadItem[0].name +' / '+ breadItem[1].name;
        break;
      case 3:
        breadObj.firstItem = `<span data="${breadItem[1].path}">${breadItem[0].name}</span>` +' / '
                           + `<span data="${breadItem[1].path}" type="2">${breadItem[1].name}</span>`
                           + `<i class="el-breadcrumb__separator el-icon-arrow-right"></i>`;
        breadObj.secondItem = breadItem[2].name;
        break;
    }
    return breadObj;
  },
  //判断对象所有属性不为''、null、undefined
  validateObj: function (obj) {
    let flag = true;
    if(Object.prototype.toString.call(obj) === '[object Object]'){
      for(let key in obj){
        if(!obj[key]) {
          return false;
        }
      }
    }else{
      return 'Not Object';
    }
    return flag;
  },
  //节流
  throttle: function (fn, delay) {
    let timer = null;
    return function () {
      const content = this;
      clearTimeout(timer);
      timer = setTimeout(function () {
        fn.call(content);
      }, delay);
    }
  },
  //socket
  connectSocket: function (url, callback) {

    let isConnected = null;
    let stompClient = null,
      userId = sessionStorage.getItem('sy_rm_admin_ud');

    function connect() {
      const socket = new SockJS(url);
      stompClient = Stomp.over(socket);
      stompClient.connect({}, function (frame) {
        clearInterval(isConnected);
        stompClient.subscribe('/topic/sendMessage/'+userId, function (res) {
          if(res.body){
            callback(res.body);
          }
        });
      }, function (err) {
        clearInterval(isConnected);
        isConnected = setInterval(() => {
          connect()
        }, 5000);
      })
    }

    function disconnect() {
      if (stompClient !== null) {
        stompClient.disconnect();
      }
      console.log("Disconnected");
    }

    connect();
  }
};

export default utils
