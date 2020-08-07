
var controller = function (scope, stateParams, state, service, toastr) {

    var self = this;
    self.fileManagerGetUri = fileManagerGetUri;
    self.type = stateParams.type;
    if (stateParams.type == 2) {
        service.getSuggestionProductById({ id: stateParams.id }).then(function (response) {
            console.log(response);
            self.suggestion = response;
        },
            function (error) {
                console.log(error);

            });

    } else {
        service.getSuggestionProductCustomerById({ id: stateParams.id }).then(function (response) {

            console.log(response);
            self.suggestion = response;
        },
            function (error) {
                console.log(error);

            });
    }


    self.changeActiveDeactive = function (item, type) {

        


        if (stateParams.type == 2) {

        
            var command = {
                id: stateParams.id,
                ProductSuggestionStatusDescription: self.description
            }
            if (type == 0) {

                service.acceptProduct(command).then(function (response) {

                    toastr.success(response.message, "موفق");
                    item.productSuggestionStatus = 1;
                    item.deAcceptItem = null;
                    item.acceptItem = null;
                },
                    function (error) {
                        toastr.success(response.message, "خطا");
                    });

            } else {

                service.deAcceptProduct(command).then(function (response) {
                    item.productSuggestionStatus = 2;
                    item.deAcceptItem = null;
                    item.acceptItem = null;
                        self.suggestion.productSuggestionStatusDescription = angular.copy(self.description);
                    self.description = null;
                    self.showDescription = false;
                    toastr.success(response.message, "موفق");
                 
                    },
                    function (error) {
                        toastr.success(response.message, "خطا");
                    });
            }

        }
        else if (stateParams.type == 1) {
            
            var command = {
                id: stateParams.id,
                ProductSuggestionStatusDescription: self.description
            }
            if (type == 0) {

                service.acceptProduct(command).then(function (response) {

                    toastr.success(response.message, "موفق");
                    item.productSuggestionStatus = 1;
                    item.deAcceptItem = null;
                    item.acceptItem = null;
                },
                    function (error) {
                        toastr.success(response.message, "خطا");
                    });

            } else {
                command.ProductSuggestionStatusDescription = self.description;
                service.deAcceptProduct(command).then(function (response) {
                    item.productSuggestionStatus = 2;
                    item.deAcceptItem = null;
                    item.acceptItem = null;
                        self.suggestion.productSuggestionStatusDescription = angular.copy(self.description);
                    self.description = null;
                    self.showDescription = false;
                    toastr.success(response.message, "موفق");

                },
                    function (error) {
                        toastr.success(response.message, "خطا");
                    });

            }
        }

    }


};
controller.$inject = ["$scope", "$stateParams", "$state", "admin.SuggestionProductService", "toastr"];
angular.module('admin.suggestionProductApp').controller('admin.SuggestionProduct.DetailsController', controller)