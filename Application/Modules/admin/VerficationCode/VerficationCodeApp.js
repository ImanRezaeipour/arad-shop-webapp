angular.module('admin.VerficationCodeApp', []).config(routeConfig);


/** @ngInject */
function routeConfig($stateProvider) {


  $stateProvider
    .state('dashboard.verficationCode',
      {
        url: '',
        template: "<ui-view></ui-view>",
        abstract: true,
        permission: 18,
        menuItem: {
          isUnique: true,
          title: "کد فعال سازی",
          target: "dashboard.verficationCode.find",
          icon: "fa fa-mobile",
          url: "#!/dashboard/verficationCode/find",
          menus: []

        }
      })
    .state('dashboard.verficationCode.find',
      {
        url: '/verficationCode/find',
        templateUrl: "Application/Modules/admin/verficationCode/Partial/verficationCode.html",
        controller: "admin.VerficationCodeController as self",
        resolve: {
          loadCtrl: [
            "$ocLazyLoad", function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: "admin.VerficationCodeApp",
                files: [
                  "Application/Modules/admin/verficationCode/Controller/VerficationCodeController.js",
                  "Application/Modules/admin/verficationCode/Service/VerficationCodeService.js"
                ]
              },
                { cache: false });
            }
          ]
        },
        ncyBreadcrumb: {
          label: 'کدهای فعال سازی',
          parent: 'dashboard.home.home'
        }
      })
    ;


}

