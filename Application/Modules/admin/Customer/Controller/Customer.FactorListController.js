var controller = function (scope, state, stateParams, service, toastr) {

    var self = this;

    service.getCustomer({ id: stateParams.id }).then(function (response) {
            console.log(response);
            self.info = response;
        },
        function (error) {
            console.log(error);

        });

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
                    url: readApi + "CustomerFactor?customerId=" + stateParams.id
                }

            },
            sort: {
                field: "CreationTime",
                dir: "desc"
            }, 
            schema: {
                data: 'results',
                total: 'count',
                model: {
                    Id: "Id",
                    fields: {
                        CreationTime: {},
                        FactoRawCount: { type: 'int' },
                        TimeLeft: { type: 'int' },
                        Discount: { type: 'int' },
                        DiscountPrice: { type: 'decimal' },
                        Price: { type: 'decimal' },
                        FactorState: { type: 'int' },
                        ShipmentState: { type: 'int' },
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
            pageSizes: [10, 25, 50, 100, "همه"],
            buttonCount: 5,
            messages: {
                display: "{0}-{1} از {2} آیتم",
                empty: "",
                itemsPerPage: "تعداد آیتم"
            }
        },

        filterable: {
            extra: false,
            operators: {
                string: {
                    startswith: "شروع با",
                    eq: "مشابه",
                    neq: "مخالف",

                }
            },
            messages: {
                and: "و",
                or: "یا",
                filter: "اعمال",
                clear: "پاک کردن",
                info: ""
            },

        },
        columns: [
            {
                field: "CreationTime"
            }, {
                field: "FactoRawCount"
            }, {
                field: "TimeLeft"
            }, {
                field: "Discount"
            }, {
                field: "DiscountPrice"
            }, {
                field: "Price"
            },{
                field: "FactorState",
                filterable: {
                    ui: cityFilter
                }
            },{
                field: "ShipmentState",
                filterable: {
                    ui: shipmentStateFilter
                }
            },
            { title: "" }
        ]
    };

    function cityFilter(element) {
        element.kendoDropDownList({
            dataSource: new kendo.data.DataSource({
                data: [
                    { title: "در انتظار تایید", value: 0 },
                    { title: "پرداخت شده", value: 1 },
                ]
            }),
            dataTextField: "title",
            dataValueField: "value",
            optionLabel: "انتخاب"
        });
    }


    function shipmentStateFilter(element) {
        element.kendoDropDownList({
            dataSource: new kendo.data.DataSource({
                data: [
                    { title: "در انتظار تایید", value: 0 },
                    { title: "ارسال شده", value: 1 },
                    { title: "تحویل", value: 2},
                    { title: "بازگشتی", value: 3},
                ]
            }),
            dataTextField: "title",
            dataValueField: "value",
            optionLabel: "انتخاب"


        });
    }


    self.changeActiveDeactive = function (item) {
        
        var command = {
            id: item.id
        }
        if (!item.isActive) {

            service.deactiveShop(command).then(function (response) {

                toastr.success(response.message, "موفق");
            },
                function (error) {
                    toastr.success(response.message, "خطا");
                });

        } else {

            service.activeShop(command).then(function (response) {

                toastr.success(response.message, "موفق");
            },
                function (error) {
                    toastr.success(response.message, "خطا");
                });

        }
    }


};
controller.$inject = ["$scope", "$state", "$stateParams" ,"admin.CustomerService", "toastr"];
angular.module('admin.CustomerApp').controller('admin.Customer.FactorListController', controller)