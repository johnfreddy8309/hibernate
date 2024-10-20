package com.tuyweb.hibernate;

//importaciones necesarias de yakarta persistence API
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

//indica que esta clase es una entidad y se mapea a una tabla de base de datos @entity
//Especifica el nom,bre de la tabla en la base de datos
@Entity
@Table(name = "usuarios")
public class Usuario {

    @Id //Indica que este campo es la clave primaria 
    //este campo se mapea a una columna en la tabla column
    @Column
    private int id;

    // Especifica que este campo se mapea a una columna en la tabla
    private String username;

    // Especifica que este campo se mapea a una columna en la tabla
    private String password;

    // Método getter para obtener el valor del campo id
    public int getId() {
        return id;
    }

    // Método setter para establecer el valor del campo id
    public void setId(int id) {
        this.id = id;
    }

    // Método getter para obtener el valor del campo username
    public String getUsername() {
        return username;
    }

    // Método setter para establecer el valor del campo username
    public void setUsername(String username) {
        this.username = username;
    }

    // Método getter para obtener el valor del campo password
    public String getPassword() {
        return password;
    }

    // Método setter para establecer el valor del campo password
    public void setPassword(String password) {
        this.password = password;
    }

    // Constructor por defecto requerido por JPA
    public Usuario() {
    }

    // Constructor para inicializar username y password sin id
    public Usuario(String username, String password) {
        this.username = username;
        this.password = password;
    }

    // Constructor para inicializar id, username y password
    public Usuario(int id, String username, String password) {
        this.id = id;
        this.username = username;
        this.password = password;
    }
}
