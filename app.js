var app = angular.module("app", [
  "ui.router",
  "oc.lazyLoad",
  "ladda",
  "toastr",
  //"ngAnimate",
  "HttpRestModule",
  "LocalStorageModule",
  "ncy-angular-breadcrumb",
  "ui.bootstrap",
  "ui.select",
  "tableOptions",
  "angular-table",
  //"ngAnimate-animate.css",
  'ui.router.state.events',
  "angular-loading-bar",
  "ADM-dateTimePicker",
  "ngFileUpload",
  "kendo.directives",
  'ui.tree',
  "ngMap",
  "ja.qr",
  'chart.js',
  /* module  */
  "LoginApp",
  "AdminApp",
  "LoadApp",
  "ui.sortable"
]);


app.config(["toastrConfig", "$urlRouterProvider", function (toastrConfig, $urlRouterProvider) {
  
  $urlRouterProvider.otherwise('/');

  angular.extend(toastrConfig, {
    allowHtml: true,
    closeButton: true,
    closeHtml: '<button>&times;</button>',
    extendedTimeOut: 8000,
    iconClasses: {
      error: 'toast-error',
      info: 'toast-info',
      success: 'toast-success',
      warning: 'toast-warning'
    },
    messageClass: 'toast-message',
    onHidden: null,
    onShown: null,
    onTap: null,
    progressBar: true,
    tapToDismiss: true,
    templates: {
      toast: 'directives/toast/toast.html',
      progressbar: 'directives/progressbar/progressbar.html'
    },
    timeOut: 5000,
    titleClass: 'toast-title',
    toastClass: 'toast'
  });
}]);


app.run(["$state", "$rootScope", "RestService", "$timeout", "localStorageService", "$filter",
  function (state, rootScope, restService, timeout, localStorageService, filter) {
    rootScope.isLoading = true;

    var httpHeadersAuth = {
      'Content-Type': "application/json"
    };
    var httpHeadersRead = {
      'Content-Type': "application/json"
    };
    var httpHeadersWrite = {
      'Content-Type': "application/json"
    };
    var token = localStorageService.get("token");
    if (token != null) {
      httpHeadersWrite["Authorization"] = "Bearer " + token;
      httpHeadersAuth["Authorization"] = "Bearer " + token;
      httpHeadersRead["Authorization"] = "Bearer " + token;
      authHeader = "Bearer " + token;
    } else {
      timeout(function () {
        state.go('login.login');
        //         state.go('dashboard.home.home');
      });

    }


    restService.setBaseUrl("Auth", authApiUri, httpHeadersAuth);
    restService.setBaseUrl("Write", writeApi, httpHeadersWrite);
    restService.setBaseUrl("Read", readApi, httpHeadersRead);
    restService.setBaseUrl("AuthController", authApiControllerUri, httpHeadersWrite);
    restService.setBaseUrl("FileManager", fileManagerUri, httpHeadersRead);
    authHeader = "Bearer " + token;

    rootScope.addBaseHeader = function () {

      var token = localStorageService.get("token");
      if (token != null) {
        httpHeadersWrite["Authorization"] = "Bearer " + token.access_token;
        httpHeadersRead["Authorization"] = "Bearer " + token.access_token;
        authHeader = "Bearer " + token.access_token;

        restService.setBaseUrl("Auth", authApiUri, httpHeadersAuth);
        restService.setBaseUrl("AuthController", authApiControllerUri, httpHeadersWrite);
        restService.setBaseUrl("Write", writeApi, httpHeadersWrite);
        restService.setBaseUrl("Read", readApi, httpHeadersRead);
        restService.setBaseUrl("FileManager", fileManagerUri, httpHeadersRead);

        //  signalRConnectFactory.connect();
      }
    }

    if (token == null) {
      rootScope.isAuth = false;
      timeout(function () {
        state.go('login.login');
        // state.go('dashboard.home.home');
      });
    } else {

      timeout(function () {
        
        if (state.current.url == "") {
          state.go('dashboard.home.home');

        }

        //  state.go('login.login');
      });
    }

    //  rootScope.isAuth = true;
    //}
    //            rootScope.states = state.get();
    //            rootScope.$on('$stateChangeStart',
    //                function (event, toState, toParams, fromState, fromParams) {
    //
    //                    var params = {
    //                        fromSatate: fromState,
    //                        toState: toState,
    //                        fromParams: fromParams,
    //                        toParams: toParams
    //                    }
    //
    //                    if (toState.name == "load.load") {
    //                        timeout(function () {
    //                            state.go('load.load');
    //                        });
    //                    } else {
    //                        if (fromState.name != "" && toState.name != "load.load")
    //                            localStorageService.set("state", params);
    //                    }
    //
    //                    if (toState.name === "login.login") {
    //                        return;
    //                    }
    //
    //                    if (token == null) {
    //
    //                        rootScope.isAuth = false;
    //                        timeout(function () {
    //                            state.go('login.login');
    //                            //  state.go('dashboard.home.home');
    //                        });
    //                    } else {
    //                        rootScope.isAuth = true;
    //                    }
    //                });
    //
    //
    //
    //            rootScope.$on('$stateChangeSuccess',
    //                function (event, toState, toParams, fromState, fromParams) {
    //
    //                    var params = {
    //                        fromSatate: fromState,
    //                        toState: toState,
    //                        fromParams: fromParams,
    //                        toParams: toParams
    //                    }
    //
    //                    if (fromState.name != "" && toState.name != "load.load")
    //                        localStorageService.set("state", params);
    //
    //                });

  }

]);

angular.isUndefinedOrNull = function (val) {
  return angular.isUndefined(val) || val === "" || val === null;
}



/* Directive */
app
  .directive('excelExport',
    function () {
      return {
        restrict: 'A',
        scope: {
          fileName: "@",
          data: "&exportData"
        },
        replace: true,
        template: '<button class="btn btn-primary btn-ef btn-ef-3 btn-ef-3c mb-10" ng-click="download()">Export to Excel <i class="fa fa-download"></i></button>',
        link: function (scope, element) {

          scope.download = function () {

            function datenum(v, date1904) {
              if (date1904) v += 1462;
              var epoch = Date.parse(v);
              return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
            };

            function getSheet(data, opts) {
              var ws = {};
              var range = { s: { c: 10000000, r: 10000000 }, e: { c: 0, r: 0 } };
              for (var R = 0; R != data.length; ++R) {
                for (var C = 0; C != data[R].length; ++C) {
                  if (range.s.r > R) range.s.r = R;
                  if (range.s.c > C) range.s.c = C;
                  if (range.e.r < R) range.e.r = R;
                  if (range.e.c < C) range.e.c = C;
                  var cell = { v: data[R][C] };
                  if (cell.v == null) continue;
                  var cell_ref = XLSX.utils.encode_cell({ c: C, r: R });

                  if (typeof cell.v === 'number') cell.t = 'n';
                  else if (typeof cell.v === 'boolean') cell.t = 'b';
                  else if (cell.v instanceof Date) {
                    cell.t = 'n'; cell.z = XLSX.SSF._table[14];
                    cell.v = datenum(cell.v);
                  }
                  else cell.t = 's';

                  ws[cell_ref] = cell;
                }
              }
              if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
              return ws;
            };

            function Workbook() {
              if (!(this instanceof Workbook)) return new Workbook();
              this.SheetNames = [];
              this.Sheets = {};
            }

            var wb = new Workbook(), ws = getSheet(scope.data());
            /* add worksheet to workbook */
            wb.SheetNames.push(scope.fileName);
            wb.Sheets[scope.fileName] = ws;
            var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });

            function s2ab(s) {
              var buf = new ArrayBuffer(s.length);
              var view = new Uint8Array(buf);
              for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
              return buf;
            }

            saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), scope.fileName + '.xlsx');

          };

        }
      };
    }
  );

app.directive('hasPermission', function (permissionFactory, localStorageService, $filter) {
  return {
    scope: {
      permission: '='
    },
    link: function (scope, el, attrs, ctrl) {
      
      var profile = localStorageService.get("userProfileInfo");
      var role = profile.roles[0];
      var permissionList = permissionFactory.get(role);
      var permission = $filter("filter")(permissionList, { permission: scope.permission }, true)[0];
      if (angular.isUndefinedOrNull(permission)) {
        el.hide();
      }
    }
  };
});

//
//app.directive('permission`', function () {
//
//  return function (scope, element, attrs) {
//    
//
//    scope.$watch(attrs.hideon, function (value, oldValue) {
//      
//      if (value) {
//        element.hide();
//      } else {
//        element.show();
//      }
//    }, true);
//  }
//});

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
