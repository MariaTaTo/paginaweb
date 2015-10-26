(function () {
    var app = angular.module('IPS', ['ngRoute','IPSServices']);
        
    app.controller('ipscontroller', function ($scope,MedicamentosSelectionFactory,MedicamentosSeleccionCotizarFactory,IPSRestAPI) {
        
        $scope.usuario='usuario';
        $scope.paciente;
        $scope.Eps;
        $scope.EpsId;
        $scope.selectedPacienteId = -1;
        $scope.pedido;
        $scope.idordenCompra;
       

  
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
              
        
        $scope.getMedicamentos = function (){
            $scope.consulAuto = IPSRestAPI.getConsultarMedicamento().success(function(data){
            $scope.consulAuto = data;
        } );
        };
     
        $scope.ConsultarPedido=function(){
            
            $scope.pedido= IPSRestAPI.getOrdenCompra($scope.idordenCompra).success(function(data){
                $scope.pedido=data;
            });
            
        };
    
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


