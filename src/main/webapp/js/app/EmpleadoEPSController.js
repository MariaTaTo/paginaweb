(function () {
    var app = angular.module('IPSEMPLEADOEPS', ['ngRoute', 'IPSServices']);

    app.controller('empleadoepscontroller', function ($scope, AutorizacionesSeleccionFactory, IPSRestAPI) {

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////Login empleado/////////////////////////////////////////////////////
         
        $scope.empleado = 'empleado';
        $scope.autenticar = -1;
        $scope.terminoo = -1;
        $scope.select = -2;
        $scope.ideps = 1;
    
        
        $scope.loginEmpleado = function () {
            IPSRestAPI.empleadosEPSPorByIdRequestPromise($scope.empleado).then(
                    function (response) {

                        $scope.empleado = response.data;
                        alert('Empleado: ' + response.data.nombre + '  Eps: '+response.data.epsPertenece.nombre);
                        $scope.selectedEmpleadoId = response.data;
                        $scope.ideps=response.data.epsPertenece.idEps;
                        console.log('Empleado: ' + response.data.nombre+' Eps: '+response.data.epsPertenece.nombre);
                         console.log('Empleado telefono ' + response.data.telefono);
                         console.log('Empleado eps id ' + response.data.epsPertenece.idEps);
                         console.log('Empleado eps nombre' + response.data.epsPertenece.nombre);
                        $scope.autenticar = 1;
                    },
                    function (response) {
                        alert('incorrecto');
                        console.log('viene con id: ' + $scope.empleado);
                        console.log('Unable tdo get data from REST API:' + response);
                    }
            );
        };
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
 /*============================================================================OrdenDeCompra=========================================================
 ===================================================================================================================================================*/
         /*Numero de unidades del inventario*/
        $scope.selectedValue = null;
        $scope.selectedValue = {
            value: null
        };

        $scope.autorizaciones = [];
        $scope.medicamentoPrProveedorc = [];
        /*===================================================================*/
        /*=================Carga medicamentos segun la cantidad==============*/
        $scope.cargarAutorizacionesPorEps = function () {
            
            IPSRestAPI.autorizacionByEpsRequestPromise($scope.ideps).then(
                    function (response){
                        $scope.autorizaciones = response.data;
                    },
                    function (response) {
                        alert('No existe autorizaciones en estado pendiente');
                        console.log('No se pudieron traer las autrizaciones por estado:' + response);
                    }
            );
    $scope.select=2;
   
        };
        
        /*Numero de unidades a comprar*/
        $scope.selectedValueUnidades = null;
        $scope.selectedValueUnidades = {
            value: null
        };

        $scope.selectedMedicamentosCotizar = AutorizacionesSeleccionFactory.getData();
        $scope.selectedMedicamentoCotizarId = -1;
        $scope.selectedMedicamentoCotizarDetail = null;
        /*===================================================================*/
        /*=================Adiciona los medicamentos a comprar==============*/
       
        $scope.addToSelectedMedicamentosCotizar = function () {
            
            //AutorizacionesSeleccionFactory.addAutorizacion($scope.selectedAutorizacion);
           
            console.log('Medicamentos Seleccionados actualizado' + JSON.stringify($scope.selectedMedicamentosCotizar));
             
        };
        /*===================================================================*/
        /*=================Trae los medicamentos segun el id==============*/
        
        $scope.setSelectedMedicamentoCotizar = function (idpac,idAuto,autorizacion) {
           
            IPSRestAPI.putAutorizacion(idpac,idAuto);
           
            $scope.selectedAutorizacion = autorizacion;
            
            AutorizacionesSeleccionFactory.addAutorizacion($scope.selectedAutorizacion);
        
        };
       
      
        /*========================================================================================Fin!!OrdenDeCompra=======================================================
         ==================================================================================================================================================================*/
    });
    app.factory('AutorizacionesSeleccionFactory', function () {
        var data = {
            pacselection2: []
        };
        return {
            getData: function () {
                return data.pacselection2;
            },
            addAutorizacion: function (autorizacion) {
                data.pacselection2.push(autorizacion);
            }
        };
    });
})();