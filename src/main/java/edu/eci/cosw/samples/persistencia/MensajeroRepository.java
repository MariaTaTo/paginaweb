/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.cosw.samples.persistencia;

import edu.eci.cosw.samples.model.Mensajero;
import edu.eci.cosw.samples.model.Paciente;
import java.io.Serializable;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author Viviana
 */
public interface MensajeroRepository extends CrudRepository<Mensajero, Integer>{
    @Query("from Mensajero m where m.idEmpleados= :id")
    public Paciente search(@Param("id") int searchTerm);
}
