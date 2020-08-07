angular.module('LoadApp', []).config(routeConfig);

/** @ngInject */
function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('load',
            {
                url: '',
                template: "<ui-view></ui-view>",
                abstract: "",
                menuItem: {
                    isUnique: true,
                    title: "load",
                    target: "load.load",
                    icon: "icon-speedometer",
                    menus: []
                }
            })
        .state('load.load',
            {
                url: '/load',
                templateUrl: "Application/Modules/Load/Partial/load.html",
                controller: "LoadController as self",
                resolve: {
                    loadCtrl: [
                        "$ocLazyLoad", function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: "LoadApp",
                                files: [
                                    "Application/Modules/Load/controller/LoadController.js",
                                    "Application/Modules/Load/Service/LoadService.js"

                                ]
                            }, { cache: false });
                        }
                    ]
                },
                ncyBreadcrumb: {
                    label: ' '
                }
            });



}