angular.module('admin.ProvinceCityApp', []).config(routeConfig);


/** @ngInject */
function routeConfig($stateProvider) {


    $stateProvider
        .state('dashboard.provinceCity',
            {
                url: '',
                template: "<ui-view></ui-view>",
                abstract: true,
                permission: 12,
                menuItem: {
                    isUnique: false,
                    title: "استان و شهر",
                    target: "",
                  icon: "fa fa-map",
                  menus: [
                        {
                            title: "استان و شهر",
                            target: "dashboard.provinceCity.list",
                            url: "#!/dashboard/provinceCity/List"

                        }
                    ]

                }
            })
        .state('dashboard.provinceCity.list',
            {
                url: '/provinceCity/List',
                templateUrl: "Application/Modules/admin/ProvinceCity/Partial/provinceCity.list.html",
                controller: "admin.ProvinceCity.ListController as self",
                resolve: {
                    loadCtrl: [
                        "$ocLazyLoad", function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                    name: "admin.ProvinceCityApp",
                                    files: [
                                        "Application/Modules/admin/ProvinceCity/Controller/ProvinceCity.ListController.js",
                                        "Application/Modules/admin/ProvinceCity/Service/ProvinceCityService.js"
                                    ]
                                },
                                { cache: false });
                        }
                    ]
                },
                ncyBreadcrumb: {
                    label: 'استان و شهر',
                    parent: 'dashboard.home.home'
                }
            })
    
        .state('dashboard.provinceCity.ZoneList',
            {
                url: '/provinceCity/zoneList/:provinceId/:cityId',
                templateUrl: "Application/Modules/admin/ProvinceCity/Partial/provinceCity.zoneList.html",
                controller: "admin.ProvinceCity.ZoneListController as self",
                resolve: {
                    loadCtrl: [
                        "$ocLazyLoad", function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                    name: "admin.ProvinceCityApp",
                                    files: [
                                        "Application/Modules/admin/ProvinceCity/Controller/ProvinceCity.ZoneListController.js",
                                        "Application/Modules/admin/ProvinceCity/Service/ProvinceCityService.js"
                                    ]
                                },
                                { cache: false });
                        }
                    ]
                },
                ncyBreadcrumb: {
                    label: ' منطقه ',
                    parent: 'dashboard.provinceCity.list'
                }
            });
//        .state('dashboard.factor.details',
//                {
//                    url: '/factor/details/:id',
//                    templateUrl: "Application/Modules/admin/factor/Partial/factor.details.html",
//                    controller: "admin.Factor.DetailsController as self",
//                    resolve: {
//                        loadCtrl: [
//                            "$ocLazyLoad", function ($ocLazyLoad) {
//                                return $ocLazyLoad.load({
//                                    name: "admin.FactorApp",
//                                    files: [
//                                        "Application/Modules/admin/factor/Controller/Factor.DetailsController.js",
//                                        "Application/Modules/admin/factor/Service/FactorService.js"
//                                    ]
//                                },
//                                    { cache: false });
//                            }
//                        ]
//                    },
//                    ncyBreadcrumb: {
//                        label: 'مشخصات سفارش',
//                        parent: 'dashboard.factor.list'
//                    }
//                })
//        ;


}

