(function () {
  'use strict';

  angular
    .module('users')
    .controller('MessageController', MessageController);

  MessageController.$inject = ['$scope', 'Authentication'];

  function MessageController($scope, Authentication, $location) {
    var vm = this;
   // vm.user = Authentication.user;
   // var user = Authentication.user
   // function cb(user){
   //   vm.user = user;
   // }
   // if(user.username == $stateParams.user){
   //     vm.authentication = Authentication;
   //     vm.accountMenu = menuService.getMenu('account').items[0];
   //   //vm.menu = menuService.getMenu('topbar');
   //     vm.user = user;
   // }else if($stateParams.user==''){
   //   $location.path('/'+user.username)
   //   vm.user = user;
   // }else{
   //   UsersService.getUser($stateParams.user)
   //     .then(cb)
   // }
   // $location.path('/'+vm.user.username);
  }
}());
