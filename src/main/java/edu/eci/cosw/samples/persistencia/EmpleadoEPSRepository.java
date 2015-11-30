/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.cosw.samples.persistencia;

import edu.eci.cosw.samples.model.Autorizacion;
import edu.eci.cosw.samples.model.EmpleadoEPS;
import java.util.List;
import javax.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author Usuario
 */
public interface EmpleadoEPSRepository extends CrudRepository<EmpleadoEPS, Integer>{
    
    @Query("from EmpleadoEPS eeps where eeps.idEmpleadoEPS= :idEmpleadoEPS")
    public EmpleadoEPS obtenerEmpleadoEPSporId(@Param("idEmpleadoEPS") int idEmpleadoEPS);
    
     @Query("from EmpleadoEPS e")
    public List<EmpleadoEPS> getEmpleadoEPS();
    
   

}
