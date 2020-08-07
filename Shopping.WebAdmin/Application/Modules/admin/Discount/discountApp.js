angular.module('admin.DiscountApp', []).config(routeConfig);


/** @ngInject */
function routeConfig($stateProvider) {


  $stateProvider
    .state('dashboard.discount',
      {
        url: '',
        template: "<ui-view></ui-view>",
        abstract: true,
        permission: 5,
        menuItem: {
          isUnique: false,
          title: "تخفیف ها",
          target: "",
          icon: "fa fa-percent",
          menus: [
            {
              title: "تخفیف ها",
              target: "dashboard.discount.list",
              url: "#!/dashboard/discount/list"

            }
          ]

        }
      })
    .state('dashboard.discount.list',
      {
        url: '/discount/list',
        templateUrl: "Application/Modules/admin/Discount/Partial/discount.list.html",
        controller: "admin.Discount.listController as self",
        resolve: {
          loadCtrl: [
            "$ocLazyLoad", function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: "admin.DiscountApp",
                files: [
                  "Application/Modules/admin/Discount/Controller/Discount.listController.js",
                  "Application/Modules/admin/Discount/Service/DiscountService.js"
                ]
              },
                { cache: false });
            }
          ]
        },
        ncyBreadcrumb: {
          label: 'تحفیف ها',
          parent: 'dashboard.home.home'
        }
      })
    .state('dashboard.discount.details',
      {
        url: '/discount/details/:id',
        templateUrl: "Application/Modules/admin/discount/Partial/discount.details.html",
        controller: "admin.Discount.DetailsController as self",
        resolve: {
          loadCtrl: [
            "$ocLazyLoad", function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: "admin.DiscountApp",
                files: [
                  "Application/Modules/admin/discount/Controller/Discount.detailsController.js",
                  "Application/Modules/admin/discount/Service/DiscountService.js"
                ]
              },
                { cache: false });
            }
          ]
        },
        ncyBreadcrumb: {
          label: 'جزئیات تخفیفات',
          parent: 'dashboard.discount.list'
        }
      })
    .state('dashboard.discount.report',
      {
        url: '/discount/report/:id',
        templateUrl: "Application/Modules/admin/discount/Partial/discount.report.html",
        controller: "admin.Discount.ReportController as self",
        resolve: {
          loadCtrl: [
            "$ocLazyLoad", function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: "admin.DiscountApp",
                files: [
                  "Application/Modules/admin/discount/Controller/Discount.ReportController.js",
                  "Application/Modules/admin/discount/Service/DiscountService.js"
                ]
              },
                { cache: false });
            }
          ]
        },
        ncyBreadcrumb: {
          label: 'گزارش تخفیف',
          parent: 'dashboard.discount.list'
        }
      })
    .state('dashboard.discount.shopDebitReport',
      {
        url: '/discount/shopDebitReport/:id',
        templateUrl: "Application/Modules/admin/discount/Partial/discount.shopDebitReport.html",
        controller: "admin.Discount.ShopDebitReportController as self",
        resolve: {
          loadCtrl: [
            "$ocLazyLoad", function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: "admin.DiscountApp",
                files: [
                  "Application/Modules/admin/discount/Controller/Discount.ShopDebitReportController.js",
                  "Application/Modules/admin/discount/Service/DiscountService.js"
                ]
              },
                { cache: false });
            }
          ]
        },
        ncyBreadcrumb: {
          label: 'گزارش بدهکاری فروشگاه',
          parent: 'dashboard.discount.list'
        }
      })
    .state('dashboard.discount.add',
      {
        url: '/discount/add',
        templateUrl: "Application/Modules/admin/discount/Partial/discount.add.html",
        controller: "admin.Discount.AddController as self",
        resolve: {
          loadCtrl: [
            "$ocLazyLoad", function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: "admin.DiscountApp",
                files: [
                  "Application/Modules/admin/discount/Controller/Discount.AddController.js",
                  "Application/Modules/admin/discount/Service/DiscountService.js"
                ]
              },
                { cache: false });
            }
          ]
        },
        ncyBreadcrumb: {
          label: 'افزودن تخفیف',
          parent: 'dashboard.discount.list'
        }
      });


}

