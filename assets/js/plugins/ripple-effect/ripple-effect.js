var redirect;

function link_redirect(ele){
  var element = true;

  if(!ele.is("a")) element = ele.children('a').eq(0);
  else element = ele;

  if(!element) return;

  var href = element.attr('href');

  // Checking condition that button has href attribute
  if(href) {
    clearTimeout(redirect);

    // Doc Link
    if(href && null != href.match(/^(\#)/g)) {
      var hash = element.prop("hash");
      var target = $(hash);
    
      redirect = setTimeout(function(){
        // Scroll Page
        $('html, body').stop().animate({
          'scrollTop': target.offset().top - element.data('top-offset')
        }, 500, 'swing', function() {
          if(history.pushState) history.pushState(null, null, hash);
          else window.location.hash = hash;
        });
      }, 500);
    }
    
    // External Link
    else if(element.hasAttribute('target') && '_blank' == element.attr('target')){
      redirect = setTimeout(function() {
        window.open(href, '_blank');
      }, 600);
    }
    
    // Internal Link
    else {
      if(element.hasClass('barba-link')){
        barba.go(href);
      } else {
        redirect = setTimeout(function() {
          window.location.href = href;
        }, 500);
      }
    }
  }
}

function ripple_effect() {
  $('.wuui-ripple').on('click', function(event){
    event.preventDefault();
    event.stopPropagation();

    // Ripple Element
    var ele = $(this);

    // Max Length
    var maxLength = Math.max(ele.outerWidth(), ele.outerHeight()).toFixed(2);

    // Click position of X and Y
    var clickPosX = event.pageX - ele.offset().left;
    var clickPosY = event.pageY - ele.offset().top;

    // Calculate time
    var rippleTime = ((maxLength/100) - (maxLength/200)).toFixed(2);

    if (ele.children(".wuui-mat-ink").length > 0)
    ele.children(".wuui-mat-ink").remove();
    
    ele.append("<span class='wuui-mat-ink'><span></span></span>");
    var ink = ele.children(".wuui-mat-ink");

    ink.removeClass("animate").children("span").css({
      'height':                     (maxLength * 2) + 'px',
      'width':                      (maxLength * 2) + 'px',
      'top':                        (clickPosY - maxLength) + 'px',
      'left':                       (clickPosX - maxLength) + 'px',
      '-webkit-animation-duration': rippleTime + 's',
      'animation-duration':         rippleTime + 's',
    })
    
    ink.addClass("animate").children("span").one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function (){
      ink.remove();
    });

    link_redirect(ele);
  });
}