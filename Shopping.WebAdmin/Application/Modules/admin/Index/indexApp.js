angular.module('admin.IndexApp', []).config(routeConfig);

/** @ngInject */
function routeConfig($stateProvider, $urlRouterProvider) {
   

    $stateProvider
        .state('dashboard',
        {
            url: '/dashboard',
            templateUrl: "Application/Modules/admin/Index/Partial/index.html",
            controller: "admin.indexController as self",
            resolve: {
                loadCtrl: [
                    "$ocLazyLoad", function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: "admin.IndexApp",
                            files: [
                                "Application/Modules/admin/Index/Controller/IndexController.js",
                                "Application/Modules/admin/Index/Service/IndexService.js",
                                

                            ]
                        });
                    }
                ]
            },
            ncyBreadcrumb: {
                label: 'داشبورد',
                skip:true

            }
        });


   
}