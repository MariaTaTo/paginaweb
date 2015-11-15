package edu.eci.cosw.samples.model;
// Generated 9/10/2015 03:08:07 PM by Hibernate Tools 4.3.1


import java.util.HashSet;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 * Pacientes generated by hbm2java
 */
@Entity
@Table(name="Pacientes"
)
public class Paciente  implements java.io.Serializable {


     private int idPacientes;
     private Epsafilida epsafilidas;
     private String nombre;
     private Integer telefono;
     private String direccion;
     private Set<Pedido> pedidoses = new HashSet<Pedido>(0);

    public Paciente() {
    }

	
    public Paciente(int idPacientes, Epsafilida epsafilidas) {
        this.idPacientes = idPacientes;
        this.epsafilidas = epsafilidas;
    }
    
     public Paciente(int idPacientes, Epsafilida epsafilidas, String nombre, Integer telefono, String direccion) {
       this.idPacientes = idPacientes;
       this.epsafilidas = epsafilidas;
       this.nombre = nombre;
       this.telefono = telefono;
       this.direccion = direccion;
      
    }
     
    public Paciente(int idPacientes, Epsafilida epsafilidas, String nombre, Integer telefono, String direccion, Set<Pedido> pedidoses) {
       this.idPacientes = idPacientes;
       this.epsafilidas = epsafilidas;
       this.nombre = nombre;
       this.telefono = telefono;
       this.direccion = direccion;
       this.pedidoses = pedidoses;
    }
   
     @Id 

    
    @Column(name="idPacientes", unique=true, nullable=false)
    public int getIdPacientes() {
        return this.idPacientes;
    }
    
    public void setIdPacientes(int idPacientes) {
        this.idPacientes = idPacientes;
    }

@ManyToOne(fetch=FetchType.EAGER)
    @JoinColumn(name="EPSAfilidas_idEPS", nullable=false)
    public Epsafilida getEpsafilidas() {
        return this.epsafilidas;
    }
    
    public void setEpsafilidas(Epsafilida epsafilidas) {
        this.epsafilidas = epsafilidas;
    }

    
    @Column(name="Nombre", length=45)
    public String getNombre() {
        return this.nombre;
    }
    
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    
    @Column(name="Telefono")
    public Integer getTelefono() {
        return this.telefono;
    }
    
    public void setTelefono(Integer telefono) {
        this.telefono = telefono;
    }

    
    @Column(name="Direccion", length=50)
    public String getDireccion() {
        return this.direccion;
    }
    
    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

@OneToMany(fetch=FetchType.LAZY, mappedBy="pacientes")
    public Set<Pedido> getPedidoses() {
        return this.pedidoses;
    }
    
    public void setPedidoses(Set<Pedido> pedidoses) {
        this.pedidoses = pedidoses;
    }




}


