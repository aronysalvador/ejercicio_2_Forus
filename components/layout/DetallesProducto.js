import React, { useState} from 'react';
import styled from '@emotion/styled';
import { Alerta } from '../ui/Formulario';
import Link from 'next/link';
import clienteAxios from '../../config/axios';


const Producto = styled.li`
    padding: 4rem;
    display:flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e1e1e1;
`;

const DescripcionProducto = styled.div`
    flex:0 1 600px;
    display:grid;
    grid-template-columns: 6fr 1fr;
    column-gap: 2rem;
`;

const Titulo = styled.a`
    font-size: rem;
    font-weight:bold;
    margin: 0;

    :hover {
        cursor: pointer;
    }
`
const TextoDescripcion = styled.p`
    font-size:1.6rem;
    margin:0;
    color: #888;
`

const Comentarios= styled.div` 
    marging-top: 2rem;
    display:flex;
    align-items: center;
    div {
        display:flex;
        align-items: center;
        border: 1px solid #e1e1e1;
        padding: .3rem 1rem;
        margin-right: 2rem;
    }
    img {
        width: 2rem;
        margin-right: 2rem;
        
    }
    p {
        font-size: 1.6rem;
        margin-right: 1rem;
        font-weight: 700;
        &:last-of-type {
            margin: 0;

        }
    }
`

const Imagen = styled.img`
    width: 200px;
`;

const Votos = styled.div`
    flex: 0 0 auto;
    text-align: center;
    border: 1px solid #e1e1e1;
    padding: 1rem 3rem;

    div {
        font-size: 2rem;
    }

    p {
        margin: 0;
        font-size: 2rem;
        font-weight: 700;
    }
`

 const InputSubtmit2 = styled.input`
    background-color: gray;
    width: auto;
    padding: 1.5rem;
    text-align: center;
    color: #FFF;
    font-size: 1.8rem;
    text-transform: uppercase;
    border: none;
    font-family: 'PT Sans', sans-serif;
    font-weight:700;

    &:hover {
        cursor:pointer;
    }
`;

    const InputSubtmit3 = styled.input`
    background-color: var(--naranja);
    width: auto;
    padding: 1.5rem;
    text-align: center;
    color: #FFF;
    font-size: 1.8rem;
    text-transform: uppercase;
    border: none;
    font-family: 'PT Sans', sans-serif;
    font-weight:700;


    &:hover {
        cursor:pointer;
    }
    `;

const DetallesProducto = ({producto}) => {

    const [ alerta , guardarAlerta]  = useState(false);

    const [mensaje, guardarMensaje] = useState();
 
    const { productoId, productoNombre, productoDescripcion, productoCantidad, productoUbicacion  } = producto;

    //Eliminar un producto
    const handleEliminar = e => {
        e.preventDefault();
        const idEliminar = productoId;
        
        eliminarProductos(idEliminar);
        
    }


    const eliminarProductos = async (idEliminar) => {
    
        try {        
            const response = await clienteAxios.delete(`/${idEliminar}`);
             const data = response.data;
            console.log(data)
            guardarMensaje(data);
            guardarAlerta(true);
              window.setTimeout(()=>{
                guardarAlerta(false);

            },3000)
             
        } catch (error) {
            console.log('No se pudo eliminar la data')
        }
      
    }

    return (  
        <>
        <Producto>
            <DescripcionProducto>
                <div>
                    <Votos>
                        <Titulo> {productoNombre}</Titulo>
                    </Votos>

                    <Titulo>Descripcion</Titulo>
                    <TextoDescripcion>{productoDescripcion}</TextoDescripcion>

                    <Titulo>Cantidad</Titulo>
                    <TextoDescripcion> {productoCantidad}</TextoDescripcion>

                    <Titulo>Ubicacion</Titulo>
                    <TextoDescripcion>{productoUbicacion}</TextoDescripcion>

                </div>
            </DescripcionProducto>

            <form
            >
                <Link href='/editar-producto/[id]' as={`/editar-producto/${productoId}`}
                        >
                    <InputSubtmit2 
                        type="submit"              
                        value="Editar"
                    />    
                </Link>   
                      
            </form>
            
            <form
                onSubmit={handleEliminar}
            >
                <InputSubtmit3
                    type="submit"
                    value="Eliminar Producto"
                />
            </form>
 
        </Producto>

        {alerta ? ( <Alerta>
             {mensaje} Este mensaje desaparecera en 3 segundos 
                      </Alerta>) : null}
        </>
    );
}
 
export default DetallesProducto;