/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.cosw.restcontrollers;

import edu.eci.cosw.samples.logica.Clase;
import edu.eci.cosw.samples.model.Epsafilida;
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

/**
 *
 * @author 2088395
 */

@RestController
@RequestMapping("/eps")
public class ManejadorEpsAfiliada {
    @Autowired
    Clase c;

    @RequestMapping(value="/{id}",method = RequestMethod.GET)
     public Epsafilida consped(@PathVariable int id) throws OperationFailedException{
        Epsafilida eps=c.consultarEpsafilida(id);
        
        if(eps==null){
            throw new OperationFailedException();
        }
        return eps;
     }
     
     @RequestMapping(method = RequestMethod.GET)        
    public List<Epsafilida> allEpsafilida() {        
        List<Epsafilida> eps=new ArrayList<Epsafilida>();
        eps=(List<Epsafilida>) c.consultarEpsafilidas();
        return eps;
    }
}
