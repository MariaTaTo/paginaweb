/* To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
*/
import java.util.List;
import static junit.framework.Assert.assertEquals;
import org.junit.Test;
  import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import edu.eci.cosw.samples.logica.Clase;
import edu.eci.cosw.samples.model.Autorizacion;
import edu.eci.cosw.samples.model.Despacho;
import edu.eci.cosw.samples.model.DetalleInventario;
import edu.eci.cosw.samples.model.DetalleOrdenCompra;
import edu.eci.cosw.samples.model.Epsafilida;
import edu.eci.cosw.samples.model.Inventario;
import edu.eci.cosw.samples.model.Medicamento;
import edu.eci.cosw.samples.model.MedicamentoPorProveedor;
import edu.eci.cosw.samples.model.Mensajero;
import edu.eci.cosw.samples.model.OrdenCompra;
import edu.eci.cosw.samples.model.Paciente;
import edu.eci.cosw.samples.model.Pedido;
import edu.eci.cosw.samples.model.Proveedor;
import edu.eci.cosw.samples.persistencia.AutorizacionRepository;
import edu.eci.cosw.samples.persistencia.CotizacionesRepository;
import edu.eci.cosw.samples.persistencia.DespachoRepository;
import edu.eci.cosw.samples.persistencia.DetallesInventarioRepository;
import edu.eci.cosw.samples.persistencia.DetallesOrdenesCompraRepository;
import edu.eci.cosw.samples.persistencia.EpsafilidaRepository;
import edu.eci.cosw.samples.persistencia.InventarioRepository;
import edu.eci.cosw.samples.persistencia.MedicamentoPPRepository;
import edu.eci.cosw.samples.persistencia.MedicamentoRepository;
import edu.eci.cosw.samples.persistencia.MensajeroRepository;
import edu.eci.cosw.samples.persistencia.OrdenesCompraRepository;
import edu.eci.cosw.samples.persistencia.PacientesRepository;
import edu.eci.cosw.samples.persistencia.PedidosRepository;
import edu.eci.cosw.samples.persistencia.ProveedoresRepository;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.hibernate.Query;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import static org.junit.Assert.*;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 *
 * @author Viviana
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:applicationContext.xml"})
public class Consultas{
    
    @Autowired
    PedidosRepository pr;
    @Autowired
    MedicamentoPPRepository mppr;
    @Autowired
    MedicamentoRepository mr;
    @Autowired
    PacientesRepository par;
    @Autowired
    EpsafilidaRepository epsr;
    @Autowired
    AutorizacionRepository ar;
    @Autowired
    DetallesInventarioRepository dir;
    @Autowired
    InventarioRepository invr;
    @Autowired
    CotizacionesRepository cr;
    @Autowired
    ProveedoresRepository prr;
    @Autowired
    OrdenesCompraRepository ocr;
    @Autowired
    DetallesOrdenesCompraRepository docr;
    @Autowired
    DespachoRepository desr;
     @Autowired
    MensajeroRepository mensar;
    
    @Autowired
    private Clase claseLogica;
    private MedicamentoPorProveedor mp;
    private MedicamentoPorProveedor mp1;
    private MedicamentoPorProveedor mp2;
    private Inventario inv;
    private DetalleInventario detalleinv1;
    private DetalleInventario detalleinv2;
    private DetalleInventario detalleinv3;
    private Despacho des;
    private Autorizacion auto;
    
    public Consultas() {
    }
  
    
   @Before
    public void cargarTest(){
        
        Epsafilida ea = new Epsafilida(11, "SaludCoopp", "Contributivo");
        auto = new Autorizacion(ea, new Date(2015 - 06 - 06), new Date(2016 - 06 - 06),"aprobada");
        Proveedor p2 = new Proveedor(10, "Julito", 8547854, "cra 18 #8-45", "Peru");
        Proveedor p = new Proveedor(11, "Lorenzo", 85474545, "cra 18 #8-45", "Peru");
        
        Medicamento m = new Medicamento(119, auto, "LirycaPastas", "medicamento para cancer", "tabletas", new Date(2015 - 04 - 04), new Date(2015 - 05 - 02));
        mp = new MedicamentoPorProveedor(750, m, p);
        Medicamento m1 = new Medicamento(120, auto, "Convivir", "e se usan como parte del tratamiento antirretroviral", "tabletas", new Date(2015 - 04 - 04), new Date(2015 - 05 - 02));
        mp1 = new MedicamentoPorProveedor(751, m1, p);
        Medicamento m2 = new Medicamento(121, auto, "novorapid", "es una insulina moderna (análogo de insulina) de acción rápida. ", "tabletas", new Date(2015 - 04 - 04), new Date(2015 - 05 - 02));
        mp2 = new MedicamentoPorProveedor(752, m2, p);
       Mensajero men = new Mensajero(1, "Juan Garzon", "mensajero", 644521, 425321, "cll 170 # 45-30", "juangarzon@priorityheth");
        mensar.save(men);
        
        Paciente pac = new Paciente(1075998984, ea, "julian", 8824515, "Cra 18 #8-15");
        par.save(pac);
        Pedido ped = new Pedido(pac, new Date(2015 - 05 - 05), "cra 18 #8-45");
        pr.save(ped);
      
          des = new Despacho(men, ped, "pendiente", 12,23);
         
        Inventario i = new Inventario(1, new Date(2015 - 04 - 04));
        DetalleInventario di = new DetalleInventario(i, mp, 20);
        DetalleInventario di1 = new DetalleInventario(i, mp1, 20);
        DetalleInventario di2 = new DetalleInventario(i, mp2, 20);
        OrdenCompra oc=new OrdenCompra(new Date(2015-04-04));
        
        ocr.save(oc);
        
        epsr.save(ea);
        ar.save(auto);
        prr.save(p2);
        prr.save(p);
        mr.save(m);
        mr.save(m1);
        mr.save(m2);
        mppr.save(mp);
        mppr.save(mp1);
        mppr.save(mp2);
        invr.save(i);
        dir.save(di);
        dir.save(di1);
        dir.save(di2); 
         desr.save(des);
    }
    
   
  
    @Test
   public void PruebaConsultarAutorizacionTest() {
        
       Autorizacion a=claseLogica.consultarAutorizacion(26);
       assertEquals( a.getEstado(),"pendiente");
       assertEquals( a.getEpsafilidas().getNombre(),"Marcela Olmeda Trejo");
      
    }
    
     @Test
    public void PruebaConsultarDespachoTest() {
        
       List<Despacho> despachos=claseLogica.ConsultarDespachoPaciente(119);
     
       Despacho d1=despachos.get(0);
       assertEquals( d1.getEstado() ,"pendiente");
       Integer numero=23;
       Integer numeroEspera=5;
       assertEquals( d1.getNumeroPagoCoutaModeradora(),numero);
       assertEquals( d1.getTiempoEspera(),numeroEspera);
    }

}


   
   
   
