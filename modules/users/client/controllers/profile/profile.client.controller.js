(function () {
  'use strict';

  angular
    .module('users')
    .controller('ProfileController', ProfileController);

  ProfileController.$inject = ['$scope', 'Authentication', '$location', '$stateParams', 'UsersService'];

  function ProfileController($scope, Authentication, $location, $stateParams, UsersService) {
    var vm = this;
    var user = Authentication.user;
    function cb (user) {
      vm.user = user;
    }
    if (!user){
      $location.path('/signin');
    } else if (user.username == $stateParams.user) {
      vm.authentication = Authentication;
      vm.user = user;
    } else if ($stateParams.user === '') {
     // $location.path('/' + user.username);
      vm.user = user;
    } else {
      UsersService.getUser($stateParams.user).then(cb);
    }
  }
}());
