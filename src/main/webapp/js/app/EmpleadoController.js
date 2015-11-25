(function () {
    var app = angular.module('IPSEMPLEADO', ['ngRoute', 'IPSServices']);

    app.controller('empleadocontroller', function ($scope, MedicamentosSeleccionCotizarFactory, IPSRestAPI) {

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////Login empleado/////////////////////////////////////////////////////
         
        $scope.empleado = 'empleado';
        $scope.autenticar = -1;
        $scope.terminoo = -1;
        $scope.select = -2;
    
        
        $scope.loginEmpleado = function () {
            IPSRestAPI.mensajerosByIdRequestPromise($scope.empleado).then(
                    function (response) {

                        $scope.empleado = response.data;
                        alert('Empleado ' + response.data.nombre);
                        console.log('Empleado con ' + response.data.nombre);
                        $scope.selectedEmpleadoId = response.data;
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

        $scope.detallesInventario = [];
        $scope.medicamentoPrProveedorc = [];
        /*===================================================================*/
        /*=================Carga medicamentos segun la cantidad==============*/
        $scope.cargarDetalleInventarioPorCantidad = function () {
            IPSRestAPI.detalleIByCantidadPromise($scope.selectedValue.value).then(
                    function (response) {
                        $scope.detallesInventario = response.data;
                        var i;
                        for (i = 0; i < $scope.detallesInventario.length; i++) {
                            $scope.medicamentoPrProveedorc[i] = response.data[i].medicamentosPorProveedor;
                            console.log('Medicamentos Por Proveedor:' + $scope.medicamentoPrProveedorc[i]);
                        }
                    },
                    function (response) {
                        alert('No existe un medicamento con la cantidad');
                        console.log('No se pudieron traer medicamentos por proveedor:' + response);
                    }
            );
    $scope.select=2;
   
        };
        
        /*Numero de unidades a comprar*/
        $scope.selectedValueUnidades = null;
        $scope.selectedValueUnidades = {
            value: null
        };

        $scope.selectedMedicamentosCotizar = MedicamentosSeleccionCotizarFactory.getData();
        $scope.selectedMedicamentoCotizarId = -1;
        $scope.selectedMedicamentoCotizarDetail = null;
        /*===================================================================*/
        /*=================Adiciona los medicamentos a comprar==============*/
        $scope.precioTotal=0;
        $scope.precio=0;
        $scope.addToSelectedMedicamentosCotizar = function () {
            MedicamentosSeleccionCotizarFactory.addMedicamento($scope.selectedMedicamentoCotizarDetail);
            $scope.precioTotal= $scope.precioTotal+$scope.precio;
            console.log('Medicamentos Seleccionados actualizado' + JSON.stringify($scope.selectedMedicamentosCotizar));
             
        };
        /*===================================================================*/
        /*=================Trae los medicamentos segun el id==============*/
        
        $scope.setSelectedMedicamentoCotizar = function (idpac,precio) {
            $scope.selectedMedicamentoCotizarId = idpac;
             $scope.precio= precio;
            IPSRestAPI.medicamentoppByIdRequestPromise(idpac).then(
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
       /*===================================================================*/
        /*=======================Detalles ordene Compra=====================*/
        function DetalleOrdenCompra(medicamentosPorProveedor, cantidad) {
            this.medicamentosPorProveedor = medicamentosPorProveedor,
                    this.cantidad = cantidad;
        };
       /*===================================================================*/
        /*=======================Crear orden de compra======================*/
        $scope.crearOrdenCompra = function () {
            
            $scope.precioTotal2=$scope.precioTotal*$scope.selectedValueUnidades.value;
           
            IPSRestAPI.ordenCompraRequestPromise().then(
                    function (response) {
                        $scope.tamm = response.data.length;
                        $scope.numero = response.data[$scope.tamm-1].idOrdenesCompra;
                        $scope.numero=$scope.numero+1;
                    },
                    function (response) { 
                        console.log('No se pudieron traer ordenes Compra:' + response);
                    }
            );
    
            var k;
            $scope.cantidad = $scope.selectedValueUnidades.value;
            $scope.cantidadDeDetalles = MedicamentosSeleccionCotizarFactory.getData().length;
            $scope.ArrayDetallesOrdenes = [];
         
            for (k = 0; k < $scope.cantidadDeDetalles; k++) {
               
               $scope.med = MedicamentosSeleccionCotizarFactory.getData()[k];
               $scope.detalleOrdenCompra = new DetalleOrdenCompra($scope.med, $scope.cantidad);
               $scope.ArrayDetallesOrdenes[k]= $scope.detalleOrdenCompra;   
            }
         
            $scope.fecha = new Date();
             $scope.fechaString = $scope.fecha.getDate() + "/" + ($scope.fecha.getMonth() +1) + "/" + $scope.fecha.getFullYear();
            IPSRestAPI.posGenerarOrdenCompra($scope.fecha, $scope.ArrayDetallesOrdenes);
            $scope.terminoo = 1;
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