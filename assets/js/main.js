function functionSequence(){
  /* This is basic - uses default settings */
	$("a.product-gallery").fancybox({
		'hideOnContentClick': true
	});
}

// =========================================================
// On Load I think we need to run this once page gets loaded
// =========================================================
if (window.addEventListener) {
  window.addEventListener('load', function () {
    functionSequence();
  });
} else {
  window.attachEvent('onload', function () {
    functionSequence();
  });
}