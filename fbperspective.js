document.addEventListener('DOMContentLoaded', function(e) {
	initializePerspectiveService();
});

function initializePerspectiveService() {
	loadStaticFile("http://fonts.googleapis.com/css?family=Poiret+One", "css");
	loadStaticFile('http://fonts.googleapis.com/css?family=Open+Sans+Condensed:700', 'css');
	loadStaticFile('http://fonts.googleapis.com/css?family=Dosis','css');
}

function loadStaticFile(filename, filetype){
 	if (filetype=="js"){ //if filename is a external JavaScript file
 		var fileref=document.createElement('script');
 		fileref.setAttribute("type","text/javascript");
		fileref.setAttribute("src", filename);
	} else if (filetype=="css"){ //if filename is an external CSS file
 		var fileref=document.createElement("link");
 		fileref.setAttribute("rel", "stylesheet");
 		fileref.setAttribute("type", "text/css");
 		fileref.setAttribute("href", filename);
	}
	if (typeof fileref!="undefined") {
		document.getElementsByTagName("head")[0].appendChild(fileref);
	}
}

function setStyle(elem, KeyValue) {
	if(elem == null) return;
	for (var key in KeyValue) {
		if(KeyValue.hasOwnProperty(key)) {
			elem.style.setProperty(key, KeyValue[key]);
		}
	}
}

function setTransform(elem, transform) {
	elem.style.setProperty('transform', transform);
	elem.style.setProperty('-moz-transform', transform);
	elem.style.setProperty('-webkit-transform', transform);
}

function setTransition(elem, transition) {
	elem.style.setProperty('transition', transition);
	elem.style.setProperty('-moz-transition', transition);
	elem.style.setProperty('-webkit-transition', transition);
}

function setFilter(elem, filter) {
	setStyle(elem, {
		'filter': filter,
		'-moz-filter': filter,
		'-webkit-filter': filter,
	});
}

function Perspective(panoid, _heading, _pitch) {
	this.command = {};
	this.infoList = [];
	this.POV_RANGE = 45;
	this.SCREEN_DISTANCE = window.innerWidth/2/Math.tan(this.POV_RANGE/180*Math.PI);
	this.initializePerspective(panoid, _heading, _pitch);
}


Perspective.prototype.initializePerspective = function(panoid, _heading, _pitch) {
	var that = this;
	this.container = document.createElement('div');
	this.display = document.createElement('div');
	this.googleMap = document.createElement('div');
	this.container.appendChild(this.display);
	this.container.appendChild(this.googleMap);
	this.backbutton = document.createElement('div');
	this.backbuttonIcon = new Image();
	this.backbuttonIcon.src = "res/back_button.png";
	setStyle(this.backbuttonIcon, {
		'width' : '100%',
	});
	setStyle(this.backbutton, {
		'width' : '50px',
		'height' : '50px',
		'border-radius' : '50px',
		'cursor' : 'pointer',
		'position' : 'absolute',
		'top' : '30px',
		'left' : '70px',
		'z-index': '2',
	})

	this.display.appendChild(this.backbutton);
	this.backbutton.appendChild(this.backbuttonIcon);
	this.backbutton.addEventListener('mouseover', function(e){
		setStyle(this, {
			'background-color' : 'red',
		})
	});

	this.backbutton.addEventListener('mouseleave', function(e){
		setStyle(this, {
			'background-color' : 'transparent',
		})
	});
	this.backbutton.addEventListener('click', function(e) {
		setStyle(that.container, {
			'top' : '100%',
		})
		setStyle(home, {
			'opacity' : '1',
		})
		that.ambientSound.pause();
		bg_video.play();
	});

	this.headSpeed = 0;
	this.pitchSpeed = 0;
	this.inertialSpeed = 0.95;
	setStyle(this.container, {
		'width': '100%',
		'height': '100%',
		'z-index' : '1',
	});

	setStyle(this.display, {
		'position' : 'absolute',
		'width' : '100%',
		'height' : '100%',
		'z-index' : '2',
	});


	setStyle(this.googleMap, {
		'z-index' : '1',
		'height' : '100%',
	});

	var panoramaOptions = {
		pano : panoid,
		pov : {
			heading : _heading,
			pitch : _pitch,
		},
		zoom : 1,
		disableDefaultUI : true,
	}
	this.photoSphere = new google.maps.StreetViewPanorama(this.googleMap, panoramaOptions);
	this.photoSphere.setVisible(true);
	document.addEventListener('mousemove', this, false);
	document.addEventListener('mouseleave', this, false);
	this.container.id = "perspective-service";
}

Perspective.prototype.clearMovementCommands = function(){
	this.command['LEFT'] = false;
	this.command['RIGHT'] = false;
	this.command['UP'] = false;
	this.command['DOWN'] = false;
}

Perspective.prototype.handleEvent = function(e) {
	if(e.type == 'mousemove') {
		this.clearMovementCommands();
		if(e.pageX < window.innerWidth/4) {
			this.command['LEFT'] = true;
		}
		if(e.pageX > window.innerWidth/4*3) {
			this.command['RIGHT'] = true;
		}
		if(e.pageY > window.innerHeight/4*3) {
			this.command['UP'] = true;
		}
		if(e.pageY < window.innerHeight/4) {
			this.command['DOWN'] = true;
		}
	}
	if(e.type == 'mouseleave') {
		this.clearMovementCommands();
	}
}

Perspective.prototype.headLeft = function() {
	this.headSpeed = Math.max(-0.9, this.headSpeed - 0.04);
}

Perspective.prototype.headRight = function() {
	this.headSpeed = Math.min(0.9, this.headSpeed + 0.04);
}

Perspective.prototype.pitchUp = function() {
	this.pitchSpeed = Math.max(-0.6, this.pitchSpeed - 0.04);
}

Perspective.prototype.pitchDown = function() {
	this.pitchSpeed = Math.min(0.6, this.pitchSpeed + 0.04);
}

Perspective.prototype.updatePhotoSphere = function() {
	if(this.command['INACTIVE_HOVER']) {
		this.clearMovementCommands();
	}
	if(this.command['UP']) this.pitchUp();
	if(this.command['DOWN']) this.pitchDown();
	if(this.command['LEFT']) this.headLeft();
	if(this.command['RIGHT']) this.headRight();
	var newHeading = this.photoSphere.pov.heading + this.headSpeed;
	var newPitch = this.photoSphere.pov.pitch + this.pitchSpeed;
	if(newHeading < -180) newHeading += 360;
	if(newHeading > 180) newHeading -= 360;
	if(newPitch < -180) newPitch += 360;
	if(newPitch > 180) newPitch -=360;
	this.photoSphere.setPov({heading : newHeading, pitch : newPitch});
	this.headSpeed = this.headSpeed * this.inertialSpeed;
	this.pitchSpeed = this.pitchSpeed * this.inertialSpeed;
}

Perspective.prototype.setAmbientSound = function(audioSource) {
	var that = this;
	var audio = document.createElement('audio');
	this.ambientSound = audio;
	audio.addEventListener('loadedmetadata', function() {
		that.playAmbientSound();
	});
	audio.addEventListener('ended', function() {
		this.currentTime = 0;
		that.playAmbientSound();
	});
	audio.src = audioSource;
	audio.volume = 0.2;
}

Perspective.prototype.playAmbientSound = function() {
	if(this.ambientSound == null) return;
	this.ambientSound.play();
}

Perspective.prototype.addInfo = function(info) {
	this.infoList.push(info);
}

Perspective.prototype.update = function() {
	this.updatePhotoSphere();
	for (var i=0;i<this.infoList.length;++i){
		this.infoList[i].update();
	}
}

Perspective.prototype.setTitle = function(title) {
	if(this.title == null) {
		this.title = document.createElement('div');

		setStyle(this.title, {
			'position': 'absolute',
			'left' : '50%',
			'top' : '30px',
			'font-family' : 'Lato',
			'font-size' : '1.70em',
			'font-weight' : 'lighter',
			'color' : 'white',
			'border' : '1px solid white',
			'padding' : '7px 28px 7px 28px',
		});

		setTransform(this.title, 'translateX(-50%)');
		this.display.appendChild(this.title);
	}
	this.title.innerHTML = title;
}

Perspective.prototype.resetState = function() {
	this.stopOngoingActivity();
	for (var i=0;i<this.infoList.length;++i){
		this.display.removeChild(this.infoList[i].container);
	}
	this.infoList = [];
}

Perspective.prototype.stopOngoingActivity = function() {
	this.ambientSound.pause();
	this.ambientSound = null;
}

function Information(parent, heading, pitch) {
	this.parent = parent;
	this.heading = heading;
	this.pitch = pitch;
	this.container = document.createElement('div');
	this.opacity = 0;
	this.parent.display.appendChild(this.container);
	setStyle(this.container, {
		'position' : 'absolute',
		'opacity' : '0',
		'overflow' : 'hidden',
	});
	this.container.addEventListener('mouseover', this, false);
	this.container.addEventListener('mouseleave', this, false);
}

Information.prototype.handleEvent = function(e) {
	if(e.type == 'mouseover') {
		this.parent.command['INACTIVE_HOVER'] = true;
		setStyle(this.container, {
			'z-index' : '100',
		});
		setFilter(this.parent.googleMap, 'grayscale(100%) blur(2px)');
	}
	if(e.type == 'mouseleave') {
		this.parent.command['INACTIVE_HOVER'] = false;
		setStyle(this.container, {
			'z-index' : '1',
		});
		setFilter(this.parent.googleMap, '');
	}
}

Information.prototype.setContent = function(content) {
	this.content = content;
	this.container.appendChild(content.container);
}

Information.prototype.update = function(heading, pitch) {
	var alpha = this.heading - this.parent.photoSphere.pov.heading;
	this.left = this.parent.SCREEN_DISTANCE * Math.tan(alpha/180 * Math.PI) + window.innerWidth/2;
	if(alpha > 180) alpha -= 360;
	if(alpha < -180) alpha += 360;
	var beta = this.parent.photoSphere.pov.pitch - this.pitch;
	this.top = this.parent.SCREEN_DISTANCE * Math.tan(beta/180 * Math.PI) + window.innerHeight/2;
	if(beta > 180) beta -= 360;
	if(beta < -180) beta += 360;
	this.opacity = Math.max(0,Math.min(1, 1 - Math.abs(alpha)/(3*this.parent.POV_RANGE)));
	setStyle(this.container, {
		'top' : this.top + 'px',
		'left' : this.left + 'px',
		'opacity' : this.opacity,
	});
	if(this.opacity < 0.02) this.container.style.setProperty('display', 'none');
	else this.container.style.setProperty('display', 'block');
}


function PersonCommentContent(thumbnailSource, headerPhotoSource, comment) {
	var thumbnailImg = new Image();
	thumbnailImg.src = thumbnailSource;
	var headerPhotoImg = new Image();
	headerPhotoImg.src = headerPhotoSource;
	this.comment = comment;
	this.thumbnail = thumbnailImg;
	this.headerPhoto = headerPhotoImg;
	this.width = 280;
	this.height = 250;
	this.thRadius = 40;
	this.initializePersonCommentContent();
}

PersonCommentContent.prototype.initializePersonCommentContent = function() {
	this.container = document.createElement('div');

	setStyle(this.container, {
		'overflow' : 'auto',
	});
	this.thumbnailContainer = document.createElement('div');
	setStyle(this.thumbnailContainer, {
		'position' : 'relative',
		'width' : this.thRadius*2+'px',
		'height' : this.thRadius*2+'px',
		'border-radius' : '70px',
		'background-color' : 'white',
		'z-index' : '3',
		'overflow' : 'hidden',
		'border' : '2px solid white',
	});
	setTransition(this.thumbnailContainer, 'left 0.3s');

	setStyle(this.thumbnail, {
		'width' : '100%',
	});

	this.bodyContainer = document.createElement('div');
	setStyle(this.bodyContainer, {
		'width' : '0px',
		'height' : '0px',
		'opacity' : '0',
	});
	setTransition(this.bodyContainer, 'width 0.5s, height 0.5s, opacity 0.5s');

	this.headerPhotoContainer = document.createElement('div');
	setStyle(this.headerPhotoContainer, {
		'position' : 'absolute',
		'width' : this.width+'px',
		'height' : this.height/2+'px',
		'top' : this.thRadius + 'px',
		'overflow' : 'hidden',
		'background-color' : 'black',
		'z-index' : '1',
	});

	setStyle(this.headerPhoto, {
		'width' : '100%',
	});

	this.commentContainer = document.createElement('div');
	setStyle(this.commentContainer, {
		'position' : 'absolute',
		'width' : this.width+'px',
		'height' : this.height/2+'px',
		'top' : this.thRadius+this.height/2+'px',
		'font-size' : '1.1em',
		'color' : 'white',
		'background-color' : 'rgb(202, 171, 85)',
		'font-family' : 'Lato',
		'z-index' : '2',
	});

	this.commentDiv = document.createElement('div');
	this.commentDiv.innerHTML = this.comment;
	this.commentContainer.appendChild(this.commentDiv);
	setStyle(this.commentDiv, {
		'position' : 'absolute',
		'width' : '100%',
		'top' : '50%',
		'text-align' : 'center',
	});
	setTransform(this.commentDiv, 'translateY(-50%)');
	if(this.headerPhoto != null) this.headerPhotoContainer.appendChild(this.headerPhoto);
	if(this.thumbnail != null) this.thumbnailContainer.appendChild(this.thumbnail);

	this.bodyContainer.appendChild(this.commentContainer);
	this.bodyContainer.appendChild(this.headerPhotoContainer);

	this.container.appendChild(this.thumbnailContainer);
	this.container.appendChild(this.bodyContainer);

	this.container.addEventListener('mouseover', this, false);
	this.container.addEventListener('mouseleave', this, false);
}

PersonCommentContent.prototype.handleEvent = function(e) {
	var that = this;
	if(e.type == 'mouseover'){
		setStyle(this.thumbnailContainer, {
			'left' : this.width/2 - this.thRadius + 'px',
		})
		setStyle(this.bodyContainer, {
			'width' : this.width+'px',
			'height' : this.thRadius+this.height+'px',
			'opacity' : '1',
		});
		
	}
	if(e.type == 'mouseleave') {
		setStyle(this.thumbnailContainer, {
			'left' : '0px',
		})
		setStyle(that.bodyContainer, {
			'width' : '0px',
			'height' : '0px',
			'opacity' : '0',
		});
		
	}
}


function VideoContent(videoURI) {
	this.height = 350;
	this.sideLength = 70;
	this.videoIcon = new Image();
	this.videoIcon.src = 'res/video.png';
	setStyle(this.videoIcon, {
		'height' : this.sideLength+'px',
	});
	this.container = document.createElement('div');
	setStyle(this.container, {
		'height' : this.sideLength+'px',
		'width' : this.sideLength+'px',
		'border' : '0px solid white',
		'overflow' : 'hidden',
		'z-index' : '1',
	});
	setTransition(this.container, 'width 0.5s, height 0.5s, border-width 0.5s');
	this.container.appendChild(this.videoIcon);
	this.titleDiv = document.createElement('div');
	setStyle(this.titleDiv, {
		'width' : '100%',
		'text-align' : 'center',
		'position' : 'absolute',
		//'top' : '50%',
		'font-family' : 'Lato',
		'color' : 'white',
		//'left' : '50%',
		'z-index' : '2',
		'opacity' : '1',
	});
	//this.titleDiv.innerHTML = 'VIDEO';
	this.titleDiv.appendChild(this.videoIcon);
	this.container.appendChild(this.titleDiv);
	setTransition(this.titleDiv, 'opacity 0.5s');
	//setTransform(this.titleDiv, 'translate(-50%,-50%)');

	this.video = document.createElement('video');
	this.video.src = videoURI.src;
	this.video.type = videoURI.type;
	setStyle(this.video, {
		'height' : '100%',
		'opacity' : '0',
	});
	setTransition(this.video, 'opacity 0.5s');

	this.videoDiv = document.createElement('div');
	setStyle(this.videoDiv, {
		'z-index' : '3',
		'height' : '100%',
	});
	this.videoDiv.appendChild(this.video);
	this.container.appendChild(this.videoDiv);

	this.container.addEventListener('mouseover', this, false);
	this.container.addEventListener('mouseleave', this, false);
}

VideoContent.prototype.handleEvent = function(e) {
	if(e.type == 'mouseover') {
		setStyle(this.container, {
			'height' : this.height + 'px',
			'width' : '',
			'border-width' : '1px',
		});
		setStyle(this.video, {
			'opacity' : '1',
		});
		setStyle(this.titleDiv, {
			'opacity' : '0',
		});

		this.video.play();
	}
	if(e.type == 'mouseleave') {
		setStyle(this.container, {
			'height' : this.sideLength+'px',
			'width' : this.sideLength+'px',
			'border-width' : '0px',
		});
		setStyle(this.video, {
			'opacity' : '0',
		});
		
		setStyle(this.titleDiv, {
			'opacity' : '1',
		});
		this.video.pause();
	}
}

function ArticleContent(imgSource, title, body) {
	this.height = 440;
	this.width = 380;
	this.sideLength = 45;
	this.baseLength = 240;
	this.container = document.createElement('div');
	this.img = new Image();
	this.img.src = imgSource;

	this.title = title;
	this.body = body;

	this.thumbnailDiv = document.createElement('div');
	this.titleDiv = document.createElement('div');
	this.bodyDiv = document.createElement('div');
	this.imgDiv = document.createElement('div');
	this.contentDiv = document.createElement('div');

	this.contentDiv.appendChild(this.titleDiv);
	this.contentDiv.appendChild(this.bodyDiv);

	this.container.appendChild(this.imgDiv);
	this.container.appendChild(this.contentDiv);
	this.container.appendChild(this.thumbnailDiv);

	this.bodyText = document.createElement('div');
	this.titleText = document.createElement('div');

	this.bodyText.innerHTML = this.body;
	this.titleText.innerHTML = "\"" + this.title + "\"";

	this.bodyDiv.appendChild(this.bodyText);
	this.titleDiv.appendChild(this.titleText);

	this.imgDiv.appendChild(this.img);

	this.thumbnailDiv.innerHTML = this.title;


	setStyle(this.container, {
		'overflow' : 'hidden',
		'width' : this.baseLength+'px',
		'height' : this.sideLength+'px',
		'border' : '1px solid white',
		'background-color' : 'rgba(0,0,0,0.35)',
	});

	setStyle(this.thumbnailDiv, {
		'position': 'absolute',
		'top' : '0',
		'font-size' : '1.2em',
		'color' : 'white',
		'font-family' : 'Lato',
		'text-align' : 'center',
		'top' : '50%',
		'padding' : '6px 10px 6px 10px',
		'padding' : '5px',
		'opacity' : '1',
		'width' : '100%',
	});

	setTransform(this.thumbnailDiv, 'translateY(-50%)');

	setStyle(this.imgDiv, {
		'opacity' : '0',
		'height' : '100%',
		'z-index' : '1',
	})

	setStyle(this.img, {
		'height' : '100%',
	})
	
	setStyle(this.contentDiv, {
		'opacity' : '0',
		'height' : this.height+'px',
		'position' : 'absolute',
		'width' : '60%',
		'top' : '0px',
		'right' : '0px',
		'z-index' : '2',
	});
	
	setStyle(this.titleDiv, {
		'position' : 'relative',
		'background-color' : 'rgba(202, 171, 85, 0.8)',
		'height' : '30%',
		'width' : '100%',
	});

	setStyle(this.bodyDiv, {
		'position' : 'relative',
		'background-color' : 'rgba(202, 171, 85, 0.8)',
		'height' : '70%',
		'width' : '100%',
	});

	setStyle(this.titleText, {
		'font-family' : 'Dosis',
		'font-size' : '1.8em',
		'text-align' : 'center',
		'position' : 'absolute',
		'width' : '100%',
		'top' : '47%',
		'color' : 'white',
	});

	setStyle(this.bodyText, {
		'font-family' : 'Dosis',
		'font-size' : '1.1em',
		'color' : 'white',
		'padding' : '20px',
	});

	setTransition(this.thumbnailDiv, 'opacity 0.5s');
	setTransition(this.imgDiv, 'opacity 0.5s');
	setTransition(this.container, 'width 0.5s, height 0.5s');
	setTransition(this.contentDiv, 'opacity 0.5s');


	this.container.addEventListener('mouseover', this, false);
	this.container.addEventListener('mouseleave', this, false);

}

ArticleContent.prototype.handleEvent = function(e) {
	if(e.type == 'mouseover') {
		setStyle(this.thumbnailDiv, {
			'opacity' : '0',
		});
		setStyle(this.imgDiv, {
			'opacity' : '1',
		});
		setStyle(this.container, {
			'width' : this.width + 'px',
			'height' : this.height + 'px',
		});
		setStyle(this.contentDiv, {
			'opacity' : '1',
		});
	}
	if(e.type == 'mouseleave') {
		setStyle(this.thumbnailDiv, {
			'opacity' : '1',
		});
		setStyle(this.imgDiv, {
			'opacity' : '0',
		});
		setStyle(this.container, {
			'width' : this.baseLength + 'px',
			'height' : this.sideLength + 'px',
		});
		setStyle(this.contentDiv, {
			'opacity' : '0',
		});
	}
}



function TransitNode(sphereID, title, parent) {
	this.width = 180;
	this.height = 120;
	this.title = title;
	this.parent = parent;
	this.radius = 80;
	this.nextSphereID = sphereID;
	this.container = document.createElement('div');
	setStyle(this.container, {
		'width': this.width+'px',
		'height' : this.height+'px',
	})

	this.iconContainer = document.createElement('div');
	setStyle(this.iconContainer, {
		'position' : 'absolute',
		'border-radius' : this.radius + 'px',
		'width' : this.radius + 'px',
		'height' : this.radius + 'px',
		'left' : this.width/2 - this.radius/2 + 'px',
		'font-family' : 'Open Sans Condensed',
		'font-size' : '1.1em',
		'text-align' : 'center',
		'color' : 'black',
		'padding' : '5px',
		'cursor' : 'pointer',
	})
	setTransition(this.iconContainer, 'border 0.3s');

	this.compassImg = new Image();
	this.compassImg.src = 'res/compass.png';

	setStyle(this.compassImg, {
		'width' : '100%',
	})

	this.iconContainer.appendChild(this.compassImg);


	this.highlightText = document.createElement('div');
	this.highlightText.innerHTML = this.title;
	setStyle(this.highlightText, {
		'position' : 'absolute',
		'top' : this.radius+'px',
		'left' : this.width/2+'px',
		'text-align' : 'center',
		'width' : this.width+'px',
		'font-family' : 'Lato',
		'color' : 'white',
	});
	setTransform(this.highlightText, 'translateX(-50%)');
	this.container.appendChild(this.iconContainer);
	this.container.appendChild(this.highlightText);
	this.container.addEventListener('mouseover', this, false);
	this.container.addEventListener('click', this, false);
	this.container.addEventListener('mouseleave', this, false);

}

TransitNode.prototype.handleEvent = function(e) {
	var that = this;
	if(e.type == 'mouseover') {
		setStyle(this.iconContainer, {
			'border' : '2px solid yellow',
		})
	}
	if(e.type == 'mouseleave') {
		setStyle(this.iconContainer, {
			'border' : '',
		})
	}
	if(e.type == 'click') {
		setStyle(this.iconContainer, {
			'border' : '2px solid black',
			'background-color' : 'yellow',
			'color' : 'white',
		})
		setTimeout(function() {
			that.parent.requestNodeTransition(that.nextSphereID);
		}, 300);
	}
}



function PerspectiveManager(route, currentSphere) {
	this.route = route;
	this.constructFromSphere(currentSphere);
}

PerspectiveManager.prototype.constructFromSphere = function(sphere) {
	var that = this;
	if(this.perspective == null) {
		this.perspective = new Perspective(sphere['panoid'], sphere['heading'], sphere['pitch']);
		document.body.appendChild(this.perspective.container);
	} else {
		this.perspective.photoSphere.setPano(sphere['panoid']);
		this.perspective.photoSphere.setPov({heading:sphere['heading'],pitch:sphere['pitch']});
	}
	this.perspective.setAmbientSound(sphere['bgm']);
	for(var i = 0; i < sphere['info'].length; ++i) {
		var curInfo = sphere['info'][i];
		var info = new Information(this.perspective, curInfo.heading, curInfo.pitch);
		if(curInfo.type == 'person_comment') {
			info.setContent(new PersonCommentContent(curInfo.thumbnail, curInfo.header_photo, curInfo.comment));
		} else if (curInfo.type == 'video') {
			info.setContent(new VideoContent(curInfo.video_uri));
		} else if (curInfo.type == 'article') {
			info.setContent(new ArticleContent(curInfo.img, curInfo.title, curInfo.body));
		} else if (curInfo.type == 'transit') {
			info.setContent(new TransitNode(curInfo.sphere_id, this.route[curInfo.sphere_id]['title'], this));
		}
		this.perspective.addInfo(info);
	}

	this.perspective.setTitle(sphere['title']);
	this.perspectiveLoop = setInterval(function() {
		that.perspective.update();
		that.perspective.photoSphere.setVisible(true);
	}, 1000/60);
}

PerspectiveManager.prototype.replaceWithOtherSphere = function(sphere) {
	if(this.perspective != null) {
		this.perspective.resetState();
		clearInterval(this.perspectiveLoop);
	}
	this.constructFromSphere(sphere);
}

PerspectiveManager.prototype.requestNodeTransition = function(sphereID) {
	var that = this;
	if(this.route[sphereID] != null) {
		this.playLoadingEffect();
		setTimeout(function(){
			that.replaceWithOtherSphere(this.route[sphereID]);
			that.perspective.command = {};
			setFilter(that.perspective.googleMap, '');
		}, 300);
	}
}

PerspectiveManager.prototype.playLoadingEffect = function() {
	var loadingScreen = document.getElementById('loading-filter');
	setStyle(loadingScreen, {
		'z-index' : '4',
	});
	setTimeout(function() {
		setStyle(loadingScreen, {
			'opacity': '1',
		});
	}, 50);
		
	setTimeout(function() {
		setStyle(loadingScreen, {
			'opacity': '0',
		})
		setTimeout(function(){
			setStyle(loadingScreen, {
				'z-index' : '0',
			});
		}, 300);
	},1800);
}


