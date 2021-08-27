import { makeStyles } from '@material-ui/core/styles'

export const useStyle = makeStyles((theme) =>({
    modal:{
        position: 'absolute',
        width: 400,
        backgroundColor: 'white',
        border: '2px solid #000',
        boxShadow: '10px 5px 5px black',
        padding: '16px 32px 24px',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    title :{
        color: 'black',
    },
    testfield:{
        width: '100%',
    },
    center:{
        'text-align': 'center'
    },
    ocupar:{
        backgroundColor: 'red',
        color: 'white',
        margin: '10px',
        '&:hover': {
            backgroundColor: "orange",
    }
    },
    reservar:{
        backgroundColor: 'green',
        color: 'white',
        margin: '10px',
        '&:hover': {
            backgroundColor: "orange",
    }
    },
    cancelar:{
        backgroundColor: 'black',
        color: 'white',
        margin: '10px',
        '&:hover': {
            backgroundColor: "orange",
    }
    }
    ,
    eliminar:{
        backgroundColor: 'red',
        color: 'white',
        margin: '10px',
        '&:hover': {
                backgroundColor: "orange",
        }
    },
    
}))

//  const body = (
//     <div className={useStyle.modal} >
//         <div align="center" className={useStyle.title} >
//             <h2>Formulario</h2>
//         </div>
//         <TextField label="Nombre" className={useStyle.testfield}/>
//         <br/>
//         <TextField label="Apellidos" className={useStyle.testfield}/>
//         <br/>
//         <TextField label="Correo" className={useStyle.testfield}/>
//         <br/><br/>
//         <div className={useStyle.button}>
//             <Button className="btn btn-primary">Enviar</Button>
//             <Button onClick={openCloseModal}>Cancelar</Button>
//         </div>
//     </div>
// )