(function () { 'use strict';
  // Navigation appear on scroll up
  var gblHead = $('.gbl-head');
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      gblHead.removeClass('top');
    } else {
      gblHead.addClass('top');
    }
  });

  // Mobile nav
  var gblHeadBtn = $('.gbl-head-btn');
  var gblHeadNav = $('.gbl-head-nav');
  gblHeadBtn.click( function() {
    $(this).toggleClass('active');
    gblHeadNav.toggleClass('active');
  });

  // Detect touch/click devices
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    $( 'body' ).addClass( 'touch-device' );
  } else {
    $( 'body' ).addClass( 'click-device' );
  }
}()); // end 'use strict'