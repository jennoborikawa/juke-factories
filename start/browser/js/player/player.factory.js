'use strict';

juke.factory('PlayerFactory', function($http){

	var audio = document.createElement('audio');
	var currentSong;
	var playing = false;

	return {
		start: start,
		pause: pause,
		resume: resume,
		isPlaying: isPlaying
	}

	function start(song){
		if (audio) {
			this.pause();
		}

		audio.src = song.audioUrl;
		audio.load();
		audio.play();
		isPlaying(true)
	}

	function pause(word){
		if(!isPlaying(false));
		return audio.pause();
	}

	function resume(){
		if(!isPlaying(true));
		audio.play();
	}

	function isPlaying(status){
		if (!status){
			return playing;
		} 
		playing = status;
		return playing;
	}
});


	