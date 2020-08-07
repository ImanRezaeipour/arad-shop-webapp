var controller = function (scope, state, service, toastr) {

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
                    url: readApi + "PublicMessage"
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
                        PublicMessageType: { type: "string" },
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
                field: "CreationTime",
            }, {
                field: "Title"
            }, {
                field: "UserInfo.firstName"
            }, {
                field: "UserInfo.lastName"
            }, {
                field: "PublicMessageType",
                filterable: {
                    ui: cityFilter
                }
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
controller.$inject = ["$scope", "$state", "admin.MessageService", "toastr"];
angular.module('admin.MessageApp').controller('admin.Message.ListController', controller)