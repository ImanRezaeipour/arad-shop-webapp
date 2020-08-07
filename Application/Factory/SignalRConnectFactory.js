angular.module('app').factory('SignalRConnectFactory', ['$rootScope', "ClientHub", "$state", "toastr", function (rootScope, clientHub, state, toastr) {
    return {
        connect: function () {
            $.getScript(signalRUrl + "/hubs", function () {
                
                clientHub.onInit(signalRUrl);


                rootScope.hubRun = function () {



                    
                    clientHub.OperatorAmbulanceTransferRequested(OperatorAmbulanceTransferRequestedMessage);

                }



                function OperatorAmbulanceTransferRequestedMessage(obj) {
                    toastr.warning(`درخواست جدید آمبولانس <hr/> <a href="/#!/dashboard/add/` + obj.requestId + `" class="btn btn-warning btn-sm text-center btn-block "><small>مشاهده جزئیات<small/></a>`, 'آمبولانس');

                    
                    rootScope.request.data.push({ id: obj.requestId, patientMainProblem: obj.patientMainProblem })
                    rootScope.request.count = rootScope.request.count + 1;
                }


            });
        }

    }
}
]);



