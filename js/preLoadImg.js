function preLoadImg () {
	var preLoad = new createjs.LoadQueue(true, 'img/');
	var manifest = [
		{src:'GB_L1_NEG_a/GB_L1_NEG_a_00.png', id:'1'},
		{src:'GB_L1_NEG_a/GB_L1_NEG_a_01.png', id:'2'},
		{src:'GB_L1_NEG_a/GB_L1_NEG_a_02.png', id:'3'},
		{src:'GB_L1_NEG_a/GB_L1_NEG_a_03.png', id:'4'},
		{src:'GB_L1_NEG_a/GB_L1_NEG_a_04.png', id:'5'},
		{src:'GB_L1_NEG_a/GB_L1_NEG_a_05.png', id:'6'},
		{src:'GB_L1_NEG_a/GB_L1_NEG_a_06.png', id:'7'},
		{src:'GB_L1_NEG_a/GB_L1_NEG_a_07.png', id:'8'},
		{src:'GB_L1_NEG_a/GB_L1_NEG_a_08.png', id:'9'},

		// {src:'GB_L1_NEG_b/GB_L1_NEG_b_00.png', id:'1'},
		// {src:'GB_L1_NEG_b/GB_L1_NEG_b_01.png', id:'2'},
		// {src:'GB_L1_NEG_b/GB_L1_NEG_b_02.png', id:'3'},
		// {src:'GB_L1_NEG_b/GB_L1_NEG_b_03.png', id:'4'},
		// {src:'GB_L1_NEG_b/GB_L1_NEG_b_04.png', id:'5'},
		// {src:'GB_L1_NEG_b/GB_L1_NEG_b_05.png', id:'6'},
		// {src:'GB_L1_NEG_b/GB_L1_NEG_b_06.png', id:'7'},
		// {src:'GB_L1_NEG_b/GB_L1_NEG_b_07.png', id:'8'},
		// {src:'GB_L1_NEG_b/GB_L1_NEG_b_08.png', id:'9'},
		// {src:'GB_L1_NEG_b/GB_L1_NEG_b_09.png', id:'10'},
		
		// {src:'GB_L1_POS_a/GB_L1_POS_a_01.png', id:'1'},
		// {src:'GB_L1_POS_a/GB_L1_POS_a_02.png', id:'1'},
		// {src:'GB_L1_POS_a/GB_L1_POS_a_03.png', id:'1'},
		// {src:'GB_L1_POS_a/GB_L1_POS_a_04.png', id:'1'},
		// {src:'GB_L1_POS_a/GB_L1_POS_a_05.png', id:'1'},
		// {src:'GB_L1_POS_a/GB_L1_POS_a_06.png', id:'1'},
		// {src:'GB_L1_POS_a/GB_L1_POS_a_07.png', id:'1'},
		// {src:'GB_L1_POS_a/GB_L1_POS_a_08.png', id:'1'},
		// {src:'GB_L1_POS_a/GB_L1_POS_a_09.png', id:'1'},
		// {src:'GB_L1_POS_a/GB_L1_POS_a_10.png', id:'1'},
		// {src:'GB_L1_POS_a/GB_L1_POS_a_11.png', id:'1'},
		// {src:'GB_L1_POS_a/GB_L1_POS_a_12.png', id:'1'},
		// {src:'GB_L1_POS_a/GB_L1_POS_a_13.png', id:'1'},
		// {src:'GB_L1_POS_a/GB_L1_POS_a_14.png', id:'1'},
		// {src:'GB_L1_POS_a/GB_L1_POS_a_15.png', id:'1'},
		
		{src: 'GB_levelup/GB_levelup_00.png', id: '1'},
		{src: 'GB_levelup/GB_levelup_01.png', id: '1'},
		{src: 'GB_levelup/GB_levelup_02.png', id: '1'},
		{src: 'GB_levelup/GB_levelup_03.png', id: '1'},
		{src: 'GB_levelup/GB_levelup_04.png', id: '1'},
		{src: 'GB_levelup/GB_levelup_05.png', id: '1'},
		{src: 'GB_levelup/GB_levelup_06.png', id: '1'},
		{src: 'GB_levelup/GB_levelup_07.png', id: '1'},
		{src: 'GB_levelup/GB_levelup_08.png', id: '1'},
		{src: 'GB_levelup/GB_levelup_09.png', id: '1'},
		{src: 'GB_levelup/GB_levelup_10.png', id: '1'}
	];

	preLoad.loadManifest(manifest);

}