/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.cosw.samples.logica;

import edu.eci.cosw.samples.model.Pedido;
import static java.util.Collections.list;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 *
 * @author Usuario
 */
public class ClaseMain {


    
    public static void main(String[] args)  {
        
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("applicationContext.xml");  
        Clase c = applicationContext.getBean(Clase.class);
        Pedido p = c.consultarPedido(93);
        System.out.println("el pedodp que trae viene connnnnn "+p.getIdPedidos());
    }   
    
}
