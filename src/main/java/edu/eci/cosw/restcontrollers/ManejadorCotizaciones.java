/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.cosw.restcontrollers;

import edu.eci.cosw.samples.logica.Clase;
import edu.eci.cosw.samples.model.Cotizacion;
import edu.eci.cosw.samples.model.DetalleInventario;
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
@RequestMapping("/cotizaciones")
public class ManejadorCotizaciones {
    @Autowired
    Clase c;

    
    @RequestMapping(method = RequestMethod.POST)        
    public ResponseEntity<?> addNewCotizacion(@RequestBody Cotizacion c) {       
        
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }
    
    @RequestMapping(method = RequestMethod.GET)        
    public List<Cotizacion> allDetallesCotizaciones() {        
        List<Cotizacion> m=new ArrayList<Cotizacion>();
        m=(List<Cotizacion>) c.consultarCotizaciones();
        return m;
    }
    
    @RequestMapping(value="/{id}", method = RequestMethod.GET)
    public Cotizacion CotizacionesPorId(@PathVariable int id) {  
        Cotizacion cot = c.consultarCotizacionPorId(id);
        return cot;
    } 
    
    
}
