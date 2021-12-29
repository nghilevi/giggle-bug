var imageExtension = '.png';
var DEFAULT_FRAMERATE = 22;

// Create normal motion
function basicMotion (partId, imageUrlPrefix, startFrame, endFrame, frameWidth, frameHeight, ffps) {
	$('#'+partId).jsMovie({
        sequence : imageUrlPrefix+"_##"+imageExtension,   //the ## will be replaced with 01,02,03,...
        folder   : "img/"+imageUrlPrefix+"/",  //this is the path where the script can find the image sequence
	    from     : startFrame,               //the ## will start to replace with startFrame
	    to       : endFrame,              //the ## will start to replace with endFrame
	    width    : frameWidth,             //the advertisement container will be resized to a width of frameWidth
	    height   : frameHeight,             //the advertisement container will be resized to a height of frameHeight
	    showPreLoader : true,       //we don't want to see a preloader animation
	    playOnLoad : false,         //we don't want to have the movie play after the images have been loaded automatically
	    // the preloader animation is located in the folder "img/loader.png"
        // it is a 4x4 image matrix with each image of 40px by 40px
        // loader   : {path:"img/loader.png",height:40,width:40,rows:4,columns:4}
	});
	// Set speed frame (frame per second) default is 12fps
	$('#'+partId).jsMovie("option","fps", ffps);
	// The antenna only move once per click - not asynchronous yet
	$('#'+partId).jsMovie("option","repeat",false);
}

// Require click action to active
function createMotion (partId, imageUrlPrefix, startFrame, endFrame, frameWidth, frameHeight, ffps) {
   	
    basicMotion(partId, imageUrlPrefix, startFrame, endFrame, frameWidth, frameHeight, ffps);
	
    function handleAnimate(){
    	$('#'+partId).jsMovie("playClips");
    }

    if(is_touch_device()) document.getElementById(partId).addEventListener("touchstart", handleAnimate, false);
    else document.getElementById(partId).addEventListener("click", handleAnimate, false);
}



// Require click action to active
function createAllBodyMotionAtOnce () {
	var DEFAULT_FRAMERATE=22;
   	console.log('Create all body motion');

    basicMotion("body-L2", "GB_L2_body", 0, 0, cH * 120 / 384, cH * 60 / 512, DEFAULT_FRAMERATE);
	basicMotion("left-antenna-L2", "GB_L2_antenna_L", 0, 15, cH * 110 / 384, cH * 250 / 512, DEFAULT_FRAMERATE);
	basicMotion("right-antenna-L2", "GB_L2_antenna_R", 0, 15, cH * 140 / 384, cH * 180 / 512, DEFAULT_FRAMERATE);
	basicMotion("collar-L2", "GB_L2_collar", 0, 3, cH * 75 / 384, cH * 49 / 512, DEFAULT_FRAMERATE);
    basicMotion("left-hand-L2", "GB_L2_hand_L", 0, 7, cH * 110 / 384, cH * 60 / 512, DEFAULT_FRAMERATE);
    basicMotion("right-hand-L2", "GB_L2_hand_R", 0, 6, cH * 40 / 384, cH * 50 / 512, DEFAULT_FRAMERATE);
    basicMotion("left-leg-L2", "GB_L2_leg_L", 0, 8, cH * 135 / 384, cH * 210 / 512, DEFAULT_FRAMERATE);
    basicMotion("right-leg-L2", "GB_L2_leg_R", 0, 8, cH * 120 / 384, cH * 180 / 512, DEFAULT_FRAMERATE);
    basicMotion("head-L2", "GB_L2_head", 0, 6, cH * 125 / 384, cH * 105 / 512, DEFAULT_FRAMERATE);

    var bodyParts=["body-L2","left-antenna-L2","right-antenna-L2","collar-L2","left-hand-L2","right-hand-L2","left-leg-L2","right-leg-L2","head-L2"];
		
    function handleAnimate(){
    	for(i=0;i<bodyParts.length;i++){   
			$("#"+bodyParts[i]).jsMovie("playClips");
		}
	}
	
	for(i=0;i<bodyParts.length;i++){    
	    if(is_touch_device()){
	    	document.getElementById(bodyParts[i]).addEventListener("touchstart", handleAnimate, false);
	    } 
	    else {
	    	document.getElementById(bodyParts[i]).addEventListener("click", handleAnimate, false);	
	    }
	}
}


// Intro frame function
function createIntroMotion (partId, imageUrlPrefix, startFrame, endFrame, frameWidth, frameHeight, ffps) {
	$('#'+partId).jsMovie({
        sequence : imageUrlPrefix+'_###.jpg',   //the ## will be replaced with 01,02,03,...
        folder   : "img/"+imageUrlPrefix+"/",  //this is the path where the script can find the image sequence
	    from     : startFrame,               //the ## will start to replace with startFrame
	    to       : endFrame,              //the ## will start to replace with endFrame
	    width    : frameWidth,             //the advertisement container will be resized to a width of frameWidth
	    height   : frameHeight,             //the advertisement container will be resized to a height of frameHeight
	    showPreLoader : true,       //we don't want to see a preloader animation
	    playOnLoad : false,         //we don't want to have the movie play after the images have been loaded automatically
	    // the preloader animation is located in the folder "img/loader.png"
        // it is a 4x4 image matrix with each image of 40px by 40px
        // loader   : {path:"img/loader.png",height:40,width:40,rows:4,columns:4}
	});
	// Set speed frame (frame per second) default is 12fps
	$('#'+partId).jsMovie("option","fps", ffps);
	// The antenna only move once per click - not asynchronous yet
	$('#'+partId).jsMovie("option","repeat",false);
   	
	
    function handleAnimate(){
    	$(this).jsMovie("playClips");
    }
}

// Create Idle motion
// Will automaticall active
function createIdleMotion (partId, imageUrlPrefix, startFrame, endFrame, frameWidth, frameHeight, ffps, idleLevel) {
   	basicMotion(partId, imageUrlPrefix, startFrame, endFrame, frameWidth, frameHeight, ffps);
    
    setInterval(function(){checkIsClicked()}, IDLE_TIME);
    function checkIsClicked () {
    	if (!isTouch  && level==idleLevel && !faceIsActived) {
    		$('#'+partId).jsMovie("playClips");
    		faceIsActived = true;
    		$('#'+partId).on('ended',function(){
    			faceIsActived = false;
    		});
    	};
    	// console.log(isTouch);
    	// console.log("Level: "+ level+"\nIDLE level: "+idleLevel);
    	isTouch = false;

    }
}

// Motion will appear when your level is up
// Automatically run after level value is changed (Currently only from 1 to 2)
function createUpgradeMotion (partId, imageUrlPrefix, startFrame, endFrame, frameWidth, frameHeight, ffps) {
   	$('#'+partId).jsMovie({
        sequence : imageUrlPrefix+"_##"+imageExtension,   //the ## will be replaced with 01,02,03,...
        folder   : "img/"+imageUrlPrefix+"/",  //this is the path where the script can find the image sequence
	    from     : startFrame,               //the ## will start to replace with startFrame
	    to       : endFrame,              //the ## will start to replace with endFrame
	    width    : frameWidth,             //the advertisement container will be resized to a width of frameWidth
	    height   : frameHeight,             //the advertisement container will be resized to a height of frameHeight
	    performStop: false,
	    showPreLoader : true,       //we don't want to see a preloader animation
	    playOnLoad : false,         //we don't want to have the movie play after the images have been loaded automatically
	});
	// Set speed frame (frame per second) default is 12fps
	$('#'+partId).jsMovie("option","fps", ffps);
	// The antenna only move once per click - not asynchronous yet
	$('#'+partId).jsMovie("option","repeat",false);
   	
	
    function handleAnimate(){
    	$(this).jsMovie("playClips");
    }
}


// Create motion coorespond with sound track
function createFaceMotion (partId, imageUrlPrefix, startFrame, endFrame, frameWidth, frameHeight, ffps, flag, level) {
    basicMotion(partId, imageUrlPrefix, startFrame, endFrame, frameWidth, frameHeight, ffps);
    if (level == 1) {
    	$('.l1').bind('touchstart click', function() {
    		
	    	if(soundtrackArrayLevel1.indexOf(soundTrackTypeValue) == flag ){
	    		// Face motion is not active when level up
	    		// while(!soundIsPlaying){
	    			console.log(allowToNextAction)
	    			if (((point != 15 - POINT_PER_RIGHT_CLICK )||(!$(this).hasClass('key'))) && allowToNextAction) {
		   			
    				$('#face-idle-L1').children().hide();
    				$('#'+partId).show();
    				$('#'+partId).children().show();
    				$('#'+partId).jsMovie("playClips");
    				faceIsActived = true;
    				
	    			$('#'+partId).on('ended',function(){
	    				// console.log(faceIsActived);
	    				faceIsActived = false;
	    				// console.log(faceIsActived);
		    			$('#'+partId).children().hide();
		    			$('#'+partId).hide();
		    			$('#face-idle-L1').children().show();
		    			// console.log(partId);
		    		});
		    		
		    		
		    		}else if ((point == 15 - POINT_PER_RIGHT_CLICK )&&($(this).hasClass('key'))) {
		    			$('#'+partId).children().hide();
		    			$('#'+partId).jsMovie("stop");
		    		};
		    			
	    		// }
	    		
	    	}
	    });
    }else if (level == 2) {
    	$('.l2').bind('touchstart click', function() {
    		if (level2faceOrder == flag) {
    			// console.log(partId);
		    	if (allowToNextAction) {
		    		$('#face-idle-L2').children().hide();
			    	$('#'+partId).show();
			    	$('#'+partId).jsMovie("playClips");
	    			faceIsActived = true;	
		    	}
		    	
    			$('#'+partId).on('ended',function(){
    				faceIsActived = false;
	    			$('#'+partId).children().hide();
	    			$('#'+partId).hide();
	    			$('#face-idle-L2').children().show();
	    			getLevel2Face();
	    		});
	    		// console.log("Face order: "+ level2faceOrder+" id: "+ $(this).attr('id'));
					// console.log(partId);		   	 		
    		};
	    });
    };
    

}

function createAllFaceMotionAtOnce (){

		basicMotion("POS-a-L2", "GB_L2_POS_a", 0, 8, cH * 80 / 384, cH * 65 / 512, DEFAULT_FRAMERATE, 0, 2);
	    basicMotion("POS-b-L2", "GB_L2_POS_b", 0, 13, cH * 80 / 384, cH * 65 / 512, DEFAULT_FRAMERATE, 1, 2);
	    basicMotion("POS-c-L2", "GB_L2_POS_c", 0, 8, cH * 80 / 384, cH * 80 / 512, DEFAULT_FRAMERATE, 2, 2);
	    basicMotion("POS-d-L2", "GB_L2_POS_d", 0, 11, cH * 80 / 384, cH * 65 / 512, DEFAULT_FRAMERATE, 3, 2);
	    basicMotion("POS-e-L2", "GB_L2_POS_e", 0, 5, cH * 80 / 384, cH * 70 / 512, DEFAULT_FRAMERATE, 4, 2);
	    basicMotion("POS-f-L2", "GB_L2_POS_f", 0, 9, cH * 80 / 384, cH * 65 / 512, DEFAULT_FRAMERATE, 5, 2);
		
		console.log('createAll face at once');
    	
    	$('.l2').bind('touchstart click', function() {
    		
    		var facePartIdsArray=["POS-a-L2","POS-b-L2","POS-c-L2","POS-d-L2","POS-e-L2","POS-f-L2"];

			for(i=0;i<facePartIdsArray.length;i++){

	    		if (level2faceOrder == flag) {
			    	if (allowToNextAction) {
			    		$('#face-idle-L2').children().hide();
				    	$('#'+facePartIdsArray[i]).show();
				    	$('#'+facePartIdsArray[i]).jsMovie("playClips");
		    			faceIsActived = true;	
			    	}
			    	
	    			$('#'+partId).on('ended',function(){
	    				faceIsActived = false;
		    			$('#'+facePartIdsArray[i]).children().hide();
		    			$('#'+facePartIdsArray[i]).hide();
		    			$('#face-idle-L2').children().show();
		    			getLevel2Face();
		    		});	   	 		
	    		};

			}
	    });
}
