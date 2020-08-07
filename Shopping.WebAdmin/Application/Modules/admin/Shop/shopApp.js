angular.module('admin.ShopApp', []).config(routeConfig);


/** @ngInject */
function routeConfig($stateProvider) {


  $stateProvider
    .state('dashboard.shop',
      {
        url: '',
        template: "<ui-view></ui-view>",
        abstract: true,
        permission: 14,
        menuItem: {
          isUnique: false,
          title: "فروشگاه ها",
          target: "",

          icon: "fa fa-shopping-cart ",
          support: true,
          menus: [
            {
              title: "لیست فروشگاه ها",
              target: "dashboard.shop.list",
              url: "#!/dashboard/shop/List"

            },
            {
              title: "فروشگاه ها بر روی نقشه",
              target: "dashboard.shop.map",
              url: "#!/dashboard/shop/map"

            },
            {
              title: "درخواست فروشگاه ها",
              target: "dashboard.shop.request",
              url: "#!/dashboard/shop/request"
            },
            {
              title: "جدول جذب",
              target: "dashboard.shop.subsetReport",
              url: "#!/dashboard/shop/subsetReport"

            }
          ]

        }
      })
    .state('dashboard.shop.list',
      {
        url: '/shop/List',
        templateUrl: "Application/Modules/admin/Shop/Partial/shop.list.html",
        controller: "admin.ShopListController as self",
        resolve: {
          loadCtrl: [
            "$ocLazyLoad", function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: "admin.ShopApp",
                files: [
                  "Application/Modules/admin/Shop/Controller/Shop.listController.js",
                  "Application/Modules/admin/Shop/Service/ShopService.js"
                ]
              },
                { cache: false });
            }
          ]
        },
        ncyBreadcrumb: {
          label: '  فروشگاه ها',
          parent: 'dashboard.home.home'
        }
      })
    .state('dashboard.shop.subsetReport',
      {
        url: '/shop/subsetReport',
        templateUrl: "Application/Modules/admin/Shop/Partial/shop.subsetReport.html",
        controller: "admin.SubsetReportController as self",
        resolve: {
          loadCtrl: [
            "$ocLazyLoad", function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: "admin.ShopApp",
                files: [
                  "Application/Modules/admin/Shop/Controller/Shop.SubsetReportController.js",
                  "Application/Modules/admin/Shop/Service/ShopService.js"
                ]
              },
                { cache: false });
            }
          ]
        },
        ncyBreadcrumb: {
          label: 'جدول جذب',
          parent: 'dashboard.home.home'
        }
      })
    .state('dashboard.shop.map',
      {
        url: '/shop/map',
        templateUrl: "Application/Modules/admin/Shop/Partial/shop.map.html",
        controller: "admin.Shop.MapController as self",
        resolve: {
          loadCtrl: [
            "$ocLazyLoad", function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: "admin.ShopApp",
                files: [
                  "Application/Modules/admin/Shop/Controller/Shop.mapController.js",
                  "Application/Modules/admin/Shop/Service/ShopService.js"
                ]
              },
                { cache: false });
            }
          ]
        },
        ncyBreadcrumb: {
          label: ' فروشگاه ها بر روی نقشه',
          parent: 'dashboard.home.home'
        }
      })
    .state('dashboard.shop.details',
      {
        url: '/shop/details/:id',
        templateUrl: "Application/Modules/admin/Shop/Partial/shop.details.html",
        controller: "admin.Shop.DetailsController as self",
        resolve: {
          loadCtrl: [
            "$ocLazyLoad", function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: "admin.ShopApp",
                files: [
                  "Application/Modules/admin/Shop/Controller/Shop.detailsController.js",
                  "Application/Modules/admin/Shop/Service/ShopService.js"
                ]
              },
                { cache: false });
            }
          ]
        },
        ncyBreadcrumb: {
          label: 'مشخصات فروشگاه',
          parent: 'dashboard.shop.list'
        }
      }).state('dashboard.shop.edit',
        {
          url: '/shop/edit/:id',
          templateUrl: "Application/Modules/admin/Shop/Partial/shop.edit.html",
          controller: "admin.Shop.EditController as self",
          resolve: {
            loadCtrl: [
              "$ocLazyLoad", function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                  name: "admin.ShopApp",
                  files: [
                    "Application/Modules/admin/Shop/Controller/Shop.EditController.js",
                    "Application/Modules/admin/Shop/Service/ShopService.js"
                  ]
                },
                  { cache: false });
              }
            ]
          },
          ncyBreadcrumb: {
            label: 'ویرایش فروشگاه',
            parent: 'dashboard.shop.list'
          }
        })
    .state('dashboard.shop.marketers',
      {
        url: '/shop/marketers/:id',
        templateUrl: "Application/Modules/admin/Shop/Partial/shop.marketers.html",
        controller: "admin.Shop.MarketersController as self",
        resolve: {
          loadCtrl: [
            "$ocLazyLoad", function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: "admin.ShopApp",
                files: [
                  "Application/Modules/admin/Shop/Controller/Shop.MarketersController.js",
                  "Application/Modules/admin/Shop/Service/ShopService.js"
                ]
              },
                { cache: false });
            }
          ]
        },
        ncyBreadcrumb: {
          label: 'مشخصات تغییرات بازاریاب',
          parent: 'dashboard.shop.list'
        }
      }).state('dashboard.shop.logs',
        {
          url: '/shop/logs/:id',
          templateUrl: "Application/Modules/admin/Shop/Partial/shop.logs.html",
          controller: "admin.Shop.LogsController as self",
          resolve: {
            loadCtrl: [
              "$ocLazyLoad", function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                  name: "admin.ShopApp",
                  files: [
                    "Application/Modules/admin/Shop/Controller/Shop.LogsController.js",
                    "Application/Modules/admin/Shop/Service/ShopService.js"
                  ]
                },
                  { cache: false });
              }
            ]
          },
          ncyBreadcrumb: {
            label: 'مشخصات تاریخچه فروشگاه',
            parent: 'dashboard.shop.list'
          }
        }).state('dashboard.shop.request',
          {
            url: '/shop/request',
            templateUrl: "Application/Modules/admin/Shop/Partial/shop.requestListController.html",
            controller: "admin.Shop.ShopRequestListController as self",
            resolve: {
              loadCtrl: [
                "$ocLazyLoad", function ($ocLazyLoad) {
                  return $ocLazyLoad.load({
                    name: "admin.ShopApp",
                    files: [
                      "Application/Modules/admin/Shop/Controller/Shop.ShopRequestListController.js",
                      "Application/Modules/admin/Shop/Service/ShopService.js"
                    ]
                  },
                    { cache: false });
                }
              ]
            },
            ncyBreadcrumb: {
              label: 'درخواست های فروشگاه',
              parent: 'dashboard.home.home'
            }
          }).state('dashboard.shop.requestAdd',
            {
              url: '/shop/requestAdd',
              templateUrl: "Application/Modules/admin/Shop/Partial/shop.requestAddController.html",
              controller: "admin.Shop.ShopRequestAddController as self",
              resolve: {
                loadCtrl: [
                  "$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                      name: "admin.ShopApp",
                      files: [
                        "Application/Modules/admin/Shop/Controller/Shop.ShopRequestAddController.js",
                        "Application/Modules/admin/Shop/Service/ShopService.js"
                      ]
                    },
                      { cache: false });
                  }
                ]
              },
              ncyBreadcrumb: {
                label: ' ثبت درخواست های فروشگاه',
                parent: 'dashboard.shop.request'
              }
            }).state('dashboard.shop.requestDetails',
              {
                url: '/shop/requestDetails/:id',
                templateUrl: "Application/Modules/admin/Shop/Partial/shop.requestDetailsController.html",
                controller: "admin.Shop.ShopRequestDetailsController as self",
                resolve: {
                  loadCtrl: [
                    "$ocLazyLoad", function ($ocLazyLoad) {
                      return $ocLazyLoad.load({
                        name: "admin.ShopApp",
                        files: [
                          "Application/Modules/admin/Shop/Controller/Shop.ShopRequestDetailsController.js",
                          "Application/Modules/admin/Shop/Service/ShopService.js"
                        ]
                      },
                        { cache: false });
                    }
                  ]
                },
                ncyBreadcrumb: {
                  label: 'درخواست های فروشگاه',
                  parent: 'dashboard.shop.request'
                }
              })
    .state('dashboard.shop.factors',
      {
        url: '/shop/factors/:id',
        templateUrl: "Application/Modules/admin/Shop/Partial/shop.factorList.html",
        controller: "admin.Shop.FactorListController as self",
        resolve: {
          loadCtrl: [
            "$ocLazyLoad", function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: "admin.ShopApp",
                files: [
                  "Application/Modules/admin/Shop/Controller/Shop.FactorListController.js",
                  "Application/Modules/admin/Shop/Service/ShopService.js"
                ]
              },
                { cache: false });
            }
          ]
        },
        ncyBreadcrumb: {
          label: 'فاکتورهای فروشگاه',
          parent: 'dashboard.shop.list'
        }
      }).state('dashboard.shop.orders',
        {
          url: '/shop/orders/:id',
          templateUrl: "Application/Modules/admin/Shop/Partial/shop.orderList.html",
          controller: "admin.Shop.OrderListController as self",
          resolve: {
            loadCtrl: [
              "$ocLazyLoad", function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                  name: "admin.ShopApp",
                  files: [
                    "Application/Modules/admin/Shop/Controller/Shop.OrderListController.js",
                    "Application/Modules/admin/Shop/Service/ShopService.js"
                  ]
                },
                  { cache: false });
              }
            ]
          },
          ncyBreadcrumb: {
            label: 'سفارشات فروشگاه',
            parent: 'dashboard.shop.list'
          }
        }).state('dashboard.shop.customerSubset',
          {
            url: '/shop/customerSubset/:id',
            templateUrl: "Application/Modules/admin/Shop/Partial/shop.customerSubset.html",
            controller: "admin.Shop.CustomerSubsetController as self",
            resolve: {
              loadCtrl: [
                "$ocLazyLoad", function ($ocLazyLoad) {
                  return $ocLazyLoad.load({
                    name: "admin.ShopApp",
                    files: [
                      "Application/Modules/admin/Shop/Controller/Shop.customerSubsetController.js",
                      "Application/Modules/admin/Shop/Service/ShopService.js"
                    ]
                  },
                    { cache: false });
                }
              ]
            },
            ncyBreadcrumb: {
              label: 'تسویه مبلغ جذب مشتری',
              parent: 'dashboard.shop.list'
            }
          });


}

