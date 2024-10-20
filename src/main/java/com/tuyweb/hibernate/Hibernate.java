package com.tuyweb.hibernate;

// Impportar clases necesarias de hibernate
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import com.tuyweb.hibernate.Usuario;

public class Hibernate {
    public static void main(String[] args) {
        //obtener la SessionFactory desde hibernateUtil
        SessionFactory sessionFactory = HibernateUtil.getSessionFactory();
        Transaction transaction = null;

        //utilizar try-with-resources para asegurar el cierre de la sesion
        try (Session session = sessionFactory.openSession()) {
            // Iniciar una transacción
            transaction = session.beginTransaction();

            // Crear una instancia de la entidad usuario
            Usuario usuario = new Usuario("john", "123");

            // Guardar la entidad en la base de datos
            session.persist(usuario);

            // Commit de la transacción
            transaction.commit();

            System.out.println("Usuario guardado con éxito");
        } catch (Exception e) {
            if (transaction != null) {
                transaction.rollback();
            }
            e.printStackTrace();
        } finally {
            if (sessionFactory != null) {
                sessionFactory.close();
            }
        }
    }
}
