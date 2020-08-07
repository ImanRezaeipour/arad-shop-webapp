angular.module('admin.OrderApp', []).config(routeConfig);


/** @ngInject */
function routeConfig($stateProvider) {


  $stateProvider
    .state('dashboard.order',
      {
        url: '',
        template: "<ui-view></ui-view>",
        abstract: true,
        permission: 10,
        menuItem: {
          isUnique: false,
          title: "سفارش ها",
          target: "",
          icon: "fa fa-shopping-basket",

          menus: [
            {
              title: "سفارش ها",
              target: "dashboard.order.list",
              url: "#!/dashboard/order/List"

            }
          ]

        }
      })
    .state('dashboard.order.list',
      {
        url: '/order/List',
        templateUrl: "Application/Modules/admin/Order/Partial/order.list.html",
        controller: "admin.Order.ListController as self",
        resolve: {
          loadCtrl: [
            "$ocLazyLoad", function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: "admin.OrderApp",
                files: [
                  "Application/Modules/admin/Order/Controller/order.listController.js",
                  "Application/Modules/admin/Order/Service/OrderService.js"
                ]
              },
                { cache: false });
            }
          ]
        },
        ncyBreadcrumb: {
          label: 'سفارش ها',
          parent: 'dashboard.home.home'
        }
      })
    .state('dashboard.order.details',
      {
        url: '/order/details/:id',
        templateUrl: "Application/Modules/admin/Order/Partial/order.details.html",
        controller: "admin.Order.DetailsController as self",
        resolve: {
          loadCtrl: [
            "$ocLazyLoad", function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: "admin.OrderApp",
                files: [
                  "Application/Modules/admin/Order/Controller/Order.detailsController.js",
                  "Application/Modules/admin/Order/Service/OrderService.js"
                ]
              },
                { cache: false });
            }
          ]
        },
        ncyBreadcrumb: {
          label: 'مشخصات سفارش',
          parent: 'dashboard.order.list'
        }
      })
    .state('dashboard.order.areaDetails',
      {
        url: '/order/areaDetails/:id',
        templateUrl: "Application/Modules/admin/Order/Partial/order.areaDetails.html",
        controller: "admin.Order.AreaDetailsController as self",
        resolve: {
          loadCtrl: [
            "$ocLazyLoad", function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: "admin.OrderApp",
                files: [
                  "Application/Modules/admin/Order/Controller/Order.AreaDetailsController.js",
                  "Application/Modules/admin/Order/Service/OrderService.js"
                ]
              },
                { cache: false });
            }
          ]
        },
        ncyBreadcrumb: {
          label: 'مشخصات نواحی سفارش',
          parent: 'dashboard.order.list'
        }
      })
    .state('dashboard.order.suggestion',
      {
        url: '/order/suggestion/:id',
        templateUrl: "Application/Modules/admin/Order/Partial/order.suggestion.html",
        controller: "admin.Order.SuggestionController as self",
        resolve: {
          loadCtrl: [
            "$ocLazyLoad", function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: "admin.OrderApp",
                files: [
                  "Application/Modules/admin/Order/Controller/Order.SuggestionController.js",
                  "Application/Modules/admin/Order/Service/OrderService.js"
                ]
              },
                { cache: false });
            }
          ]
        },
        ncyBreadcrumb: {
          label: 'پیشنهادات',
          parent: 'dashboard.order.list'
        }
      });


}

