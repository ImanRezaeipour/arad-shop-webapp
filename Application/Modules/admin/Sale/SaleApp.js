angular.module('admin.SaleApp', []).config(routeConfig);


/** @ngInject */
function routeConfig($stateProvider) {


  $stateProvider
    .state('dashboard.sale',
      {
        url: '',
        template: "<ui-view></ui-view>",
        abstract: true,
        permission: 13,
        menuItem: {
          isUnique: false,
          title: "فروش ها",
          target: "",
          icon: "icon-list",
          menus: [
            {
              title: "لیست فروش ها",
              target: "dashboard.sale.list",
              url: "#!/dashboard/sale/List"
            }
          ]

        }
      })
    .state('dashboard.sale.list',
      {
        url: '/sale/List',
        templateUrl: "Application/Modules/admin/Sale/Partial/sale.list.html",
        controller: "admin.SaleListController as self",
        resolve: {
          loadCtrl: [
            "$ocLazyLoad", function($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: "admin.SaleApp",
                  files: [
                    "Application/Modules/admin/Sale/Controller/Sale.listController.js",
                    "Application/Modules/admin/Sale/Service/SaleService.js"
                  ]
                },
                { cache: false });
            }
          ]
        },
        ncyBreadcrumb: {
          label: '  فروش ها',
          parent: 'dashboard.home.home'
        }
      })
    ;


}

