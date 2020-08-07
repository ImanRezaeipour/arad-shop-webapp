angular.module('admin.ApplicationSettingApp', []).config(routeConfig);


/** @ngInject */
function routeConfig($stateProvider) {


  $stateProvider
    .state('dashboard.applicationSetting',
      {
        url: '',
        template: "<ui-view></ui-view>",
        abstract: true,
        permission: 1,
        menuItem: {
          isUnique: true,
          title: "تنظیمات",
          target: "dashboard.applicationSetting.modify",
          icon: "fa fa-cogs",
          url: "#!/dashboard/applicationSetting/modify",
          menus: []
        }
      })
    .state('dashboard.applicationSetting.modify',
      {
        url: '/applicationSetting/modify',
        templateUrl: "Application/Modules/admin/ApplicationSetting/Partial/applicationSetting.html",
        controller: "admin.ApplicationSettingController as self",
        resolve: {
          loadCtrl: [
            "$ocLazyLoad", function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: "admin.ApplicationSettingApp",
                files: [
                  "Application/Modules/admin/ApplicationSetting/Controller/ApplicationSettingController.js",
                  "Application/Modules/admin/ApplicationSetting/Service/ApplicationSettingService.js"
                ]
              },
                { cache: false });
            }
          ]
        },
        ncyBreadcrumb: {
          label: 'تنظیمات وب سایت',
          parent: 'dashboard.home.home'
        }
      })
    ;


}

