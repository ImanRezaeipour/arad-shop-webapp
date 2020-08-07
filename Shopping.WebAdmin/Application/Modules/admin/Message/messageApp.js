angular.module('admin.MessageApp', []).config(routeConfig);


/** @ngInject */
function routeConfig($stateProvider) {


    $stateProvider
        .state('dashboard.message',
        {
            url: '',
            template: "<ui-view></ui-view>",
            abstract: true,
            permission: 9,
            menuItem: {
                isUnique: false,
                title: " پیام های عمومی",
                target: "",
                icon: "fa fa-envelope-o",

                menus: [
                    {
                        title: "پیام ها",
                        target: "dashboard.message.list",
                        url: "#!/dashboard/message/List"

                    }
                ]

            }
        })
        .state('dashboard.message.list',
        {
            url: '/message/List',
            templateUrl: "Application/Modules/admin/message/Partial/message.list.html",
            controller: "admin.Message.ListController as self",
            resolve: {
                loadCtrl: [
                    "$ocLazyLoad", function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: "admin.MessageApp",
                            files: [
                                "Application/Modules/admin/message/Controller/Message.ListController.js",
                                "Application/Modules/admin/message/Service/MessageService.js"
                            ]
                        },
                            { cache: false });
                    }
                ]
            },
            ncyBreadcrumb: {
                label: 'پیام ها عمومی',
                parent: 'dashboard.home.home'
            }
        })
        .state('dashboard.message.add',
        {
            url: '/message/add',
            templateUrl: "Application/Modules/admin/message/Partial/message.add.html",
            controller: "admin.Message.AddController as self",
            resolve: {
                loadCtrl: [
                    "$ocLazyLoad", function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: "admin.MessageApp",
                            files: [
                                "Application/Modules/admin/message/Controller/message.addController.js",
                                "Application/Modules/admin/message/Service/messageService.js"
                            ]
                        },
                            { cache: false });
                    }
                ]
            },
            ncyBreadcrumb: {
                label: 'افزودن پیام ها عمومی',
                parent: 'dashboard.message.list'
            }
        })
        .state('dashboard.message.privateList',
        {
            url: '/message/privateList/:id/:type',
            templateUrl: "Application/Modules/admin/message/Partial/message.privateList.html",
            controller: "admin.Message.PrivateListController as self",
            resolve: {
                loadCtrl: [
                    "$ocLazyLoad", function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: "admin.MessageApp",
                            files: [
                                "Application/Modules/admin/message/Controller/Message.PrivateListController.js",
                                "Application/Modules/admin/message/Service/messageService.js"
                            ]
                        },
                            { cache: false });
                    }
                ]
            },
            ncyBreadcrumb: {
                label: 'لیست پیام های شخصی',
                parent: 'dashboard.home.home'
            }
        }) .state('dashboard.message.privateAdd',
        {
            url: '/message/privateAdd/:id/:type',
            templateUrl: "Application/Modules/admin/message/Partial/message.privateAdd.html",
            controller: "admin.Message.PrivateAddController as self",
            resolve: {
                loadCtrl: [
                    "$ocLazyLoad", function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: "admin.MessageApp",
                            files: [
                                "Application/Modules/admin/message/Controller/Message.PrivateAddController.js",
                                "Application/Modules/admin/message/Service/messageService.js"
                            ]
                        },
                            { cache: false });
                    }
                ]
            },
            ncyBreadcrumb: {
                label: 'افزودن پیام های شخصی',
                parent: 'dashboard.home.home'
            }
        });


}

