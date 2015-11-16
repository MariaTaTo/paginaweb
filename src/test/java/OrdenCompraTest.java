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
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 *
 * @author Viviana
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:applicationContextH2.xml"})
public class OrdenCompraTest {

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
    ProveedoresRepository prr;
    @Autowired
    OrdenesCompraRepository ocr;
    @Autowired
    DetallesOrdenesCompraRepository docr;
    @Autowired
    Clase c;

    private MedicamentoPorProveedor mp;
    private MedicamentoPorProveedor mp1;
    private MedicamentoPorProveedor mp2;
    private MedicamentoPorProveedor mp3;
    private Inventario inv;
    private DetalleInventario di;
    private DetalleInventario di2;
    private DetalleInventario di3;
    private DetalleInventario di4;
    private DetalleOrdenCompra detoc;
    private DetalleOrdenCompra detoc1;
    private OrdenCompra o;

    public OrdenCompraTest() {
    }
    
     @Before
    public void setUp() {
        ocr.deleteAll();
        dir.deleteAll();
        invr.deleteAll();
        mppr.deleteAll();
        mr.deleteAll();
        ar.deleteAll();
        prr.deleteAll();
        par.deleteAll();
        epsr.deleteAll();
    }

    @Before
    public void cargarTest() {

        Epsafilida ea = new Epsafilida(11, "SaludCoopp", "Contributivo");

        Paciente pac = new Paciente(1075998984, ea, "julian", 8824515, "Cra 18 #8-15");

        Proveedor p2 = new Proveedor(10, "Julito", 8547854, "cra 18 #8-45", "Peru");
        Proveedor p = new Proveedor(11, "Lorenzo", 85474545, "cra 18 #8-45", "Peru");

        Autorizacion auto = new Autorizacion(ea, new Date(2015 - 06 - 06), new Date(2016 - 06 - 06), "aprobada", pac);

        Medicamento m = new Medicamento(219, auto, "Liricas", "Medicamento para cancer", "tabletas", new Date(2015 - 04 - 04), new Date(2015 - 05 - 02));
        Medicamento m1 = new Medicamento(220, auto, "Taxinos", "Se usan como parte del tratamiento antirretroviral", "tabletas", new Date(2015 - 04 - 04), new Date(2015 - 05 - 02));
        Medicamento m2 = new Medicamento(221, auto, "Novaripad", "Es una insulina moderna (an�logo de insulina) de acci�n r�pida. ", "tabletas", new Date(2015 - 04 - 04), new Date(2015 - 05 - 02));

        mp = new MedicamentoPorProveedor(850, m, p, 5323);
        mp1 = new MedicamentoPorProveedor(851, m, p2, 3233);
        mp2 = new MedicamentoPorProveedor(852, m2, p, 44323);
        mp3 = new MedicamentoPorProveedor(853, m2, p2, 23322);

        Inventario i = new Inventario(1, new Date());
        di = new DetalleInventario(i, mp, 5);
        di2 = new DetalleInventario(i, mp1, 5);
        di3 = new DetalleInventario(i, mp2, 10);
        di4 = new DetalleInventario(i, mp3, 10);
        
        Set<DetalleOrdenCompra> detalles = new HashSet<>(0);
        detoc = new DetalleOrdenCompra(mp2, 20);
        detoc1 = new DetalleOrdenCompra(mp3, 20);
        detalles.add(detoc);
        detalles.add(detoc1);
        o = new OrdenCompra(new Date(15-11-2015), detalles);
        
        epsr.save(ea);
        par.save(pac);
        prr.save(p2);
        prr.save(p);
        ar.save(auto);
        mr.save(m);
        mr.save(m1);
        mr.save(m2);

        mppr.save(mp);
        mppr.save(mp1);
        mppr.save(mp2);
        mppr.save(mp3);
        invr.save(i);
        dir.save(di);
        dir.save(di2);
        dir.save(di3);
        dir.save(di4);
        ocr.save(o);
    }
    /**
     * ***********************************************************************
     * 
     * El objetivo de esta prueba es comprobar que se regustro correctamento una
     * orden de compra con sus detalles 
     * Estado inicial: Base de dato con una ordenCompra y dos detallesOrdenCompra
     * 
     * Prueba: El tamaño de detallesOrdenCompra debe
     * ser igual a inicial mas loa creados
     * ***********************************************************************
     */
    @Test
    public void PruebaRegistrarOrdenDeCompraPorTamañoTest() {

          long tamInicial=docr.count();
      
         Set<DetalleOrdenCompra> detalles = new HashSet<>(0);

         DetalleOrdenCompra doc = new DetalleOrdenCompra(mp, 10);
         DetalleOrdenCompra doc1 = new DetalleOrdenCompra(mp1, 10);
         
         detalles.add(doc);
         detalles.add(doc1);
         
         OrdenCompra o2 = new OrdenCompra(new Date(), detalles);
           ocr.save(o2);
       
         long tamFinal=docr.count();

         assertEquals(tamInicial + 2, tamFinal);
    }
    /**
     * ***********************************************************************
     * 
     * El objetivo de esta prueba es comprobar que se registro correctamento una
     * orden de compra con sus detalles verificando los detalles segun la orden
     * Estado inicial: Base de dato con una orden de compra y 2 detallesOrdenCOmpra
     * Prueba: Los atributos de los detallesOrdenCompra de la orden de compra 
     * consultada deben ser iguales a los creados
     * ***********************************************************************
     */
    @Test
    public void PruebaConsultarDetallesSegunOrdenTest() {
    
        long tamInicial=docr.count();
        
        Iterator<OrdenCompra>ioc=ocr.findAll().iterator();
        
        OrdenCompra oo=new OrdenCompra();
        
        while(ioc.hasNext()==true)
        {
        oo=ioc.next();
        }
        
        Date fecha=oo.getFecha();
        
       Iterator<DetalleOrdenCompra>dioc=docr.findAll().iterator();
       
       DetalleOrdenCompra dopp=new DetalleOrdenCompra();
               
        while(dioc.hasNext()==true)
        {
        dopp=dioc.next();
        }
        
        int cantidad=dopp.getCantidad();
        int precio=dopp.getMedicamentosPorProveedor().getIdMedicamentosProvedor();
        
        assertEquals(fecha.getMonth(),11);
        assertEquals(cantidad,20);
      
    }
    /**
     * ***********************************************************************
     * El objetivo de esta prueba es consultar los medicamentos del inventario
     * dado un cantidad, corresponden a los de su agrupacion por medicamento
     * Estado inicial: Base de dato con inventario y 3 productos Prueba: La
     * consulta del inventario debe ser consistente con los medicamentos
     * ingresados
     * ***********************************************************************
     */
    @Test
    public void PruebaConsultarInventarioTest() {
       
        Iterator<DetalleInventario> it=dir.findAll().iterator();
        int numeroInv=0;
       
         while (it.hasNext() == true) {
         DetalleInventario dett = it.next();
         MedicamentoPorProveedor mpp1 = dett.getMedicamentosPorProveedor();
         System.out.println("Medicamento pp: " + mpp1.getIdMedicamentosProvedor());
         numeroInv++;
         }
         assertEquals("El numero de medicamentos consultados deberian ser consistentes", 4, numeroInv);
         
        assertEquals(1, 1);
    }
}
