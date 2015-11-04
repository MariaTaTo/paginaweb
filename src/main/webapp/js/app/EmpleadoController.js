(function () {
    var app = angular.module('IPSEMPLEADO', ['ngRoute','IPSServices']);
        
    app.controller('empleadocontroller', function ($scope,MedicamentosSeleccionCotizarFactory,IPSRestAPI) {
        
      
    
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////Login empleado/////////////////////////////////////////////////////
       $scope.empleado='empleado';
       $scope.autenticar=-1;
       $scope.loginEmpleado=function(){
                IPSRestAPI.mensajerosByIdRequestPromise($scope.empleado).then(
                    //promise success
                    function (response) {
                         
                        $scope.empleado=response.data;
                        alert('Empleado '+response.data.nombre);
                        console.log('Empleado con '+response.data.nombre);
                        $scope.selectedEmpleadoId = response.data;
                        $scope.autenticar=1;
                    },
                    //promise error
                    function (response) {
                         alert('incorrecto');
                        console.log('viene con id: '+ $scope.empleado);
                        console.log('Unable tdo get data from REST API:' + response);
                    }
                );
            };
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    /*============================================================================OrdenDeCompra=========================================================
=================================================================================================================================================*/
                                        $scope.totalApples = 30;
                                        $scope.selectedValue = null;
                                        /*Numero de unidades del inventario*/
                                        $scope.getNumeroUnidades = function () {
                                            
                                            var i, totalApples = +($scope.totalApples) || 0, res = [];
                                            for (i = 1; i <= totalApples; i++) {
                                                res.push(i);
                                            }
                                            return res;
                                        };

                                        $scope.detallesInventario = [];
                                        $scope.medicamentoPrProveedorc = [];
                                        /*Carga medicamentos segun la cantidad*/
                                        $scope.cargarDetalleInventarioPorCantidad = function () {
                                            IPSRestAPI.detalleIByCantidadPromise($scope.selectedValue).then(
                                                    function (response) {
                                                        $scope.detallesInventario = response.data;
                                                        var i;
                                                        for (i = 0; i < $scope.detallesInventario.length; i++) {
                                                            $scope.medicamentoPrProveedorc[i] = response.data[i].medicamentosPorProveedor;
                                                            console.log('Medicamentos Por Proveedor:' + $scope.medicamentoPrProveedorc[i]);
                                                        }
                                                    },
                                                    function (response) {
                                                        alert('incorrecto');
                                                        console.log('No se pudieron traer medicamentos por proveedor:' + response);
                                                    }
                                            );
                                        };
                                        /*Numero de unidades a comprar*/
                                        $scope.totalApples2 = 10;
                                        $scope.selectedValueUnidades = null;

                                        $scope.getNumeroUnidadesAComprar = function () {
                                            var i, totalApples2 = +($scope.totalApples2) || 0, res = [];
                                            for (i = 1; i <= totalApples2; i++) {
                                                res.push(i);
                                            }
                                            return res;
                                        };

                                        $scope.medicamentosCotizar = [];
                                        $scope.selectedMedicamentosCotizar = MedicamentosSeleccionCotizarFactory.getData();
                                        $scope.selectedMedicamentoCotizarId = -1;
                                        $scope.selectedMedicamentoCotizarDetail = null;
                                        /*Adiciona medicamentos a comprar-cotizar*/
                                        $scope.addToSelectedMedicamentosCotizar = function () {
                                            MedicamentosSeleccionCotizarFactory.addMedicamento($scope.selectedMedicamentoCotizarDetail);
                                            console.log('Medicamentos Seleccionados actualizado' + JSON.stringify($scope.selectedMedicamentosCotizar));
                                        };
                                        /*Trae los medicamentos segun el id*/
                                        $scope.setSelectedMedicamentoCotizar = function (idpac) {
                                            $scope.selectedMedicamentoCotizarId = idpac;

                                            IPSRestAPI.medicamentoByIdRequestPromise(idpac).then(
                                                    function (response) {
                                                        $scope.selectedMedicamentoCotizarDetail = response.data;
                                                        alert('Debe aprobar seleccion del medicamento');
                                                    },
                                                    function (response) {
                                                        console.log('viene con id: ' + $scope.selectedMedicamentoCotizarId);
                                                        console.log('Unable tdo get data from REST API:' + response);
                                                    }
                                            );
                                        };

                                        $scope.medicamentos = [];
                                        $scope.medicamentosPP = [];
                                        $scope.proveedor = [];
                                        $scope.idOrden;
                                        /*Crear orden de compra*/
                                        $scope.crearOrdenCompra = function () {
                                            $scope.idOrden = 73;
                                            IPSRestAPI.posGenerarOrdenCompra();
                                            $scope.ordenCompraId;
                                            $scope.AvaliableOrdenesCompra = IPSRestAPI.ordenCompraRequestPromise();
                                            $scope.ordenCompraC = [];
                                            /*Trae todas ordenes de ocmpra*/
                                            $scope.AvaliableOrdenesCompra.then(
                                                    function (response) {
                                                        $scope.ordenCompra = response.data.idOrdenesCompra;
                                                        this.tamaño = response.data.length;
                                                        $scope.idOrden = response.data[this.tamaño - 1].idOrdenesCompra;
                                                    },
                                                    function (response) {
                                                        alert('incorrecto');
                                                        console.log('No pudo crear orden de compra:' + response);
                                                    }
                                            );
                                            /*Trae orden de compra por id*/
                                            $scope.OrdenCreadaId;
                                            IPSRestAPI.ordenCompraByIdRequestPromise($scope.idOrden).then(
                                                    function (response) {
                                                        $scope.OrdenCreadaId = response.data;
                                                    },
                                                    function (response) {
                                                        console.log('No pudo traer orden de compra por id:' + response.data);
                                                    }
                                            );

                                            var k;
                                            $scope.cantidad = $scope.selectedValueUnidades;
                                            for (k = 0; k < $scope.medicamentoPrProveedorc[k].length; k++) {
                                                $scope.med = MedicamentosSeleccionCotizarFactory.getData()[k];
                                                IPSRestAPI.posDetalleOrdenCompra($scope.medicamentoPrProveedorc[k], $scope.OrdenCreadaId, $scope.cantidad);
                                            }
                                        };
                                    
 /*========================================================================================Fin!!OrdenDeCompra=======================================================
 ==================================================================================================================================================================*/
    
    });
    
   
    
    
                            app.factory('MedicamentosSeleccionCotizarFactory', function () {
                                var data = {
                                    pacselection2: []
                                };
                                return {
                                    getData: function () {
                                        return data.pacselection2;
                                    },
                                    addMedicamento: function (medicamento) {
                                        data.pacselection2.push(medicamento);
                                    }
                                };
                            });
   
    

    

})();


