(function () {
  'use strict';

  angular
    .module('users')
    .controller('AuthenticationController', AuthenticationController);

  AuthenticationController.$inject = ['$scope', '$state', 'UsersService', '$location', '$window', 'Authentication', 'PasswordValidator', 'Notification'];

  function AuthenticationController($scope, $state, UsersService, $location, $window, Authentication, PasswordValidator, Notification) {
    var vm = this;

    vm.authentication = Authentication;
    vm.getPopoverMsg = PasswordValidator.getPopoverMsg;
    vm.signup = signup;
    vm.signin = signin;
    vm.callOauthProvider = callOauthProvider;
    vm.usernameRegex = /^(?=[\w.-]+$)(?!.*[._-]{2})(?!\.)(?!.*\.$).{3,34}$/;

    if ($location.search().err) {
      Notification.error({ message: $location.search().err });
    }
    if (vm.authentication.user) {
      $location.path('/home');
    }

    function signup(isValid) {

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.userForm');

        return false;
      }

      function ID() {
        return '_' + Math.random().toString(36).substr(2, 9);
      };

      vm.credentials.firstName = vm.credentials.firstName ? vm.credentials.firstName : vm.credentials.email;
      vm.credentials.lastName = vm.credentials.lastName ? vm.credentials.lastName : vm.credentials.email;
      vm.credentials.username = vm.credentials.username ? vm.credentials.username : ID();

      UsersService.userSignup(vm.credentials)
        .then(onUserSignupSuccess)
        .catch(onUserSignupError);
    }

    function signin(isValid) {

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.userForm');

        return false;
      }

      UsersService.userSignin(vm.credentials)
        .then(onUserSigninSuccess)
        .catch(onUserSigninError);
    }

    function callOauthProvider(url) {
      if ($state.previous && $state.previous.href) {
        url += '?redirect_to=' + encodeURIComponent($state.previous.href);
      }

      $window.location.href = url;
    }


    function onUserSignupSuccess(response) {
      vm.authentication.user = response;
      Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Регистрация выполнена!' });
      $state.go($state.previous.state.name || 'home', $state.previous.params);
    }

    function onUserSignupError(response) {
      Notification.error({ message: response.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Ошибка регистрац!', delay: 6000 });
    }

    function onUserSigninSuccess(response) {
      vm.authentication.user = response;
      Notification.info({ message: 'Добро пожаловать ' + response.firstName });
        $location.path('/home');
      }

    function onUserSigninError(response) {
      try {
        Notification.error({
          message: response.data.message,
          title: '<i class="glyphicon glyphicon-remove"></i> Ошибка регистрац!',
          delay: 6000
        });
      } catch(e) { }
    }
  }
}());
