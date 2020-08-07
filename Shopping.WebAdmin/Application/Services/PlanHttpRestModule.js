var service = function ($rootScope, $http, $q, $interval) {
    var servers = {};
    this.testCurrentHeader = function () {
        if (servers[server] != null) {
            console.log(servers[server].headers);
        } else {
            console.log("Server Not Found");
        }

    };


    this.setBaseUrl = function (server, url, httpHeaders) {
        servers[server] = {
            baseUrl: url,
            headers: httpHeaders
        };
    };

    this.addHeader = function (server, key, value) {
        if (servers[server] != null) {
            servers[server].headers[key] = value;
        }
    };

    this.removeHeader = function (server, key) {
        if (servers[server] != null) {
            servers[server].headers[key] = null;
        }
    }


    var httpConfig = function (server, method, api, params, data, isQueryString) {

        var deferred = $q.defer();



        if (servers[server] == null) {
            return deferred.promise;
        }




        var baseUrl = servers[server].baseUrl;
        var headers = servers[server].headers;

        $rootScope.errors = [];
        //cfpLoadingBar.start();
        //var loading = $interval(function () {
        //    var proggres = Math.round(cfpLoadingBar.status() * 100);
        //    $(".page-loading-bar h5 .proggres").html(proggres + "%");
        //    if (proggres >= 99) {
        //        $interval.cancel(loading);
        //    }
        //}, 50);

        var routeParameters = "";
        var httpConfigUrl;

        if (isQueryString) {
            httpConfigUrl = baseUrl + api;
        } else {
            if (params === null) {
                httpConfigUrl = baseUrl + api;
            } else {
                if (params.length === 1) {
                    httpConfigUrl = baseUrl + api + "/" + params[0];
                }
                else {
                    angular.forEach(params, function (parameter) {
                        routeParameters += parameter + "/";
                    });
                    httpConfigUrl = baseUrl + api + "/" + routeParameters;
                }
            }
        }

        $http({
            method: method,
            async: true,
            headers: headers,
            data: data,
            params: params,
            url: httpConfigUrl
        }).then(function (response) {
            deferred.resolve(response.data);
            //cfpLoadingBar.complete();
        }, function (error) {

            if (error.status == 401) {
                window.location = absoluteUrl + '/index.html';
            } else {
                console.log(error);
                //Notification.error({
                //    message: error.data.Message,
                //    title: '<span class="pull-right">خطا</span> <div class="clearfix"></div>',
                //    positionY: 'top',
                //    positionX: 'right'
                //});
            }
        });

        return deferred.promise;
    };


    var httpDownloadConfig = function (server, method, api, params, data, isQueryString, otherBaseUrl) {

        var deferred = $q.defer();

        if (servers[server] == null) {
            return deferred.promise;
        }

        var baseUrl = servers[server].baseUrl;
        var headers = servers[server].headers;

        $rootScope.errors = [];

        var routeParameters = "";
        var httpConfigUrl;

        if (otherBaseUrl != null) {
            baseUrl = otherBaseUrl;
        }

        if (isQueryString) {
            httpConfigUrl = baseUrl + api;
        } else {
            if (params === null) {
                httpConfigUrl = baseUrl + api;
            } else {
                if (params.length === 1) {
                    httpConfigUrl = baseUrl + api + "/" + params[0];
                }
                else {
                    angular.forEach(params, function (parameter) {
                        routeParameters += parameter + "/";
                    });
                    httpConfigUrl = baseUrl + api + "/" + routeParameters;
                }
            }
        }

        $http({
            method: method,
            async: true,
            cache: false,
            responseType: 'arraybuffer',
            headers: headers,
            data: data,
            params: params,
            url: httpConfigUrl
        }).then(

            //=============>Success
            function (data, status, headers) {

                var octetStreamMime = 'application/octet-stream';
                var success = false;

                // Get the headers
                headers = data.headers();
                var filename = headers['content-disposition'];
                filename = filename.replace("inline; filename=", "");

                var contentType = headers['content-type'] || octetStreamMime;

                try {
                    var blob = new Blob([data.data], { type: contentType });

                    //blob.lastModifiedDate = new Date();
                    //var file = new File([blob], "my-image.png");

                    if (navigator.msSaveBlob)
                        navigator.msSaveBlob(blob, filename);
                    else {
                        var saveBlob = navigator.webkitSaveBlob || navigator.mozSaveBlob || navigator.saveBlob;
                        if (saveBlob === undefined) throw "Not supported";
                        saveBlob(blob, filename);
                    }
                    success = true;
                } catch (ex) {
                    console.log(ex);
                }

                if (!success) {
                    // Get the blob url creator
                    var urlCreator = window.URL || window.webkitURL || window.mozURL || window.msURL;
                    if (urlCreator) {
                        // Try to use a download link
                        var link = document.createElement('a');
                        if ('download' in link) {
                            // Try to simulate a click
                            try {
                                // Prepare a blob URL
                                console.log("Trying download link method with simulated click ...");
                                var blob = new Blob([data], { type: contentType });
                                var url = urlCreator.createObjectURL(blob);
                                link.setAttribute('href', url);

                                // Set the download attribute (Supported in Chrome 14+ / Firefox 20+)
                                link.setAttribute("download", filename);

                                // Simulate clicking the download link
                                var event = document.createEvent('MouseEvents');
                                event.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
                                link.dispatchEvent(event);
                                console.log("Download link method with simulated click succeeded");
                                success = true;

                            } catch (ex) {
                                console.log("Download link method with simulated click failed with the following exception:");
                                console.log(ex);
                            }
                        }

                        if (!success) {
                            // Fallback to window.location method
                            try {
                                // Prepare a blob URL
                                // Use application/octet-stream when using window.location to force download
                                console.log("Trying download link method with window.location ...");
                                var blob = new Blob([data], { type: octetStreamMime });
                                var url = urlCreator.createObjectURL(blob);
                                window.location = url;
                                console.log("Download link method with window.location succeeded");
                                success = true;
                            } catch (ex) {
                                console.log("Download link method with window.location failed with the following exception:");
                                console.log(ex);
                            }
                        }

                    }
                }

                if (!success) {
                    // Fallback to window.open method
                    console.log("No methods worked for saving the arraybuffer, using last resort window.open");
                    window.open(httpPath, '_blank', '');
                }
                /******************/


            }

            ,

            //=============>Error
            function (data, status) {
                console.log("Request failed with status: " + status);

                // Optionally write the error out to scope
                //$scope.errorDetails = "Request failed with status: " + status;
            }

            );


    };


    var httpDownloadInMemoryFileConfig = function (server, method, api, params, data, isQueryString, otherBaseUrl) {

        var deferred = $q.defer();

        if (servers[server] == null) {
            return deferred.promise;
        }

        var baseUrl = servers[server].baseUrl;
        var headers = servers[server].headers;

        $rootScope.errors = [];

        var routeParameters = "";
        var httpConfigUrl;

        if (otherBaseUrl != null) {
            baseUrl = otherBaseUrl;
        }

        if (isQueryString) {
            httpConfigUrl = baseUrl + api;
        } else {
            if (params === null) {
                httpConfigUrl = baseUrl + api;
            } else {
                if (params.length === 1) {
                    httpConfigUrl = baseUrl + api + "/" + params[0];
                }
                else {
                    angular.forEach(params, function (parameter) {
                        routeParameters += parameter + "/";
                    });
                    httpConfigUrl = baseUrl + api + "/" + routeParameters;
                }
            }
        }


        $http({
            method: method,
            async: true,
            cache: false,
            responseType: 'arraybuffer',
            headers: headers,
            data: data,
            params: params,
            url: httpConfigUrl
        }).then(

            //=============>Success
            function (data, status, headers) {

                if (data.status === 204) {
                    deferred.resolve(null);
                } else {

                    var octetStreamMime = 'application/octet-stream';

                    // Get the headers
                    headers = data.headers();
                    var filename = headers['content-disposition'];
                    filename = filename.replace("inline; filename=", "");

                    var contentType = headers['content-type'] || octetStreamMime;

                    var blob = new Blob([data.data], { type: contentType });

                    blob.lastModifiedDate = new Date();
                    var file = new File([blob], filename);
                    deferred.resolve(file);

                }
            },

            //=============>Error
            function (data, status) {
                deferred.reject(null);
            }
            );

        return deferred.promise;
    };



    this.get = function (server, params, api, isQueryString) {
        return httpConfig(server, "GET", api, params, null, isQueryString);
    }

    this.post = function (server, command, api) {
        return httpConfig(server, "POST", api, null, command, false);
    }

    this.put = function (server, command, api) {
        return httpConfig(server, "PUT", api, null, command, false);
    }

    this.delete = function (server, params, api, isQueryString) {
        return httpConfig(server, "DELETE", api, params, null, isQueryString);
    }

    this.download = function (server, params, api, isQueryString, otherBaseUrl) {
        return httpDownloadConfig(server, "GET", api, params, null, isQueryString, otherBaseUrl);
    }

    this.downloadInMemoryFile = function (server, params, api, isQueryString, otherBaseUrl) {
        return httpDownloadInMemoryFileConfig(server, "GET", api, params, null, isQueryString, otherBaseUrl);
    }

}
service.$inject = ["$rootScope", "$http", "$q", "$interval"];
angular.module("HttpRestModule").service("PlanRestService", service);