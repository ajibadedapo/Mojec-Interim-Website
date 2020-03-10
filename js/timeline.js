var app = angular.module('app', []);

app.controller('HomeController', function($scope) {
  
  $scope.goal_title = "Timeline";
  
  $scope.dates = [
    1985,2000,2001,2002,2012,2015,2016,2018,2019
  ];
  
  $scope.goal_real_estate = false;
  
  for (x in $scope.dates) {
      if($scope.dates[x]== 1985){
        $scope.goal_real_estate_1985 = true;
      }else if($scope.dates[x]== 2000){
        $scope.goal_plastic_2000 = true; 
      }else if($scope.dates[x]== 2001){
        $scope.goal_transform_2001 = true; 
      }else if($scope.dates[x]== 2002){
        $scope.goal_meter_2002 = true; 
      }else if($scope.dates[x]== 2012){
        $scope.goal_company_2012 = true;
      }else if($scope.dates[x]== 2015){
      $scope.goal_alscon_2015 = true;  
      }else if($scope.dates[x]== 2016){
        $scope.goal_award1_2016 = true; 
      }else if($scope.dates[x]== 2018){
        $scope.goal_award2_2018 = true; 
      }else if($scope.dates[x]== 2019){
        $scope.goal_award3_2019 = true; 
      }
  }
  
});

$(document).ready(function(e) {
  var viewport =Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  console.log(viewport);

  
  $('a').click(function(e){
    e.preventDefault()
  })

  $('.goal_wrap').click(function(){
    var diff = $(this).parent()[0].offsetLeft;
    $('.date .goal_wrap').removeClass('active bounce');
    $(this).addClass('active bounce');
    console.log(diff);
    console.log((viewport - diff));
TweenLite.to($('.date').parent(), 1, {x:((viewport*0.5) - diff), onComplete:function(){
        console.log('success');
        /*TweenLite.to($('.timeline'), 1, {top:"50%"});*/
      }});  
  });
  
  $('.goal_real_estate').click(function(){
    console.log('goal click');
$('body').fadeTo('ease', 0.3, function()
{
    $(this).css('background-image', 'url(pics/timeline/wall.png)');
}).fadeTo('slow', 1);

  });

    $('.goal_plastic').click(function(){
    console.log('goal click');
$('body').fadeTo('ease', 0.3, function()
{
    $(this).css('background-image', 'url(pics/timeline/plastic2.png)');
}).fadeTo('slow', 1);

  });

     $('.goal_transform').click(function(){
    console.log('goal click');
$('body').fadeTo('ease', 0.3, function()
{
    $(this).css('background-image', 'url(pics/timeline/transform.png)');
}).fadeTo('slow', 1);

  });

      $('.goal_meter').click(function(){
    console.log('goal click');
$('body').fadeTo('ease', 0.3, function()
{
    $(this).css('background-image', 'url(pics/timeline/meter2.png)');
}).fadeTo('slow', 1);

  });
  
$('.goal_company').click(function(){
    console.log('goal click');
$('body').fadeTo('ease', 0.3, function()
{
    $(this).css('background-image', 'url(pics/timeline/mmf.png');
}).fadeTo('slow', 1);

  });

$('.goal_alscon').click(function(){
    console.log('goal click');
$('body').fadeTo('ease', 0.3, function()
{
    $(this).css('background-image', 'url(pics/timeline/alscon.png');
}).fadeTo('slow', 1);

  });

$('.goal_award1').click(function(){
    console.log('goal click');
$('body').fadeTo('ease', 0.3, function()
{
    $(this).css('background-image', 'url(pics/timeline/award1.png)');
}).fadeTo('slow', 1);

  });  

$('.goal_award2').click(function(){
    console.log('goal click');
$('body').fadeTo('ease', 0.3, function()
{
    $(this).css('background-image', 'url(pics/timeline/award2.png)');
}).fadeTo('slow', 1);

  }); 
  

  $('.goal_award3').click(function(){
    console.log('goal click');
$('body').fadeTo('ease', 0.3, function()
{
    $(this).css('background-image', 'url(pics/timeline/award3.png)');
}).fadeTo('slow', 1);

  }); 

});

