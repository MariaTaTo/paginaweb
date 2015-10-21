/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.cosw.restcontrollers;

import edu.eci.cosw.samples.logica.Clase;
import edu.eci.cosw.samples.model.DetalleOrdenCompra;
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
@RequestMapping("/detalleOrdenCompra")
public class ManejadorDetalleOrdenCompra {
    
    @Autowired
    Clase c;

    @RequestMapping(value="/{id}",method = RequestMethod.GET)
     public DetalleOrdenCompra consped(@PathVariable int id) throws OperationFailedException{
        DetalleOrdenCompra p=c.consultarOrden(id);
        
        if(p==null){
            throw new OperationFailedException();
        }
        return p;
     }
     
     @RequestMapping(method = RequestMethod.GET)        
    public List<DetalleOrdenCompra> allPedidos() {        
        List<DetalleOrdenCompra> p=new ArrayList<DetalleOrdenCompra>();
        p=(List<DetalleOrdenCompra>) c.consultarOrdenes();
        return p;
    }

    
}
