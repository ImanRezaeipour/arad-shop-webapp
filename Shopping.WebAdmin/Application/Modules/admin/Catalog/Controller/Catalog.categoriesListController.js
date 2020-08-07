var controller = function (scope, state, service, toastr) {

    var self = this;

    scope.remove = function (scope) {
        scope.remove();
    };

    self.toggle = function (item) {
        
        item.toggle();
    };

    scope.moveLastToTheBeginning = function () {
        var a = scope.data.pop();
        scope.data.splice(0, 0, a);
    };

    scope.newSubItem = function (scope) {
        var nodeData = scope.$modelValue;
        nodeData.nodes.push({
            id: nodeData.id * 10 + nodeData.nodes.length,
            title: nodeData.title + '.' + (nodeData.nodes.length + 1),
            nodes: []
        });
    };

    scope.collapseAll = function () {
        
        scope.$broadcast('angular-ui-tree:collapse-all');
    };

    scope.expandAll = function () {
        
        scope.$broadcast('angular-ui-tree:expand-all');
    };

    

    self.getData = function () {
        service.getCategories().then(function (response) {
            
            console.log(response);
            scope.data = response;
        },
            function (error) {

            });
    };

    self.getData();

    self.changeActiveDeactive = function (item) {
        

        var command = {
            id: item.id
        };

        if (!item.isActive) {

            service.deactiveCategory(command).then(function (response) {

                toastr.success(response.message, "موفق");
            },
                function (error) {
                    toastr.success(response.message, "خطا");
                });

        } else {

            service.activeCategory(command).then(function (response) {

                toastr.success(response.message, "موفق");
            },
                function (error) {
                    toastr.success(response.message, "خطا");
                });

        }
    };


    self.removeItem = function (obj, item) {
        
        var command = {
            id: obj.id
        };
        service.deleteCategoryRoot(command).then(function (response) {
            toastr.success(response.message, "موفق");
            self.getData();

        },
            function (error) {
                toastr.success(response.message, "خطا");
            });
    };

    self.removeItemSub = function (obj, item) {
        
        var command = {
            id: obj.id
        };
        service.deleteCategorySub(command).then(function (response) {
            toastr.success(response.message, "موفق");
            self.getData();

        },
            function (error) {
                toastr.success(response.message, "خطا");
            });
    };


    self.getRoot = function () {

        service.getRootCategories().then(function (response) {
            
            console.log(response);
            self.roots = response;
        },
            function (error) {

            });
    };


    self.saveRoot = function () {
        
        var list = [];
        var index = 0;
        angular.forEach(self.roots,
            function (item) {
                list.push({ id: item.id, order: index });
                index = index + 1;
            });

        var command = {
            categoryOrders: list
        };

        service.saveCategory(command).then(function (response) {
            toastr.success(response.message, "موفق");
            self.showTree = false;
            scope.data = [];
            self.getData();
        },
            function (error) {

            });

    };

    self.saveChild = function () {
        
        var list = [];
        var index = 0;
        angular.forEach(self.childs,
            function (item) {
                list.push({ id: item.id, order: index });
                index = index + 1;
            });

        var command = {
            caegoryRootId : self.selectedNod.id,
            categoryOrders: list
        };

        service.saveChildCategory(command).then(function (response) {
            toastr.success(response.message, "موفق");
            self.showChild = false;
            scope.data = [];
            self.getData();
        },
            function (error) {

            });

    };

    scope.selectNode = function (node) {
        
        self.selectedNod = node;
        self.childs = self.selectedNod.subCategories;

    };
};
controller.$inject = ["$scope", "$state", "admin.CatalogService", "toastr"];
angular.module('admin.CatalogApp').controller('admin.CatalogCategoriesListController', controller)