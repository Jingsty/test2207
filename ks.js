//滚动部分
//获取对象
var gundomg=document.getElementsByClassName("gundomg")[0];
window.onscroll=function(){
    if(document.documentElement.scrollTop>=200){
        gundomg.style.display="block";
    }else{
      
        gundomg.style.display="none";
    
    }
}

























//轮播图
   //获取容器对象
   var Play = document.getElementsByClassName("play")[0];
   //获取图片集容器的对象
   var ImageBox = document.getElementsByClassName("images")[0];
   //获取图片集对象
   var Images = document.querySelectorAll('.images li');
   //获取导航prev对象
   var Prev = document.getElementsByClassName("prev")[0];
   //获取导航next对象
   var Next = document.getElementsByClassName("next")[0];
   //获取分页器对象
   var Pages = document.querySelectorAll(".pages li");
   //自动轮播
   var autoTimer;
   //自动轮播时间
   var autoPlayTime=1000;
   //图片初始位置
   var index = 0;
   //获取图片的宽度
   var Images_W = Images[0].offsetWidth;
   //获取第一张轮播图图片
   var firstImage = Images[0].cloneNode(true);
   // console.log(firstImage);
   //放到图片集的最后位置
   ImageBox.appendChild(firstImage)
   //图片容器的总宽度
   ImageBox.style.width = Images_W * (Images.length + 1) + 'px';
   // console.log(ImageBox)
   // 上一张图片
   Prev.onclick = function () {
       if (index == 0) {
           index = Images.length;
           ImageBox.style.left = -index * Images_W + "px"

       }
       index--;
       //移动图片的函数
       moveImage("prev");
       changePagesStyle(index)
   }
   // 下一张图片
   Next.onclick = function () {
       if (index == Images.length) {
           index = 0;
           // 重新实则图片集的位置
           ImageBox.style.left = 0
       }
       index++;
       //移动图片的函数
       moveImage("next");
       changePagesStyle(index)
   }

   //给分页器绑定点击事件，切换到指定的图片
   for (let i = 0; i < Pages.length; i++) {
       Pages[i].onclick = function () {
           if (i > index) {

               index = i;
               //移动图片函数
               moveImage("next");
           } else {
               index = i;
               //移动图片函数
               moveImage("prev");
           }


           changePagesStyle(index)
       }
   }

   /**
    * 封装函数
    * 
    * 
   */

   function moveImage(fangxiang) {
       var timer = setInterval(function () {
           //图片集要达到的位置
           var endLeft = -index * Images_W
           //图片集当前的位置
           ImageBoxLeft = ImageBox.offsetLeft;
           // console.log( ImageBoxLeft)
           //判断轮播向左还是向右
           switch (fangxiang) {
               // 上一张
               case "prev":
                   //每次把位置加10
                   ImageBoxLeft += 10;
                   if (ImageBoxLeft < endLeft) {
                       //改变图片的位置
                       ImageBox.style.left = ImageBoxLeft + 'px';

                   } else {
                       //到达的位置
                       ImageBox.style.left = endLeft + 'px';
                       //停止定时器
                       clearInterval(timer)
                   }
                   break;
               // 下一张
               case "next":
                   //每次把位置减10
                   ImageBoxLeft -= 10;
                   if (ImageBoxLeft > endLeft) {
                       //改变图片的位置
                       ImageBox.style.left = ImageBoxLeft + 'px';

                   } else {
                       //到达的位置
                       ImageBox.style.left = endLeft + 'px';
                       //停止定时器
                       clearInterval(timer)
                   }
                   break;
           }

       }, 10)

   }
   /**
    * 功能：根据图片的索引切换分页器的样式
    * 
   */
   function changePagesStyle(Pagesindex) {
       if (Pagesindex >= Images.length) {
           Pagesindex = 0;
       }

       //初始化分页器样式
       for (let i = 0; i < Images.length; i++) {
           Pages[i].classList.remove("active")
       }
       Pages[Pagesindex].classList.add("active")
   }

   /**
    * 自动轮播
    * 
   */
   autoPlay()
    function autoPlay(){
       autoTimer= setInterval(Next.onclick,autoPlayTime)
    }

    //鼠标移入
    Play.onmouseover=function(){
        Prev.style.display="block";
        Next.style.display="block";
       //停止定时器
       clearInterval (autoTimer)
    }
    //鼠标移出
    Play.onmouseout=function(){
        Prev.style.display="none";
        Next.style.display="none";
       //开始轮播
       autoPlay()
    }
