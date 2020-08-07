angular.module('admin.FactorApp', []).config(routeConfig);


/** @ngInject */
function routeConfig($stateProvider) {


    $stateProvider
        .state('dashboard.factor',
            {
                url: '',
                template: "<ui-view></ui-view>",
                abstract: true,
                permission: 6,
                menuItem: {
                    isUnique: false,
                    title: "فاکتور ها",
                    target: "",
                    icon: "fa fa-file-text",
                    menus: [
                        {
                            title: "فاکتورها",
                            target: "dashboard.factor.list",
                            url: "#!/dashboard/factor/List"

                        }
                    ]

                }
            })
        .state('dashboard.factor.list',
            {
                url: '/factor/List',
                templateUrl: "Application/Modules/admin/Factor/Partial/factor.list.html",
                controller: "admin.Factor.ListController as self",
                resolve: {
                    loadCtrl: [
                        "$ocLazyLoad", function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: "admin.FactorApp",
                                files: [
                                    "Application/Modules/admin/Factor/Controller/Factor.ListController.js",
                                    "Application/Modules/admin/Factor/Service/FactorService.js"
                                ]
                            },
                                { cache: false });
                        }
                    ]
                },
                ncyBreadcrumb: {
                    label: 'فاکتورها',
                    parent: 'dashboard.home.home'
                }
            }).state('dashboard.factor.details',
                {
                    url: '/factor/details/:id',
                    templateUrl: "Application/Modules/admin/factor/Partial/factor.details.html",
                    controller: "admin.Factor.DetailsController as self",
                    resolve: {
                        loadCtrl: [
                            "$ocLazyLoad", function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    name: "admin.FactorApp",
                                    files: [
                                        "Application/Modules/admin/factor/Controller/Factor.DetailsController.js",
                                        "Application/Modules/admin/factor/Service/FactorService.js"
                                    ]
                                },
                                    { cache: false });
                            }
                        ]
                    },
                    ncyBreadcrumb: {
                        label: 'مشخصات سفارش',
                        parent: 'dashboard.factor.list'
                    }
                })
        ;


}

