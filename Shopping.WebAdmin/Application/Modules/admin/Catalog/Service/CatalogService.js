var service = function (restService) {




    this.addBrand = function (command) {

        return restService.post("Write", command, "Brand");
    }

    this.addCategory = function (command) {

        return restService.post("Write", command, "CategoryRoot");
    }

    this.editCategory = function (command) {

        return restService.put("Write", command, "CategoryRoot");
    }
    this.editCategoryChild = function (command) {

        return restService.put("Write", command, "Category");
    }

    this.addSubCategory = function (command) {

        return restService.post("Write", command, "Category");
    }

    this.editBrand = function (command) {

        return restService.put("Write", command, "Brand");
    }
    this.activeBrand = function (command) {

        return restService.put("Write", command, "ActiveBrand");
    }

    this.deactiveBrand = function (command) {

        return restService.put("Write", command, "DeActiveBrand");
    }

    this.deleteProduct = function (command) {

        return restService.delete("Write", command, "DeleteProduct");
    }

    this.deleteBrand = function (command) {

        return restService.delete("Write", command, "Brand");
    }

    this.deleteCategoryRoot = function (command) {

        return restService.delete("Write", command, "CategoryRoot");
    }

    this.deleteCategorySub = function (command) {

        return restService.delete("Write", command, "Category");
    }


    this.saveCategory = function (command) {

        return restService.put("Write", command, "CategoryRoot/Sort");
    }

    this.saveChildCategory = function (command) {

        return restService.put("Write", command, "Category/Sort");
    }



    this.activeCategory = function (command) {
        return restService.put("Write", command, "ActiveCategory");
    }

    this.deactiveCategory = function (command) {
        return restService.put("Write", command, "DeActiveCategory");
    }

    this.activeProduct = function (command) {

        return restService.put("Write", command, "ActiveProduct");
    }

    this.deactiveProduct = function (command) {

        return restService.put("Write", command, "DeActiveProduct");
    }





    this.addProduct = function (command) {

        return restService.post("Write", command, "Product");
    }
    this.editProduct = function (command) {

        return restService.put("Write", command, "Product");
    }


    this.getBrandById = function (command) {

        return restService.get("Read", command, "Brand");
    }


    this.getBrands = function(command) {
        return restService.get("Read", command, "Brand");
    };

    this.getCategoryById = function (command) {

        return restService.get("Read", command, "CategoryBase");
    }

    this.getBrands = function (command) {
        return restService.get("Read", command, "Brand");
    }


    this.getProductById = function (command) {

        return restService.get("Read", command, "Product", true);
    }

    this.getRootCategory = function () {

        return restService.get("Read", null, "CategoryRoot", true);
    }

    this.getBrands = function () {

        return restService.get("Read", null, "Brand");
    }

    this.getCategories = function () {

        return restService.get("Read", null, "CategoryBase");
    }

    this.getRootCategories = function () {
        return restService.get("Read", null, "CategoryRoot", true);
    }

};

service.$inject = ["RestService"];
angular.module('admin.CatalogApp').service('admin.CatalogService', service);