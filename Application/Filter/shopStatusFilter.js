
angular.module('app').filter('shopStatusFilter', function () {
    return function (item) {
        var txt = "";
        switch (item) {         
            case 0:
                txt = "در انتظار بررسی";
                break;
            case 1:
                txt = "تایید شده";
                break;
            case 2:
                txt = "رد شده";
                break;
            case 3:
                txt = "نیاز به اصلاح اطلاعات";
                break;
            
            default:
        }
        return txt;
    };
});

