/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.cosw.samples.persistencia;

import edu.eci.cosw.samples.model.Autorizacion;
import edu.eci.cosw.samples.model.Inventario;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author Usuario
 */
public interface InventarioRepository extends CrudRepository<Inventario, Integer>{
    @Query("from Inventario i where i.idInventario= :ln")
    public Autorizacion search(@Param("ln") int searchTerm);
}
