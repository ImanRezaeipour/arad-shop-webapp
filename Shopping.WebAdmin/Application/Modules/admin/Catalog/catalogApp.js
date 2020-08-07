angular.module('admin.CatalogApp', []).config(routeConfig);


/** @ngInject */
function routeConfig($stateProvider) {


    $stateProvider
        .state('dashboard.catalog',
            {
                url: '',
                template: "<ui-view></ui-view>",
                abstract: true,
                permission : 2,
                menuItem: {
                    isUnique: false,
                    title: "کاتالوگ",
                    target: "",
                    icon: "icon-list",
                    menus: [
                        {
                            title: "دسته بندی",
                            target: "dashboard.catalog.categoriesList",
                            url:"#!/dashboard/categories/List"

                        }, {
                            title: "برندها",
                            target: "dashboard.catalog.brandList",
                            url:"#!/dashboard/brand/List"

                        },
                        {
                            title: " محصولات ",
                            target: "dashboard.catalog.productsList",
                            url:"#!/dashboard/products/List"

                        }
                    ]

                }
            })
        .state('dashboard.catalog.categoriesList',
            {
                url: '/categories/List',
                templateUrl: "Application/Modules/admin/Catalog/Partial/catalog.categoriesList.html",
                controller: "admin.CatalogCategoriesListController as self",
                resolve: {
                    loadCtrl: [
                        "$ocLazyLoad", function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: "admin.CatalogApp",
                                files: [
                                    "Application/Modules/admin/Catalog/Controller/Catalog.categoriesListController.js",
                                    "Application/Modules/admin/Catalog/Service/CatalogService.js"
                                ]
                            },
                                { cache: false });
                        }
                    ]
                },
                ncyBreadcrumb: {
                    label: '  دسته بندی',
                    parent: 'dashboard.home.home'
                }
            }).state('dashboard.catalog.categoriesAdd',
            {
                url: '/categories/Add/:id',
                templateUrl: "Application/Modules/admin/Catalog/Partial/catalog.categoriesAdd.html",
                controller: "admin.Catalog.categoriesAddController as self",
                resolve: {
                    loadCtrl: [
                        "$ocLazyLoad", function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: "admin.CatalogApp",
                                files: [
                                    "Application/Modules/admin/Catalog/Controller/Catalog.categoriesAddController.js",
                                    "Application/Modules/admin/Catalog/Service/CatalogService.js"
                                ]
                            },
                                { cache: false });
                        }
                    ]
                },
                ncyBreadcrumb: {
                    label: ' افزودن دسته بندی',
                    parent: 'dashboard.catalog.categoriesList'
                }
            }).state('dashboard.catalog.categoriesEdit',
            {
                url: '/categories/Edit/:id',
                templateUrl: "Application/Modules/admin/Catalog/Partial/catalog.categoriesEdit.html",
                controller: "admin.Catalog.categoriesEditController as self",
                resolve: {
                    loadCtrl: [
                        "$ocLazyLoad", function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: "admin.CatalogApp",
                                files: [
                                    "Application/Modules/admin/Catalog/Controller/Catalog.categoriesEditController.js",
                                    "Application/Modules/admin/Catalog/Service/CatalogService.js"
                                ]
                            },
                                { cache: false });
                        }
                    ]
                },
                ncyBreadcrumb: {
                    label: ' ویرایش دسته بندی',
                    parent: 'dashboard.catalog.categoriesList'
                }
            })
        .state('dashboard.catalog.brandList',
            {
                url: '/brand/List',
                templateUrl: "Application/Modules/admin/Catalog/Partial/catalog.brandList.html",
                controller: "admin.Catalog.BrandListController as self",
                resolve: {
                    loadCtrl: [
                        "$ocLazyLoad", function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: "admin.CatalogApp",
                                files: [
                                    "Application/Modules/admin/Catalog/Controller/Catalog.brandListController.js",
                                    "Application/Modules/admin/Catalog/Service/CatalogService.js"
                                ]
                            },
                                { cache: false });
                        }
                    ]
                },
                ncyBreadcrumb: {
                    label: ' برندها',
                    parent: 'dashboard.home.home'
                }
            }).state('dashboard.catalog.brandAdd',
                {
                    url: '/brand/add',
                    templateUrl: "Application/Modules/admin/Catalog/Partial/catalog.brandAdd.html",
                    controller: "admin.Catalog.brandAddController as self",
                    resolve: {
                        loadCtrl: [
                            "$ocLazyLoad", function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    name: "admin.CatalogApp",
                                    files: [
                                        "Application/Modules/admin/Catalog/Controller/Catalog.brandAddController.js",
                                        "Application/Modules/admin/Catalog/Service/CatalogService.js"
                                    ]
                                },
                                    { cache: false });
                            }
                        ]
                    },
                    ncyBreadcrumb: {
                        label: 'افزودن برند',
                        parent: 'dashboard.catalog.brandList'
                    }
                }).state('dashboard.catalog.brandEdit',
                {
                    url: '/brand/add/:id',
                    templateUrl: "Application/Modules/admin/Catalog/Partial/catalog.brandEdit.html",
                    controller: "admin.Catalog.brandEditController as self",
                    resolve: {
                        loadCtrl: [
                            "$ocLazyLoad", function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    name: "admin.CatalogApp",
                                    files: [
                                        "Application/Modules/admin/Catalog/Controller/Catalog.brandEditController.js",
                                        "Application/Modules/admin/Catalog/Service/CatalogService.js"
                                    ]
                                },
                                    { cache: false });
                            }
                        ]
                    },
                    ncyBreadcrumb: {
                        label: 'افزودن برند',
                        parent: 'dashboard.catalog.brandList'
                    }
                })
        .state('dashboard.catalog.productsList',
            {
                url: '/products/List',
                templateUrl: "Application/Modules/admin/Catalog/Partial/catalog.productsList.html",
                controller: "admin.CatalogProductsListController as self",
                resolve: {
                    loadCtrl: [
                        "$ocLazyLoad", function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: "admin.CatalogApp",
                                files: [
                                    "Application/Modules/admin/Catalog/Controller/Catalog.productsListController.js",
                                    "Application/Modules/admin/Catalog/Service/CatalogService.js"
                                ]
                            },
                                { cache: false });
                        }
                    ]
                },
                ncyBreadcrumb: {
                    label: ' محصولات',
                    parent: 'dashboard.home.home'
                }
        }).state('dashboard.catalog.productsAdd',
            {
                url: '/products/Add',
                templateUrl: "Application/Modules/admin/Catalog/Partial/catalog.productsAdd.html",
                controller: "admin.Catalog.productsAddController as self",
                resolve: {
                    loadCtrl: [
                        "$ocLazyLoad", function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: "admin.CatalogApp",
                                files: [
                                    "Application/Modules/admin/Catalog/Controller/Catalog.productsAddController.js",
                                    "Application/Modules/admin/Catalog/Service/CatalogService.js"
                                ]
                            },
                                { cache: false });
                        }
                    ]
                },
                ncyBreadcrumb: {
                    label: ' افزودن محصول',
                    parent: 'dashboard.catalog.productsList'
                }
        })
        .state('dashboard.catalog.productsEdit',
            {
                url: '/products/Edit/:id',
                templateUrl: "Application/Modules/admin/Catalog/Partial/catalog.productsEdit.html",
                controller: "admin.Catalog.productsEditController as self",
                resolve: {
                    loadCtrl: [
                        "$ocLazyLoad", function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: "admin.CatalogApp",
                                files: [
                                    "Application/Modules/admin/Catalog/Controller/Catalog.productsEditController.js",
                                    "Application/Modules/admin/Catalog/Service/CatalogService.js"
                                ]
                            },
                                { cache: false });
                        }
                    ]
                },
                ncyBreadcrumb: {
                    label: ' ویرایش محصول',
                    parent: 'dashboard.catalog.productsList'
                }
            });


}

