
// MARK : - SPHERE INFOS

var articles = {
    'gardens by the bay' : {
        type : 'article',
        img : 'res/photos/gardensbythebay.jpg',
        title : 'Gardens by the Bay',
        body : 'Gardens by the Bay is a park spanning 101 hectares (1,010,000 m2) of reclaimed land[1] in central Singapore, adjacent to the Marina Reservoir. The park consists of three waterfront gardens: Bay South Garden, Bay East Garden and Bay Central Garden.',
        heading : 195,
        pitch : -3
    },
    'art science museum' : {
        type : 'article',
        img : 'res/photos/SAM.jpg',
        title : 'ArtScience Museum',
        body : 'Referred to as "The Welcoming Hand of Singapore" by Las Vegas Sands chairman Sheldon Adelson, the ArtScience Museum is anchored by a round base in the middle, with ten extensions referred to as "fingers".',
        heading : 270,
        pitch : 0
    },
};

var videos = {
    'a tiny modernity' : {
        type : 'video',
        video_uri : {
            src : 'res/videos/hi-res/A Tiny Modernity.mp4',
            type : 'mp4',
        },
        heading : 235,
        pitch : 0,
    },
    'chinatown food' : {
    	type : 'video',
    	video_uri : {
    		src : 'res/videos/low-res/Chinatown.m4v',
    		type : 'mp4',
    	},
    	heading : 235,
    	pitch : 0,
    }
};

var comments = {
    'prajogo welcome' : {
        type : 'person_comment',
        thumbnail : 'res/photos/th1.jpg',
        header_photo : 'res/photos/h1.jpg',
        comment : 'Prajogo Tio : Hi there! Welcome to Singapore! Right now you are at the Singapore Flyer. Browse around here for a while, and then join us for a tour around Singapore!',
        heading : 330,
        pitch : 0,
    },
}

var transits = {
    'chinatown' : {
        type : 'transit',
        sphere_id : 'chinatown',
        heading : 25,
        pitch : -3,
    }
}

// MARK : - SPHERES

var spheres = {
    'aerial' : {
        panoid : 'lZu4YfvnVC4AAAQfCa3upw',
        heading : 304,
        pitch : -10,
        bgm : 'sounds/wind-breeze.mp3',
        title : 'Singapore: A World-class City Nation',
        info : [
            comments['prajogo welcome'],
            articles['gardens by the bay'],
            articles['art science museum'],
            videos['a tiny modernity'],
            transits['chinatown']
        ]
    },
    'chinatown' : {
        panoid : '2UzA7K9llK0AAAQXXzrRsA',
        heading : 0,
        pitch : 0,
        bgm : 'sounds/food_market.mp3',
        title : 'Chinatown',
        info : [
            videos['chinatown food']
        ]
    },
};

var route = {
	'initial_sphere' : 'chinatown',
	'aerial' : spheres['aerial'],
	'chinatown' : spheres['chinatown']
};

// MARK : - ROUTES
/*
var routes = {
    'singapore' : {
        'first_sphere' : spheres['aerial']
    }
};*/


