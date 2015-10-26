/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.cosw.restcontrollers;


import edu.eci.cosw.samples.logica.Clase;
import edu.eci.cosw.samples.model.Autorizacion;
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
@RequestMapping("/autorizaciones")
public class ManejadorAutorizaciones {
    @Autowired
    Clase c;
 
 /*@RequestMapping(value="/{id}", method = RequestMethod.GET)
     public Autorizacion consped(@PathVariable int id) throws OperationFailedException{
        Autorizacion au = c.consultarAutorizacion(id);
        
        if(au==null){
            throw new OperationFailedException();
        }
        return au;
     }*/
    
     @RequestMapping(method = RequestMethod.GET)        
    public List<Autorizacion> allAutorizaciones() {        
        List<Autorizacion> au = new ArrayList<Autorizacion>();
        au=(List<Autorizacion>) c.consultarAutorizaciones();
        return au;
    }
       
    @RequestMapping(value = "/",method = RequestMethod.GET)
    public List<Autorizacion> consultarTodasAutorizaciones()throws OperationFailedException{
        return c.TodasAutorizaciones();
    }
    
    @RequestMapping(value = "/{id}",method = RequestMethod.GET)
    public List<Autorizacion> AutorizacionPorPaciente(@PathVariable int id)throws OperationFailedException{
        return c.ConsultarAutorizacionPaciente(id);
    }
    
    
}
