<template>
<div>
  <div class="hide">
    <!-- <img src="src/images/game/logo.png"> -->
  </div>
  <div class="game">
    <div id="js-gameready" class="page page-gameready" :class="start==true?'show':'hide'">
      <div class="hd">
        <div class="logo"></div>
      </div>

      <button id="js-btn-start" class="btn-start" @click="startGame">开始</button>
    </div>
    <div id="js-gamein" class="page page-gamein" :class="game==true?'show':'hide'">
      <div class="hd meta clearfix">
        <div class="item-score"><i class="icon-score"></i>
          <span id="js-score" class="score">0</span>
        </div>
        <div class="item-time"><i class="icon-time"></i>
          <span id="js-time" class="time">01:00</span>
        </div>
        <div id="js-grids" class="grids">
          <ul class="list">
            <li class="item-card" data-type="1">
              <div class="cardback"></div>
              <div class="cardfront"></div>
            </li>
            <li class="item-card" data-type="2">
              <div class="cardback"></div>
              <div class="cardfront"></div>
            </li>
            <li class="item-card" data-type="2">
              <div class="cardback"></div>
              <div class="cardfront"></div>
            </li>
            <li class="item-card" data-type="1">
              <div class="cardback"></div>
              <div class="cardfront"></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div id="js-gameover" class="page page-gameover">
      <div class="inner">
        <p class="item-score">
          恭喜您获得
          <span id="js-gameover-score" class="score">60</span> 分
          <!-- <br>
  					获得<span id="js-gameover-level" class="level"></span>的称号 -->
          <br> 击败了朋友圈
          <span class="percent"> <em id="js-gameover-percent" class="x-percent">96</em>
  						%
  					</span> 的人

        </p>
        <button id="js-btn-again" class="btn btn-again">再玩一次</button>
        <a href="http://mp.weixin.qq.com/s?__biz=MzI0NjA1MjQyOA==&mid=400295127&idx=1&sn=0ac438de5178e6b7c2bbc801efba0f08#wechat_redirect" id="js-btn-more" class="btn btn-more" target="_blank">更多游戏</a>
      </div>
      <i class="share-tips"></i>
      <div id="js-timeout" class="page page-timeout">
        <div class="text">时间到</div>
      </div>
      <div id="js-loading" class="page page-loading">
        <div class="loading-text">
          正在加载...（
          <span id="js-percent">1</span> %）
        </div>
      </div>
    </div>

  </div>
</div>
</template>

<script>
import 'src/config/libs.min';
export default {
  data() {
    return {
      start: true,
      game: false,
      over: false,
      timer:60,
      gameLevel:0,
      costScuessTime:0,
      levelName:["色不起来", "有色心没色胆", "好色之徒", "色胆包天", "色不知耻", "英雄本色", "色射具全", "裸色舔香", "衣冠禽色"],
      Map:{
  			time: 60,
  			level: [{
  				time: 10,
  				mode: 2,
  				pattern: ["01", "02"]
  			}, {
  				time: 10,
  				mode: 2,
  				pattern: ["03", "04"]
  			}, {
  				time: 15,
  				mode: 4,
  				pattern: ["05", "06", "07", "08", "09", "10", "11", "12"]
  			}, {
  				time: 15,
  				mode: 4,
  				pattern: ["09", "10", "11", "12", "13", "14", "15", "16"]
  			}, {
  				time: 15,
  				mode: 4,
  				pattern: ["13", "14", "15", "16", "17", "18", "19", "20"]
  			}, {
  				time: 20,
  				mode: 4,
  				pattern: ["01", "02", "03", "04", "05", "06", "07", "08"]
  			}, {
  				time: 20,
  				mode: 4,
  				pattern: ["17", "18", "19", "20", "21", "22", "23", "24"]
  			}, {
  				time: 30,
  				mode: 6,
  				pattern: ["01", "02", "03", "04", "05", "06", "19", "20", "21", "22", "23", "24"]
  			}, {
  				time: 30,
  				mode: 6,
  				pattern: ["05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16"]
  			}, {
  				time: 30,
  				mode: 6,
  				pattern: ["11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22"]
  			}, {
  				time: 40,
  				mode: 6,
  				pattern: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
  			}, {
  				time: 50,
  				mode: 8,
  				pattern: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16"]
  			}, {
  				time: 50,
  				mode: 8,
  				pattern: ["09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"]
  			}, {
  				time: 60,
  				mode: 8,
  				pattern: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16"]
  			}]
  		}

    }
  },
  mounted(){

  },
  methods: {
    startGame() {
      this.start = false
      this.game = true
      this.gameIn()
    },
    gameIn: function() {
      var a = $("#js-time"),
        b = $("#js-score"),
        c = ($("#js-gameready"), $("#js-gamein")),
        d = $(".page");
      b.html(0), a.html("01:00"), this.resizeGrids(), d.hide(), c.removeClass("fadeIn fadeOut").addClass("fadeIn").show(), this.gameLevel = 0, this.createLevel(this.gameLevel), this.countdown(), this.score = 0
    },
    resizeGrids: function() {
      var b = $("#js-grids"),
        c = $(window).width();
      c = c > 640 ? 640 : c, b.css({
        width: c + "px",
        height: c + "px"
      })
    },
    createLevel: function(a) {
      var b = $("#js-grids"),
        c = "",
        d = this.Map,
        e = d.level;
      a > e.length - 1 && (a = e.length - 1);
      var f = e[a],
        g = f.mode,
        h = f.pattern,
        i = h.length;
      let len,l;
      this.countLen = g * g / 2;
      debugger;
      for (var j = g * g / i, k = 0; len = j, k < len; k++) {
        h.sort(this.randomSort);
        for (var m = 0; l = i, m < l; m++) c += '<li class="item-card" data-type="' + h[m] + '"><div class="cardback"></div><div class="cardfront fanfan-' + h[m] + '"></div></li>'
      }
      b.removeClass("lv-2 lv-4 lv-6 lv-8").addClass("lv-" + g).find("ul").html(c), this.gameLogic()
    },
    countdown: function() {
      var a = this,
        b = $("#js-time");
      this.levelTime = this.Map.time, this.timer && clearInterval(this.timer), this.timer = setInterval(function() {
        if (a.levelTime--, a.levelTime < 0) return void a.gameTimeOut();
        var c = a.timeFormat(a.levelTime);
        b.html(c)
      }, 1e3)
    },
    gameLogic: function() {
      var a = this,
        c = null,
        d = 0,
        e = $("#js-grids"),
        b="touchend";

      e.off(b, ".item-card"), e.on(b, ".item-card", function() {
        var b = $(this);
        b.removeClass("item-card").addClass("current"), null == c ? c = b : c.data("type") === b.data("type") ? (c.removeClass("item-card").addClass("current"), b.removeClass("item-card").addClass("current"), c = null, b = null, d++, a.calcScore()) : setTimeout(function() {
          createjs.Sound.play("err"), c && c.removeClass("current").addClass("item-card"), b.removeClass("current").addClass("item-card"), c = null, b = null
        }, 300), d === a.countLen && (setTimeout(function() {
          a.nextLevel()
        }, 300), d = 0)
      })
    },
    nextLevel: function() {
      costScuessTime= (this.Map.time-this.levelTime);
      console.log("花掉的时间:"+costScuessTime);
      this.gameLevel = this.gameLevel + 1, this.createLevel(this.gameLevel);
      // console.log('第' + this.gameLevel + '关');
    },
    gameOver: function() {
      var a = $("#js-gameover"),
        b = $("#js-gameover-percent"),
        c = $("#js-gameover-score");
        // e = $("#js-gameover-level"); e.html(levelName),
      clearInterval(this.timer), this.timer = null, this.levelTime = 0;
      var d = this.calcPercent(this.score);
      var levelName;
      this.gameLevel==0?levelName = this.levelName[0]:levelName = this.levelName[this.gameLevel - 1];
      b.html(d), c.html(this.score), a.removeClass("fadeIn fadeOut").addClass("fadeIn").show();
      // this.shareData.tTitle = '吓死宝宝了！恭喜你获得"' + levelName + '"的称号，击败了朋友圈' + d + '%的人。';
      // document.title = this.shareData.tTitle;
    },
    gameTimeOut: function() {
      var a = this,
        b = $("#js-timeout");
      createjs.Sound.play("end");
      b.addClass("pop").show(), setTimeout(function() {
        b.removeClass("pop").hide(), a.gameOver()
      }, 800)
    },
    calcScore: function() {
      var a = $("#js-score");
      createjs.Sound.play("success");
      this.score = this.score + 2, a.text(this.score).addClass("pop"), setTimeout(function() {
        a.removeClass("pop")
      }, 100)
    },
    calcPercent: function(a) {
      var b = 0,
        c = parseInt(10 * Math.random());
      return b = 30 >= a ? .02 * a * 100 : a > 30 && 40 > a ? .02 * a * 100 + 10 : a >= 40 && 50 >= a ? Math.round(10 * (a / 10 / 2 - 2)) + 90 : a > 50 && 70 >= a ? Math.round(10 * (a / 10 / 2 - 2)) / 2 + 92.5 : 100, b = b.toFixed(1), 100 > b && (b += c), b
    },
    randomSort: function() {
      return Math.random() - Math.random()
    },
    timeFormat: function(a) {
      var b = "",
        c = "",
        d = "",
        e = Math.floor(a / 60),
        f = a % 60;
      c = 10 > e ? "0" + e : e, d = 10 > f ? "0" + f : f;
      var b = c + ":" + d;
      return b
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/style/main';
.cardback {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 30;
  width: 100%;
  height: 100%;
  background: url(../images/game/cardback-bg.png) no-repeat 0 0;
  background-size: 100%;
  /*-webkit-backface-visibility: hidden;
  backface-visibility: hidden;*/
  -webkit-transform: rotate3d(0, 1, 0, 0deg);
  transform: rotate3d(0, 1, 0, 0deg);
  -webkit-transition: -webkit-transform 0.3s ease-in-out;
  transition: transform 0.3s ease-in-out;
}
</style>
