var service = function (restService) {


    this.getShopById = function (params) {
        return restService.get("Read", params, "Shop", true);
    }

    this.getSuggestionProductById = function (params) {
        return restService.get("Read", params, "ShopProductSuggestion", true);
    }

    this.getSuggestionProductCustomerById = function (params) {
        return restService.get("Read", params, "CustomerProductSuggestion", true);
    }

    this.acceptProduct = function (command) {

        return restService.put("Write", command, "AcceptProductSuggestion");
    }

    this.deAcceptProduct = function (command) {

        return restService.put("Write", command, "RejectProductSuggestion");
    }



};

service.$inject = ["RestService"];
angular.module('admin.suggestionProductApp').service('admin.SuggestionProductService', service);