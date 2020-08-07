angular.module('app').filter('featureTypeFilter', function () {
    return function (item) {
        var txt = "";
        switch (item) {         
            case 1:
                txt = "متنی";
                break;
            case 2:
                txt = "عددی";
                break;
            case 3:
                txt = " بله و خیر";
                break;
            case 4:
                txt = "دکمه تک انتخابی";
                break;
            case 5:
                txt = "دکمه چند انتخابی";
                break;
            case 6:
                txt = "تصویر";
                break;
            default:
        }
        return txt;
    };
});

