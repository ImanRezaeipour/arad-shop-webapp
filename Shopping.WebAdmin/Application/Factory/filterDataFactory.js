angular.module("app").factory("filterData", function () {
    return {
        get: function (list) {
            var where = "";
          angular.forEach(list,
                function (item, index) {
              if (item.type === "text") {

                        if (!angular.isUndefinedOrNull(item.data)) {

                            where = where + ((where !== "")? " AND " : "");

                            where = where + item.filedName +
                                ".Contains(" +
                                (angular.isUndefinedOrNull(item.data)
                                    ? "\"\""
                                    : "\"" + item.data + "\"") + ")";
                        }

                    } else if (item.type === "boolean" || item.type === "int") {

                        if (!angular.isUndefinedOrNull(item.data)) {
                            where = where + ((where !== "") ? " AND " : "");
                            if (item.isString == true) {
                                where = where + item.filedName +
                                    " == \"" + item.data + "\"";
                            } else {
                                where = where + item.filedName +
                                    " == " + item.data;    
                            }
                            
                        }

                    }
                });
            return where;
        }
    }
});