(function () {
  'use strict';

  angular
    .module('home.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: '/modules/home/client/views/home.view.html',
        controller: 'HomeController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Home'
        }
      })
  }

  getArticle.$inject = ['$stateParams', 'HomeService'];

  function getArticle($stateParams, HomeService) {
    //return ArticlesService.get({
    //  articleId: $stateParams.articleId
    //}).$promise;
  }
}());
