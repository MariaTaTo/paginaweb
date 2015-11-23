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
         $scope.crearPedido = function () {
            
         $scope.detalles=[];
            for (x = 0; x < $scope.selectedMedicamentos.length; x++) {
               
               $scope.detallePedido = new DetallePedido($scope.medicamentoProveedor[x],1);
               $scope.detalles[x]=$scope.detallePedido;
               
            }
            for(t=0;t<$scope.detalles.length;t++){
                console.log('entro al for'+$scope.detalles[t]);
                
            }
            
             IPSRestAPI.pos($scope.paciente,$scope.total,$scope.detalles);
            console.log('Shopping kart updated' + JSON.stringify($scope.selectedMedicamentos));
            
         };
        $scope.medicamentos = [];
        
               
        $scope.totala = 0;
        
        $scope.total = 0;

        $scope.selectedMedicamentos = MedicamentosSelectionFactory.getData();

        $scope.selectedMedicamentoId = -1;

        $scope.selectedMedicamentoDetail = null;

        function DetallePedido(medicamentosPorProveedor, cantidad) {
            this.medicamentosPorProveedor = medicamentosPorProveedor;
            this.cantidad = cantidad;
        };
        
        $scope.availableMedicamentosRequestPromise = IPSRestAPI.medicamentosRequestPromise();

        $scope.addToSelectedMedicamentos = function () {
            
            MedicamentosSelectionFactory.addMedicamento($scope.selectedMedicamentoDetail);
            console.log('Shopping kart updated' + JSON.stringify($scope.selectedMedicamentos));
            
        };

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
                        if(response.data.autorizaciones.estado!='aprobado'){
                            $scope.selectedMedicamentoId=-1;
                            alert('Lo sentimos, este medicamento no puede seleccionarlo porque no está autorizado por su EPS, por favor tramite la solicitud por medio de la página y vuelva a intentarlo, recuerde que puede seguir el proceso de realizar el pedido. Gracias');
                            
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


