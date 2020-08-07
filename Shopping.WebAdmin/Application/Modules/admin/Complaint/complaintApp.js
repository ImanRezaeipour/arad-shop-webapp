angular.module('admin.ComplaintApp', []).config(routeConfig);


/** @ngInject */
function routeConfig($stateProvider) {
  $stateProvider
    .state('dashboard.complaint',
      {
        url: '',
        template: "<ui-view></ui-view>",
        abstract: true,
        permission: 3,
        menuItem: {
          isUnique: false,
          title: "شکایات",
          target: "",
          icon: "fa fa-frown-o",
          menus: [
            {
              title: "شکایات",
              target: "dashboard.complaint.list",
              url: "#!/dashboard/complaint/List"

            }
          ]
        }
      })
    .state('dashboard.complaint.list',
      {
        url: '/complaint/List',
        templateUrl: "Application/Modules/admin/complaint/Partial/complaint.list.html",
        controller: "admin.Complaint.ListController as self",
        resolve: {
          loadCtrl: [
            "$ocLazyLoad", function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: "admin.ComplaintApp",
                files: [
                  "Application/Modules/admin/complaint/Controller/complaint.ListController.js",
                  "Application/Modules/admin/complaint/Service/complaintService.js"
                ]
              },
                { cache: false });
            }
          ]
        },
        ncyBreadcrumb: {
          label: 'شکایات',
          parent: 'dashboard.home.home'
        }
      }).state('dashboard.complaint.add',
        {
          url: '/complaint/add/:id',
          templateUrl: "Application/Modules/admin/complaint/Partial/complaint.add.html",
          controller: "admin.Complaint.AddController as self",
          resolve: {
            loadCtrl: [
              "$ocLazyLoad", function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                  name: "admin.ComplaintApp",
                  files: [
                    "Application/Modules/admin/complaint/Controller/complaint.AddController.js",
                    "Application/Modules/admin/complaint/Service/complaintService.js"
                  ]
                },
                  { cache: false });
              }
            ]
          },
          ncyBreadcrumb: {
            label: 'افزودن شکایات',
            parent: 'dashboard.complaint.list'
          }
        });


}

