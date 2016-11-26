'use strict';

$('.funky').hover(function() {
  $(this).addClass('animated pulse');
}, function() {
  $(this).removeClass('animated pulse');
});
