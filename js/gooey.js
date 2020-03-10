//=======================
//Cursor tracking
//=======================
//Throttle:
var throttleOn = false;
var actionLock = false;
var throttleTimer = 10; 

function throttle(e){
  if(throttleOn){ 
    actionLock = true;
  };
  if(!actionLock){
    throttleOn = true;
    setTimeout(function(e){ 
      throttleOn = false; 
    }, throttleTimer);
    cursorTrack(e);
  };
  actionLock = false;
};

//Funtions:
function cursorTrack(e){

  //True Cursor:
  bodyOffset = $('body').offset();
  $(".true-cursor").css({
    "left": e.pageX - bodyOffset.left,
    "top": e.pageY - bodyOffset.top
  });

  //Gooey Cursor (only one box):
  // boxOffset = $('.goo-box').offset();
  // $(".goo-cursor").css({
  //   "left": e.pageX - boxOffset.left,
  //   "top": e.pageY - boxOffset.top
  // });

  //Gooey Cursor (multiple boxes):
  $(".goo-box").each(function(){
    boxOffset = $(this).offset();
    $(this).find(".goo-cursor").css({
      "left": e.pageX - boxOffset.left,
      "top": e.pageY - boxOffset.top
    });
  });

};

//Handler:
$(window).mousemove(function(e){
  throttle(e);
});


//=======================
//Interactive elements
//=======================
$('.interactive, a, button, input').on({
  mouseenter: function(){
    $(".true-cursor").css({
      "animation": "truepointeron ease .4s forwards"
    });
  },
  mouseleave: function(){
    $(".true-cursor").css({
      "animation": "truepointeroff ease .4s forwards"
    });
  }
});

$('.interactive, a, button, input').on({
  mouseenter: function(){
    $(".goo-cursor").css({
      "animation": "goopointeron ease .4s forwards"
    });
  },
  mouseleave: function(){
    $(".goo-cursor").css({
      "animation": "goopointeroff ease .4s forwards"
    });
  }
});


//=======================
//Detect when the mouse leaves the window
//=======================
$(window).on({
  mouseleave: function(){
    $(".cursor").css({
      "opacity": "0"
    });
  },
  mouseenter: function(){
    $(".cursor").css({
      "opacity": "1"
    });
  }
});