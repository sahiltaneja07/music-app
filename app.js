angular.module('musicApp', [
        'ui.router',
        'ngStorage',
        'servicesModule',
        'musicSearchModule',
        'artistModule'
    ])
    .config(musicAppConfig);

musicAppConfig.$inject = ['$urlRouterProvider'];

function musicAppConfig($urlRouterProvider) {
    $urlRouterProvider.otherwise("/music-search");
}