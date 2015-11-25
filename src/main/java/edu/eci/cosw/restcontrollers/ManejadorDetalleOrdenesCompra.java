/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.cosw.restcontrollers;

import edu.eci.cosw.samples.logica.Clase;
import edu.eci.cosw.samples.model.DetalleInventario;
import edu.eci.cosw.samples.model.DetalleOrdenCompra;
import edu.eci.cosw.samples.model.Medicamento;
import edu.eci.cosw.samples.model.MedicamentoPorProveedor;
import edu.eci.cosw.samples.model.Pedido;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/detallesOrdenesCompra")
public class ManejadorDetalleOrdenesCompra {
    @Autowired
    Clase c;

    
     @RequestMapping(method = RequestMethod.GET)        
    public List<DetalleOrdenCompra> allDetallesOrdenCompra() {        
        List<DetalleOrdenCompra> m=new ArrayList<DetalleOrdenCompra>();
        m=(List<DetalleOrdenCompra>) c.consultarDetalleOrdenCompra();
        return m;
    }
    @RequestMapping(value="/{id}", method = RequestMethod.GET)
    public DetalleOrdenCompra traerDetalleInventario(@PathVariable int id) {  
        DetalleOrdenCompra cat = c.consultarDetalleOrdenCompraPorId(id);
        return cat;
    } 
    
     @RequestMapping(method = RequestMethod.POST)        
    public ResponseEntity<?> addDetallesPedido(@RequestBody DetalleOrdenCompra dp) {       
        c.addNewDetalleOrdenCompra(dp);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }
     
    
    
    
    
}
