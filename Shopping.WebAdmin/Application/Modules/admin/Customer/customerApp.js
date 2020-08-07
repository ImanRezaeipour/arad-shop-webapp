angular.module('admin.CustomerApp', []).config(routeConfig);


/** @ngInject */
function routeConfig($stateProvider) {


    $stateProvider
        .state('dashboard.customer',
            {
                url: '',
                template: "<ui-view></ui-view>",
                abstract: true,
                permission : 4,
                menuItem: {
                    isUnique: false,
                    title: "مشتری ها",
                    target: "",
                    icon: "fa fa-group",
                    menus: [
                        {
                            title: "لیست مشتری ها",
                            target: "dashboard.customer.list",
                            url: "#!/dashboard/customer/List"

                        }
                    ]

                }
            })
        .state('dashboard.customer.list',
            {
                url: '/customer/List',
                templateUrl: "Application/Modules/admin/Customer/Partial/customer.list.html",
                controller: "admin.CustomerListController as self",
                resolve: {
                    loadCtrl: [
                        "$ocLazyLoad", function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: "admin.CustomerApp",
                                files: [
                                    "Application/Modules/admin/Customer/Controller/Customer.listController.js",
                                    "Application/Modules/admin/Customer/Service/CustomerService.js"
                                ]
                            },
                                { cache: false });
                        }
                    ]
                },
                ncyBreadcrumb: {
                    label: '  مشتری ها',
                    parent: 'dashboard.home.home'
                }
            })
        .state('dashboard.customer.view',
            {
                url: '/customer/view/:id',
                templateUrl: "Application/Modules/admin/Customer/Partial/customer.view.html",
                controller: "admin.CustomerViewController as self",
                resolve: {
                    loadCtrl: [
                        "$ocLazyLoad", function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: "admin.CustomerApp",
                                files: [
                                    "Application/Modules/admin/Customer/Controller/Customer.viewController.js",
                                    "Application/Modules/admin/Customer/Service/CustomerService.js"
                                ]
                            },
                                { cache: false });
                        }
                    ]
                },
                ncyBreadcrumb: {
                    label: 'جزئیات مشتری',
                    parent: 'dashboard.customer.list'
                }
            }).state('dashboard.customer.edit',
            {
                url: '/customer/edit/:id',
                templateUrl: "Application/Modules/admin/Customer/Partial/customer.edit.html",
                controller: "admin.CustomerEditController as self",
                resolve: {
                    loadCtrl: [
                        "$ocLazyLoad", function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: "admin.CustomerApp",
                                files: [
                                    "Application/Modules/admin/Customer/Controller/Customer.EditController.js",
                                    "Application/Modules/admin/Customer/Service/CustomerService.js"
                                ]
                            },
                                { cache: false });
                        }
                    ]
                },
                ncyBreadcrumb: {
                    label: 'ویرایش مشتری',
                    parent: 'dashboard.customer.list'
                }
            }).state('dashboard.customer.order',
                {
                    url: '/customer/order/:id',
                    templateUrl: "Application/Modules/admin/Customer/Partial/customer.order.html",
                    controller: "admin.Customer.OrderController as self",
                    resolve: {
                        loadCtrl: [
                            "$ocLazyLoad", function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    name: "admin.CustomerApp",
                                    files: [
                                        "Application/Modules/admin/Customer/Controller/Customer.OrderController.js",
                                        "Application/Modules/admin/Customer/Service/CustomerService.js"
                                    ]
                                },
                                    { cache: false });
                            }
                        ]
                    },
                    ncyBreadcrumb: {
                        label: 'جزئیات سفارشات مشتری',
                        parent: 'dashboard.customer.list'
                    }
                })
        .state('dashboard.customer.factorList',
            {
                url: '/customer/factorList/:id',
                templateUrl: "Application/Modules/admin/Customer/Partial/customer.factorList.html",
                controller: "admin.Customer.FactorListController as self",
                resolve: {
                    loadCtrl: [
                        "$ocLazyLoad", function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: "admin.CustomerApp",
                                files: [
                                    "Application/Modules/admin/Customer/Controller/Customer.FactorListController.js",
                                    "Application/Modules/admin/Customer/Service/CustomerService.js"
                                ]
                            },
                                { cache: false });
                        }
                    ]
                },
                ncyBreadcrumb: {
                    label: 'لیست فاکتورهای مشتری',
                    parent: 'dashboard.customer.list'
                }
            });


}

