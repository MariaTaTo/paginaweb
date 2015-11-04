(function () {
    var app = angular.module('IPS', ['ngRoute','IPSServices']);
        
    app.controller('ipscontroller', function ($scope,MedicamentosSelectionFactory,IPSRestAPI) {
        
        $scope.usuario='usuario';
        $scope.paciente;
        $scope.Eps;
        $scope.EpsId;
        $scope.selectedPacienteId = -1;
        $scope.pedido;
        $scope.idordenCompra;
        $scope.proveedor1;
        $scope.idmedicpp;
        $scope.tomado;
     
       

  
        $scope.login=function(){
                IPSRestAPI.pacienteByIdRequestPromise($scope.usuario).then(
                    //promise success
                    function (response) {
                        $scope.paciente=response.data;
                        console.log('paciente quedoooo con '+response.data.nombre);
                        $scope.selectedPacientesId = response.data;
                        $scope.Eps=response.data.epsafilidas;
                        $scope.EpsId=response.data.epsafilidas.idEps;
                        console.log('mirar si esto fincionaaaaaaaaaa'+response.data.epsafilidas.idEps);
                        console.log('aca que viene : '+$scope.usuario);
                    },
                    //promise error
                    function (response) {
                         alert('incorrecto');
                        console.log('viene con id: '+ $scope.usuario);
                        console.log('Unable tdo get data from REST API:' + response);
                    }
                );
            };
         $scope.crearPedido = function () {
            
            IPSRestAPI.pos($scope.paciente,$scope.total);
            console.log('Shopping kart updated' + JSON.stringify($scope.selectedMedicamentos));
            
         };
        $scope.medicamentos = [];
                
        $scope.totala = 0;
        
        $scope.total = 0;

        $scope.selectedMedicamentos = MedicamentosSelectionFactory.getData();

        $scope.selectedMedicamentoId = -1;

        $scope.selectedMedicamentoDetail = null;

        
        
        $scope.availableMedicamentosRequestPromise = IPSRestAPI.medicamentosRequestPromise();

        $scope.addToSelectedMedicamentos = function () {
            
            MedicamentosSelectionFactory.addMedicamento($scope.selectedMedicamentoDetail);
            console.log('Shopping kart updated' + JSON.stringify($scope.selectedMedicamentos));
            
        };

        $scope.availableMedicamentosRequestPromise.then(
            //promise success
            function (response) {
                console.log('acksamdcsdkc'+response.data);
                $scope.medicamentos = response.data;
            },
            //promise error
                    function (response) {
                        console.log('11 viene con id: '+ $scope.selectedMedicamentoId);
                        console.log('Unable to get data from REST API:' + response);
                    }
            );

            $scope.setSelectedMedicamento = function (idpac,precio) {
                $scope.selectedMedicamentoId = idpac;
                $scope.totala=precio;
                console.log('Cuantos precios tiene'+precio);
                

                IPSRestAPI.medicamentoByIdRequestPromise(idpac).then(
                    //promise success
                    function (response) {


                        console.log(response.data);
                        $scope.selectedMedicamentoDetail = response.data;
                        if(response.data.autorizaciones.estado!='aprobado'){
                            $scope.selectedMedicamentoId=-1;
                            alert('DEBE APROBAR');
                            
                        }else{
                            $scope.total=$scope.totala+$scope.total;
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


