(function () {
    var app = angular.module('IPSCONSULTAS', ['ngRoute','IPSServices']);
        
    app.controller('consultascontroller', function ($scope,MedicamentosSelectionFactory,IPSRestAPI) { 
        
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
         
        
        $scope.idPaciente;
        $scope.idDespacho;
        
        $scope.AutorizacionPorPaciente = function (){
            $scope.consulAuto = IPSRestAPI.getAutorizacionByPaciente($scope.idPaciente).success(function (data){
            $scope.consulAuto = data; 
          });
        };
        
        $scope.getAutorizacion = function(){
            $scope.consulAuto = IPSRestAPI.getConsultarAutorizacion().success(function(data){
            $scope.consulAuto = data;
        } );
        };
        
        $scope.DespachoPorPaciente = function (){
            $scope.consulDes = IPSRestAPI.getDespachoByPaciente($scope.idDespacho).success(function (data){
            $scope.consulDes = data; 
          });
        };
        
        $scope.getDespacho = function(){
            $scope.consulDes = IPSRestAPI.getConsultarDespacho().success(function(data){
            $scope.consulDes = data;
        } );
        };
        
        $scope.getMedProd= function(){
            
            $scope.medi = IPSRestAPI.getMedicamentoProveedor($scope.idmedicpp).success(function(data){
                $scope.medi= data;
                
                
                
            });
            
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


