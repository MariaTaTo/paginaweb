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
        $scope.numeroMedi;
     
       

  
        $scope.login=function(){
                IPSRestAPI.pacienteByIdRequestPromise($scope.usuario).then(
                    //promise success
                    function (response) {
                        $scope.paciente=response.data;
                        console.log('paciente quedoooo con '+response.data.nombre);
                        $scope.selectedPacientesId = response.data;
                        $scope.Eps=response.data.epsafilidas;
                        $scope.EpsId=response.data.epsafilidas.idEps;
                        /*console.log('mirar si esto fincionaaaaaaaaaa'+response.data.epsafilidas.idEps);
                        console.log('aca que viene : '+$scope.usuario);*/
                    },
                    //promise error
                    function (response) {
                       
                        console.log('viene con id: '+ $scope.usuario);
                        console.log('Unable tdo get data from REST API:' + response);
                    }
                );
    }
         
        
        $scope.idPaciente;
        $scope.idDespacho;
        
        $scope.AutorizacionPorPaciente = function (){
            $scope.consulAuto = IPSRestAPI.getAutorizacionByPaciente($scope.idPaciente).success(function (data){
            $scope.consulAuto = data; 
            $scope.numeroMedi = data.numero;
            
               
          });
        };
        
         /* $scope.AutorizacionPorPaciente = function (){
              IPSRestAPI.getAutorizacionByPaciente($scope.idPaciente).then(
                             function (response) {

                        $scope.consulAuto = response.data;
                        alert('numero ' + response.data.numero);
                        console.log('numero ' + response.data.numero);
                       $scope.numeroMedi = response.data.numero;
                      
                    },
                    function (response) {
                        alert('incorrecto');
                        
                    }
            );
        
          }*/
      
        
        $scope.AutorizacionPorMedicamento = function (){
            $scope.consulAutoMedicamento = IPSRestAPI.getAutorizacionByMedicamento($scope.numeroMedi).success(function (data){
            $scope.consulAutoMedicamento = data; 
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


