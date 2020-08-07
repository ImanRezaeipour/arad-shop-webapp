var controller = function (scope, state, stateParams , service, toastr) {

    var self = this;

    service.getCustomer({ id: stateParams.id }).then(function(response) {
        console.log(response);
            self.customer = response;
        },
        function(error) {
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
                    url: readApi + "customerOrder?customerId=" + stateParams.id
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
                        Description: {},
                        OrderStatus: { type: "int" },
                        Customer: {
                            Id: {},
                            FirstName: {},
                            LastName: {},
                            EmailAddress: {},
                            IsActive: { type: "bolean" },
                            UserId: {}
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
                field: "OrderStatus",
                filterable: {
                    ui: cityFilter
                }
            }, {
                field: "Customer.FirstName"
            }, {
                field: "Customer.LastName"
            }, {
                field: "Customer.EmailAddress"
            }, {
                field: "Description"
            },
            { title: "" }
        ]
    };
    function cityFilter(element) {
        element.kendoDropDownList({
            dataSource: new kendo.data.DataSource({
                data: [
                    { title: "در انتظار تایید", value: 0 },
                    { title: "دارای پیشنهاد", value: 1 },
                    { title: "قبول", value: 2 },
                    { title: "رد", value: 3 }


                    //                [Description("معلق")]
                    //                Pending,
                    //                [Description("دارای پیشنهاد")]
                    //                HasSuggestion,
                    //                [Description("قبول")]
                    //                Accept,
                    //                [Description("رد")]
                    //                Reject

                ]
            }),
            dataTextField: "title",
            dataValueField: "value",
            optionLabel: "انتخاب"
        });
    }

//    service.getCustomerOrder({ customerId: stateParams.id }).then(function (response) {
//            console.log(response);
//            self.customerOrders = response;
//        },
//        function (error) {
//            console.log(error);
//
//        });
};
controller.$inject = ["$scope", "$state", "$stateParams","admin.CustomerService", "toastr"];
angular.module('admin.CustomerApp').controller('admin.Customer.OrderController', controller)