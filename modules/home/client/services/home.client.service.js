(function () {
    'use strict';

    // Users service used for communicating with the users REST endpoint
    angular
        .module('home.service')
        .factory('HomeService', HomeService);

    HomeService.$inject = ['$resource'];

    function HomeService($resource) {
        var Home = $resource('/api/home', {}, {
            GET: {
                method: 'GET',
                url: '/api/home/'
            }
        });

        angular.extend(Home, {
            get: function () {
                return this.GET().$promise;
            }
        });

        return Home;
    }
}());
