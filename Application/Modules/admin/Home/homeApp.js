angular.module('admin.HomeApp', []).config(routeConfig);

/** @ngInject */
function routeConfig($stateProvider) {


  $stateProvider
    .state('dashboard.home',
      {
        url: '',
        template: "<ui-view></ui-view>",
        abstract: true,
        permission: 7,
        menuItem: {
          isUnique: true,
          title: "میز کار",
          target: "dashboard.home.home",
          icon: "icon-home",
          url: "#!/dashboard/home",
          menus: []
        }
      })
    .state('dashboard.home.home',
      {
        url: '/home',
        templateUrl: "Application/Modules/admin/Home/Partial/home.html",
        controller: "admin.HomeController as self",
        resolve: {
          loadCtrl: [
            "$ocLazyLoad", function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: "admin.HomeApp",
                files: [
                  "Application/Modules/admin/Home/Controller/HomeController.js",
                  "Application/Modules/admin/Home/Service/HomeService.js"
                ]
              }, { cache: false });
            }
          ]
        },
        ncyBreadcrumb: {
          label: 'میزکار'
        }
      });



}