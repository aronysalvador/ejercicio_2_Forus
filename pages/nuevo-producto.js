import React, {  useState, useContext } from 'react';
import { css } from '@emotion/core';
import Router, { useRouter } from 'next/router';
import Layout from '../components/layout/Layout';
import { Formulario, Campo, InputSubtmit, Error, Alerta } from '../components/ui/Formulario';
import clienteAxios from '../config/axios';


//Validaciones
import useValidacion from '../hooks/useValidacion';
import validarCrearProducto from '../validaciones/validarCrearProducto';


const STATE_INICIAL = {
  nombre: '',
  descripcion: '',
  cantidad: 0,
  ubicacion: ''
}


const NuevoProducto = () => {

  const [ alerta , guardarAlerta]  = useState(false);

  const {
    valores,
    errores,
    handleChange,
    handleSubmit,
    handleBlur} = useValidacion(STATE_INICIAL, validarCrearProducto, crearProducto);

    const { nombre, descripcion, cantidad, ubicacion } = valores;

     //Hook de routing para redireccionar
    const router = useRouter();

    async function crearProducto () {
      
        try {
            const response = await clienteAxios.post('/', {
              productoNombre: nombre,
              productoDescripcion: descripcion,
              productoCantidad: cantidad,
              productoUbicacion: ubicacion
            });
            
            
              guardarAlerta(true);
              window.setTimeout(()=>{
                guardarAlerta(false);

                return router.push('/');
              },3000)
            
            
        } catch (error) {
            console.log('No se puedo crear')
        }

    }

  return (
    <div>
      <Layout>      
          <>
          <h1
              css={css`
                  text-align:
                   center;
                  margin-top: 5rem;
              `}
          >           
            {alerta ? "Felicidades! Nuevo Producto Creado" : "Nuevo Producto "}
            </h1>
          <Formulario
            onSubmit={handleSubmit}
            // noValidate
          >
            {alerta ? ( <Alerta>
              Se ha creado un nuevo Producto. Sera redireccionado en 3 segundos.
                      </Alerta>) 
            
            : 
            
            <fieldset>
              <legend>Informacion General</legend>

              <Campo>
                  <label htmlFor="nombre">Nombre</label>
                  <input 
                      type="text"
                      id="nombre"
                      placeholder="Nombre del Producto"
                      name="nombre"
                      value={nombre}
                      onChange={handleChange}
                      onBlur={handleBlur}
                  />
              </Campo>
          
              {errores.nombre && <Error>{errores.nombre}</Error>}

              <Campo>
                  <label htmlFor="descripcion">Descripcion</label>
                  <textarea 
                      id="descripcion"
                      name="descripcion"
                      value={descripcion}
                      onChange={handleChange}
                      onBlur={handleBlur}
                  />
              </Campo>

              {errores.descripcion && <Error>{errores.descripcion}</Error>}

              <Campo>
                  <label htmlFor="cantidad">Cantidad</label>
                  <input 
                      type="number"
                      id="cantidad"
                      placeholder="Cantidad del Producto"
                      name="cantidad"
                      value={cantidad}
                      onChange={handleChange}
                      onBlur={handleBlur}
                  />
              </Campo>

              {errores.cantidad && <Error>{errores.cantidad}</Error>}

              <Campo>
                  <label htmlFor="ubicacion">Ubicacion</label>
                  <input 
                      type="text"
                      id="ubicacion"
                      placeholder="Ubicacion del Producto"
                      name="ubicacion"
                      value={ubicacion}
                      onChange={handleChange}
                      onBlur={handleBlur}
                  />
              </Campo>

              {errores.ubicacion && <Error>{errores.ubicacion}</Error>}

            </fieldset>
            
            }
            
            {alerta ? null : <InputSubtmit 
                type="submit"
                value="Crear Producto"
                
            />}
            
          </Formulario>

          
        </>
        }
        
      </Layout>
    </div>
  )
}

  
export default NuevoProducto