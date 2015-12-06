(function () {
    var app = angular.module('IPSServices', []);

    app.service('IPSRestAPI', function ($http) {
        
         this.pos =function(paciente,total,detallePedido){
             
                $http.post('rest/pedidos' , {"pacientes":paciente,"fechaLlegada":"2015-03-03","direccion":"Cra 18 # 5-15","detallesPedidos":detallePedido}).
                        success(function(){
                                      alert('Felicidades'+paciente.nombre+' su pedido fue creado exitosamente y tiene un costo de'+total);
                }).error(function(){
                    alert("NOOOOO");
                });
                
                
        }; 
        
        //IPSRestAPI.put($scope.usuario,$scope.idautorizacion);
        this.put =function(paciente,idautorizacion){
             alert('entro al metodo puuuuuuuuuuuuut');
             
                $http.put('rest/autorizaciones/'+idautorizacion , {numero:idautorizacion,estado:"pendiente"}).
                        success(function(){
                                      alert('Felicidades'+paciente.nombre+' su autorización fue enviada correctamente');
                }).error(function(){
                    alert("   ----- No se pudo enviar la solicitud ------"+paciente.nombre);
                });
                
                
        }; 
        
        
        
        
       this.pacientesRequestPromise = function () {            
            return $http({
                method: 'GET',
                url: 'rest/pacientes'
            });            
        };
        
        this.pacienteByIdRequestPromise = function (idped) {            
            return $http({
                method: 'GET',
                url: 'rest/pacientes/'+idped
            });            
        };
        
         this.epsRequestPromise = function () {            
            return $http({
                method: 'GET',
                url: 'rest/eps'
            });            
        };
        
        this.epsByIdRequestPromise = function (ideps) {            
            return $http({
                method: 'GET',
                url: 'rest/eps/'+ideps
            });            
        };
        
        
         this.pedidosRequestPromise = function () {            
            return $http({
                method: 'GET',
                url: 'rest/pedidos'
            });            
        };
        
        this.pedidoByIdRequestPromise = function (idped) {            
            return $http({
                method: 'GET',
                url: 'rest/pedidos/'+idped
            });            
        };
        
        this.medicamentosRequestPromise = function () {            
            return $http({
                method: 'GET',
                url: 'rest/medicamentospp'
            });            
        };
        
        this.medicamentoByIdRequestPromise = function (idped) {            
            return $http({
                method: 'GET',
                url: 'rest/medicamentos/'+idped
            });            
        };
        
        this.autorizacionesRequestPromise = function () {            
            return $http({
                method: 'GET',
                url: 'rest/autorizaciones'
            });            
        };
        
        this.autorizacionByIdRequestPromise = function (idped) {            
            return $http({
                method: 'GET',
                url: 'rest/autorizaciones/'+idped
            });            
        };
        
         this.medicamentosppRequestPromise = function () {            
            return $http({
                method: 'GET',
                url: 'rest/medicamentospp'
            });            
        };
        
        this.medicamentoppByIdRequestPromise = function (idped) {            
            return $http({
                method: 'GET',
                url: 'rest/medicamentospp/'+idped
            });            
        };
        
        this.detalleOrdenCompraRequestPromise = function(){
          return $http({
              method : 'GET',
              url: 'rest/detallesOrdenesCompra'
          });  
        };
        
        this.detalleOrdenCompraByIdRequestPromise = function(id){
            
            return $http({
                
              method : 'GET',
              url: 'rest/detallesOrdenesCompra/'+id
            });
        };
        
        this.getDetalleOrdenCompra= function(id){
          
            return $http({
                
              method : 'GET',
              url: 'rest/detallesOrdenesCompra/'+id
            });
            
            
          
        };
        
        this.getMedicamentoProveedor = function(id){
            
            return $http({
                
              method : 'GET',
              url: 'rest/medicamentospp/'+id
            });
            
           
            
        };
                
        this.getAutorizacionByPaciente = function(id){
            
            return $http({
                
              method : 'GET',
              url: 'rest/autorizaciones/'+id
            });
        };
        
       
    
        this.getDespachoByPaciente = function(id){
            
            return $http({
                
              method : 'GET',
              url: 'rest/despachos/'+id
            });
        };
        
        
        //////////////////////////////////////////////////////////////////////////
        this.mensajerosRequestPromise = function () {            
            return $http({
                method: 'GET',
                url: 'rest/mensajeros'
            });            
        };
        
        this.mensajerosByIdRequestPromise = function (id) {            
            return $http({
                method: 'GET',
                url: 'rest/mensajeros/'+id
            });            
        };
        ///////////////////////////////////////////////////////////////////
         
            
            this.posDetalleOrdenCompra =function(medicamentosPorProveedor,cantidad){
            alert('Entro al post '+medicamentosPorProveedor.idMedicamentosProvedor);
             $http.post('rest/detallesOrdenesCompra' , {"medicamentosPorProveedor":medicamentosPorProveedor,"cantidad":cantidad}).
                        success(function(){
                                      alert('DetalleOrdenDeCompra Realizadan=)');
                }).error(function(){
                    alert("Detalle Orden Compra fallida =(");
                });
            };
            
             this.posGenerarOrdenCompra =function(fecha,detallesOrdenesCompras){
           
             $http.post('rest/ordenesCompra' , {"fecha":fecha,"detallesOrdenesCompras":detallesOrdenesCompras}).
                        success(function(){
                                      alert('Orden De Compra Realizada exitosamente');
                }).error(function(){
                    alert("Orden Compra fallida");
                });
            };
            
          this.ordenCompraByIdRequestPromise = function (idOrdenesCompra) {            
            return $http({
                method: 'GET',
                url: 'rest/ordenesCompra/'+idOrdenesCompra
            });            
        };
        
        this.ordenCompraRequestPromise = function () {            
            return $http({
                method: 'GET',
                url: 'rest/ordenesCompra/'
            });            
        };
        
        this.proveedoresRequestPromise = function () {            
            return $http({
                method: 'GET',
                url: 'rest/proveedores'
            });            
        };
        
        this.pacienteByIdRequestPromise = function (idped) {            
            return $http({
                method: 'GET',
                url: 'rest/pacientes/'+idped
            });            
        };
        
        this.detalleIByCantidadPromise = function (cantidad) {            
            return $http({
                method: 'GET',
                url: 'rest/detalleInventario/'+cantidad
            });            
        };
        
        this.medicamentoAumento =function(medicamentosPorProveedor,cantidad){
           
             $http.post('rest/detalleInventario' , {"medicamentosPorProveedor":medicamentosPorProveedor,"cantidad":cantidad, "idInventario":1}).
                        success(function(){
                                      alert('DetalleInventario Realizada');
                }).error(function(){
                    alert('DetalleInventario Realizada');
                });
            };
        
         this.autorizacionByEstadoRequestPromise = function (estado) {            
            return $http({
                method: 'GET',
                url: 'rest/autorizaciones/estado/'+estado
            });   
             
        };
        
         this.autorizacionByEpsRequestPromise = function (eps) {            
            return $http({
                method: 'GET',
                url: 'rest/autorizaciones/eps/'+eps
            });
        };
        
        
         this.empleadosEPSPorByIdRequestPromise = function (id) {            
            return $http({
                method: 'GET',
                url: 'rest/empleadoEPS/'+id
            });            
        };
        
       this.putAutorizacionAprobado =function(paciente,idautorizacion, autorizacion){
                $http.put('rest/autorizaciones/'+idautorizacion , {numero:idautorizacion,estado:"aprobado"}).
                        success(function(){
                                      alert('La autorizacion fue aprobada');
                }).error(function(){
                    alert("   ----- No se pudo enviar la solicitud ------");
                });
        }; 
        
        this.putAutorizacionRechazado =function(paciente,idautorizacion, autorizacion){
             
                $http.put('rest/autorizaciones/'+idautorizacion , {numero:idautorizacion,estado:"rechazada"}).
                        success(function(){
                                      alert('La autorizacion fue rechazada');
                }).error(function(){
                    alert("   ----- No se pudo enviar la solicitud ------");
                });
        };
        
        this.autorizacionByIdRequestPromise = function (id) {            
            return $http({
                method: 'GET',
                url: 'rest/autorizaciones/numero/'+id
            });
        };
        
        
        
        
    }
    );

})();





