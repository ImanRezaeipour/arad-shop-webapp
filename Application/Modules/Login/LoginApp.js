angular.module('LoginApp', []).config(routeConfig);

/** @ngInject */
function routeConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/login");
    $stateProvider
        .state('login',
            {
                url: '',
                template: "<ui-view></ui-view>",
                abstract: true,
                target: "login.login",
                menu: {
                    order: 2,
                    title: "خروج",
                    icon: "fa-power-off",
                    subMenu: []
                }
            })
        .state('login.login',
            {
                url: '/login',
                templateUrl: "Application/Modules/Login/Partial/login.html",
                controller: "LoginController as self",
                resolve: {
                    loadCtrl: [
                        "$ocLazyLoad", function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                    name: "LoginApp",
                                    files: [
                                        "Application/Modules/Login/Controller/LoginController.js",
                                        "Application/Modules/Login/Service/LoginService.js"
                                       
                                    ]
                                },
                                { cache: false });
                        }
                    ]
                }
            });


}