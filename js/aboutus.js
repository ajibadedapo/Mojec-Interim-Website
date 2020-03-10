  $(document).ready(function() {
          $('#homepage').fullpage({
            scrollingSpeed: 1000,
            autoScrolling: true,
            fitToSection: true,
            fitToSectionDelay: 2000,
                    anchors: ['home', 'about-us', 'what-we-do', 'our-work', 'homes'],
                    sectionsColor: ['#f2f2f2', '#1BBC9B', '#7E8F7C', '#C63D0F'],
            verticalCentered: false,
                    navigation: true,
                    navigationPosition: 'right',
                    navigationTooltips: ['About Us', 'MOJEC Group', 'MOJEC international','Virtutis Solaris', 'Smart Homes'],
                    responsiveWidth: 900,
            onLeave: function(index, nextIndex, direction){
                  if(direction == "up"){
                    $(".section").removeClass("down");
                    $(".section").removeClass("next");
                    $(".section").removeClass("prev");
                    $("#homepage .section:nth-child("+nextIndex+")").addClass("up");
                    $("#homepage .section:nth-child("+nextIndex+")").next().addClass("next up");
                    $("#homepage .section:nth-child("+nextIndex+")").prev().addClass("prev up");
                  }else{
                    $(".section").removeClass("up");
                    $(".section").removeClass("next");
                    $(".section").removeClass("prev");
                    $("#homepage .section:nth-child("+nextIndex+")").addClass("down");
                    $("#homepage .section:nth-child("+nextIndex+")").next().addClass("next down");
                    $("#homepage .section:nth-child("+nextIndex+")").prev().addClass("prev down");
                  }
                  console.log(direction + nextIndex);
                    },
                });
      });