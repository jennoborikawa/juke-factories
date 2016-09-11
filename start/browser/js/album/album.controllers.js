/* global juke */
'use strict';

juke.controller('AlbumCtrl', function ($scope, $http, $rootScope, $log, StatsFactory, AlbumFactory) {
  AlbumFactory.fetchAll()
    .then(function(albums){
      $scope.albums = albums 
      // console.log($scope.albums);
    })
  .catch($log.error); // $log service can be turned on and off; also, pre-bound

  AlbumFactory.fetchById(1)
    .then(function(album){
      $scope.album = album.data; 
      console.log(album); 
    })
    .catch($log.error)


  // main toggle
  $scope.toggle = function (song) {
    if ($scope.playing && song === $scope.currentSong) {
      $rootScope.$broadcast('pause');
    } else {
      $rootScope.$broadcast('play', song);
    }
  };

  // incoming events (from Player, toggle, or skip)
  $scope.$on('pause', pause);
  $scope.$on('play', play);
  $scope.$on('next', next);
  $scope.$on('prev', prev);

  // functionality
  function pause () {
    $scope.playing = false;
  }
  function play (event, song) {
    $scope.playing = true;
    $scope.currentSong = song;
  }

  // a "true" modulo that wraps negative to the top of the range
  function mod (num, m) { return ((num % m) + m) % m; }

  // jump `interval` spots in album (negative to go back, default +1)
  function skip (interval) {
    if (!$scope.currentSong) return;
    var index = $scope.currentSong.albumIndex;
    index = mod( (index + (interval || 1)), $scope.album.songs.length );
    $scope.currentSong = $scope.album.songs[index];
    if ($scope.playing) $rootScope.$broadcast('play', $scope.currentSong);
  }
  function next () { skip(1); }
  function prev () { skip(-1); }

});


juke.controller('AlbumsCtrl', function ($scope, $http, $rootScope, $log, StatsFactory, AlbumFactory) {
  AlbumFactory.fetchAll()
    .then(function(albums){
      albums.map(function(album){
        return album.imageUrl = '/api/albums/' + album.id + '/image'
      })
      console.log(albums);
      return $scope.albums = albums; 
    })
})





