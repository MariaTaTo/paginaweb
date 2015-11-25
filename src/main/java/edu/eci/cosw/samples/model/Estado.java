/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.cosw.samples.model;

/**
 *
 * @author 2088395
 */
public class Estado {

    String estado;

    int numero;

    public Estado() {
        this.estado = estado;
    }
    
    public Estado(int numero, String estado) {
        this.numero=numero;
        this.estado = estado;
    }
    
    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }
    
    public int getNumero() {
        return numero;
    }

    public void setNumero(int numero) {
        this.numero = numero;
    }
    
}
