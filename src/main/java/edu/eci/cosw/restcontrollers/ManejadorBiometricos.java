/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.cosw.restcontrollers;

import edu.eci.cosw.samples.logica.Clase;
import edu.eci.cosw.samples.model.Biometrico;
import edu.eci.cosw.samples.model.Medicamento;
import edu.eci.cosw.samples.model.MedicamentoPorProveedor;
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
@RequestMapping("/biometricos")
public class ManejadorBiometricos {
    @Autowired
    Clase c;

    @RequestMapping(value="/{codBiometrico}",method = RequestMethod.GET)
     public Biometrico conspedPorCodBiometrico(@PathVariable String codBiometrico) throws OperationFailedException{
        Biometrico b=c.consultarBiometricoPorCodigo(codBiometrico);
        
        if(b==null){
            throw new OperationFailedException();
        }
        return b;
     }
     
     
       
     
    
    
    
}
