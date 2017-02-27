(function() {

    angular
        .module('servicesModule')
        .factory('musicSearchService', musicSearchService);

    musicSearchService.$inject = ['utility'];

    function musicSearchService(utility) {

        var MUSIC_SEARCH_URL = '/search';

        var factory = {
            getMusic: getMusic,
            getAlbumsByArtist: getAlbumsByArtist
        };

        return factory;

        function getMusic(query, offset, limit) {
            var queryString = MUSIC_SEARCH_URL + '?type=artist,album&q=' + query + '&offset=' + offset + '&limit=' + limit;
            return utility.getPromise(queryString);
        }

        function getAlbumsByArtist(artistId, offset, limit) {
            var queryString = '/artists/' + artistId + '/albums?offset=' + offset + '&limit=' + limit;
            return utility.getPromise(queryString);
        }

    }

})();
