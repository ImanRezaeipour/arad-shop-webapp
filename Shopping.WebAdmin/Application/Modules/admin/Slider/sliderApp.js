angular.module('admin.sliderApp', []).config(routeConfig);


/** @ngInject */
function routeConfig($stateProvider) {


  $stateProvider
    .state('dashboard.slider',
      {
        url: '',
        template: "<ui-view></ui-view>",
        abstract: true,
        permission: 15,
        menuItem: {
          isUnique: false,
          title: "‍‍اسلایدر",
          target: "dashboard.slider.list",
          url: "#!/dashboard/slider/List",
          icon: "fa fa-image",
          menus: [
            {
              title: "اسلایدر",
              target: "dashboard.slider.list",
              url: "#!/dashboard/slider/List"
            }, {
              title: "اسلایدر تخفیفات",
              target: "dashboard.slider.discountList",
              url: "#!/dashboard/slider/discountList"
            }
          ]

        }
      })
    .state('dashboard.slider.list',
      {
        url: '/slider/List',
        templateUrl: "Application/Modules/admin/slider/Partial/slider.list.html",
        controller: "admin.Slider.listController as self",
        resolve: {
          loadCtrl: [
            "$ocLazyLoad", function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: "admin.sliderApp",
                files: [
                  "Application/Modules/admin/slider/Controller/Slider.listController.js",
                  "Application/Modules/admin/slider/Service/SliderService.js"
                ]
              },
                { cache: false });
            }
          ]
        },
        ncyBreadcrumb: {
          label: 'اسلایدر',
          parent: 'dashboard.home.home'
        }
      })
    .state('dashboard.slider.discountList',
      {
        url: '/slider/discountList',
        templateUrl: "Application/Modules/admin/slider/Partial/slider.discountList.html",
        controller: "admin.Slider.DiscountListController as self",
        resolve: {
          loadCtrl: [
            "$ocLazyLoad", function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: "admin.sliderApp",
                files: [
                  "Application/Modules/admin/slider/Controller/Slider.discountListController.js",
                  "Application/Modules/admin/slider/Service/SliderService.js"
                ]
              },
                { cache: false });
            }
          ]
        },
        ncyBreadcrumb: {
          label: 'تخفیفات اسلایدر',
          parent: 'dashboard.home.home'
        }
      }) 
    .state('dashboard.slider.discountAdd',
      {
        url: '/slider/discountAdd/:id/:imgId',
        templateUrl: "Application/Modules/admin/slider/Partial/slider.addDiscount.html",
        controller: "admin.Slider.DiscountAddController as self",
        resolve: {
          loadCtrl: [
            "$ocLazyLoad", function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: "admin.sliderApp",
                files: [
                  "Application/Modules/admin/slider/Controller/Slider.discountAddController.js",
                  "Application/Modules/admin/slider/Service/SliderService.js"
                ]
              },
                { cache: false });
            }
          ]
        },
        ncyBreadcrumb: {
          label: 'افزودن تخفیف اسلایدر',
          parent: 'dashboard.slider.discountList'
        }
      });

}

