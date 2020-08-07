angular.module('admin.suggestionProductApp', []).config(routeConfig);


/** @ngInject */
function routeConfig($stateProvider) {


    $stateProvider
        .state('dashboard.suggestionProduct',
            {
                url: '',
                template: "<ui-view></ui-view>",
                abstract: true,
                permission: 16,
                menuItem: {
                    isUnique: false,
                    title: "‍‍محصولات پیشنهادی",
                    target: "",
                    icon: "fa fa-cubes",
                    menus: [
                        {
                            title: "فروشگاه",
                            target: "dashboard.suggestionProduct.shopList",
                            url: "#!/dashboard/suggestionProduct/shop/List"

                        }, {
                            title: "مشتری",
                            target: "dashboard.suggestionProduct.customerList",
                            url: "#!/dashboard/suggestionProduct/customer/List"

                        }
                    ]

                }
            })
        .state('dashboard.suggestionProduct.shopList',
            {
                url: '/suggestionProduct/shop/List',
                templateUrl: "Application/Modules/admin/suggestionProduct/Partial/suggestionProduct.shop.list.html",
                controller: "admin.SuggestionProduct.Shop.listController as self",
                resolve: {
                    loadCtrl: [
                        "$ocLazyLoad", function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: "admin.suggestionProductApp",
                                files: [
                                    "Application/Modules/admin/suggestionProduct/Controller/suggestionProduct.shop.listController.js",
                                    "Application/Modules/admin/suggestionProduct/Service/suggestionProductService.js"
                                ]
                            },
                                { cache: false });
                        }
                    ]
                },
                ncyBreadcrumb: {
                    label: 'محصولات پیشنهادی فروشگاه',
                    parent: 'dashboard.home.home'
                }
            })
        .state('dashboard.suggestionProduct.customerList',
            {
                url: '/suggestionProduct/customer/List',
                templateUrl: "Application/Modules/admin/suggestionProduct/Partial/suggestionProduct.customer.list.html",
                controller: "admin.SuggestionProduct.Customer.listController as self",
                resolve: {
                    loadCtrl: [
                        "$ocLazyLoad", function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: "admin.suggestionProductApp",
                                files: [
                                    "Application/Modules/admin/suggestionProduct/Controller/suggestionProduct.customer.listController.js",
                                    "Application/Modules/admin/suggestionProduct/Service/suggestionProductService.js"
                                ]
                            },
                                { cache: false });
                        }
                    ]
                },
                ncyBreadcrumb: {
                    label: 'محصولات پیشنهادی مشتری',
                    parent: 'dashboard.home.home'
                }
        }) .state('dashboard.suggestionProduct.details',
            {
                url: '/suggestionProduct/details/:id/:type',
                templateUrl: "Application/Modules/admin/suggestionProduct/Partial/suggestionProduct.details.html",
                controller: "admin.SuggestionProduct.DetailsController as self",
                resolve: {
                    loadCtrl: [
                        "$ocLazyLoad", function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: "admin.suggestionProductApp",
                                files: [
                                    "Application/Modules/admin/suggestionProduct/Controller/suggestionProduct.DetailsController.js",
                                    "Application/Modules/admin/suggestionProduct/Service/suggestionProductService.js"
                                ]
                            },
                                { cache: false });
                        }
                    ]
                },
                ncyBreadcrumb: {
                    label: 'جزئیات محصولات پیشنهادی',
                    parent: 'dashboard.suggestionProduct.customerList'
                }
        })
       

}

