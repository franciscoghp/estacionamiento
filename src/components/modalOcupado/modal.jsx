import { Button } from '@material-ui/core'
import React from 'react'

function ModalOcupado ({stylesModal,desocupar,openCloseModal, eliminar}){
    return(
        <div className={stylesModal.modal} >
            <div align="center" className={stylesModal.title} >
                <h2>¿Qué quieres hacer con el puesto?</h2>
            </div>
            <br/><br/>
            <div className={stylesModal.center}>
                    <Button className={stylesModal.ocupar + ' col-12'} onClick={desocupar} >Desocupar</Button>
                <div>
                <Button className={stylesModal.eliminar} onClick={eliminar} >Eliminar Puesto</Button>
                <Button className={stylesModal.cancelar} onClick={openCloseModal}>Cancelar</Button>
                </div>
            </div>
        </div>
    )
}

export default ModalOcupado;