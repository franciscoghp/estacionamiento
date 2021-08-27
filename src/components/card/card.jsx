import React, { useState, useEffect } from 'react'
import { Modal} from '@material-ui/core'
import { useStyle } from '../modalDisponible/modalStyles'
import styles from './card.module.css'
import  ModalDisponible  from '../modalDisponible/modal'
import  ModalOcupado  from '../modalOcupado/modal'

import { 
    putPuesto, 
    eliminarPuesto, 
    messageModal, 
    messageSuccess, 
    messageError, 
    factura, 
    codigoValidacion,
    ingresaCodigo,
    ingresaDias,
    bloqueado } from '../../services'

function Card({puesto ,index, cargarPuestos}) {
    const stylesModal = useStyle()
    const [ modal, setModal ] = useState(false)
    
    useEffect(() => {
    }, [] )

    const openCloseModal= () =>{
        setModal(!modal)
    }

    const ocupar = async () => {
        setModal(!modal)
        let confirmed = await messageModal('ocupar', 'puesto');
        if (confirmed) {
            const res = await putPuesto(puesto.id, {
                occupied: true,
                available: false,
                reserved: false
            })
            if(res.status === 200) {
                const fechaEntrada = JSON.parse(res.data.puesto.fechaEntrada)
                console.log(fechaEntrada)
                messageSuccess('El puesto ahora está ocupado.');
                cargarPuestos()
            }else messageError('Hubo un error.');
        }
    }

    const desocupar = async () => {
        setModal(!modal)
        let confirmed = await messageModal('desocupar', 'puesto');
        if (confirmed) {
            const res = await putPuesto(puesto.id, {
                occupied: false,
                available: true,
                reserved: false
            })
            if(res.status === 200) {
                const fechaSalida = JSON.parse(res.data.puesto.fechaSalida)
                const fechaEntrada = JSON.parse(puesto.fechaEntrada)
                const {monto , difSegundosReal} = getMonto(fechaSalida, fechaEntrada) 

                const outFactura = renderSalida(fechaSalida)
                const inFactura = renderEntrada(fechaEntrada, difSegundosReal)
                console.log(outFactura)
                console.log(inFactura)
                factura(monto, inFactura, outFactura );
                cargarPuestos()
            }else messageError('Hubo un error.');
        }
    }

    const ocuparReserva = async () => {
        if (puesto.blocked) {
            bloqueado();
        } else {
            let password = await ingresaCodigo();
            if (password) {
                try {
                    const res = await putPuesto(puesto.id, {
                        occupied: true,
                        reserved: true,
                        codigo:  password
                    })
                    .catch(error=> {
                        console.log(error) 
                    })
                    if(res.status === 200) {
                        messageSuccess('El puesto ahora está ocupado.');
                        cargarPuestos()
                    }
                } catch (error) {
                    cargarPuestos()
                    messageError('Intento fallido')
                    console.log(error) 
                }
           
              
            }  
        }

    }

    const renderEntrada = (fechaEntrada) => {
        let yearRender = `${fechaEntrada.year}`
        yearRender = `${yearRender[2]}${yearRender[3]}`
        let mesRender
        if(fechaEntrada.mes < 10) mesRender = `0${fechaEntrada.mes}`
        else mesRender = `${fechaEntrada.mes}`

        let diaRender
        if(fechaEntrada.dia < 10) diaRender = `0${fechaEntrada.dia}`
        else diaRender = `${fechaEntrada.dia}`

        let horaRender
        if(fechaEntrada.hora < 10) horaRender = `0${fechaEntrada.hora}`
        else horaRender = `${fechaEntrada.hora}`

        let minutoRender
        if(fechaEntrada.minuto < 10) minutoRender = `0${fechaEntrada.minuto}`
        else minutoRender = `${fechaEntrada.minuto}`

        let segundoRender
        if(fechaEntrada.segundo < 10) segundoRender = `0${fechaEntrada.segundo}`
        else segundoRender = `${fechaEntrada.segundo}`

        let inFactura = `${diaRender}-${mesRender}-${yearRender}:${horaRender}:${minutoRender}:${segundoRender}`
        return inFactura

    }

    const renderSalida = (fechaSalida, difSegundosReal) => {
        let yearRender = `${fechaSalida.year}`
        let horaRender
        yearRender = `${yearRender[2]}${yearRender[3]}`
        let mesRender
        if(fechaSalida.mes < 10) mesRender = `0${fechaSalida.mes}`
        else mesRender = `${fechaSalida.mes}`

        let diaRender
        if(fechaSalida.dia < 10) diaRender = `0${fechaSalida.dia}`
        else diaRender = `${fechaSalida.dia}`

        let minutoRender
        if(fechaSalida.minuto < 10) minutoRender = `0${fechaSalida.minuto}`
        else minutoRender = `${fechaSalida.minuto}`

        if(fechaSalida.hora < 10) horaRender = `0${fechaSalida.hora}`
        else horaRender = `${fechaSalida.hora}`

        let segundoRender
        if(fechaSalida.segundo < 10) segundoRender = `0${fechaSalida.segundo}`
        else segundoRender = `${fechaSalida.segundo}`

        console.log(difSegundosReal)

        let outFactura = `${diaRender}-${mesRender}-${yearRender}:${horaRender}:${minutoRender}:${segundoRender}`
        return outFactura
    }

    const getMonto = (fechaSalida, fechaEntrada) => {
        let monto =  0 
        const { hora : horaSalida, minuto : minutosSalida, segundo : segundosSalida } = fechaSalida
        const { hora : horaEntrada, minuto : minutosEntrada , segundo : segundosEntrada } = fechaEntrada
        const difHora = horaSalida - horaEntrada
        const difMinutosReal = (difHora*60) + ( minutosSalida - minutosEntrada )
        const difSegundosReal = difMinutosReal*60 + ( segundosSalida - segundosEntrada )

        console.log(difMinutosReal, 'minutos reales')
        console.log(difSegundosReal, ' segundos reales')
        if( difSegundosReal < 60 ) {
            console.log('horas menor a 1 hora.... minuto')
            monto = difSegundosReal*0.0005
        }
        else if( difSegundosReal >= 60 && difSegundosReal <= 180 ) {
            console.log('horas entre 1 hora y 3 horas.... minutos')
            for( let i = 0 ; i <= difSegundosReal; i++){
                if( Number.isInteger( i/2 )){
                    console.log('el', i,'es par' )
                    monto = monto + i*0.0003
                }else {
                    console.log('el', i,'es impar' )
                    monto = monto + i*0.0001
                }
            }
        }else if(difSegundosReal > 180){
            console.log('horas mas de 3 horas.... minutos')
            if( difSegundosReal <= 360 ){
                for( let i = 0 ; i <= difSegundosReal; i++){
                    if( Number.isInteger( i/2 )){
                        console.log('el', i,'es par' )
                        monto = monto + i*0.0003
                    }else {
                        console.log('el', i,'es impar' )
                        monto = monto + i*0.0001
                    }
                }
            }else{
                for( let i = 0 ; i <= difSegundosReal; i++){
                    if( Number.isInteger( i/2 )){
                        console.log('el', i,'es par' )
                        monto = monto + i*0.0003
                    }else {
                        console.log('el', i,'es impar' )
                        monto = monto + i*0.0001
                    }
                }
                monto = monto + ( difSegundosReal - 360 )*0.0002
                monto = monto + monto*0.003
            }
        }

        console.log( horaEntrada, minutosEntrada, segundosEntrada , 'entrada')
        console.log( horaSalida, minutosSalida, segundosSalida , 'salida')
        console.log(monto)
        return {monto, difSegundosReal}
    }

    const reservar = async () =>{
        setModal(!modal)
        let days = await ingresaDias();
        if (days) {
            const res = await putPuesto(puesto.id, {
                occupied: false,
                available: true,
                reserved: true,
                diasOcupado: days
            })
            if(res.status === 200) {
                console.log(res)
                cargarPuestos()
                codigoValidacion(puesto.id, days);
            }else messageError('Hubo un error.');
        }
    }

    const eliminar = async () =>{
        setModal(!modal)
        let confirmed = await messageModal('ocupar', 'puesto');
        if (confirmed) {
            const res = await eliminarPuesto(puesto.id)
            if(res.status === 200) {
                cargarPuestos()
                messageSuccess('El puesto se eliminó.');
            }else messageError('Hubo un error.');
        }
        
    }

    return (
    <div>
        <li className={styles.card} key={puesto.id}>    
            { 
            (puesto.available &&
             !puesto.reserved &&
             !puesto.reserved) ? <button onClick={openCloseModal} className={styles.available}>{index}</button> : 
            puesto.occupied ? <button onClick={openCloseModal} className={styles.occupied}>{index}</button> : 
            (puesto.reserved ) ? <button onClick={ocuparReserva} className={styles.reserved}>{index}</button> : ''
            }
        </li>
        {
            puesto.available ?
            <Modal open={modal} onClose={openCloseModal}>
                    <ModalDisponible 
                        stylesModal={stylesModal} ocupar={ocupar}
                        reservar={reservar}
                        openCloseModal={openCloseModal}
                        eliminar={eliminar} />
            </Modal>
            :
            puesto.occupied ?
            <Modal open={modal} onClose={openCloseModal}>
                    <ModalOcupado 
                        stylesModal={stylesModal} desocupar={desocupar}
                        openCloseModal={openCloseModal}
                        eliminar={eliminar} />
            </Modal>
            :
            ''
        }
    </div>
    )
}

export default Card;