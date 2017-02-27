(function() {
    angular
        .module('musicSearchModule')
        .config(musicSearchConfig);

    musicSearchConfig.$inject = ['$stateProvider'];

    function musicSearchConfig($stateProvider) {
        $stateProvider.state('musicSearch', {
            url: '/music-search',
            templateUrl: 'app/music-search/music-search.config.html',
            controller: musicSearchConfigCtrl,
            controllerAs: 'musicConfig'
        });
    }

    musicSearchConfigCtrl.$inject = [];

    function musicSearchConfigCtrl() {
        var vm = this;
    }


})();
