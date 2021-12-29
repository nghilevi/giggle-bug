// Create variables and constants
// Name of each div ID in level 1
var gigglePart = ["right-leg-L1", "right-antenna-L1", "left-antenna-L1", "left-leg-L1", "body-L1", "right-hand-L1", "head-L1"];
// Each part in this array is randomly set to true, one part at once, the "true" part is the KEY part
var flag = [false, false, false, false, false, false, false];
// Index of the flag or gigglePart array
var partIndex;
// Value of gigglePart
var partName;
// Current point
var point = 0;
// Current level
var level = 1;
// Number of points earn after one right answer
var POINT_PER_RIGHT_CLICK = 5;
// Value to trigger idle mode
var isTouch = false;
// Time to wait ultil idle status is activated
var IDLE_TIME = 6000;
var END_GAME_POINT = 80;
// Soundtrack variables
var audioType;
var audioPath = "KAKKIAINEN_ALL/";
var manifest;
var soundtrackArrayLevel1 = ["kakkis_L1_NEG_", "kakkis_L1_POS_", "kakkis_L1_WEIRD_"];
var soundtrackMaxValueArrayLevel1 = [33, 13, 32];
var soundtrackLevel2 = 'kakkis_L2_POS_';
var soundtrackMaxValueArrayLevel2 = 15;
var soundtrackLevel3 = 'kakkis_L3_POS_';
var soundtrackMaxValueArrayLevel3 = 15;
var NUMBER_OF_NOREPEAT_SOUNDS = 10;
//Type of sound track: NEG, POS, WEIRD
var soundTrackTypeValue;
//Index of sound track
var soundtrack_index;
// Sub sound track array 
var stArray = new Array();
// Full array of one type soundtrack
var sourceArray = new Array();
// Size of each source array
var myMaxValue;

//Cooresponding faces variable
var correspondingFacesArrayLevel1 = ["L1_NEG", "L1_POS", "L1_NEG"];
// When the flag is active (true) the cooresponding face is active along
var correspondingFacesArrayLevel1FLag = [false, false, false];
// Variable to save the face image files' prefix
var correspondingFacesLevel1;

// Face motion order for each level
var level2faceOrder = 1;
var level3faceOrder = 0;

var DEFAULT_FRAMERATE = 20;
var levelUpFPS = 16;
var cH = $(window).height()*0.9;
var faceIsActived = false;
var soundIsPlaying = false;
var allowToNextAction;
// Check if sound ended
// var myS = createjs.Sound;

// detect of touch or normal devices
function is_touch_device() {  
  try {  
    document.createEvent("TouchEvent");  
    return true;  
  } catch (e) {  
    return false;  
  }  
}

// Prevent scrolling on iOs
document.ontouchmove = function(e){ e.preventDefault(); }


// COMMON FUNCTION
// Up level
// Only active level 2 by now
function levelUp(){
	if (level == 2) {
		
		$(".l1").hide();
		// $(".l1").children().hide();
		// $(".l1").children().jsMovie("stop");
		$('.face-motion-level-1').hide();
		
		$("#level2up").jsMovie("play");
		$('#level2up').on('ended',function() {
			// console.log('haha')
			$(this).children().hide();
			$(this).hide();
			//console.log($(this).attr('id'));
			$('#pretent-level2-active').hide();
			$('.l2').show();
			$('.l2').children().show();
		});
		createSourceArray(soundtrackMaxValueArrayLevel2);
    getSound(soundtrackMaxValueArrayLevel2);
    	
	}
	if(level == 3){
		chooseTypeOfSound();
	}

};

// Detect the key parts
function clickCounter (partId) {
	partName = gigglePart[partId];
	// console.log("Part name: "+ partName);
	flag[partId] = true;
	$("#"+partName).addClass("key");// for fun
	// console.log("-------");
}

// Detect levels
function detectLevel(p){
	if (p>=15&&p<45) {
		level = 2;
	}else if (p>=45) {
		level = 3;
	};			
}






// Get type of sound
function chooseTypeOfSound() {
	var randInd = Math.floor(Math.random()*3);
	// console.log(randInd);
	soundTrackTypeValue = soundtrackArrayLevel1[randInd];
	correspondingFacesLevel1 = correspondingFacesArrayLevel1[randInd];
	// console.log(soundTrackTypeValue)
	// console.log(correspondingFacesLevel1)
	

	if (level == 1) {
		myMaxValue = soundtrackMaxValueArrayLevel1[randInd];
	}else if (level == 2) {
		myMaxValue =soundtrackMaxValueArrayLevel2;
	}else if (level == 3) {
		myMaxValue =soundtrackMaxValueArrayLevel3;
	};

}

// Create source sound array
function createSourceArray(maxValue) {
	sourceArray = new Array();
		
    for (var i = 0; i < maxValue; i++) {
		sourceArray[i] = i+1;
	}


}
// Get sound url
function getSound(maxValue) {
	// console.log('sourceArray before splice' + sourceArray)
	// console.log('maxValue '+ maxValue)
	for (var i = 0; i < NUMBER_OF_NOREPEAT_SOUNDS; i++) {
		var randInd = Math.floor(Math.random()*maxValue);
		stArray[i] = sourceArray[randInd];
		maxValue--;
		sourceArray.splice(randInd, 1);
		// console.log('random Index' + randInd);
		// console.log('sourceArray after splice' + sourceArray)
		
	};
	// console.log('stArray' + stArray);
}

// End game
function endGame(){
		// console.log('outro ld: '+ outroLoaded)

	if (point>=END_GAME_POINT && outroLoaded) {
		$('.l2').hide();
		$('.l2').children().hide();
		$('.face-motion-level-2').hide();
		$('.face-motion-level-2').children().hide();
		$('#end-game').find('img').attr('src', 'img/outtro.gif');
		createjs.Sound.play("outro");

		// lowLag.play('outro');

		setTimeout(function() {
			localStorage.setItem("firstCache", true);
			document.location.href = "";

		}, 20000);
	}
}


// LEVEL1 FUNCTIONS
// Count the point after each click, then choose the following part
function removeKeyAddPointLevelOne (id) {
	// When the key parts are clicked, 
	if (gigglePart[partIndex] == id) {
		point +=POINT_PER_RIGHT_CLICK;
		// console.log("Point: "+ point);
		flag[partIndex] = false;
		partIndex = Math.floor(Math.random() * 6);
		$(".key").removeClass("key");
		// console.log("ID: "+ partIndex);
		clickCounter(partIndex);
		detectLevel(point);
		if(point == 15){
			levelUp();	
		}
		
		// $("#result").html("<br/><br/><br/><br/>Target: " + gigglePart[partIndex] + "<br/>Point: " + point + "<br/>Level: " + level);

	}

}
		
// LEVEL 2 FUNCTIONS
// Get faceType
function getLevel2Face () {
	level2faceOrder = Math.floor(Math.random()*6);
}
// Calculate point for level 2
function removeKeyAddPointLevelTwo(id) {
	point +=POINT_PER_RIGHT_CLICK;
	detectLevel(point);
	endGame();
}

function soundPlayed () {
	soundIsPlaying = false;
}

// READY FUNCTION
$(document).ready(function() {
  	preLoadImg();
  	// setTimeout(function() {
   //    preLoadImg();    
   //  }, 0);
	if (navigator.userAgent.toLowerCase().indexOf('Safari') > -1 ) {
		audioType = '.mp3';
	}else{
		audioType = '.ogg';
	};
	// Get 80% of current height of the screen
	$('#container').css({'height': cH+'px', 'width': cH*3/4});

	// console.log('outroloaded: '+outroLoaded);
   	// ****************
  //  	lowLag.init();
  //   lowLag.load('KAKKIAINEN_ALL/1_0_FIN_VideoVO_Giggles_Free_Intro'+audioType,'intro');
    

		// lowLag.load('KAKKIAINEN_ALL/kakkis_L1_NEG_1.ogg','s1');
  //   lowLag.load('KAKKIAINEN_ALL/kakkis_L1_NEG_2.ogg','s2');
  //   lowLag.load('KAKKIAINEN_ALL/kakkis_L1_NEG_3.ogg','s3');
		// lowLag.load('KAKKIAINEN_ALL/2_0_FIN_VideoVO_Giggles_Free_Win'+audioType,'outro');
	
			var queue = new createjs.LoadQueue();
			createjs.Sound.alternateExtensions = ["mp3"];
		  queue.installPlugin(createjs.Sound);
			
			// manifest = [
			// 	{id:"intro", src:'1_0_FIN_VideoVO_Giggles_Free_Intro'+audioType},
			// 	{id:"outro", src:'2_0_FIN_VideoVO_Giggles_Free_Win'+audioType},
			// 	{id:"s1", src:'kakkis_L1_NEG_1'+audioType},
			// 	{id:"s2", src:'kakkis_L1_NEG_2'+audioType},
			// 	{id:"s3", src:'kakkis_L1_NEG_3'+audioType},
			// 	{id:"s4", src:'kakkis_L1_NEG_4'+audioType},
			// 	{id:"s5", src:'kakkis_L1_NEG_5'+audioType}
			// ];

			queue.loadManifest([
				{id:"intro", src:'KAKKIAINEN_ALL/merged_intro'+audioType},
				{id:"outro", src:'KAKKIAINEN_ALL/2_0_FIN_VideoVO_Giggles_Free_Win'+audioType},
				{id:"s1", src:'KAKKIAINEN_ALL/kakkis_L1_NEG_1'+audioType},
				{id:"s2", src:'KAKKIAINEN_ALL/kakkis_L1_NEG_2'+audioType},
				{id:"s3", src:'KAKKIAINEN_ALL/kakkis_L1_NEG_3'+audioType},
				{id:"s4", src:'KAKKIAINEN_ALL/kakkis_L1_NEG_4'+audioType},
				{id:"s5", src:'KAKKIAINEN_ALL/kakkis_L1_NEG_5'+audioType}
			]);
			// createjs.Sound.alternateExtensions = ["mp3"];
			// createjs.Sound.addEventListener("fileload", handleLoad);
			// createjs.Sound.registerManifest(manifest, audioPath);
	// *******************
	// Intro frames
	// createIntroMotion ("intro-frames", "f", 1, 140, cH*3/4, cH, 25);
	
	// ******************* //
	// Level up frame
	//  hidden automatically 
	createUpgradeMotion("level2up", "GB_levelup", 0, 10, cH*3/4, cH*1, levelUpFPS);

	$('#level2up').hide();
	$('#level2up').children().hide();
	
	// ******************* //
	
	//loadLevelTwoFrames()

	// Automatically hide upper level frames when start
	
	$("#shield").hide();
	//Prevent scrolling
	$('html').css({
	    'overflow': 'hidden',
	    'height': '100%'
	});
	$('body').css({
	    'overflow': 'hidden',
	    'height': '90%'
	});

	
	// Set the started key part
	partIndex = Math.floor(Math.random() * 6);
	clickCounter(partIndex);
	
	// $("#result").html("<br/><br/><br/><br/>Target: " + gigglePart[partIndex] + "<br/>Point: " + point + "<br/>Level: " + level);
    
	
    chooseTypeOfSound();
    createSourceArray(myMaxValue);
    getSound(myMaxValue);
  

    var clickOrder = 0;
    var checkClick = false;


    //EVENT FUNCTION FOR MULTI TOUCH

    
		//  $('.l1').bind('touchstart click', function(){
		//  	clickOrder++;
		// 		// console.log("sounftrack type: "+soundTrackTypeValue+" stArray: "+stArray[clickOrder-1]+"     clickorder: "+clickOrder);
		// 		// console.log("correspondingFacesLevel1: "+correspondingFacesLevel1);	
		// 		lowLag.play('s'+clickOrder);

		//   return false
		// });

    $('.l1').bind('touchstart click', function() {
    	
    	
    	// MOVE HERE
			id = $(this).attr('id')

    	removeKeyAddPointLevelOne(id);
    	clickOrder++;
    	allowToNextAction = !soundIsPlaying && !faceIsActived;
			if (allowToNextAction) {
				soundIsPlaying = true;	
				var soundInstance = createjs.Sound.play('s'+clickOrder);
				setTimeout(function(){
					soundIsPlaying = false;
				},1900);
				soundInstance.addEventListener("complete", soundPlayed);
										
			};
			
			
			
			// console.log(soundIsPlaying);
			// console.log(myS.PLAY_FINISHED)
			if (clickOrder == 1) {
			 	queue.loadManifest([
					{id:"s6", src:'KAKKIAINEN_ALL/'+soundTrackTypeValue+stArray[5]+audioType},
					{id:"s7", src:'KAKKIAINEN_ALL/'+soundTrackTypeValue+stArray[6]+audioType},
					{id:"s8", src:'KAKKIAINEN_ALL/'+soundTrackTypeValue+stArray[7]+audioType},
					{id:"s9", src:'KAKKIAINEN_ALL/'+soundTrackTypeValue+stArray[8]+audioType},
					{id:"s10", src:'KAKKIAINEN_ALL/'+soundTrackTypeValue+stArray[9]+audioType}
				]);

				// createjs.Sound.alternateExtensions = ["mp3"];
				// createjs.Sound.registerManifest(manifest, audioPath);

				chooseTypeOfSound();
	  		createSourceArray(myMaxValue);
	  		getSound(myMaxValue);
	    	

			    
			};
			

			if (clickOrder == 3) {
	    		// lowLag.load('KAKKIAINEN_ALL/'+soundTrackTypeValue+stArray[0]+audioType,'s1');
			    // lowLag.load('KAKKIAINEN_ALL/'+soundTrackTypeValue+stArray[1]+audioType,'s2');
			    // lowLag.load('KAKKIAINEN_ALL/'+soundTrackTypeValue+stArray[2]+audioType,'s3');
			    queue.loadManifest([
						{id:"s1", src:'KAKKIAINEN_ALL/'+soundTrackTypeValue+stArray[0]+audioType},
						{id:"s2", src:'KAKKIAINEN_ALL/'+soundTrackTypeValue+stArray[1]+audioType},
						{id:"s3", src:'KAKKIAINEN_ALL/'+soundTrackTypeValue+stArray[2]+audioType},
						{id:"s4", src:'KAKKIAINEN_ALL/'+soundTrackTypeValue+stArray[3]+audioType},
						{id:"s5", src:'KAKKIAINEN_ALL/'+soundTrackTypeValue+stArray[4]+audioType}
					]);
					// createjs.Sound.alternateExtensions = ["mp3"];
					// createjs.Sound.registerManifest(manifest, audioPath);
			}		
	    	
	    	// audioArray[clickOrder-1].play();
	    	
	    	if (clickOrder >= NUMBER_OF_NOREPEAT_SOUNDS - 1) {
	    		//Reset clickOrder's  value
	    		clickOrder = 0;
	    		
	    	};

	    	if(!$('#face-idle-L1').children().first().is(":visible")){
					// $('.face-motion-level-1').children().hide();
				}
	   		
	    
	    	// $('.l1').addClass('active');
	    	// Delay time

	    	// checkClick = true;
	    	// console.log('Check click: '+ checkClick);
	    	
	    	// setTimeout(function() {
	    	// 	console.log('hihi its for time out Function');
	    	// 	checkClick = false;
	    	// 	console.log(checkClick);
	    	// 	$('.l1').removeClass('active');
	    	// }, 1000);
			// setInterval(function(){
			// 	console.log('haha')
			// 	$('.l1').removeClass('active');
			// 	checkClick = false;
			// }, 1500);
		// console.log(stArray);
		   
			return false;
    });

    
	$('.l2').bind('touchstart click', function() {
		clickOrder++;

		// MOVE HERE
    	removeKeyAddPointLevelTwo();
    	allowToNextAction = !soundIsPlaying && !faceIsActived;
    	if (level == 2) {
    		soundTrackTypeValue = soundtrackLevel2;
    	}else if (level == 3) {
    		soundTrackTypeValue = soundtrackLevel3;
    	};
    	// console.log("sounftrack type: "+soundTrackTypeValue+" stArray: "+stArray[clickOrder-1]+"     clickorder: "+clickOrder);
    	
    	if (clickOrder == 3) {
    		// lowLag.load('KAKKIAINEN_ALL/'+soundTrackTypeValue+stArray[0]+audioType,'s1');
		    // lowLag.load('KAKKIAINEN_ALL/'+soundTrackTypeValue+stArray[1]+audioType,'s2');
		    // lowLag.load('KAKKIAINEN_ALL/'+soundTrackTypeValue+stArray[2]+audioType,'s3');
		    
				manifest = [
					{id:"s1", src:'KAKKIAINEN_ALL/'+soundTrackTypeValue+stArray[0]+audioType},
					{id:"s2", src:'KAKKIAINEN_ALL/'+soundTrackTypeValue+stArray[1]+audioType},
					{id:"s3", src:'KAKKIAINEN_ALL/'+soundTrackTypeValue+stArray[2]+audioType},
					{id:"s4", src:'KAKKIAINEN_ALL/'+soundTrackTypeValue+stArray[3]+audioType},
					{id:"s5", src:'KAKKIAINEN_ALL/'+soundTrackTypeValue+stArray[4]+audioType}
				];
				// createjs.Sound.alternateExtensions = ["mp3"];
				// createjs.Sound.registerManifest(manifest, audioPath);
    	}
    	
    	// lowLag.load('KAKKIAINEN_ALL/'+soundTrackTypeValue+stArray[3]+audioType,'s4');
	    // lowLag.load('KAKKIAINEN_ALL/'+soundTrackTypeValue+stArray[4]+audioType,'s5');
	    // lowLag.load('KAKKIAINEN_ALL/'+soundTrackTypeValue+stArray[5]+audioType,'s6');
    	// lowLag.play('s'+clickOrder);
    	manifest = [
				{id:"s6", src:'KAKKIAINEN_ALL/'+soundTrackTypeValue+stArray[5]+audioType},
				{id:"s7", src:'KAKKIAINEN_ALL/'+soundTrackTypeValue+stArray[6]+audioType},
				{id:"s8", src:'KAKKIAINEN_ALL/'+soundTrackTypeValue+stArray[7]+audioType},
				{id:"s9", src:'KAKKIAINEN_ALL/'+soundTrackTypeValue+stArray[8]+audioType},
				{id:"s10", src:'KAKKIAINEN_ALL/'+soundTrackTypeValue+stArray[9]+audioType}
			];

			createjs.Sound.alternateExtensions = ["mp3"];
			// createjs.Sound.registerManifest(manifest, audioPath);
			
			if (allowToNextAction) {
				var soundInstance = createjs.Sound.play('s'+clickOrder);
				soundIsPlaying = true;
				soundInstance.addEventListener("complete", soundPlayed);
			};
    	
    	if (clickOrder > NUMBER_OF_NOREPEAT_SOUNDS - 1) {
    		//Reset clickOrder's  value
    		clickOrder = 0;
    		chooseTypeOfSound();
    		createSourceArray(myMaxValue);
    		getSound(myMaxValue);
    	};

    	if(!$('#face-idle-L2').children().first().is(":visible")){
				// $('.face-motion-level-2').children().hide();
			}
	});



    $('face-motion-level-1').hide();
    $('face-motion-level-1').children().hide();


    // Check if device is touch each IDLE_TIME/2 (4s/2)
	setInterval(function(){
		$('#container').click(function(){
			isTouch = true;
		});
	}, IDLE_TIME/20);
	
	 
});

levelOneFramesJs = function() {
	// Level 1 frames
	createMotion ("body-L1", "GB_L1_body", 0, 4, cH*150/768, cH*250/1024, DEFAULT_FRAMERATE);
	createMotion ("left-antenna-L1", "GB_L1_antenna_L", 0, 11, cH*0.390625, cH*0.244140625, DEFAULT_FRAMERATE);
	createMotion ("right-antenna-L1", "GB_L1_antenna_R", 0, 9, cH*230/768, cH*267/1024, DEFAULT_FRAMERATE);
	createMotion ("left-arm-L1", "GB_L1_arm_L", 0, 19, cH*200/768, cH*220/1024, DEFAULT_FRAMERATE);
	createMotion ("collar-L1", "GB_L1_collar", 0, 0, cH*134/768, cH*83/1024, DEFAULT_FRAMERATE);
  	createMotion ("right-hand-L1", "GB_L1_hand_R", 0, 10, cH*160/768, cH*500/1024, DEFAULT_FRAMERATE);
	createMotion ("head-L1", "GB_L1_head", 0, 4, cH*250/768, cH*210/1024, DEFAULT_FRAMERATE);
	createMotion ("left-leg-L1", "GB_L1_leg_L", 0, 15, cH*387/768, cH*250/1024, DEFAULT_FRAMERATE);
	createMotion ("right-leg-L1", "GB_L1_leg_R", 0, 10, cH*190/768, cH*250/1024, DEFAULT_FRAMERATE);
	createMotion ("prevent-motion-right-hand-L1", "prevent_motion", 0, 1, cH*160/768, cH*230/1024, DEFAULT_FRAMERATE);
	createMotion ("prevent-motion-left-arm-L1", "prevent_motion", 0, 1, cH*100/768, cH*220/1024, DEFAULT_FRAMERATE);
	// Level 1 idle faces
	createIdleMotion ("face-idle-L1", "GB_L1_idle", 0, 9, cH*181/768, cH*125/1024, DEFAULT_FRAMERATE, 1);
	// Level 1 faces status
	createFaceMotion("NEG-a-L1", "GB_L1_NEG_a",	0, 9, cH*181/768, cH*125/1024, DEFAULT_FRAMERATE, 0, 1);
	// createFaceMotion("NEG-b-L1", "GB_L1_NEG_b",	0, 9, cH*181/768, cH*125/1024, DEFAULT_FRAMERATE, 0);
	createFaceMotion("POS-a-L1", "GB_L1_POS_a",	0, 15, cH*181/768, cH*125/1024, DEFAULT_FRAMERATE, 1, 1);
	// createFaceMotion("POS-b-L1", "GB_L1_POS_b",	0, 14, cH*181/768, cH*150/1024, DEFAULT_FRAMERATE, 1);
	createFaceMotion("POS-b-L1", "GB_L1_POS_c",	0, 10, cH*181/768, cH*125/1024, DEFAULT_FRAMERATE, 2, 1);
	
}
levelTwoFramesJs = function() {
	createMotion ("body-L2", "GB_L2_body", 0, 0, cH*120/384, cH*60/512, DEFAULT_FRAMERATE);
	createMotion ("left-antenna-L2", "GB_L2_antenna_L", 0, 15, cH*110/384, cH*250/512, DEFAULT_FRAMERATE);
	createMotion ("right-antenna-L2", "GB_L2_antenna_R", 0, 15, cH*140/384, cH*180/512, DEFAULT_FRAMERATE);
	createMotion ("collar-L2", "GB_L2_collar", 0, 3, cH*75/384, cH*49/512, DEFAULT_FRAMERATE);
	createMotion ("left-hand-L2", "GB_L2_hand_L", 0, 7, cH*110/384, cH*60/512, DEFAULT_FRAMERATE);
	createMotion ("right-hand-L2", "GB_L2_hand_R", 0, 6, cH*40/384, cH*50/512, DEFAULT_FRAMERATE);
	createMotion ("left-leg-L2", "GB_L2_leg_L", 0, 8, cH*135/384, cH*210/512, DEFAULT_FRAMERATE);
	createMotion ("right-leg-L2", "GB_L2_leg_R", 0, 8, cH*120/384, cH*180/512, DEFAULT_FRAMERATE);
	createMotion ("head-L2", "GB_L2_head", 0, 6, cH*125/384, cH*105/512, DEFAULT_FRAMERATE);
	// Level 2 idle faces 
	createIdleMotion ("face-idle-L2", "GB_L2_idle", 0, 11, cH*80/384, cH*65/512, DEFAULT_FRAMERATE, 2);
	// Level 2 faces status
	createFaceMotion("POS-a-L2", "GB_L2_POS_a",	0, 8, cH*80/384, cH*65/512, DEFAULT_FRAMERATE, 0, 2);
	createFaceMotion("POS-b-L2", "GB_L2_POS_b",	0, 13, cH*80/384, cH*65/512, DEFAULT_FRAMERATE, 1, 2);
	createFaceMotion("POS-c-L2", "GB_L2_POS_c",	0, 8, cH*80/384, cH*80/512, DEFAULT_FRAMERATE, 2, 2);
	createFaceMotion("POS-d-L2", "GB_L2_POS_d",	0, 11, cH*80/384, cH*65/512, DEFAULT_FRAMERATE, 3, 2);
	createFaceMotion("POS-e-L2", "GB_L2_POS_e",	0, 5, cH*80/384, cH*70/512, DEFAULT_FRAMERATE, 4, 2);
	createFaceMotion("POS-f-L2", "GB_L2_POS_f",	0, 9, cH*80/384, cH*65/512, DEFAULT_FRAMERATE, 5, 2);

}

// outroFramesJs = function(){
// 	createIntroMotion ("outro-frames", "2_0_FIN_VideoVO_Giggles_Free_Win", 1, 520, cH*3/4, cH, 25);
// }
