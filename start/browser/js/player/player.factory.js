'use strict';

juke.factory('PlayerFactory', function($http){

	var audio = document.createElement('audio');
	var currentSong = null;
	var playing = false;
	var songList;
	var progress = 0;

	return {
		start: start,
		pause: pause,
		resume: resume,
		isPlaying: isPlaying,
		getCurrentSong: getCurrentSong,
		next: next,
		previous: previous,
		getProgress: getProgress
	}

	function start(song,listOfSongs){
		if (audio) {
			this.pause();
		}

		songList = listOfSongs;
		currentSong = song;
		audio.src = song.audioUrl;
		audio.load();
		audio.play();
		playing = true;
	};

	function pause(){
		playing = false;
		audio.pause();	

	};

	function resume(){
		playing = true;
		audio.play();
	};

	function isPlaying(){
		return playing;
	};

	function getCurrentSong(){
		return currentSong
	};

	function next(){
		var songIdx = songList.indexOf(this.getCurrentSong());
		if (songIdx === songList.length - 1){
			return this.start(songList[0],songList);
		}else{
			return this.start(songList[songIdx + 1],songList);
		}
	};

	function previous(){
		var songIdx = songList.indexOf(this.getCurrentSong());
		if (songIdx === 0){
			return this.start(songList[songList.length-1],songList);
		}else{
			return this.start(songList[songIdx - 1],songList);
		}
	};


	function getProgress(){

		return progress;
	}

});


	