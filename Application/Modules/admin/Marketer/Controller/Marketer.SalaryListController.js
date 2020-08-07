var controller = function (scope, state, service, toastr) {

    var self = this;
    self.fileManagerGetUri = fileManagerGetUri;

    scope.mainGridOptions = {
        dataSource: {
            type: "odata",
            transport: {
                read: {
                    dataType: "json",
                    headers: {
                        "accept": "application/json; odata=verbose",
                        "Authorization": authHeader
                    },
                    url: readApi + "MarketerSalaryPayment"
                }

            },
            sort: {
                field: "CreationTime",
                dir: "asc"
            },

            schema: {
                data: 'results',
                total: 'count',
                model: {
                    Id: "Id",
                    fields: {
                        Amount: { type: 'number' },
                        CreationTime: { type: 'date' },
                        marketer: {
                            Id: {},
                            FirstName: {},
                            LastName: {},
                        },
                        periodSalary: {
                            FromDate: {
                                type: "date"
                            },
                            ToDate: {
                                type: "date"

                            }
                        }


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
                field: "CreationTime"
            }, {
                field: "Marketer.Id"
            }, {
                field: "Marketer.FirstName"
            }, {
                field: "Marketer.LastName"
            }, {
                field: "PeriodSalary.FromDate"
            }, {
                field: "PeriodSalary.ToDate"
            }, {
                field: "Amount"
            }, {
                field: "",
            }

        ]
    };




    self.changeActiveDeactive = function (item) {
        
        var command = {
            id: item.id
        }

        if (!item.isActive) {
            service.deactiveMerketer(command).then(function (response) {
                toastr.success(response.message, "موفق");
            },
                function (error) {
                    toastr.success(response.message, "خطا");
                });

        } else {
            service.activeMarketer(command).then(function (response) {
                toastr.success(response.message, "موفق");
            },
                function (error) {
                    toastr.success(response.message, "خطا");
                });

        }
    }


};
controller.$inject = ["$scope", "$state", "admin.MarketerService", "toastr"];
angular.module('admin.MarketerApp').controller('admin.Marketer.SalaryListController', controller)