var controller = function (scope, state, stateParams, service, toastr) {
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
                    url: readApi + "Complaint"
                }
            },

            //public string FirstName { get; set; }
            //public string LastName { get; set; }
            //public string Email { get; set; }
            //public string Title { get; set; }
            //public string Description { get; set; }
            //public IShopDto Shop { get; set; }
            //public bool Tracked { get; set; }
            //public DateTime CreationTime { get; set; }


            //            string Name { get; set; }
            //ShopStatus ShopStatus { get; set; }
            //string DescriptionStatus { get; set; }
            //string Description { get; set; }
            //string NationalCode { get; set; }
            //int DefaultDiscount { get; set; }
            sort: {
                field: "CreationTime",
                dir: "desc"
            }, 
            schema: {
                data: 'results',
                total: 'count',
                model: {
                    fields: {
                        FirstName: {},
                        LastName: {},
                        Email: {},
                        Title: {},
                        Shop: {
                            Name: {},
                            Description: {},
                            NationalCode: {},
                            DefaultDiscount: {},
                            ShopStatus: { type: "int" }
                        },
                        Description: {},
                        Tracked: { type: "boolean" },
                        CreationTime: {},
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

        //        FirstName: {},
        //        LastName: {},
        //        Email: {},

        //        Shop: {
        //            Name: {},
        //            Description: {},
        //            NationalCode: {},
        //            DefaultDiscount: {},
        //            ShopStatus: { type: "int" }
        //        },
        //        Description: {},
        //        Tracked: { type: "boolean" },



        columns: [
            {
                field: "CreationTime"
            }, {
                field: "Title"
            }, {
                field: "FirstName"
            }, {
                field: "LastName"
            }, {
                field: "Email"
            }, {
                field: "Description"
            }, {
                field: "Shop.Name"
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
controller.$inject = ["$scope", "$state", "$stateParams", "admin.ComplaintService", "toastr"];
angular.module('admin.ComplaintApp').controller('admin.Complaint.ListController', controller)