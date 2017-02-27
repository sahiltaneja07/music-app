(function() {
    angular
        .module('artistModule')
        .component('artist', artist());

    function artist() {
        return {
            templateUrl: 'app/artist/artist.component.html',
            controller: artistCtrl,
            controllerAs: 'artist',
            bindings: {
            	artistId: '<',
            	artistName: '<'
            }
        };
    }

    artistCtrl.$inject = ['$scope', '$localStorage', 'musicSearchService'];

    function artistCtrl($scope, $localStorage, musicSearchService) {
        var vm = this;

        vm.viewMoreUrl = '';
        vm.albumList = [];
        vm.$onInit = onInit;
        vm.viewMoreAlbums = viewMoreAlbums;
        
        function onInit() {
            if(vm.artistId){
                setDataInLocalStorage();
            }
            else{
                vm.artistId = $localStorage.artist.id;
                vm.artistName = $localStorage.artist.name;
            }
            getAlbums(0, 20);
        };

        function setDataInLocalStorage(){
        	$localStorage.artist = {
        		id: vm.artistId,
        		name: vm.artistName
        	};
        }

        function getAlbums(offset, limit){
            musicSearchService.getAlbumsByArtist(vm.artistId, offset, limit)
                .then(populateAlbumList);
        }

        function populateAlbumList(album){
            // console.log(album);
            if(isStatusOK(album)){
	            vm.albumList = vm.albumList.concat(album.data.items);
	            if(album.data.next){
	                vm.viewMoreUrl = album.data.next;
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

        function viewMoreAlbums(){
            var offsetAndLimit = getOffsetAndLimitValues(vm.viewMoreUrl);
            getAlbums(offsetAndLimit.offset, offsetAndLimit.limit);
        }

        function getOffsetAndLimitValues(str){
            var newStr = str.split('?');
            newStr = newStr[1].split('&');
            var offset = newStr[0].split('=')[1];
            var limit = newStr[1].split('=')[1];
            return {
                offset: offset,
                limit: limit
            }
        }

    }

})();
