package edu.eci.cosw.samples.model;
// Generated 9/10/2015 03:08:07 PM by Hibernate Tools 4.3.1


import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * Pedidos generated by hbm2java
 */
@Entity
@Table(name="Pedidos"
)
public class Pedido  implements java.io.Serializable {


     private Integer idPedidos;
     private Paciente pacientes;
     private Date fechaLlegada;
     private String direccion;
     private Set<DetallePedido> detallesPedidos = new HashSet<DetallePedido>(0);
     private Set<Despacho> despachoses = new HashSet<Despacho>(0);

    public Pedido() {
    }

	
    public Pedido(Paciente pacientes) {
        this.pacientes = pacientes;
    }
    public Pedido(Paciente pacientes, Date fechaLlegada, String direccion, Set<DetallePedido> detallesPedidos, Set<Despacho> despachoses) {
       this.pacientes = pacientes;
       this.fechaLlegada = fechaLlegada;
       this.direccion = direccion;
       this.detallesPedidos = detallesPedidos;
       this.despachoses = despachoses;
    }
   
     @Id @GeneratedValue(strategy=IDENTITY)

    
    @Column(name="idPedidos", unique=true, nullable=false)
    public Integer getIdPedidos() {
        return this.idPedidos;
    }
    
    public void setIdPedidos(Integer idPedidos) {
        this.idPedidos = idPedidos;
    }

@ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="Pacientes_idPacientes", nullable=false)
    public Paciente getPacientes() {
        return this.pacientes;
    }
    
    public void setPacientes(Paciente pacientes) {
        this.pacientes = pacientes;
    }

    @Temporal(TemporalType.DATE)
    @Column(name="fechaLlegada", length=10)
    public Date getFechaLlegada() {
        return this.fechaLlegada;
    }
    
    public void setFechaLlegada(Date fechaLlegada) {
        this.fechaLlegada = fechaLlegada;
    }

    
    @Column(name="direccion", length=45)
    public String getDireccion() {
        return this.direccion;
    }
    
    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

@OneToMany(fetch=FetchType.LAZY, mappedBy="pedidos")
    public Set<DetallePedido> getDetallesPedidos() {
        return this.detallesPedidos;
    }
    
    public void setDetallesPedidos(Set<DetallePedido> detallesPedidos) {
        this.detallesPedidos = detallesPedidos;
    }

@OneToMany(fetch=FetchType.LAZY, mappedBy="pedidos")
    public Set<Despacho> getDespachoses() {
        return this.despachoses;
    }
    
    public void setDespachoses(Set<Despacho>  despachoses) {
        this.despachoses = despachoses;
    }




}

