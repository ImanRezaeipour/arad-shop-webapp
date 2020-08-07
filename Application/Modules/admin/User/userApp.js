angular.module('admin.UserApp', []).config(routeConfig);


/** @ngInject */
function routeConfig($stateProvider) {


    $stateProvider
        .state('dashboard.user',
            {
                url: '',
                template: "<ui-view></ui-view>",
                abstract: true,
                permission: 17,
                menuItem: {
                    isUnique: false,
                    title: "کاربران",
                    target: "",
                    icon: "icon-user",
                    menus: [
                        {
                            title: "لیست کاربران",
                            target: "dashboard.user.list",
                            url: "#!/dashboard/user/List"

                        }, {
                            title: "افزودن کاربر",
                            target: "dashboard.user.add",
                            url: "#!/dashboard/user/add"

                        }
                    ]

                }
            })
        .state('dashboard.user.list',
            {
                url: '/user/List',
                templateUrl: "Application/Modules/admin/user/Partial/user.list.html",
                controller: "admin.User.listController as self",
                resolve: {
                    loadCtrl: [
                        "$ocLazyLoad", function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: "admin.UserApp",
                                files: [
                                    "Application/Modules/admin/user/Controller/user.listController.js",
                                    "Application/Modules/admin/user/Service/userService.js"
                                ]
                            },
                                { cache: false });
                        }
                    ]
                },
                ncyBreadcrumb: {
                    label: 'کاربران',
                    parent: 'dashboard.home.home'
                }
            })
        .state('dashboard.user.add',
            {
                url: '/user/add',
                templateUrl: "Application/Modules/admin/user/Partial/user.add.html",
                controller: "admin.User.AddController as self",
                resolve: {
                    loadCtrl: [
                        "$ocLazyLoad", function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: "admin.UserApp",
                                files: [
                                    "Application/Modules/admin/user/Controller/user.addController.js",
                                    "Application/Modules/admin/user/Service/UserService.js"
                                ]
                            },
                                { cache: false });
                        }
                    ]
                },
                ncyBreadcrumb: {
                    label: 'افزودن کاربر',
                    parent: 'dashboard.user.list'
                }
            }) .state('dashboard.user.edit',
            {
                url: '/user/edit/:id',
                templateUrl: "Application/Modules/admin/user/Partial/user.edit.html",
                controller: "admin.User.EditController as self",
                resolve: {
                    loadCtrl: [
                        "$ocLazyLoad", function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: "admin.UserApp",
                                files: [
                                    "Application/Modules/admin/user/Controller/user.editController.js",
                                    "Application/Modules/admin/user/Service/UserService.js"
                                ]
                            },
                                { cache: false });
                        }
                    ]
                },
                ncyBreadcrumb: {
                    label: 'ویرایش کاربر',
                    parent: 'dashboard.user.list'
                }
            }).state('dashboard.user.resetPassword',
            {
                url: '/user/resetPassword/:id',
                templateUrl: "Application/Modules/admin/user/Partial/user.resetPassword.html",
                controller: "admin.User.ResetPasswordController as self",
                resolve: {
                    loadCtrl: [
                        "$ocLazyLoad", function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: "admin.UserApp",
                                files: [
                                    "Application/Modules/admin/user/Controller/user.ResetPasswordController.js",
                                    "Application/Modules/admin/user/Service/UserService.js"
                                ]
                            },
                                { cache: false });
                        }
                    ]
                },
                ncyBreadcrumb: {
                    label: 'ریست کردن پسوورد',
                    parent: 'dashboard.user.list'
                }
            });


}

