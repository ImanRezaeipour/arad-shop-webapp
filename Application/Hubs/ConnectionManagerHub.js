angular.module('app').factory('ClientHub', ['$rootScope', "$interval", '$timeout', "$interval", 'localStorageService',  '$state', function (rootScope, $interval, $timeout, $interval, localStorageService,  state) {

    var clientHub = {
        hub: {
            client: {}
        }
    };
    rootScope.interval = null;

        clientHub.onInit = function (signalRUrl) {
            
            $.connection.hub.url = signalRUrl;

//            if (localStorageService.get('baseInfo') != null) {
//                var token = localStorageService.get('baseInfo')
//                    .access_token; // "jG2N-R0nwJ0bVI22A_8snARk1yeb20xbaxN6hTuwTXNHvgFVLfWbBgYtsw08GfPsRIZfWvkvPvQPF2r_IMuCwI9T1zLyUkhcAllB3v6cmn6H0I1q6SVxs84cbJl0YwjCdPDSJ_NqMOfGQ4SZdMvIyEQd4K4REvrsVhSlmbe7HJIQ7G5NLUCtuMtWmwKY7bOMFqj7vZHaHlmMRdFGo3rzvGGYOMU0kMt8Xog5H4AigofOlHkUWwZdq4Y0mhGwMvdIqBE6gHDEBMuLeBEIxUn8c9pY0HxmpiakFHSa0Gtvg6AnI8QEhPYviVm5lRUJoF9ogtF08IK3PQd-XNM7IpFG8S0mmy7hMOLvDtHwdK45o-qvEE4KJ0TNqqNAyXBtcGf0-KwVVg";
//                $.connection.hub.qs = { "Authorization": token };
//            }
            var tempClient = angular.copy(clientHub.hub.client);
            clientHub.hub = $.connection.shoppingHub;
            clientHub.hub.client = tempClient;

            $.connection.hub.url = signalRUrl;
            $.connection.hub.start({ transport: ['webSockets', 'longPolling'], jsonp: false, withCredentials: false  })
                .done(function () {
                    
                    console.log("[" + (new Date()).toString() + "] Connected");
                    rootScope.hubRun();
                    rootScope.hub = $.connection.hub;
                })
                .fail(function (d) {
                    console.log(d);
                });

            rootScope.$apply($.connection.hub.start());

            $.connection.hub.connectionSlow = function () {
                console.log("[" + (new Date()).toString() + "] SignalR Connection Slow");
            };
            $.connection.hub.reconnecting = function () {
                console.log("[" + (new Date()).toString() + "] SignalR Connection Reconnecting");
            };
            $.connection.hub.reconnected = function () {
               console.log("[" + (new Date()).toString() + "] SignalR Connection Reconnected");
            };
            $.connection.hub.disconnected = function () {
        
      
               console.log("[" + (new Date()).toString() + "] SignalR Connection Disconnected");

                rootScope.interval = $interval(function () {
                    //$.connection.hub.stop();
                    //setTimeout(function () {
                      
                        $.connection.hub.start({ transport: ['webSockets' , 'longPolling'], jsonp: false })
                            .done(function () {
                            
                              //  console.log("[" + (new Date()).toString() + "] Connected");
                                rootScope.hubRun();
                            })
                            .fail(function (d) {
                                console.log(d);
                            });

                    //}, 1000); // Restart connection after 5 seconds.
                   
                }, 5000);

            };

            $.connection.hub.error(function (error) {
               // alert("error");
               console.log(error);
              console.log('SignalrAdapter: ' + error);
            });

//            $.connection.clientHub.client.exceptionHandler = function (error) {
//                //alert("clientError");
//                console.log(error);
//               console.log('SignalrAdapter: ' + error);
//                alert('SignalrAdapter: ' + error);
//            };

            rootScope.$apply($.connection.hub.connectionSlow());
            rootScope.$apply($.connection.hub.reconnecting());
            rootScope.$apply($.connection.hub.reconnected());
            rootScope.$apply($.connection.hub.disconnected());
            rootScope.$apply($.connection.hub.stateChanged(function (state) {
                   
                  //  alert("newState : " + state.newState + "To oldState : " + state.oldState);
                    console.log("newState : " + state.newState + "To oldState : " + state.oldState);
                    var stateText = { 0: 'connecting', 1: 'connected', 2: 'reconnecting', 4: 'disconnected' };
                    //  var stateColour = { 0: 'white', 1: 'green', 2: 'orange', 4: 'red' };
                })
            );
            rootScope.$apply($.connection.hub.error());
            //rootScope.$apply($.connection.hub.stateChanged());
        }




    // #region driver Founded
    clientHub.hub.client.shopCreationNotification = function (data) {
        

        if (clientHub.shopCreationNotificationMethod != undefined) {
            
            clientHub.shopCreationNotificationMethod(data);
        }
    };
    clientHub.shopCreationNotificationFounded = function (callBack) {
   
        clientHub.shopCreationNotificationMethod = callBack;
    }
    // #endregion

//    // #region Driver Not Accept
//    clientHub.hub.client.driverNotAccept = function (data) {
//
//
//        if (clientHub.driverNotAcceptMethod != undefined) {
//            clientHub.driverNotAcceptMethod(data);
//        }
//    };
//    clientHub.introducedriverNotAccept = function (callBack) {
//        clientHub.driverNotAcceptMethod = callBack;
//    }
//    // #endregion
//
//    // #region Driver Cancle Trip
//    clientHub.hub.client.driverCanceledTrip = function (data) {
//
//
//        if (clientHub.driverCanceledTripMethod != undefined) {
//            clientHub.driverCanceledTripMethod(data);
//        }
//    };
//    clientHub.introducedriverCanceledTrip = function (callBack) {
//        clientHub.driverCanceledTripMethod = callBack;
//    }
//    // #endregion
//
//    // #region Driver start Trip
//    clientHub.hub.client.driverStartTrip = function (data) {
//
//
//        if (clientHub.driverStartTripMethod != undefined) {
//            clientHub.driverStartTripMethod(data);
//        }
//    };
//    clientHub.introducedriverStartTrip = function (callBack) {
//        clientHub.driverStartTripMethod = callBack;
//    }
//    // #endregion  
//
//    // #region Position Of Driver 
//    clientHub.hub.client.changePositionOfDriver = function (data) {
//
//
//        if (clientHub.changePositionOfDriverMethod != undefined) {
//            clientHub.changePositionOfDriverMethod(data);
//        }
//    };
//    clientHub.introducechangePositionOfDriver = function (callBack) {
//        clientHub.changePositionOfDriverMethod = callBack;
//    }
//    // #endregion
//
//    // #region Driver Client Message Recieved
//    clientHub.hub.client.clientMessageRecievedByDriver = function (data) {
//        ;
//
//        if (clientHub.clientMessageRecievedByDriverMethod != undefined) {
//            clientHub.clientMessageRecievedByDriverMethod(data);
//        }
//    };
//    clientHub.introduceclientMessageRecievedByDriver = function (callBack) {
//        clientHub.clientMessageRecievedByDriverMethod = callBack;
//    }
//    // #endregion
//
//    // #region Driver End Of Trip
//    clientHub.hub.client.driverEndOfTrip = function (data) {
//
//
//        if (clientHub.driverEndOfTripMethod != undefined) {
//            clientHub.driverEndOfTripMethod(data);
//        }
//    };
//    clientHub.introducedriverEndOfTrip = function (callBack) {
//        clientHub.driverEndOfTripMethod = callBack;
//    }
//    // #endregion  
//
//
//
//
//
//    // #region Driver Reaching
//    clientHub.hub.client.driverReaching = function (data) {
//
//
//        if (clientHub.driverReachingMethod != undefined) {
//            clientHub.driverReachingMethod(data);
//        }
//    };
//    clientHub.introducedriverReaching = function (callBack) {
//        clientHub.driverReachingMethod = callBack;
//    }
//    // #endregion   
//
//
//    // #region userLogout
//    clientHub.hub.client.userLogout = function (data) {
//        if (clientHub.userLogoutMethod != undefined) {
//            clientHub.userLogoutMethod(data);
//        }
//    };
//
//    clientHub.introduceuserLogout = function (callBack) {
//        clientHub.userLogoutMethod = callBack;
//    }
//    // #endregion
//
//    clientHub.connect = function () {
//        ;
//
//        // clientHub.hub.server.pushYou({ name: "Mohammad", lastName: 'Geraily' });
//    }



    return clientHub;

}
]);
