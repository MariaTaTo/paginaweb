/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.cosw.samples.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import static javax.persistence.GenerationType.IDENTITY;


/**
 *
 * @author Viviana
 */
@Entity
@Table(name="Biometricos")
public class Biometrico implements java.io.Serializable{
    
    
     private int idBiometrico;
     private String codBiometrico;
     

    public Biometrico() {
    }
    
    
    public Biometrico(String codBiometrico) {
        this.idBiometrico = idBiometrico;
        this.codBiometrico = codBiometrico;
    }

   @Id @GeneratedValue(strategy=IDENTITY)
     
    @Column(name="idBiometricos", unique=true, nullable=false)
    public int getIdBiometrico() {
        return idBiometrico;
    }

    public void setIdBiometrico(int idBiometrico) {
        this.idBiometrico = idBiometrico;
    }
  @Column(name="codBiometrico")
    public String getCodBiometrico() {
        return codBiometrico;
    }

    public void setCodBiometrico(String codBiometrico) {
        this.codBiometrico = codBiometrico;
    }

	
   
}
