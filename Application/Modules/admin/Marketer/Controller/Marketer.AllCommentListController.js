var controller = function (scope, stateParams, state, service, toastr) {

    var self = this;
    self.fileManagerGetUri = fileManagerGetUri;

    service.getMarketerById({ id: stateParams.id }).then(function (response) {
        console.log(response);
        self.isLoad = true;
        self.user = response;
    },
        function (error) {
            console.log(error);
        });

    var getData = function() {
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
                        url: readApi + "Marketer/comment?id=" + stateParams.id
                    }

                },


                schema: {
                    data: '',
                    total: '',
                    model: {
                        Id: "Id",
                        fields: {
                            Comment: {}
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
                buttonCount: 50,
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
                    field: "Comment"
                }
            ]
        };
    };
    getData();
    self.addComments = function() {
        service.addCommentToMerchants({ marketerId: stateParams.id, commentTitle: self.comment }).then(
            function (response) {
                
                toastr.success(response.message, "موفق");
                self.comment = null;
                getData();
            },
            function (error) {
                
                toastr.error(error.message, "خطا");
            });
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
controller.$inject = ["$scope", "$stateParams", "$state", "admin.MarketerService", "toastr"];
angular.module('admin.MarketerApp').controller('admin.Marketer.AllCommentListController', controller)