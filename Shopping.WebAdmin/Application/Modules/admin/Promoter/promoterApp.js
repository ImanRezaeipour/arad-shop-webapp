angular.module('admin.PromoterApp', []).config(routeConfig);


/** @ngInject */
function routeConfig($stateProvider) {
  $stateProvider
    .state('dashboard.promoter',
      {
        url: '',
        template: "<ui-view></ui-view>",
        abstract: true,
        permission: 11,
        menuItem: {
          isUnique: false,
          title: "ترویج کننده",
          target: "",
          icon: "fa fa-id-card-o",
          menus: [
            {
              title: "لیست ترویج کننده",
              target: "dashboard.promoter.list",
              url: "#!/dashboard/promoter/list"
            }
          ]

        }
      })
    .state('dashboard.promoter.list',
      {
        url: '/promoter/list',
        templateUrl: "Application/Modules/admin/promoter/Partial/promoter.list.html",
        controller: "admin.Promoter.listController as self",
        resolve: {
          loadCtrl: [
            "$ocLazyLoad", function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: "admin.PromoterApp",
                files: [
                  "Application/Modules/admin/promoter/Controller/promoter.listController.js",
                  "Application/Modules/admin/promoter/Service/promoterService.js"
                ]
              },
                { cache: false });
            }
          ]
        },
        ncyBreadcrumb: {
          label: 'ترویج کننده',
          parent: 'dashboard.home.home'
        }
      })
    .state('dashboard.promoter.add',
      {
        url: '/promoter/add',
        templateUrl: "Application/Modules/admin/promoter/Partial/promoter.add.html",
        controller: "admin.Promoter.AddController as self",
        resolve: {
          loadCtrl: [
            "$ocLazyLoad", function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: "admin.PromoterApp",
                files: [
                  "Application/Modules/admin/promoter/Controller/promoter.addController.js",
                  "Application/Modules/admin/promoter/Service/promoterService.js"
                ]
              },
                { cache: false });
            }
          ]
        },
        ncyBreadcrumb: {
          label: 'افزودن ترویج کننده',
          parent: 'dashboard.home.home'
        }
      })  .state('dashboard.promoter.edit',
      {
        url: '/promoter/edit/:id',
        templateUrl: "Application/Modules/admin/promoter/Partial/promoter.edit.html",
        controller: "admin.Promoter.EditController as self",
        resolve: {
          loadCtrl: [
            "$ocLazyLoad", function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: "admin.PromoterApp",
                files: [
                  "Application/Modules/admin/promoter/Controller/promoter.editController.js",
                  "Application/Modules/admin/promoter/Service/promoterService.js"
                ]
              },
                { cache: false });
            }
          ]
        },
        ncyBreadcrumb: {
          label: 'ویرایش ترویج کننده',
          parent: 'dashboard.home.home'
        }
      });
}

