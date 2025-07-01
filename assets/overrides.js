var fixmeTop = jQuery('.announcement-bar-new').offset().top;
var fixmeTop = 50;
jQuery(window).scroll(function() {
    var currentScroll = jQuery(window).scrollTop();
    if (currentScroll > fixmeTop) {
		
		jQuery('.announcement-bar-new').addClass('active');
		jQuery('.announcement-bar-new').addClass('active');
    } else {
 		jQuery('.announcement-bar-new').removeClass('active');
		
		
    }
	
	//alert(fixmeTop);
});


$(document).ready(function($) {
  "use strict";
  $( "body" ).on( "click", ".accordion_hand", function() {
      
      if( $( this ).hasClass( "active" ) ){
        $( this ).removeClass( "active" );
        $( this ).next().removeClass( "active" );
      }else{
        $( ".accordion_hand" ).removeClass( "active" );
        $( ".accordion_content" ).removeClass( "active" );
        
        $( this ).addClass( "active" );
        $( this ).next().addClass( "active" );
      }
  });
});

$(document).ready(function ($) {
  "use strict";
  
  $('.outf_s6_slider').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    adaptiveHeight: true,
    prevArrow: '<button class="slide-arrow prev-arrow"><div class="svg_div"><svg xmlns="http://www.w3.org/2000/svg" width="19.372" height="33.763" viewBox="0 0 19.372 33.763"> <path id="Path_2384" data-name="Path 2384" d="M2.42,19.244l.007-.007L16.952,33.763l2.42-2.42L4.846,16.817l14.4-14.4L16.824,0,0,16.824Z" fill="#4e4a4a"/> </svg></div></button>',
    nextArrow: '<button class="slide-arrow next-arrow"><div class="svg_div"><svg xmlns="http://www.w3.org/2000/svg" width="19.372" height="33.763" viewBox="0 0 19.372 33.763"> <path id="Path_2383" data-name="Path 2383" d="M2.42,19.244l.007-.007L16.952,33.763l2.42-2.42L4.846,16.817l14.4-14.4L16.824,0,0,16.824Z" transform="translate(19.372 33.763) rotate(180)" fill="#4e4a4a"/> </svg></div></button>',
    responsive: [
    {
      breakpoint: 981,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 769,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
  });

});





document.addEventListener('DOMContentLoaded', function () {
    var variantInputs = document.querySelectorAll('.variant-radio-input');
    variantInputs.forEach(function(input) {
      input.addEventListener('change', function () {
        if (input.checked) {
          
          let get_variant_id = input.getAttribute('data-variant-id');
          //get_variant_id = document.querySelector('input[type="hidden"][name="id"]').getAttribute('value');
          

          if(this.name == "Flavor"){
            document.querySelector(".the_Flavor_variant_current_value").textContent = this.value;
          }
          
        }
      });
    });
  });


/*
  When a sold out product load. 
  this block of code will hide the prive widget
  and add "SOULD OUT" text to the button of the product
====================*/
$(document).ready(function ($) {
  if($('.product-form__submit').prop('disabled')){
    let souldOutText = $('<em>', {
      class: 'sould_out_text',
      text: 'SOLD OUT'
    });
    $('.product-form__submit').append(souldOutText);
    $('.product-form__submit span').css({
      'font-size': '0px',
      'overflow': 'hidden',
      'opacity' : "0"
    });
    $('.product-form__submit em').css({
      'font-style': 'normal',
    });
    $('#prive-widget-injection-point').css({
      'height': '1px',
      'overflow': 'hidden',
      'opacity' : "0"
    });
  }
});


/*
  After Media Icons update on page load
====================*/
$(document).ready(function ($) {
  let get_variant_id = $('.product-variant-id').attr('value');

  let productAfterMediaIcons_1_selector = document.getElementById('product_after_media_icon_1_'+get_variant_id);
  let productAfterMediaIcons_1_html = productAfterMediaIcons_1_selector.innerHTML;
  let productAfterMediaIcons_1_place = $('.product__after_media_icon_1');
  if(productAfterMediaIcons_1_html.includes("<hide>")){
    productAfterMediaIcons_1_place.css('display', 'none');
  }else{
    productAfterMediaIcons_1_place.css('display', 'block');
  }
  $(productAfterMediaIcons_1_place).empty().html(productAfterMediaIcons_1_html);

  let productAfterMediaIcons_2_selector = document.getElementById('product_after_media_icon_2_'+get_variant_id);
  let productAfterMediaIcons_2_html = productAfterMediaIcons_2_selector.innerHTML;
  let productAfterMediaIcons_2_place = $('.product__after_media_icon_2');
  if(productAfterMediaIcons_2_html.includes("<hide>")){
    productAfterMediaIcons_2_place.css('display', 'none');
  }else{
    productAfterMediaIcons_2_place.css('display', 'block');
  }
  $(productAfterMediaIcons_2_place).empty().html(productAfterMediaIcons_2_html);

  let productAfterMediaIcons_3_selector = document.getElementById('product_after_media_icon_3_'+get_variant_id);
  let productAfterMediaIcons_3_html = productAfterMediaIcons_3_selector.innerHTML;
  let productAfterMediaIcons_3_place = $('.product__after_media_icon_3');
  if(productAfterMediaIcons_3_html.includes("<hide>")){
    productAfterMediaIcons_3_place.css('display', 'none');
  }else{
    productAfterMediaIcons_3_place.css('display', 'block');
  }
  $(productAfterMediaIcons_3_place).empty().html(productAfterMediaIcons_3_html);

  let productAfterMediaIcons_4_selector = document.getElementById('product_after_media_icon_4_'+get_variant_id);
  let productAfterMediaIcons_4_html = productAfterMediaIcons_4_selector.innerHTML;
  let productAfterMediaIcons_4_place = $('.product__after_media_icon_4');
  if(productAfterMediaIcons_4_html.includes("<hide>")){
    productAfterMediaIcons_4_place.css('display', 'none');
  }else{
    productAfterMediaIcons_4_place.css('display', 'block');
  }
  $(productAfterMediaIcons_4_place).empty().html(productAfterMediaIcons_4_html);
});





jQuery(document).ready(function ($) {
  "use strict";
  
  $('.oolander_heroslider_full').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
    arrows: true,
    dots: false,
    prevArrow: '<button class="slide-arrow prev-arrow"><div class="svg_div"><svg xmlns="http://www.w3.org/2000/svg" width="19.372" height="33.763" viewBox="0 0 19.372 33.763"> <path id="Path_2384" data-name="Path 2384" d="M2.42,19.244l.007-.007L16.952,33.763l2.42-2.42L4.846,16.817l14.4-14.4L16.824,0,0,16.824Z" fill="#4e4a4a"/> </svg></div></button>',
    nextArrow: '<button class="slide-arrow next-arrow"><div class="svg_div"><svg xmlns="http://www.w3.org/2000/svg" width="19.372" height="33.763" viewBox="0 0 19.372 33.763"> <path id="Path_2383" data-name="Path 2383" d="M2.42,19.244l.007-.007L16.952,33.763l2.42-2.42L4.846,16.817l14.4-14.4L16.824,0,0,16.824Z" transform="translate(19.372 33.763) rotate(180)" fill="#4e4a4a"/> </svg></div></button>',
    asNavFor: '.oolander_herosliderthum'
  });

  $('.oolander_herosliderthum').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      asNavFor: '.oolander_heroslider_full',
      dots: false,
      prevArrow: '<button class="slide-arrow prev-arrow"><div class="svg_div"><svg xmlns="http://www.w3.org/2000/svg" width="19.372" height="33.763" viewBox="0 0 19.372 33.763"> <path id="Path_2384" data-name="Path 2384" d="M2.42,19.244l.007-.007L16.952,33.763l2.42-2.42L4.846,16.817l14.4-14.4L16.824,0,0,16.824Z" fill="#4e4a4a"/> </svg></div></button>',
    nextArrow: '<button class="slide-arrow next-arrow"><div class="svg_div"><svg xmlns="http://www.w3.org/2000/svg" width="19.372" height="33.763" viewBox="0 0 19.372 33.763"> <path id="Path_2383" data-name="Path 2383" d="M2.42,19.244l.007-.007L16.952,33.763l2.42-2.42L4.846,16.817l14.4-14.4L16.824,0,0,16.824Z" transform="translate(19.372 33.763) rotate(180)" fill="#4e4a4a"/> </svg></div></button>',
      centerMode: true,
      focusOnSelect: true,
        vertical: true,
      verticalScrolling: true,
      responsive: [
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          vertical: false,
          verticalScrolling: false,
        }
      }
    ]
    });

});



