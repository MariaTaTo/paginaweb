/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.cosw.restcontrollers;

import edu.eci.cosw.samples.logica.Clase;
import edu.eci.cosw.samples.model.Medicamento;
import edu.eci.cosw.samples.model.MedicamentoPorProveedor;
import edu.eci.cosw.samples.model.Mensajero;
import edu.eci.cosw.samples.model.Paciente;
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
@RequestMapping("/mensajeros")
public class ManejadorMensajeros {
    @Autowired
    Clase c;

    @RequestMapping(value="/{id}",method = RequestMethod.GET)
     public Mensajero consped(@PathVariable int id) throws OperationFailedException{
        Mensajero p=c.consultarEmpleado(id);
        
        if(p==null){
            throw new OperationFailedException();
        }
        return p;
     }
     
     @RequestMapping(method = RequestMethod.GET)        
    public List<Mensajero> allPacientes() {        
        List<Mensajero> m=new ArrayList<Mensajero>();
        m=(List<Mensajero>) c.consultarEmpleados();
        return m;
    }
}
