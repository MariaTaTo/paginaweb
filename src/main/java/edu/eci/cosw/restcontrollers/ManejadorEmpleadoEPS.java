/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.cosw.restcontrollers;

import edu.eci.cosw.samples.logica.Clase;
import edu.eci.cosw.samples.model.EmpleadoEPS;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("/empleadoEPS")
public class ManejadorEmpleadoEPS{
    @Autowired
    Clase c;

    @RequestMapping(value="/{id}",method = RequestMethod.GET)
     public EmpleadoEPS consped(@PathVariable int id) throws OperationFailedException{
        EmpleadoEPS e=c.consultarEmpleadoEPS(id);
        
        if(e==null){
            throw new OperationFailedException();
        }
        return e;
     }
     
     
}
