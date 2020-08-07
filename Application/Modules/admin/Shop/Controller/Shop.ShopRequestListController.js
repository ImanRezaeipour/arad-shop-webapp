var controller = function (scope, state, service, toastr, $http) {
    var self = this;
    scope.mainGridOptions = {
        toolbar: ["excel"],
        excel: {
            fileName: "factor",
            filterable: true,
            allPages: true
        },
        dataSource: {
            type: "odata",
            transport: {
                read: {
                    dataType: "json",
                    headers: {
                        "accept": "application/json; odata=verbose",
                        "Authorization": authHeader
                    },
                    url: readApi + "ShopAcceptor"}
            },
            sort: {
                field: "creationTime",
                dir: "desc"
            },

            schema: {
                data: 'results',
                total: 'count',
                model: {
                    Id: "Id",
                    fields: {
                        ShopName: {},
                        UserId: {},
                        FirstName: {},
                        LastName: {},
                        ShopAcceptorStatus: { type: 'string' },
                        MobileNumber: { type: 'string' },
                        PhoneNumber: { type: 'string' },
                    }
                }
            },
            pageSize: 5,
            serverPaging: true,
            serverSorting: true,
            serverFiltering: true,
        },
        sortable: true,
        pageable: {
            refresh: true,
            pageSizes: [10, 25, 50, 100, 200],
            buttonCount: 5,
            messages: {
                display: "{0}-{1} از {2} آیتم",
                empty: "",
                itemsPerPage: "تعداد آیتم"
            }
        },
        filterable: {
            extra: true,
            operators: {
                string: {
                    startswith: "شروع با",
                    eq: "مشابه",
                    neq: "مخالف",

                },
                number: {
                    eq: "مساوی",
                    neq: "مخالف",
                    gte: "بزرگتر مساوی",
                    gt: "بزرگتر از",
                    lte: "کوچکتر مساوی",
                    lt: "کوچکتر از"
                },
                enums: {
                    eq: "مساوی",
                    neq: "مخالف",
                }
            },
            messages: {
                and: "و",
                or: "یا",
                filter: "اعمال",
                clear: "پاک کردن",
                info: ""
            }
        },
        columns: [
            {
                field: "creationTime",
                title : "تاریخ ایجاد"
            }, {
                field: "shopName",
                title: " نام فروشگاه"
            }, {
                field: "firstName",
                title: " نام"
            }, {
                field: "lastName",
                title: " نام خانوادگی"
            }, {
                field: "mobileNumber",
                title: " موبایل "
            }, {
                field: "phoneNumber",
                title: " شماره تلفن"
            }, {
                field: "shopAcceptorStatus",
                title: " وضعیت",
                 values: [
                    { text: "در انتظار بررسی", value: 0 },
                    { text: "تایید شده", value: 1 },
                    { text: "رد شده", value: 2 }
                ]
            },
            { title: "" }
        ]
    };


    self.changeActiveDeactive = function (item) {
        
        var command = {
            id: item.id
        }
        var commandAuth = {
            userId: item.userId
        }
        if (!item.isActive) {
            service.deactiveShopAuth(commandAuth).then(function (response) {
                service.deactiveShop(command).then(function (response) {

                    toastr.success(response.message, "موفق");
                },
                    function (error) {
                        toastr.success(response.message, "خطا");
                    });
            },
                function (error) {
                });

        } else {
            service.activeShopAuth(commandAuth).then(function (response) {
                service.activeShop(command).then(function (response) {

                    toastr.success(response.message, "موفق");
                },
                    function (error) {
                        toastr.success(response.message, "خطا");
                    });
            },
                function (error) {
                });

        }
    }

    self.saveAsExcel = function () {
        
        //
        //
        $http({
            url: readApi + '/ShopAcceptorExport',
            method: "Get",
            headers: { 'Content-type': 'application/json' },
            data: null,
            responseType: 'arraybuffer'
        }).then(function (data, status, headers) {
            var file = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            var defaultFileName = "excel.xls";
            saveAs(file, defaultFileName);
        }, function (err) {
            console.log('Error: ' + err);
        });

        //        $http({
        //            url: readApi + '/ShopAcceptorExport',
        //            method: 'GET',
        //            responseType: 'arraybuffer',
        //            data: null, //this is your json data string
        //            headers: {
        //                'Content-type': 'application/json',
        //                'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        //            }
        //        }).then(function (data) {
        //            var blob = new Blob([data], {
        //                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        //            });
        //            saveAs(blob, 'File_Name_With_Some_Unique_Id_Time' + '.xlsx');
        //        },function () {
        //            //Some error log
        //        });


        //        $http({
        //            url: readApi + '/ShopAcceptorExport',
        //            method: "Get",
        //            data: null, //this is your json data string
        //            headers: {
        //                'Content-type': 'application/json'
        //            },
        //            responseType: 'blob'
        //        }).then(function (data, status, headers, config) {
        //            var blob = new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        //            var objectUrl = URL.createObjectURL(blob);
        //            window.open(objectUrl);
        //        } , function (data, status, headers, config) {
        //            //upload failed
        //        });


        //        service.getExcelFile().then(function (response) {
        //            console.log(response);
        //            var blob = new Blob([response], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        //                var objectUrl = URL.createObjectURL(blob);
        //                window.open(objectUrl);
        //            },
        //            function (error) { });
    }


};
controller.$inject = ["$scope", "$state", "admin.ShopService", "toastr", "$http"];
angular.module('admin.ShopApp').controller('admin.Shop.ShopRequestListController', controller)