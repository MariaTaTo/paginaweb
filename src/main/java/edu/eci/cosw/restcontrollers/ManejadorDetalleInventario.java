/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.cosw.restcontrollers;

import edu.eci.cosw.samples.logica.Clase;
import edu.eci.cosw.samples.model.DetalleInventario;
import edu.eci.cosw.samples.model.Medicamento;
import edu.eci.cosw.samples.model.MedicamentoPorProveedor;
import edu.eci.cosw.samples.model.Pedido;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/detalleInventario")
public class ManejadorDetalleInventario {
    @Autowired
    Clase c;

    
     @RequestMapping(method = RequestMethod.GET)        
    public List<DetalleInventario> allDetallesInventario() {        
        List<DetalleInventario> m=new ArrayList<DetalleInventario>();
        m=(List<DetalleInventario>) c.consultarDetalleInventario();
        return m;
    }
    @RequestMapping(value="/{cantidad}", method = RequestMethod.GET)
    public Iterable<DetalleInventario> traerDetalleInventario(@PathVariable int cantidad) {  
        Iterable<DetalleInventario> cat = c.cargarDetalleInventarioPorCantidad(cantidad);
        return cat;
    } 
    
    
    
}
