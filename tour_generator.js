var googleStreetViewService = new google.maps.StreetViewService();
var googleMap = new google.maps.Map(document.createElement('div'), {});
var googlePlacesService = new google.maps.places.PlacesService(googleMap);
var bannedResults = {"virtual autoshow" : true, "M_YByOVTFpoAAAQZUTREIg" : true};
function tourGenerator(address, routeToBePopulated) {
	var geocoder = new google.maps.Geocoder();
	var ctr = 0;
	var panoResults = [];
	var articleArray = []; //10 articles
	var articleIterator = 0;
	function wikiCallback(res) {
		console.log(res);
		for (x in res) {
			articleArray.push(res[x]);
		}

		geocoder.geocode({'address':address}, function(results, status){
			var lat = results[0].geometry.location.lat();
			var lng = results[0].geometry.location.lng();
			var radius = 50;
			var latLng = new google.maps.LatLng(lat, lng);
			var nearByPlacesRequest = {
				'location' : latLng,
				'radius' : radius,
			};
			googlePlacesService.nearbySearch(nearByPlacesRequest, function(results, status) {
				for (var i = 0; i < results.length; ++i) {
					var curLatLng = new google.maps.LatLng(results[i].geometry.location.lat(), results[i].geometry.location.lng());
					googleStreetViewService.getPanoramaByLocation(curLatLng, radius, callback);
				}
			});
		});

	}

	var articles = getRelevantWikiTitles(address, wikiCallback);
	

	function queryCompletedCallback() {
		routeToBePopulated.initial_sphere = 0;
		var sphere = [];
		for(var i =0;i < 4; ++i) {
			sphere[i] = {
				panoid : panoResults[i].location.pano,
				heading : 0,
				pitch : 0,
				title : panoResults[i].location.description || address,
				info : [
					{
						type : 'transit',
						heading : Math.random() * 20,
						pitch : Math.random() * 10,
						sphere_id : (i+1) % 4,
					}
				],
			};
			for(var j=0;j<2;++j){
				sphere[i].info.push({
					type : 'article',
					heading : Math.random() * (j+1) * -30,
					pitch : Math.random() * 10,
					img : 'res/photos/bgimg.jpg',
					title : 'Information',
					body : articleArray[articleIterator++],
				});
			}
			routeToBePopulated[i] = sphere[i];
		}
		startPerspectiveTour();
	}
	function callback(result, status) {
		if(ctr == 4)return;
		if(bannedResults[result.location.description.trim()]) return;
		if(bannedResults[result.location.pano.trim()]) return;
		for(var j = 0; j < panoResults.length; ++j) {
			if(result.location.description == panoResults[j].location.description) return;
		}
		++ctr;
		panoResults.push(result);
		if(ctr == 4) queryCompletedCallback();
	}
	
}

