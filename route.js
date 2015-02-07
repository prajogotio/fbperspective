
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
        bgm : 'sounds/food-market.mp3',
        title : 'Chinatown',
        info : [
            comments['prajogo welcome'],
            articles['gardens by the bay'],
            articles['art science museum'],
            videos['a tiny modernity']
        ]
    },
};



// MARK : - ROUTES
/*
var routes = {
    'singapore' : {
        'first_sphere' : spheres['aerial']
    }
};*/




var thegreenroof = {
    panoid : '6YQ9pUy9F94AAAQYNw70KA',
    heading : -70,
    pitch : 0,
    title : 'The Green Roof',
    bgm : 'sounds/wind-breeze.mp3',
    info : [
        {
            'type' : 'article',
            'img' : 'res/photos/marina-barrage-airview.jpg',
            'heading' : -70,
            'pitch' : 15,
            'title' : 'The Green What?',
            'body' : 'Unique to Singapore, the Green Roof is an eco-friendly building located next to Marina Barrage. Here, you can enjoy kite-flying in the open sky!'
        },
        {
            'type' : 'video',
            'pitch' : -5,
            'heading' : -99,
            'video_uri' : {
                src : 'res/videos/thegreenroof.mp4',
                type : 'mp4',
            }
        },
        {
            'type' : 'person_comment',
            'thumbnail' : 'res/photos/collins_thumbnail.jpg',
            'header_photo' : 'res/photos/collins_header.jpg',
            'comment' : "Collins: I love flying kites!",
            'heading' : -45,
            'pitch' : -6,
        },
        {
            'type' : 'person_comment',
            'thumbnail' : 'res/photos/ryan_thumbnail.jpg',
            'header_photo' : 'res/photos/ryan_header.jpg',
            'comment' : 'Ryan: But the kites are so expensive! :(',
            'heading' : -35,
            'pitch' : -6,
        },
        {
            'type' : 'transit',
            'sphere_id' : 'thegreenroof',
            'heading' : -30,
            'pitch' : 20,
        }
    ],
}

var nightskyline = {
    'title' : 'Singapore Night Sky',
    'panoid' : 'xNSktCgq91QAAAQZL1fx2A',
    'heading' : 0,
    'pitch' : 0,
    'bgm' : 'sounds/city-park.mp3',
    'info' : [
        {
            'type' : 'person_comment',
            'thumbnail' : 'res/photos/andhieka_thumbnail.jpg',
            'header_photo' : 'res/photos/andhieka_header.jpg',
            'comment' : 'Andhieka: Singapore is a city that never sleeps!',
            'heading' : -200,
            'pitch' : 10,
        },
        {
            'type' : 'person_comment',
            'thumbnail' : 'res/photos/prajogo_thumbnail.jpg',
            'header_photo' : 'res/photos/prajogo_header.jpg',
            'comment' : 'Prajogo: Hackers in Singapore also never sleep!',
            'heading' : -200,
            'pitch' : 0,
        },
        {
            'type' : 'article',
            'title' : 'Marina Bay Sands',
            'img' : 'res/photos/mbs.jpg',
            'heading' : -250,
            'pitch' : 20,
            'body' : 'Marina Bay Sands might be the only building in the world that has a ship built on top of it. According to Fengshui, this building represents "Hub of Prosperity"',
        },
        {
            'type' : 'transit',
            'sphere_id' : 'thegreenroof',
            'heading' : -300,
            'pitch' : 0,
        }
    ],
}

var route = {
    'initial_sphere' : 'nightskyline',
    'nightskyline' : nightskyline,
    'thegreenroof' : thegreenroof,
    /*'aerial' : spheres['aerial'],
    'chinatown' : spheres['chinatown']*/
};