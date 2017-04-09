define(['jquery'], function($) {
    
		$('.service-menu').hover(function(){
			 $('.service-pop').show();
		},function(){
			 $('.service-pop').hide();
		})
		
        function serviceNav(){
           $('.service-menu-item').hover(function(){
			 var index = $(this).index();
			 $('.service-panel').hide();
			 $('.service-panel').eq(index).show();
			 $('.service-menu-item').eq(index).addClass('hover');		 
		 },function(){
			 var index = $(this).index();
			 $('.service-menu-item').removeClass('hover');
		 })

		$('.service-panel').hover(function(){
			 var index = $(this).index();
			 $('.service-pop').show();
			 $('.service-menu-item').eq(index).addClass('hover');	
		},function(){
			$('.service-pop').hide();
			$('.service-menu-item').removeClass('hover');
		})
    }
    return serviceNav;
});