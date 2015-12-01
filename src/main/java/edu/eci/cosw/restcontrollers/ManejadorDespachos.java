/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.cosw.restcontrollers;


import edu.eci.cosw.samples.logica.Clase;
import edu.eci.cosw.samples.model.Autorizacion;
import edu.eci.cosw.samples.model.Despacho;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author 2088395
 */

@RestController
@RequestMapping("/despachos")
public class ManejadorDespachos {
    @Autowired
    Clase c;
  
    @RequestMapping(method = RequestMethod.GET)        
    public List<Despacho> allDespachos() {        
        List<Despacho> au = new ArrayList<Despacho>();
        au=(List<Despacho>) c.consultarDespachos();
        return au;
    }
   
    @RequestMapping(value = "/",method = RequestMethod.GET)
    public List<Despacho> consultarTodasDespacho()throws OperationFailedException{
        return c.TodasDespacho();
    }
    
    @RequestMapping(value = "/{id}",method = RequestMethod.GET)
    public List<Despacho> DespachoPorPaciente(@PathVariable int id)throws OperationFailedException{
        return c.ConsultarDespachoPaciente(id);
    }
    
     @RequestMapping(value = "/pedidos/{id}",method = RequestMethod.GET)
    public Despacho DespachoPorPedido(@PathVariable Integer id){
        return c.consultarDespachoPorPedido(id);
    }
    

    
    
    
}
