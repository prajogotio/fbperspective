var route = {
	'initial_sphere' : 'first_sphere',
	'first_sphere' : {
		panoid : 'oacawDojVGkAAAQYfeZmJg',
		heading : 90,
		pitch : 0,
		bgm : 'sounds/wind-breeze.mp3',
		title : 'By the side of Marina Bay',
		info : [
			{
				type : 'person_comment',
				thumbnail : 'test/th1.jpg',
				header_photo : 'test/h1.jpg',
				comment : "Prajogo: Hello There! Welcome to Singapore! You are currently in Marina Bay, a place where a lot of tall buildings can be seen!",
				heading : 80,
				pitch : 15,
			},
			{
				type : 'person_comment',
				thumbnail : 'test/th2.jpg',
				header_photo : 'test/h2.jpg',
				comment : "Febriliani: Singapore is a lion city, and the skyscrapers divide the horizon into two.",
				heading : 125,
				pitch : 20,
			},
			{
				type : 'video',
				video_uri : {
					src : 'test/demo.mp4',
					type : 'mp4',
				},
				heading : 100,
				pitch : 0,
			},
			{
				type : 'article',
				img : 'test/bgimg.jpg',
				title : 'Hello There',
				body : 'This is the best thing that you can find in singapore. the thing are so big that there are so many other big stuff that can be found. however they may not make sense in first glance. but the will sooner or later',
				heading : 40,
				pitch : 10,
			},
			{
				type : 'transit',
				sphere_id : 'first_sphere',
				heading : 120,
				pitch : 0,
			}
		],
	}
};