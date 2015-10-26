/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.cosw.samples.persistencia;


import edu.eci.cosw.samples.model.DetallePedido;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author Usuario
 */
public interface DetallesPedidosRepository extends CrudRepository<DetallePedido, Integer>{
   
    @Query("from DetallePedido p where p.idDetalle= :ln")
    public DetallePedido search(@Param("ln") int searchTerm);

}


