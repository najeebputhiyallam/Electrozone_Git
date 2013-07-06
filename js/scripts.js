$(document).ready(function() {

	collisionDetection('box', true); //Target Box, Fade Effect
	
	//Adjust Menu Box
	$('.box').css( 'left', (parseInt($(window).width()/2 - 161)) + 'px' );
	$('.box').css( 'top', (parseInt($(window).height()/2 - 161)) + 'px' );
	
	$('.boxBG').css( 'width', (parseInt($(window).width()) + 'px' ) );
	$('.boxBG').css( 'height', (parseInt($(window).height() - 33) + 'px' ) );
	
	btnHover();
	
	btnClick();
});

function btnClick(){
	$('.box .specBtn').click(
		function(){
			$('.container').css('backgroundImage', 'url(img/specbody.png)');
		}
	);
	
	$('.box .aboutBtn').click(
		function(){
			$('.container').css('backgroundImage', 'url(img/aboutboby.png)');
		}
	);

	$('.box .homeBtn').click(
		function(){
			$('.container').css('backgroundImage', 'url(img/homebody.png)');
		}
	);	
}

function btnHover(){
	$('div.specBtn').hover(
		function(){
			$('.box div p').fadeOut('fast');
			$('div.specBtn p').fadeIn('slow');
		},
		function(){
			$('.box div p').fadeOut('fast');
		}
	);
	
	$('div.tryitBtn').hover(
		function(){
			$('.box div p').fadeOut('fast');
			$('div.tryitBtn p').fadeIn('slow');
		},
		function(){
			$('.box div p').fadeOut('fast');
		}
	);

	$('div.aboutBtn').hover(
		function(){
			$('.box div p').fadeOut('fast');
			$('div.aboutBtn p').fadeIn('slow');
		},
		function(){
			$('.box div p').fadeOut('fast');
		}
	);

	$('div.homeBtn').hover(
		function(){
			$('.box div p').fadeOut('fast');
			$('div.homeBtn p').fadeIn('slow');
		},
		function(){
			$('.box div p').fadeOut('fast');
		}
	);	
}

function collisionDetection(getBox, opacityEnabled){

	getWidth = $('.' + getBox).width();
	getHeight = $('.' + getBox).height();
 
	if ( !opacityEnabled ) opacityEnabled = false;
 
	//Calucate the Position Dynamically
	var hArea_point01 = 0;
	var hArea_point02;
	
	var vArea_point01 = 0;
	var vArea_point02;
	
	var curXPosValue = 0;
	var curYPosValue = 0;
	
	var tempStore = 0;
	var curXPercentage = 0;
	var curYPercentage = 0;	
	
	var getCurScrollValue_x = 0;
	var getCurScrollValue_y = 0;
	$(window).scroll(
		function(e){
			getCurScrollValue_x = $(window).scrollLeft();
			getCurScrollValue_y = $(window).scrollTop();
		}
	); 
	
	
	var ScrollerWidth = 0;
	var calculateProgressBarPosition = 0;
	
	$(document).mousemove(
		function(e){
		
			hArea_point01 = parseInt($(window).width()/2 - getWidth/2);
			hArea_point02 = hArea_point01 + getWidth;
			
			vArea_point01 = parseInt($(window).height()/2 - getHeight/2);
			vArea_point02 = vArea_point01 + getHeight;	
			
		
			if ( ((e.pageX - getCurScrollValue_x) > hArea_point01) && ((e.pageX - getCurScrollValue_x) < hArea_point02) ) {
				if ( ((e.pageY - getCurScrollValue_y) > vArea_point01) && ((e.pageY - getCurScrollValue_y) < vArea_point02) ) {
					//$('.pos04').html('Collision: True');
					if ( opacityEnabled == false ) $('.' + getBox).css('display', 'block');
					posProgressBar(1);
				} else {
					//$('.pos04').html('Collision: False');
					if ( opacityEnabled == false ) $('.' + getBox).css('display', 'none');
					calculatePercentage();
				}
			} else {
				//$('.pos04').html('Collision: False');
				if ( opacityEnabled == false ) $('.' + getBox).css('display', 'none');
				calculatePercentage();
			}
			
			//$('.pos02').html('Current Mouse Position inside Window: x=' + e.pageX + ' y=' + e.pageY);

			
			//Calculate the percentage
			function calculatePercentage(){
				//Calculate Horizontal Percentage
				if ( (e.pageX - getCurScrollValue_x) < hArea_point01 ) {
					curXPosValue = (e.pageX - getCurScrollValue_x - hArea_point01) * -1 ;
				} else if ( (e.pageX - getCurScrollValue_x) > hArea_point02 ) {
					curXPosValue = e.pageX - getCurScrollValue_x - hArea_point02 ;
				}
				tempStore = $(window).width() - hArea_point02;
				curXPercentage = parseInt((curXPosValue/tempStore) * 100);
				//$('.pos05').html('Mouse X Percentage: ' + curXPercentage + '%');
				
				//Calculate Vertical Percentage
				if ( (e.pageY - getCurScrollValue_y) < vArea_point01 ) {
					curYPosValue = (e.pageY - getCurScrollValue_y - vArea_point01) * -1 ;
				} else if ( (e.pageY - getCurScrollValue_y) > vArea_point02 ) {
					curYPosValue = e.pageY - getCurScrollValue_y - vArea_point02 ;
				}
				tempStore = $(window).height() - vArea_point02;
				curYPercentage = parseInt((curYPosValue/tempStore) * 100);
				//$('.pos06').html('Mouse Y Percentage: ' + curYPercentage + '%');
				
				if ( curXPercentage > curYPercentage ) {
					posProgressBar( (100 - curXPercentage) * 0.01 );
				} else {
					posProgressBar( (100 - curYPercentage) * 0.01 );
				}
				
			}
			
			
			//ProgressBar
			function posProgressBar(getPercentage){
				if ( $('.miprogressBar').length ) {
					ScrollerWidth = $('.miprogressBar').width();
					calculateProgressBarPosition = (ScrollerWidth * getPercentage);
					$('.miprogressBar .mipgbar').width( calculateProgressBarPosition );
					
					if ( opacityEnabled == true ) {
						if ( getPercentage > 0.2 ) {
							//The Box get Fade Effect
							$('.' + getBox).css('display', 'block');
							$('.' + getBox).css('opacity', getPercentage);
							
							$('.boxBG').css('display', 'block');
							$('.boxBG').css('opacity', getPercentage - 0.2 );
						} else {
							$('.' + getBox).css('display', 'none');
							
							$('.boxBG').css('display', 'none');
						}
					}
				} else {

				}
			}
			
		
		}
	);	
	

}