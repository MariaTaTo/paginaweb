/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.cosw.samples.persistencia;

import edu.eci.cosw.samples.model.Medicamento;
import edu.eci.cosw.samples.model.MedicamentoPorProveedor;
import edu.eci.cosw.samples.model.Pedido;
import java.io.Serializable;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author Usuario
 */
public interface MedicamentoRepository extends CrudRepository<Medicamento, Integer>{
    @Query("from Medicamento p where p.idMedicamentos= :ln")
    public Pedido search(@Param("ln") int searchTerm);
    
     @Query("from Medicamento a")
    public List<Medicamento> getMedicamentos();
    
     @Query("Select distinct med FROM Pedido as pe inner join pe.detallesPedidos as dep \n" +
        "inner join dep.medicamentosPorProveedor as mpp\n" +
        "inner join mpp.medicamentos as med where pe.idPedidos= :idpedido ")
     public List<Medicamento> consultarMedicamentosPedido(@Param("idpedido") int idpedido);
    
     @Query("from Medicamento med where med.autorizaciones.numero= :numero")
     public Medicamento consultarMedicamentosAutorizacion(@Param("numero") Integer numero);
     
}
