import { Button } from '@material-ui/core'

function ModalDisponible ({stylesModal,ocupar,reservar,openCloseModal, eliminar}){
    return(
        <div className={stylesModal.modal} >
            <div align="center" className={stylesModal.title} >
                <h2>¿Qué quieres hacer con el puesto?</h2>
            </div>
            <br/><br/>
            <div className={stylesModal.center}>
                    <Button className={stylesModal.ocupar + ' col-12'} onClick={ocupar} >Ocupar</Button>
                    <Button className={stylesModal.reservar + ' col-12'} onClick={reservar} >Reservar</Button>
                <div>
                <Button className={stylesModal.eliminar} onClick={eliminar} >Eliminar Puesto</Button>
                <Button className={stylesModal.cancelar} onClick={openCloseModal}>Cancelar</Button>
                </div>
            </div>
        </div>
    )
}

export default ModalDisponible;
