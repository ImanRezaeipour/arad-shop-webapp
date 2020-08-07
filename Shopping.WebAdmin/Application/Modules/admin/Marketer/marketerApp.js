angular.module('admin.MarketerApp', []).config(routeConfig);


/** @ngInject */
function routeConfig($stateProvider) {


  $stateProvider
    .state('dashboard.marketer',
      {
        url: '',
        template: "<ui-view></ui-view>",
        abstract: true,
        permission: 8,
        menuItem: {
          isUnique: false,
          title: "بازاریاب",
          target: "",
          icon: "fa fa-id-badge",
          menus: [
            {
              title: "لیست بازاریاب",
              target: "dashboard.marketer.list",
              url: "#!/dashboard/marketer/List"

            }, {
              title: "لیست پرداختی بازاریاب",
              target: "dashboard.marketer.salaryList",
              url: "#!/dashboard/marketer/salaryList"

            }
          ]

        }
      })
    .state('dashboard.marketer.list',
      {
        url: '/marketer/List',
        templateUrl: "Application/Modules/admin/marketer/Partial/marketer.list.html",
        controller: "admin.MarketerListController as self",
        resolve: {
          loadCtrl: [
            "$ocLazyLoad", function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: "admin.MarketerApp",
                files: [
                  "Application/Modules/admin/marketer/Controller/Marketer.listController.js",
                  "Application/Modules/admin/Marketer/Service/MarketerService.js"
                ]
              },
                { cache: false });
            }
          ]
        },
        ncyBreadcrumb: {
          label: 'بازاریاب ها',
          parent: 'dashboard.home.home'
        }
      }).state('dashboard.marketer.comments',
        {
          url: '/marketer/comments/:id',
          templateUrl: "Application/Modules/admin/marketer/Partial/marketer.commentList.html",
          controller: "admin.Marketer.AllCommentListController as self",
          resolve: {
            loadCtrl: [
              "$ocLazyLoad", function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                  name: "admin.MarketerApp",
                  files: [
                    "Application/Modules/admin/marketer/Controller/Marketer.AllCommentListController.js",
                    "Application/Modules/admin/Marketer/Service/MarketerService.js"
                  ]
                },
                  { cache: false });
              }
            ]
          },
          ncyBreadcrumb: {
            label: 'نظرات بازاریاب',
            parent: 'dashboard.marketer.list'
          }
        }).state('dashboard.marketer.salaryList',
          {
            url: '/marketer/salaryList',
            templateUrl: "Application/Modules/admin/marketer/Partial/marketer.salaryList.html",
            controller: "admin.Marketer.SalaryListController as self",
            resolve: {
              loadCtrl: [
                "$ocLazyLoad", function ($ocLazyLoad) {
                  return $ocLazyLoad.load({
                    name: "admin.MarketerApp",
                    files: [
                      "Application/Modules/admin/marketer/Controller/Marketer.SalaryListController.js",
                      "Application/Modules/admin/Marketer/Service/MarketerService.js"
                    ]
                  },
                    { cache: false });
                }
              ]
            },
            ncyBreadcrumb: {
              label: 'لیست پرداختی بازاریاب',
              parent: 'dashboard.home.home'
            }
          })
    .state('dashboard.marketer.add',
      {
        url: '/marketer/add',
        templateUrl: "Application/Modules/admin/marketer/Partial/marketer.add.html",
        controller: "admin.Marketer.AddController as self",
        resolve: {
          loadCtrl: [
            "$ocLazyLoad", function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: "admin.MarketerApp",
                files: [
                  "Application/Modules/admin/marketer/Controller/Marketer.addController.js",
                  "Application/Modules/admin/Marketer/Service/MarketerService.js"
                ]
              },
                { cache: false });
            }
          ]
        },
        ncyBreadcrumb: {
          label: 'افزودن بازاریاب',
          parent: 'dashboard.marketer.list'
        }
      })
    .state('dashboard.marketer.edit',
      {
        url: '/marketer/edit/:id',
        templateUrl: "Application/Modules/admin/marketer/Partial/marketer.edit.html",
        controller: "admin.Marketer.EditController as self",
        resolve: {
          loadCtrl: [
            "$ocLazyLoad", function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: "admin.MarketerApp",
                files: [
                  "Application/Modules/admin/marketer/Controller/Marketer.editController.js",
                  "Application/Modules/admin/Marketer/Service/MarketerService.js"
                ]
              },
                { cache: false });
            }
          ]
        },
        ncyBreadcrumb: {
          label: 'ویرایش بازاریاب',
          parent: 'dashboard.marketer.list'
        }
      })
    .state('dashboard.marketer.addSalary',
      {
        url: '/marketer/addSalary/:id',
        templateUrl: "Application/Modules/admin/marketer/Partial/marketer.addSalary.html",
        controller: "admin.Marketer.AddSalaryController as self",
        resolve: {
          loadCtrl: [
            "$ocLazyLoad", function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: "admin.MarketerApp",
                files: [
                  "Application/Modules/admin/marketer/Controller/Marketer.AddSalaryController.js",
                  "Application/Modules/admin/Marketer/Service/MarketerService.js"
                ]
              },
                { cache: false });
            }
          ]
        },
        ncyBreadcrumb: {
          label: 'افزودن حقوق بازاریاب',
          parent: 'dashboard.marketer.list'
        }
      }).state('dashboard.marketer.details',
        {
          url: '/marketer/details/:id',
          templateUrl: "Application/Modules/admin/marketer/Partial/marketer.details.html",
          controller: "admin.Marketer.DetailsController as self",
          resolve: {
            loadCtrl: [
              "$ocLazyLoad", function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                  name: "admin.MarketerApp",
                  files: [
                    "Application/Modules/admin/marketer/Controller/Marketer.DetailsController.js",
                    "Application/Modules/admin/Marketer/Service/MarketerService.js"
                  ]
                },
                  { cache: false });
              }
            ]
          },
          ncyBreadcrumb: {
            label: 'جزیات بازاریاب',
            parent: 'dashboard.marketer.list'
          }
        })
    .state('dashboard.marketer.marketerShop',
      {
        url: '/marketer/marketerShop/:id',
        templateUrl: "Application/Modules/admin/marketer/Partial/marketer.marketerShopList.html",
        controller: "admin.Marketer.MarketerShopListController as self",
        resolve: {
          loadCtrl: [
            "$ocLazyLoad", function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: "admin.MarketerApp",
                files: [
                  "Application/Modules/admin/marketer/Controller/Marketer.MarketerShopListController.js",
                  "Application/Modules/admin/Marketer/Service/MarketerService.js"
                ]
              },
                { cache: false });
            }
          ]
        },
        ncyBreadcrumb: {
          label: 'فروشگاه های بازاریاب',
          parent: 'dashboard.marketer.list'
        }
      }).state('dashboard.marketer.marketerDetachedShop',
        {
          url: '/marketer/marketerDetachedShop/:id',
          templateUrl: "Application/Modules/admin/marketer/Partial/marketer.marketerDetachedShopList.html",
          controller: "admin.Marketer.MarketerDetachedShopList as self",
          resolve: {
            loadCtrl: [
              "$ocLazyLoad", function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                  name: "admin.MarketerApp",
                  files: [
                    "Application/Modules/admin/marketer/Controller/Marketer.MarketerDetachedShopList.js",
                    "Application/Modules/admin/Marketer/Service/MarketerService.js"
                  ]
                },
                  { cache: false });
              }
            ]
          },
          ncyBreadcrumb: {
            label: 'فروشگاه های دارای فروش بازاریاب',
            parent: 'dashboard.marketer.list'
          }
        })
    .state('dashboard.marketer.marketerShopDetails',
      {
        url: '/marketer/marketerShopDetails/:id',
        templateUrl: "Application/Modules/admin/marketer/Partial/marketer.shopDetails.html",
        controller: "admin.Marketer.ShopDetailsController as self",
        resolve: {
          loadCtrl: [
            "$ocLazyLoad", function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: "admin.MarketerApp",
                files: [
                  "Application/Modules/admin/marketer/Controller/Marketer.ShopDetailsController.js",
                  "Application/Modules/admin/Marketer/Service/MarketerService.js"
                ]
              },
                { cache: false });
            }
          ]
        },
        ncyBreadcrumb: {
          label: 'نمودار فروشگاه',
          parent: 'dashboard.marketer.list'
        }
      })

    .state('dashboard.marketer.shopsChangeMarketer',
      {
        url: '/marketer/shopsChangeMarketer/:id',
        templateUrl: "Application/Modules/admin/marketer/Partial/marketer.shopsChangeMarketer.html",
        controller: "admin.Marketer.ShopsChangeMarketerController as self",
        resolve: {
          loadCtrl: [
            "$ocLazyLoad", function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: "admin.MarketerApp",
                files: [
                  "Application/Modules/admin/marketer/Controller/Marketer.ShopsChangeMarketerController.js",
                  "Application/Modules/admin/Marketer/Service/MarketerService.js"
                ]
              },
                { cache: false });
            }
          ]
        },
        ncyBreadcrumb: {
          label: 'تغییر  بازاریاب',
          parent: 'dashboard.marketer.list'
        }
      })
    .state('dashboard.marketer.marketerShopsDetails',
      {
        url: '/marketer/marketerShopsDetails/:id',
        templateUrl: "Application/Modules/admin/marketer/Partial/marketer.shopsDetails.html",
        controller: "admin.Marketer.ShopsDetailsController as self",
        resolve: {
          loadCtrl: [
            "$ocLazyLoad", function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: "admin.MarketerApp",
                files: [
                  "Application/Modules/admin/marketer/Controller/Marketer.ShopsDetailsController.js",
                  "Application/Modules/admin/Marketer/Service/MarketerService.js"
                ]
              },
                { cache: false });
            }
          ]
        },
        ncyBreadcrumb: {
          label: 'آمار و عملکرد بازاریاب',
          parent: 'dashboard.marketer.list'
        }
      });

  //        .state('dashboard.shop.details',
  //            {
  //                url: '/shop/details/:id',
  //                templateUrl: "Application/Modules/admin/Shop/Partial/shop.details.html",
  //                controller: "admin.Shop.DetailsController as self",
  //                resolve: {
  //                    loadCtrl: [
  //                        "$ocLazyLoad", function ($ocLazyLoad) {
  //                            return $ocLazyLoad.load({
  //                                name: "admin.ShopApp",
  //                                files: [
  //                                    "Application/Modules/admin/Shop/Controller/Shop.detailsController.js",
  //                                    "Application/Modules/admin/Shop/Service/ShopService.js"
  //                                ]
  //                            },
  //                                { cache: false });
  //                        }
  //                    ]
  //                },
  //                ncyBreadcrumb: {
  //                    label: 'مشخصات فروشگاه',
  //                    parent: 'dashboard.shop.list'
  //                }
  //            });


}

