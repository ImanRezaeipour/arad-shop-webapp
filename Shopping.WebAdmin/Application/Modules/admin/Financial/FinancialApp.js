angular.module('admin.FinancialApp', []).config(routeConfig);


/** @ngInject */
function routeConfig($stateProvider) {


  $stateProvider
    .state('dashboard.financial',
      {
        url: '',
        template: "<ui-view></ui-view>",
        abstract: true,
        permission: 19,
        menuItem: {
          isUnique: false,
          title: "گزارشات مالی",
          target: "",
          icon: "fa fa-file-text",
          menus: [
            {
              title: "گزارش مالی",
              target: "dashboard.financial.list",
              url: "#!/dashboard/financial/List"

            }
          ]

        }
      })
    .state('dashboard.financial.list',
      {
        url: '/financial/List',
        templateUrl: "Application/Modules/admin/financial/Partial/financial.list.html",
        controller: "admin.Financial.ListController as self",
        resolve: {
          loadCtrl: [
            "$ocLazyLoad", function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: "admin.FinancialApp",
                files: [
                  "Application/Modules/admin/financial/Controller/financial.ListController.js",
                  "Application/Modules/admin/financial/Service/financialService.js"
                ]
              },
                { cache: false });
            }
          ]
        },
        ncyBreadcrumb: {
          label: 'گزارش مالی',
          parent: 'dashboard.home.home'
        }
      })

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

