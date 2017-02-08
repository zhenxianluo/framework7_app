/*此页为欢迎屏的设置*/
/*欢迎屏幕设置接口
  welcomescreen.close();
  welcomescreen.open();
  welcomescreen.next();
  welcomescreen.previous();
*/
var myapp = myapp || {};
myapp.pages = myapp.pages || {};
myapp.appIndex = function (myapp, $$) {
  // 获取cookie
  function getCookie(cname)
  {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
      var c = ca[i].trim();
      if (c.indexOf(name)==0) return c.substring(name.length,c.length);
    }
    return "";
  }
  // 设置了 cookie 名、cookie 值、cookie过期时间(秒)。
  function setCookie(cname,cvalue,exdays){
    var d = new Date();
    d.setTime(d.getTime()+(exdays*1000));
    var expires = "expires="+d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
  }
  // 模板引擎
  (function(){
    var $template,t7html,compiledTemplate,
    $template=$$('#lunbo').html();
    compiledTemplate=Template7.compile($template);
    t7html=compiledTemplate(context);
    $$('#lunbo').html(t7html);

    $template=$$('#news').html();
    compiledTemplate=Template7.compile($template);
    t7html=compiledTemplate(context);
    $$('#news').html(t7html);

    $template=$$('#course').html();
    compiledTemplate=Template7.compile($template);
    t7html=compiledTemplate(context);
    $$('#course').html(t7html);

    $template=$$('#register').html();
    compiledTemplate=Template7.compile($template);
    t7html=compiledTemplate(context);
    $$('#register').html(t7html);

    $template=$$('#menuList').html();
    compiledTemplate=Template7.compile($template);
    t7html=compiledTemplate(context);
    $$('#menuList').html(t7html);
  }());
  // 引导页js代码
  (function(){
    var logintext=
          '<div class="login-screen-title">用户登录</div>'+
          '<div class="list-block">'+
              '<ul>'+
                  '<li>'+
                      '<div class="item-content">'+
                          '<div class="item-media">'+
                              '<i class="icon icon-form-name"></i>'+
                          '</div>'+
                          '<div class="item-inner">'+
                              '<input type="text" name="name" id="username" placeholder="手机号/邮箱/用户名">'+
                          '</div>'+
                      '</div>'+
                  '</li>'+
                  '<li>'+
                      '<div class="item-content">'+
                          '<div class="item-media"><i class="icon icon-form-email"></i></div>'+
                          '<div class="item-inner">'+
                              '<input type="password" id="userpasswd" name="passwd" placeholder="密码" style="width: 70%;"><a href="#" class="forgetpasswd">找回<br>密码</a>'+
                          '</div>'+
                      '</div>'+
                  '</li>'+
              '</ul>'+
          '</div>'+
          '<p><a href="#" class="button button-big button-fill color-green login-btn">登录</a></p>'+
          '<p style="text-align: center;">没有账号？<a href="#" class="open-popup" data-popup=".register-screen">立即注册</a></p>'+
          '<div class="login_method">'+
              '<div class="login_method_title">第三方登录</div>'+
              '<div class="row">'+
                  '<div class="col-33">'+
                      '<span id="qqLoginBtn" class=""><a href="javascript:;" onclick="return window.open(\'https://graph.qq.com/oauth2.0/authorize?client_id=100229030&amp;response_type=token&amp;scope=all&amp;redirect_uri=http%3A%2F%2Fqzonestyle.gtimg.cn%2Fqzone%2Fopenapi%2Fredirect-1.0.1.html\', \'oauth2Login_10124\' ,\'height=525,width=585, toolbar=no, menubar=no, scrollbars=no, status=no, location=yes, resizable=yes\');" class=""><img src="lib/framework7/img/qqlogin.svg" alt="QQ登录" border="0"></a></span>'+
                  '</div>'+
                  '<div class="col-33">'+
                      '<img src="lib/framework7/img/wechatlogin.svg" id="wechatLoginBtn">'+
                  '</div>'+
                  '<div class="col-33">'+
                      '<div id="wb_connect_btn"></div>'+
                  '</div>'+
              '</div>'+
          '</div>';
    var options = {
      'bgcolor': '#0da6ec',
      'fontcolor': 'yellow',
      'onOpened': function () {
        console.log("welcome screen opened");
      },
      'onClosed': function () {
        console.log("welcome screen closed");
      }
    },
    welcomescreen_slides = [
      {
        id: 'slide0',
        picture: '<img src="images/welcome2.jpg">',
        text: 'hahah欢迎访问集结号手机网页，引导教程共四步能让你快速上手此应用，请向左滑动查看下一页。'
      },
      {
        id: 'slide1',
        picture: '<img src="images/welcome3.jpg">',
        text: '第二页'
      },
      {
        id: 'slide2',
        picture: '<img src="images/welcome4.jpg">',
        text: '第三页'
      },
      {
        id: 'slide3',
        picture: '<img src="images/welcome1.jpg">',
        text: logintext
      }
    ],
    welcomescreen = myapp.welcomescreen(welcomescreen_slides, options);
    $$("#slide3 .welcomescreen-text").css("bottom",Math.floor(($$(".welcomescreen-picture").height()-521.5)/2)+"px");
    $$("#slide3 .welcomescreen-text ul").css("opacity","0.7");
    /* 移动注册页到引导层 */
    $$('.welcomescreen-container').append($$('.popup-register').html());
    $$('.popup-register').remove();
    /* 移动服务条款弹出框到引导层 */
    $$('.welcomescreen-container').append($$('.issues-info').html());
    $$('.issues-info').remove();
    /*登录页输入框验证 开始*/
    $$(".welcomescreen-text .login-btn").on('click', function(event) { 
      var username=$$("#username").val(),
          userpasswd=$$("#userpasswd").val();
      var bz=0;
      if(username=="test" && userpasswd=="test"){
        welcomescreen.close();
      }else if ($$("#username").val()==""||$$("#userpasswd").val()=="") {
        if($$("#username").val()==""){
          $$("#username").css("border","1px solid red");
          myapp.alert("用户名不能为空","登录提示");
          bz=1;
        }
        if($$("#userpasswd").val()==""){
          $$("#userpasswd").css("border","1px solid red");
          if (bz==0) myapp.alert("密码不能为空","登录提示");
        }
      }else{
          myapp.alert("用户名或密码错误，测试用例为test","登录提示");
        }
    });
    $$("#username").blur(function(event){
      if($$(this).val()==""){
        $$(this).css("border","1px solid red");
      }
    })
    $$("#username").focus(function(event){
      $$(this).css("border","");
    })
    $$("#userpasswd").blur(function(event){
      if($$(this).val()==""){
        $$(this).css("border","1px solid red");
      }
    })
    $$("#userpasswd").focus(function(event){
      $$(this).css("border","");
    })
    /*登录页输入框验证 结束*/
    /*第三方登录之微博 开始*/
    /*微博登录按钮显示复位*/
    setTimeout(function(){
      $$("#wb_connect_btn img").attr({
        src: 'lib/framework7/img/webologin.svg'
      });
      $$("#qqLoginBtn img").attr({
        src: 'lib/framework7/img/qqlogin.svg'
      });
    },1000);
    WB2.anyWhere(function (W) {
        W.widget.connectButton({
            id: "wb_connect_btn",
            type: '4,1',
            callback: {
                login: function (o) { //登录后的回调函数
                    welcomescreen.close();
                    console.log('微博已经登录过了');
                },
                logout: function () { //退出后的回调函数
                    alert('logout');
                }
            }
        });
    });
    /*第三方登录之微博 结束*/
    /*第三方登录之QQ 开始*/
    QC.Login({
       btnId:"qqLoginBtn"    //插入按钮的节点id
    });
    QC.api("get_user_info", {})
    .success(function (s) {//成功回调
        //alert("当前用户昵称为：" + s.data.nickname + "  性别为：" + s.data.gender);
        welcomescreen.close();
        console.log('qq已经登录过了');
    }).error(function (f) {//失败回调
        //alert("获取用户信息失败！");
    }).complete(function (c) {//完成请求回调
        //alert("获取用户信息完成！");
    });
    /*第三方登录之微博 结束*/
    /*注册页的日期设置 开始*/
    var today=new Date();
    var registerDate=myapp.picker({
      input: '#picker-date',
      rotateEffect: true,
      value: [today.getFullYear(),today.getMonth(),today.getDate()],
      formatValue: function(picker,values,displayValues){
        return values[0]+'-'+(values[1]<10?('0'+values[1]):values[1])+'-'+(values[2]<10?('0'+values[2]):values[2]);
      },
      toolbarTemplate:
        '<div class="toolbar">' +
            '<div class="toolbar-inner">' +
                '<div class="left"></div>' +
                '<div class="right">' +
                    '<a href="#" class="link close-picker">选择</a>' +
                '</div>' +
            '</div>' +
        '</div>',
      cols:[
        {
          values: (function(){
            var arr=[];
            for(var i=1950;i<=2030;i++){arr.push(i);}
            return arr;
          })(),
        },
        {
            divider: true,
            content: ' - '
        },
        {
          values: [1,2,3,4,5,6,7,8,9,10,11,12],
        },
        {
            divider: true,
            content: ' - '
        },
        {
          values: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
        },
      ]
    });
    /*注册页的日期设置 结束*/
  }());
  //微信相关
  (function(){
    var access_token,savetime;
    var url="";
    var wxapp={
      grant_type:'client_credential',
      appid:'wxbac4e99f68273fca',
      secret:'d4624c36b6795d1d99dcf0547af5443d'
    }
    var cookieName=getCookie('access_token')
    if(cookieName==''){
      $$.get('https://api.weixin.qq.com/cgi-bin/token',wxapp,function(data){
        access_token=data['access_token'];
        savetime=parseInt(data['expires_in']);
        setCookie('access_token',access_token,savetime);
      })
    }else{
      access_token=cookieName;
    }
  }());
  // 主体代码
  (function(){
    // 页面缓存
    /*window.addEventListener('load', function(e){
      window.applicationCache.addEventListener('updateready', function(e){
        console.log("状态："+window.applicationCache.status);
        if(window.applicationCache.status==window.applicationCache.UPDATEREADY){
          window.applicationCache.swapCache();
          if(confirm('webapp有新版本更新，是否更新？')){
            window.location.reload();
          }
        }else{
          console.log('webapp为最新版！');
        }
      }, false)
    }, false)*/
    var view1 = myapp.addView('#tab1',{
      dynamicNavbar: true,
    });
    var view2 = myapp.addView('#tab2', {
      dynamicNavbar: true,
    });
    var view3 = myapp.addView('#tab3',{
      dynamicNavbar: true,
    });
    var view4 = myapp.addView('#tab4',{
      dynamicNavbar: true,
    });
    // 添加轮播图
    var mySwiper1 = myapp.swiper('.lb1', {
      pagination:'.lb1 .swiper-pagination',
      speed: 400,
      spaceBetween: 50,
      autoplay: 3000,
      autoplayDisableOnInteraction:false,
      effect:'slide'
    });
    // 机器人聊天页的布局和设定
    $$(".messagebar").css("bottom","50px");
    var myMessages = myapp.messages('.messages', {
      autoLayout:true
    });
    $$(".toolbarText").css("height","2rem");
    $$(".toolbarText").on("input",function(event){
      var $this=$$(this);
      var $toolbar=$$("#tab3 .toolbar");
      if($this.scrollTop()>0&&$this.height()<92){
        $this.css("height",$this.height()+20+"px");
        $toolbar.css("height",$this.height()+16+"px");
      }
      if($this.scrollTop()==0&&$this.height()>32){
        $this.css("height",$this.height()-20+"px");
        $toolbar.css("height",$this.height()+16+"px");
      }
    });
    $$("#tab3 .page-content").css("padding-bottom","94px");
    $$(".messageSend").on("click",function(event){
      var $toolbarText=$$(".toolbarText");
      var $messageStr=$toolbarText.val();
      var $info=$messageStr.trim();
      if($info.length===0)return;
      $toolbarText.val("");
      var now=new Date();
      var timeStr=now.getMonth()+"月"+now.getDate()+"日 <span>"+now.getHours()+":"+((now.getMinutes()<10)?('0'+now.getMinutes()):now.getMinutes())+"<\/span>";
      var messageHtml="<div class='messages'>"+
        "<div class='messages-date'>"+timeStr+"<\/div>"+
        "<div class='message message-sent'>"+
          "<div class='message-text'>"+
            $messageStr+
          "<\/div>"+
        "<\/div>"+
      "<\/div>";
      $$(".messages-content").append(messageHtml);
      $$.post('http://www.tuling123.com/openapi/api', {key:'1a8439e69be94c379b6f605e4cba43b1', info:$info,userid:"123456789"}, function (data) {
        var obj = eval ("(" + data + ")");
        console.log(obj);
        var bz=false;
        if(obj.code==200000){
          bz=true;
        }
        var reveiveHtml="<div class='message message-with-avatar message-received'>"+
          "<div class='message-name'>小集</div>"+
          "<div style='background-image:url(./images/robot.png)' class='message-avatar'><\/div>"+
          "<div class='message-text'>"+(bz?(obj.text+"<a href='"+obj.url+"'>"+obj.url+"</a>"):obj.text)+"<\/div>"+
        "<\/div>";
        $$(".messages-content").append(reveiveHtml);
        $$(".message-avatar").css("top","30px");
        bz=false;
        $$("#tab3 .page-content").scrollTop(100000);
      });
    });
    /*聊天页发送图片*/
    $$("#fileEle").change(function(e){
      var files=this.files;
      if(files.length){
        var imgs="<div style='float:right;' class='message-text'>";
        for (var i = 0; i < files.length; i++) {
          imgs+='<img style="float:right;" src="'+(window.URL.createObjectURL(files[i]))+'">';
        }
        imgs+="<\/div>";
        var now=new Date();
        var timeStr=now.getMonth()+"月"+now.getDate()+"日 <span>"+now.getHours()+":"+((now.getMinutes()<10)?('0'+now.getMinutes()):now.getMinutes())+"<\/span>";
        var messageHtml="<div class='messages'>"+
          "<div class='messages-date'>"+timeStr+"<\/div>"+
          "<div class='message message-sent'>"+
            imgs+
          "<\/div>"+
        "<\/div>";
        console.log(messageHtml);
        $$(".messages-content").append(messageHtml);
        $$("#tab3 .page-content").scrollTop(100000);
      }
    })
    // 返回顶部按钮
    $$(".footerTop img").on("click",function(event){
      var $page;
      if($$("#tab1").hasClass('active')){
        $page=$$("#tab1 .page-content");
      }else if($$("#tab4").hasClass('active')){
        $page=$$("#tab4 .page-content");
      }
      var pageHeight=$page.scrollTop();
      if(pageHeight==0)return;
      var timer = setInterval(function(){
        pageHeight/=2;
        $page.scrollTop(pageHeight);
        if(pageHeight<10){
          clearInterval(timer);
        }
      },50);
      $page.scrollTop(0);
    });
    // 软件详情页
    $$(document).on('pageInit', '.page[data-page="appdown"]', function (e) {
      var mySwiper2 = myapp.swiper('.swiperAppdown', {
        pagination:'.swiperAppdown .swiper-pagination',
        slidesPerView: 1.3,
        paginationClickable: true,
        spaceBetween: 20
      });
    });
    // 设置的路由
    $$(".setting").on("click",function(event){
      routerUrl("html/setting.html");
    });
    $$(".toabout").on("click",function(event){
      routerUrl("html/about.html");
    });
    $$(".personalInfo").on("click",function(){
      routerUrl("html/info_detail.html");
    });
    // 相对于视图路由函数，url为跳转地址
    function routerUrl(url){
      if($$("#tab1").hasClass('active')){
        view1.router.loadPage(url);
      }else if($$("#tab2").hasClass('active')){
        view2.router.loadPage(url);
      }else if($$("#tab3").hasClass('active')){
        view3.router.loadPage(url);
      }else if($$("#tab4").hasClass('active')){
        view4.router.loadPage(url);
      };
    };
    $$(".live-link").on("click",function(event){
      var $this=$$(this);
      $$(".live-cover").remove();
      $this.prepend('<div class="live-cover"><img src="images/play.png"></div>');
    })
    $$(document).on('pageInit', function (e) {
      if($$(".page").length!=5){
        $$(".indexTool").hide();
      };
    })
    $$(document).on('pageAfterBack',function(e){
      setTimeout(function(){
        if($$(".page").length==5){
          $$(".indexTool").show();
        }
      },100);
    })
    $$('body').on('click',function(event){
      var target=event.target;
      /*app主题切换*/
      if(target.id=='moodCheck'){
        if(target.checked==true){
          $$('body').addClass('layout-dark');
        }else{
          $$('body').removeClass('layout-dark');
        }
      }
    })
    /*下拉刷新*/
    $$('.pull-to-refresh-content').on('refresh',function(e){
      setTimeout(function(){
        myapp.pullToRefreshDone();
      },2000)
    });
  }());
};