/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.cosw.samples.persistencia;

import edu.eci.cosw.samples.model.Autorizacion;
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
public interface AutorizacionRepository extends CrudRepository<Autorizacion, Integer>{
   
    @Query("from Autorizacion a where a.numero= :numero")
    public Autorizacion AutorizacionPorNumero(@Param("numero") int numero);
    
    @Query("from Autorizacion a")
    public List<Autorizacion> getAutorizaciones();
    
    @Query("from Autorizacion a where a.numero= :ln")
    public List<Autorizacion> AutorizacionPorPaciente (@Param("ln")Integer id );

    @Query("from Autorizacion e where e.estado= :estado")
    public List<Autorizacion> AutorizacionPorEstado (@Param("estado")String estado);
    
    @Query("from Autorizacion a where a.epsafilidas.idEps= :epsafilidas AND a.estado= 'pendiente'")
    public List<Autorizacion> AutorizacionPorEps (@Param("epsafilidas")Integer epsafilidas);
    
    @Modifying  
    @Transactional
    @Query ("update Autorizacion a SET a.estado=:es where a.numero= :ln")
    public void cambiarEstado(@Param("ln")Integer id ,@Param("es") String estado);

}
