(function () {
    var app = angular.module('IPSServices', []);

    app.service('IPSRestAPI', function ($http) {
        
        this.pos =function(paciente){
                $http.post('rest/pedidos' , {"pacientes":paciente,"fechaLlegada":"2015-03-03","direccion":"Cra 18 # 5-15"}).
                        success(function(){
                                      alert('Felicidades,su pedido fue creado exitosamente');
                }).error(function(){
                    alert("NOOOOO");
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
                url: 'rest/medicamentos'
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
              url: 'rest/detalleOrdenCompra'
          });  
        };
        
        this.detalleOrdenCompraByIdRequestPromise = function(id){
            
            return $http({
                
              method : 'GET',
              url: 'rest/detalleOrdenCompra/'+id
            });
        };
        
        this.getOrdenCompra= function(id){
          
            return $http.get('http://localhost:8080/intento1/rest/detalleOrdenCompra/'+id);
        };
        
        this.getAutorizacionByPaciente = function(id){
            return $http.get('http://localhost:8080/intento1/rest/autorizaciones/'+id);
        }; 
        
        this.getConsultarAutorizacion = function(){
            return $http.get('http://localhost:8080/intento1/rest/autorizaciones/');
        };
        
        this.getConsultarDespacho= function(){
            return $http.get('http://localhost:8080/intento1/rest/despachos/');
        };
        
        this.getConsultarDespacho= function(){
            return $http.get('http://localhost:8080/intento1/rest/despachos/');
        };
        
        
       this.getDespachoByPaciente = function(id){
            return $http.get('http://localhost:8080/intento1/rest/despachos/'+id);
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
          this.posCotizar =function(medicamento,proveedor,cantidad,precio){
           
             $http.post('rest/cotizaciones' , {"medicamentos":medicamento,"proveedores":proveedor,"cantidad":cantidad,"precio":precio}).
                        success(function(){
                                      alert('Cotizacion Realizada');
                }).error(function(){
                    alert("NOOOOO");
                });
            };
            
            this.posDetalleOrdenCompra =function(medicamentosPorProveedor,ordenesCompra,cantidad){
           
             $http.post('rest/detallesOrdenesCompra' , {"medicamentosPorProveedor":medicamentosPorProveedor,"ordenesCompra":ordenesCompra,"cantidad":cantidad}).
                        success(function(){
                                      alert('DetalleOrdenDeCompra Realizada');
                }).error(function(){
                    alert("Detalle Orden Compra fallida");
                });
            };
            
             this.posGenerarOrdenCompra =function(){
           
             $http.post('rest/ordenesCompra' , {"fecha":"2015-10-23"}).
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
        
        
        
        
        
        
        
    }
    );

})();





