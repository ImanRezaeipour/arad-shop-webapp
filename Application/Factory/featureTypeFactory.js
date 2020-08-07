angular.module("app").factory("featureType", function () {
    return {
        get: function () {

            var list = [
                {
                    name: "متن",
                    featureType: 1,
                    icon: "fa fa-text-width"
                },
                {
                    name: "عددی",
                    featureType: 2,
                    icon: "fa fa-text-width"
                },
                {
                    name: "بله یا خیر",
                    featureType: 3,
                    icon: "fa fa-text-width"
                },
                {
                    name: "دکمه تک انتخابی",
                    featureType: 4,
                    icon: "fa fa-check-circle"
                }
               ,
                {
                    name: "دکمه چند انتخابی",
                    featureType: 5,
                    icon: "fa fa-check-square"
                },
               
            {
                name: "تصویر",
                    featureType: 6,
                    icon: "fa fa-image"
            }
            ];

            return list;

        }
    }
});