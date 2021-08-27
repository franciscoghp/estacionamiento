import axios from 'axios'
import Swal from 'sweetalert2'

const baseUrl = process.env.REACT_APP_BASE_URL

export async function getPuestos (){
    try {
        const res = await axios({
            url: `${baseUrl}/puestos`,
            method: 'GET'
        })
        return res
    } catch (error) {
        console.log(error)
    }
}

export async function postPuestos (){
    try {
        const res = await axios({
            url: `${baseUrl}/puestos`,
            method: 'POST'
        })
        return res
    } catch (error) {
        console.log(error)
    }
}

export async function putPuesto (id, data){
    // try {
    //     const res = await axios.put(`${baseUrl}/puestos/` + id, data)
    //     return res
    // } catch (error) {
    //     console.log(error)
    // }
      const res = await axios.put(`${baseUrl}/puestos/` + id, data)
      console.log(res)
      return res
}

export async function eliminarPuesto (id, data){
    try {
        const res = await axios.delete(`${baseUrl}/puestos/` + id)
        return res
    } catch (error) {
        console.log(error)
    }
}

export async function messageModal(verbo, campo) {
    const Toast = Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas ${verbo} un ${campo}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ACEPTAR',
      cancelButtonText: 'CANCELAR',
    }).then((result) => {
      if (result.isConfirmed) {
        return result.isConfirmed;
      }
    });
    const response = await Toast;
    return response;
  }

  export function  messageSuccess(message) {
    const Toast = init();
    Toast.fire({
      icon: 'success',
      title: `${message}`,
    });
  }

  export async function factura(monto, entrada, salida) {
    Swal.fire({
        title: '<strong><u>FACTURA</u></strong>',
        html:
          `<b>Amount: </b> $ ${monto}<br>` + 
          `<b>In: </b>${entrada}<br>` + 
          `<b>Out: </b>${salida}<br>`,
        showCloseButton: true,
        focusConfirm: false,
        confirmButtonText:
          '<i class="fa fa-thumbs-up"></i> ACEPTAR!',
        confirmButtonAriaLabel: 'Thumbs up, great!',
      })
  }

  export async function codigoValidacion(id, days) {
    Swal.fire({
        title: '<strong><u>RESERVA</u></strong>',
        html:
          `<b>Monto: </b>$ ${days * 0.74}<br>`+
          `<b>Código: </b> ${id}<br>`+
          `<b>Días reservado: </b> ${days}<br>`,
        showCloseButton: true,
        focusConfirm: false,
        confirmButtonText:
          '<i class="fa fa-thumbs-up"></i> ACEPTAR!',
        confirmButtonAriaLabel: 'Thumbs up, great!',
    })
  }

  export function bloqueado() {
    Swal.fire('Excediste tu número de intentos, el puesto estará bloqueado 5 horas.')
  }

  export async function ingresaCodigo() {
    const { value: password } = await Swal.fire({
      title: 'Ingresa código de reserva por favor',
      input: 'password',
      inputLabel: 'Código',
      inputAttributes: {
        maxlength: 30,
        autocapitalize: 'off',
        autocorrect: 'off'
      }
    })
    return password
  }

  export async function ingresaDias() {
    const { value: days } = await Swal.fire({
      title: 'Ingreso el número de días que desea reservar',
      input: 'number',
      inputLabel: 'Válido entre 12 y 79 días',
      inputAttributes: {
        maxlength: 3,
        autocapitalize: 'off',
        autocorrect: 'off',
        max: 79,
        min: 12
      }
    })
    return days
  }

  export function messageError(message) {
    const Toast = init();
    Toast.fire({
      icon: 'error',
      title: `${message}`,
    });
  }

 function  init() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });
    return Toast;
  }


