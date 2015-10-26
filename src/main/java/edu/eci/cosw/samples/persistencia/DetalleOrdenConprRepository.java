/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.cosw.samples.persistencia;

import edu.eci.cosw.samples.model.DetalleOrdenCompra;
import java.io.Serializable;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface DetalleOrdenConprRepository extends CrudRepository<DetalleOrdenCompra, Integer>{
    @Query("from Pedido p where p.idPedidos= :ln")
    public DetalleOrdenCompra search(@Param("ln") int searchTerm);
}