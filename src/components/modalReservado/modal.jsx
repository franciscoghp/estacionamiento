import { Button } from '@material-ui/core'
import React from 'react'

function ModalReservado ({stylesModal,ocupacarReserva,openCloseModal, eliminar}){
        return(
        <div className={stylesModal.modal} >
            <div align="center" className={stylesModal.title} >
                <h2>Ingrese su código de validacíon</h2>
            </div>
            <br/><br/>
            <div className={stylesModal.center}>
                    <Button className={stylesModal.ocupar + ' col-12'} onClick={ocupacarReserva} >Desocupar</Button>
                <div>
                <Button className={stylesModal.eliminar} onClick={eliminar} >Eliminar Puesto</Button>
                <Button className={stylesModal.cancelar} onClick={openCloseModal}>Cancelar</Button>
                </div>
            </div>
        </div>
    )
}

export default ModalReservado;