/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.cosw.samples.persistencia;

import edu.eci.cosw.samples.model.Cotizacion;
import edu.eci.cosw.samples.model.Proveedor;

import java.io.Serializable;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author Usuario
 */
public interface ProveedoresRepository extends CrudRepository<Proveedor, Integer>{
   
@Query("from Proveedor p where p.idProveedores= :idProveedores")
    public List<Proveedor> ProveedoresPorId(@Param("idProveedores") int idProveedores);

}


