/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.cosw.restcontrollers;

import edu.eci.cosw.samples.logica.Clase;
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
@RequestMapping("/medicamentos")
public class ManejadorMedicamentos {
    @Autowired
    Clase c;

    @RequestMapping(value="/{id}",method = RequestMethod.GET)
     public Medicamento consped(@PathVariable int id) throws OperationFailedException{
        Medicamento p=c.consultarMedicamento(id);
        
        if(p==null){
            throw new OperationFailedException();
        }
        return p;
     }
     
    @RequestMapping(method = RequestMethod.GET)        
    public List<Medicamento> allMedicamentos() {        
        List<Medicamento> m=new ArrayList<Medicamento>();
        m=(List<Medicamento>) c.consultarMedicamentos();
        return m;
    }
    
    @RequestMapping(value = "/pedido/{idpedido}",method = RequestMethod.GET)
    public List<Medicamento> consultarMedicamento(@PathVariable int idpedido){
        return c.consultarMedicamentoPorPedido(idpedido);
    }
    
    
    
    
}
