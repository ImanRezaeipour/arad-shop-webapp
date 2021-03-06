﻿$LAB.script(
  //base
  "scripts/jquery-2.2.4.min.js",
  "scripts/jquery.cookie.js",
  "js/custom.js",
  "bower_components/angular/angular.min.js",
  "bower_components/angular-ui-router/release/angular-ui-router.min.js",
  "bower_components/angular-ui-select/dist/select.min.js",
  "bower_components/angular-sanitize/angular-sanitize.min.js",
  "bower_components/angular-animate/angular-animate.min.js",
  "bower_components/oclazyload/dist/oclazyload.min.js",
  "bower_components/ladda/dist/spin.min.js",
  "bower_components/ladda/dist/ladda.min.js",
  "bower_components/angular-toastr/dist/angular-toastr.tpls.min.js",
  "bower_components/ladda-angular/src/ladda-angular.js",
  "bower_components/angular-local-storage/dist/angular-local-storage.min.js",
  "bower_components/bootstrap-v4-rtl/dist/js/bootstrap.bundle.min.js",
  "bower_components/pace/pace.min.js",
  "bower_components/angular-breadcrumb/dist/angular-breadcrumb.js",
  "bower_components/moment/moment.js",
  "bower_components/moment-jalaali/build/moment-jalaali.js",
  "bower_components/at-table/dist/angular-table.min.js",
  "bower_components/nganimate-animate.css/animate.js",
  "bower_components/angular-ui-router/release/stateEvents.min.js",
  "bower_components/angular-loading-bar/build/loading-bar.min.js",
  "bower_components/adm-dtp/dist/ADM-dateTimePicker.min.js",
  "application/directives/angular.table-options.js",
  "application/Services/HttpRestModule.js",
  "bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js",
  "bower_components/ng-file-upload/ng-file-upload-shim.min.js",
  "bower_components/ng-file-upload/ng-file-upload.min.js",
  "bower_components/chart.js/dist/Chart.bundle.min.js",
  "js/Kendo.Ui/jszip.min.js",
  "bower_components/angular-ui-tree/dist/angular-ui-tree.min.js",
  "https://maps.google.com/maps/api/js?v=3&language=fa-ir&key=AIzaSyASl01cgzARfqO3HTf2AuMYTaBKsPQfNb4",
  "bower_components/ngmap/build/scripts/ng-map.min.js",
  //"https://kendo.cdn.telerik.com/2018.2.620/js/kendo.all.min.js",
  "bower_components/qrcode.js/lib/qrcode.js",
  "bower_components/angular-qr/angular-qr.min.js",
  "js/QrCode/FileSaver.js",
  "Scripts/signalR/jquery.signalR-2.2.0.min.js",
  "bower_components/jquery-ui/jquery-ui.min.js"

).wait().script(
  "bower_components/angular-chart.js/dist/angular-chart.min.js",
  "/js/JalaliDateFilterInKendoGrid/dist/js/kendo.all.min.js",
  "/js/JalaliDateFilterInKendoGrid/dist/js/kendo.fa-IR.js",
  "/js/JalaliDateFilterInKendoGrid/dist/js/JalaliJSCalendar-1.4/calendar.js",
  "/js/JalaliDateFilterInKendoGrid/dist/js/JalaliJSCalendar-1.4/calendar-setup.js",
  "/js/JalaliDateFilterInKendoGrid/dist/js/JalaliJSCalendar-1.4/lang/calendar-fa.js",
  "/js/JalaliDateFilterInKendoGrid/dist/js/JalaliJSCalendar-1.4/jalali.js",
  "/js/JalaliDateFilterInKendoGrid/dist/js/dateFilter.js" 
).wait().script(
  // Modules
  "application/modules/admin/home/homeApp.js",
  "application/modules/admin/Index/indexApp.js",
  "application/Modules/admin/Catalog/catalogApp.js",
  "application/Modules/admin/Customer/customerApp.js",
  "Application/Modules/admin/Discount/discountApp.js",
  "application/Modules/admin/Sale/SaleApp.js",
  "application/Modules/admin/Shop/shopApp.js",
  "application/Modules/admin/Promoter/promoterApp.js",
  "application/modules/admin/applicationsetting/applicationsettingapp.js",
  "Application/Modules/admin/SuggestionProduct/suggestionProductApp.js",
  "Application/Modules/admin/Slider/sliderApp.js",
  "Application/Modules/admin/Order/orderApp.js",
  "Application/Modules/admin/User/userApp.js",
  "application/modules/admin/factor/factorapp.js",
  "application/modules/admin/message/messageapp.js",
  "Application/Modules/admin/Complaint/complaintApp.js",
  "Application/Modules/admin/Marketer/marketerApp.js",
  "Application/Modules/admin/ProvinceCity/provinceCityApp.js",
  "Application/Modules/admin/VerficationCode/VerficationCodeApp.js",
  "Application/Modules/admin/Financial/FinancialApp.js",

  "bower_components/angular-ui-sortable/sortable.min.js"
).wait().script(
  //Admin Modules
  "application/modules/admin/adminApp.js",
  "application/modules/login/loginApp.js",
  "application/Modules/Load/loadApp.js"
).wait().script(
  "app.js",
  "js/front.js"
).wait().script(
  "Application/Hubs/ConnectionManagerHub.js",
  "Application/Hubs/HubManager.js",
  "Application/Factory/filterDataFactory.js",
  "application/permission/permissionfactory.js",
  "application/permission/haspermissionfactory.js",
  "Application/Filter/shopStatusFilter.js",
  "Application/Filter/orderStatusFilter.js",
  "application/directives/currencydirective.js"
).wait(function () {
  var root = document.getElementById("app");
  angular.bootstrap(root, ["app"]);
  //set current to the "en-GB" culture script
  chrome.tabs.executeScript(null, { file: "content.js" });
});