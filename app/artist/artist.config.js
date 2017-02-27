(function() {
    angular
        .module('artistModule')
        .config(artistConfig);

    artistConfig.$inject = ['$stateProvider'];

    function artistConfig($stateProvider) {
        $stateProvider.state('artist', {
            url: '/artist',
            templateUrl: 'app/artist/artist.config.html',
            controller: artistConfigCtrl,
            controllerAs: 'artistConfig',
            params: {
                artistId: undefined,
                artistName: undefined
            }
        });
    }

    artistConfigCtrl.$inject = ['$stateParams'];

    function artistConfigCtrl($stateParams) {
        var vm = this;

        vm.artistId = $stateParams.artistId;
        vm.artistName = $stateParams.artistName;
    }


})();
