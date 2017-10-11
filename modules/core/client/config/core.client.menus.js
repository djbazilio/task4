(function () {
  'use strict';

  angular
    .module('core')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenu('account', {
      roles: ['user']
    });

    menuService.addMenuItem('account', {
      title: '',
      state: 'user',
      type: 'dropdown',
      roles: ['user']
    });

    menuService.addSubMenuItem('account', 'user', {
      title: 'Мой профиль',
      state: 'user.profile',
      icon: '<h5>opa</h5>'
    });
    menuService.addSubMenuItem('account', 'user', {
      title: 'Поиск людей',
      state: 'user.users',
      icon: '<h5>opa</h5>'
    });
    menuService.addSubMenuItem('account', 'user', {
      title: 'Сообщения',
      state: 'user.messages.list'
    });

  }
}());
