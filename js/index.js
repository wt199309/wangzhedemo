// 该文件实现登录框的显示和隐藏


// 等待 .header .login 被点击，点击了之后，显示出 .login-area
var divLogin = document.querySelector(".header .login");
// divLogin.onclick： 当点击的时候
divLogin.onclick = function () {
  // 点击之后，会运行这里的代码
  // 显示出 .login-area
  var divLoginArea = document.querySelector(".login-area");
  // 设置divLoginArea的display样式为block
  divLoginArea.style.display = "block";
};

// 当点击.login-area .close的时候，把.login-area隐藏
var divClose = document.querySelector(".login-area .close");
divClose.onclick = function (e) {
  e.preventDefault(); //阻止a元素跳转页面
  var divLoginArea = document.querySelector(".login-area");
  divLoginArea.style.display = "none";
};



// 该文件实现轮播图的切换

// 有一个机器人：switchImage
// 只要告诉它切换到第几张图片，它就会自动的去完成切换
// n表示第几张图片
function switchImage(n) {
  var value = -n * 100 + "%"; //计算它最终的margin-left
  var ulBanner = document.querySelector(".banner-container .banner-img");
  ulBanner.style.marginLeft = value;

  //下面，搞定下方的li的选中效果
  //清除之前的active
  var before = document.querySelector(".banner-title .active");
  before.className = "";
  //加入active效果
  var ulTitle = document.querySelector(".banner-title");
  ulTitle.children[n].className = "active";
}

// 只要鼠标移入.banner-title元素，就要完成图片的切换
var ulTitle = document.querySelector(".banner-title");
ulTitle.onmouseover = function (e) {
  // 切换图片
  // 要得到是第几张图片，就必须得到当前移入的是第几个li
  // e.target 通过这个表达式，可以得到当前移入的元素的dom对象
  // 先把ulTitle.children变成真的数组
  var children = Array.from(ulTitle.children);
  var index = children.indexOf(e.target);
  currentIndex = index; //更改当前是第几张图片
  switchImage(index);
};

var timer = "";
var currentIndex = 0; //一开始是第1张图片
//开始切换图片（3秒切换一次）
function start() {
  clearInterval(timer); // 管它那么多，先把之前的清除掉，保证只有一个计时器
  timer = setInterval(function () {
    //切换图片
    currentIndex++;
    if (currentIndex == 5) {
      //最大只能是4，到了5，就回到0
      currentIndex = 0;
    }
    switchImage(currentIndex);
  }, 3000);
}

// 停止切换图片
function stop() {
  clearInterval(timer);
}

start();

//最后：鼠标移入banner-container的时候，停止自动切换
// 鼠标移出banner-container的时候，开始自动切换

var bannerContainer = document.querySelector(".banner-container");

bannerContainer.onmouseover = function () {
  stop();
};
bannerContainer.onmouseout = function () {
  start();
};



// 切换新闻
// 切换到第 n 个新闻， n从0开始
function switchNews(n) {
  var value = -n * 100 + "%"; //计算它最终的margin-left
  var divNews = document.querySelector(".news-banner .news-blocks");
  divNews.style.marginLeft = value;

  //去掉之前的active
  var before = document.querySelector(
    ".news-container .title-container .active"
  );
  before.className = "";
  //给相应的li加上类样式
  var newsUl = document.querySelector(".news-container .title-container");

  newsUl.children[n].className = "active";
}

var ulTitles = document.querySelector(".news-container .title-container");
ulTitles.onmouseover = function (e) {
  if (e.target.tagName != "LI") {
    return; //如果你移入的不是LI，我啥都不做
  }
  // 代码到了这里，一定是一个LI
  var children = Array.from(ulTitles.children);
  var index = children.indexOf(e.target);
  if (index >= 5) {
    //超过了新闻版面的数量
    //目前移入的这个li是最后一个
    return;
  }
  switchNews(index);
};
