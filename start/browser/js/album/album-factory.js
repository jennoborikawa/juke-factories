juke.factory('AlbumFactory', function ($http, $log){
	
	return {
		fetchAll: fetchAll, 
		fetchById: fetchById
	}; 

	function fetchAll (){
		return $http.get('/api/albums/')
		  .then(function (res) { return res.data; })
		  .then(function (albums) {
		  	return albums; 
		  //   return $http.get('/api/albums/' + albums[0].id); // temp: get one
		  // })
		  // .then(function (res) { return res.data; })
		  // .then(function (album) {
		  //   album.imageUrl = '/api/albums/' + album.id + '/image';
		  //   album.songs.forEach(function (song, i) {
		  //     song.audioUrl = '/api/songs/' + song.id + '/audio';
		  //     song.albumIndex = i;
		  //   });
		  //   return album; 
		})
	}

	function fetchById(albumId){
		return $http.get('/api/albums/' + albumId)
			.then (function(album){
				album.data.imageUrl = '/api/albums/' + album.data.id + '/image'; 
				// console.log(album.data.id); 
				// console.log(album.imageUrl); 
				return album;
			})
	}


})