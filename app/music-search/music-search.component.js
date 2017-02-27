(function() {
    angular
        .module('musicSearchModule')
        .component('musicSearch', musicSearch());

    function musicSearch() {
        return {
            templateUrl: 'app/music-search/music-search.component.html',
            controller: musicSearchCtrl,
            controllerAs: 'musicSearch'
        };
    }

    musicSearchCtrl.$inject = ['$state', 'musicSearchService'];

    function musicSearchCtrl($state, musicSearchService) {
        var vm = this;
        
        vm.viewMoreUrl = '';
        vm.viewMoreBtnClicked = false;
        vm.artistList = [];
        vm.albumList = [];
        vm.searchMusic = searchMusic;
        vm.viewMoreMusic = viewMoreMusic;
        vm.goToArtistDetail = goToArtistDetail;

        function searchMusic(offset, limit){
            if(isQueryLengthMoreThanTwo(vm.query) || vm.viewMoreBtnClicked){
                if(!vm.viewMoreBtnClicked){
                    resetMusicResult();
                }
                vm.viewMoreBtnClicked = false;
                musicSearchService.getMusic(vm.query, offset, limit)
                    .then(populateMusicList);
            }
        }

        function isQueryLengthMoreThanTwo(query){
            if(query.length > 2){
                return true;
            }
            return false;
        }

        function populateMusicList(music){
            // console.log(music);
            if(isStatusOK(music)){
                vm.artistList = vm.artistList.concat(music.data.artists.items);
                vm.albumList = vm.albumList.concat(music.data.albums.items);
                if(music.data.albums.items.length >= music.data.artists.items.length && music.data.albums.next){
                    vm.viewMoreUrl = music.data.albums.next;
                }
                else if(music.data.artists.items.length > music.data.albums.items.length && music.data.artists.next){
                    vm.viewMoreUrl = music.data.artists.next;
                }
                else{
                    vm.hideViewMoreBtn = true;
                }
            }
        }

        function isStatusOK(result){
            if(result.status === 200){
                return true;
            }
            return false;
        }

        function viewMoreMusic(){
            vm.viewMoreBtnClicked = true;
            var offsetAndLimit = getOffsetAndLimitValues(vm.viewMoreUrl);
            searchMusic(offsetAndLimit.offset, offsetAndLimit.limit);
        }

        function getOffsetAndLimitValues(str){
            var newStr = str.split('?');
            newStr = newStr[1].split('&');
            var offset = newStr[2].split('=')[1];
            var limit = newStr[3].split('=')[1];
            return {
                offset: offset,
                limit: limit
            }
        }

        function goToArtistDetail(artist){
            $state.go('artist', {artistId: artist.id, artistName: artist.name});
        }

        function resetMusicResult(){
            vm.viewMoreUrl = '';
            vm.viewMoreBtnClicked = false;
            vm.artistList = [];
            vm.albumList = [];
            vm.hideViewMoreBtn = false;
        }

    }

})();
