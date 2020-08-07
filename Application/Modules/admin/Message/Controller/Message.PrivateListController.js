var controller = function (scope, state, stateParams, service, toastr) {

    var self = this;
    self.id = stateParams.id;
    self.type = stateParams.type;
    if (stateParams.type == 2) {

        service.getShopById({ shopId: stateParams.id }).then(function (response) {
            console.log(response);
            self.info = response;
            self.center = [35.736629, 51.388235];
            self.pin = [35.857680, 51.390996];
            
        },
            function (error) {
                console.log(error);
            });

    }
    else if (stateParams.type == 1) {
        service.getCustomer({ id: stateParams.id }).then(function (response) {
            console.log(response);
            self.info = response;
        },
            function (error) {
                console.log(error);

            });
    }


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
                    url: readApi + "PrivateMessage?personId=" + stateParams.id
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
                        creationTime: {},
                        Title: {},
                        PublicMessageType: { type: "int" },
                        Body: {},
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


        //        creationTime: {},
        //        Title: {},
        //        PublicMessageType: { type: "int" },
        //        Body: {},

        columns: [
            {
                field: "CreationTime"
            }, {
                field: "Title"
            }, {
                field: "Body"
            }
        ]
    };

    function cityFilter(element) {
        element.kendoDropDownList({
            dataSource: new kendo.data.DataSource({
                data: [
                    { title: "پیام برای فروشگاه", value: 0 },
                    { title: "پیام برای مشتری", value: 1 }


                ]
            }),
            dataTextField: "title",
            dataValueField: "value",
            optionLabel: "انتخاب"
        });
    }




};
controller.$inject = ["$scope", "$state", "$stateParams", "admin.MessageService", "toastr"];
angular.module('admin.MessageApp').controller('admin.Message.PrivateListController', controller)