import React, { useEffect, useState } from 'react'
import Card from '../card/card'
import styles from './grid.module.css'
import { getPuestos, postPuestos, messageModal, messageSuccess, messageError } from '../../services'

export function LandingPage() {
    const [ puestos , setPuestos] = useState([])

    useEffect( () => {
        cargarPuestos()
    }, [])

    async function cargarPuestos(){
        try {
            const res = await getPuestos()
            if(res.status === 200) setPuestos(res.data.puestos)
        } catch (error) {
            console.log(error)
            setPuestos([])
        }
    }

    async function nuevoPuesto(){
        let confirmed = await messageModal('guardar', 'puesto');
        if (confirmed) {
            async function post(){
                const res = await postPuestos()
                if(res.status === 201) {
                    cargarPuestos()
                    messageSuccess('El puesto fue guardado con éxito.');
                }else messageError('Hubo un error.');
            }
            post()
        }
    }

    // function ordenar(){
    //    puestos.sort(function(value) {
    //         // true values first
    //         return value.available ? 1 : -1 
    //         // false values first
    //         // return (x === y)? 0 : x? 1 : -1;
    //     });
    // }

    return (
        <div>
            <div className={ styles.center + ' col-12'}>
                <button onClick={nuevoPuesto} className="btn btn-success">Agregar Nuevo</button>
            </div>
            {/* <br/>
            <div className={ styles.center + ' col-12'}>
                <button onClick={ordenar} className="btn btn-success">Ordenar</button>
            </div> */}
            {
                puestos[0] ? 
                <ul className={styles.grip}>
                    {puestos.map( (puesto, index) => {
                        return <Card 
                        key={puesto.id} 
                        puesto={puesto} 
                        index={index + 1} 
                        cargarPuestos={cargarPuestos} />
                    })}
                </ul>
                : 
                <div className={ styles.center + ' col-12'}>
                    <h1>NO HAY DATA</h1>
                </div>
            }
         </div>
    )
}