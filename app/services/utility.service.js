(function() {

    angular
        .module('servicesModule')
        .factory('utility', utility);

    utility.$inject = ['$q', '$http'];

    function utility($q, $http) {

        var API_URL = 'http://api.spotify.com/v1';

        var factory = {
            getPromise: getPromise,
            postPromise: postPromise,
            putPromise: putPromise,
            deletePromise: deletePromise
        };

        return factory;

        function getPromise(requestString) {
            var defer = $q.defer();
            $http.get(API_URL + requestString)
                .then(function successCallback(response) {
                    defer.resolve(response);
                }, function errorCallback(error) {
                    console.log(error);
                    defer.reject(error);
                });
            return defer.promise;
        }

        function postPromise(requestString, requestBody) {
            var defer = $q.defer();
            $http.post(API_URL + requestString, requestBody)
                .then(function successCallback(response) {
                    defer.resolve(response);
                }, function errorCallback(error) {
                    console.log(error);
                    defer.reject(error);
                });
            return defer.promise;
        }

        function putPromise(requestString, requestBody) {
            var defer = $q.defer();
            $http.put(API_URL + requestString, requestBody)
                .then(function successCallback(response) {
                    defer.resolve(response);
                }, function errorCallback(error) {
                    console.log(error);
                    defer.reject(error);
                });
            return defer.promise;
        }

        function deletePromise(requestString, requestBody) {
            var defer = $q.defer();
            $http.delete(API_URL + requestString, requestBody)
                .then(function successCallback(response) {
                    defer.resolve(response);
                }, function errorCallback(error) {
                    console.log(error);
                    defer.reject(error);
                });
            return defer.promise;
        }

    }

})();