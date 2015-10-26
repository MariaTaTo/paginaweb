/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.cosw.samples.persistencia;

import edu.eci.cosw.samples.model.Autorizacion;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author Usuario
 */
public interface AutorizacionRepository extends CrudRepository<Autorizacion, Integer>{
    @Query("from Autorizacion a where a.numero= :ln")
    public Autorizacion search(@Param("ln") int searchTerm);
    
     @Query("from Autorizacion a")
    public List<Autorizacion> getAutorizaciones();
    
    @Query("from Autorizacion a where a.numero= :ln")
    public List<Autorizacion> AutorizacionPorPaciente (@Param("ln")Integer id );

}
