var controller = function (scope, state,stateParams , service, toastr) {

    var self = this;


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
                    url: readApi + "ShopFactor?shopId=" + stateParams.id
                }

            },
       
           

            //            long Id { get; set; }
            //    DateTime CreationTime { get; set; }
            //    long OrderId { get; set; }
            //    Guid OrderSuggestionId { get; set; }
            //    decimal Price { get; set; }
            //    int Discount { get; set; }
            //    decimal DiscountPrice { get; set; }
            //    FactorState FactorState { get; set; }
            //    ShipmentState ShipmentState { get; set; }
            //    int ? TimeLeft { get; set; }
            //    int FactoRawCount { get; set; }
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
                        Id: { type: "number" },
                        CreationTime: {
                            type: "date",
                            //  parse: function (value) { return value; }
                            parse: function (value) {
                                



                                if (value != undefined) {


                                    var c = value.split('/');


                                    var k = JalaliDate.jalaliToGregorian(parseInt(c[0]),
                                        parseInt(c[1]),
                                        parseInt(c[2]));
                                    //var date = k[0] + "/" + k[1] + "/" + k[2];
                                    //dateTime.no
                                    //var now = new Date().toLocaleString();
                                    var ml = k[0] + "-" + k[1] + "-" + k[2] + "T00:00:00.000Z";

                                    return new Date(ml);

                                } else {
                                    return null
                                }
                                //                                  
                                // new Date("2018", "11", "29")
                                //new
                                //Date("2018-11-29"); // "2014-07-22T14:58:27.683" //  new Date().toLocaleString();
                                //return Date.now();
                            }
                        },
                        FactoRawCount: { type: 'number' },
                        TimeLeft: { type: 'number' },
                        Discount: { type: 'number' },
                        DiscountPrice: { type: 'number' },
                        Price: { type: 'number' },
                        FactorState: { type: 'string' },
                        ShipmentState: { type: 'string' },
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
            },

        },
        columns: [
            {
                field: "Id"
            }, {
                field: "CreationTime",
                title: "Last Update",
                filterable: persianDateFilter
            }, {
                field: "FactoRawCount"
            },
            //            {
            //                field: "TimeLeft"
            //            },
            {
                field: "Discount"
            },
            {
                field: "DiscountPrice"
            }, {
                field: "Price",
                filterable: {
                    ui: function (element) {
                        element.kendoNumericTextBox({
                            format: "n0"
                        });
                    }
                },
            }, {
                field: "FactorState", values: [
                    { text: "در انتظار تایید", value: 0 },
                    { text: "پرداخت شده", value: 1 },

                ]
                //                filterable: {
                //                    ui: cityFilter
                //                }
            }, {
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
                    { title: "تحویل", value: 2 },
                    { title: "بازگشتی", value: 3 },
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
controller.$inject = ["$scope", "$state", "$stateParams", "admin.ShopService", "toastr"];
angular.module('admin.ShopApp').controller('admin.Shop.FactorListController', controller)