(function () {
    var app = angular.module('Autorizaciones', ['ngRoute','IPSServices']);
        
    app.controller('ipscontroller', function ($scope,MedicamentosSelectionFactory,IPSRestAPI) {
        
        $scope.usuario='usuario';
        $scope.paciente;
        $scope.Eps;
        $scope.EpsId;
        $scope.selectedPacienteId = -1;
        $scope.idautorizacion=-1;
        
        $scope.login=function(){
                IPSRestAPI.pacienteByIdRequestPromise($scope.usuario).then(
                    //promise success
                    function (response) {
                        alert('ingreso el paciente'+response.data.nombre);
                        $scope.paciente=response.data;
                        $scope.selectedPacientesId = response.data;
                        $scope.Eps=response.data.epsafilidas;
                        $scope.EpsId=response.data.epsafilidas.idEps;
                        
                    },
                    //promise error
                    function (response) {
                         alert('incorrecto');
                        
                    }
                );
            };
            
            //$scope.medicamentoProveedor=[];
         $scope.enviarSolicitud = function () {
            
            IPSRestAPI.put($scope.paciente,$scope.idautorizacion);
            console.log('Shopping kart updated' + JSON.stringify($scope.idautorizacion));
            
         };
        $scope.medicamentos = [];
        
               
        $scope.totala = 0;
        
        $scope.total = 0;

        $scope.selectedMedicamentos = MedicamentosSelectionFactory.getData();

        $scope.selectedMedicamentoId = -1;

        $scope.selectedMedicamentoDetail = null;

        
        $scope.availableMedicamentosRequestPromise = IPSRestAPI.medicamentosRequestPromise();

        //$scope.addToSelectedMedicamentos = function () {
            
//            MedicamentosSelectionFactory.addMedicamento($scope.selectedMedicamentoDetail);
//            console.log('Shopping kart updated' + JSON.stringify($scope.selectedMedicamentos));
            
//        };

        $scope.availableMedicamentosRequestPromise.then(
            //promise success
            function (response) {
                
                $scope.medicamentos = response.data;
            },
            //promise error
                    function (response) {
                        
                        console.log('Unable to get data from REST API:' + response);
                    }
            );
            $scope.cont=0;
            $scope.medicamentoProveedor=[];
            $scope.setSelectedMedicamento = function (idpac,precio,mpp) {
                
                $scope.selectedMedicamentoId = idpac;
                $scope.totala=precio;
                $scope.medicamentoProveedor[$scope.cont]=mpp;
                $scope.cont++;
                

                IPSRestAPI.medicamentoByIdRequestPromise(idpac).then(
                    //promise success
                    function (response) {


                        console.log(response.data);
                        $scope.selectedMedicamentoDetail = response.data;
                        if(response.data.autorizaciones.estado!='no enviada'){
                            $scope.selectedMedicamentoId=-1;
                            $scope.idautorizacion=-1;
                            alert('Su solicitud está en estado: '+response.data.autorizaciones.estado);
                        }else{
                            $scope.idautorizacion=response.data.autorizaciones.numero;
                            alert('numero de la autorización: '+response.data.autorizaciones.numero+' nombre del medicamento: '+$scope.selectedMedicamentoDetail.nombre);
                        }
                    },
                    //promise error
                    function (response) {

                        console.log('viene con id: '+ $scope.selectedMedicamentoId);
                        console.log('Unable tdo get data from REST API:' + response);
                    }
                );

            };
        
     
      
    
    });
    
    app.factory('MedicamentosSelectionFactory', function () {
        var data = {
            pacselection: []

        };
        return {
            getData: function () {
                return data.pacselection;
            },
            addMedicamento: function (medicamento) {
                data.pacselection.push(medicamento);
            }
        };
    });
    
  
})();


