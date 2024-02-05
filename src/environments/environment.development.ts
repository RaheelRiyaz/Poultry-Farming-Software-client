import Swal from 'sweetalert2';

export const environment = {
  baseUrl: 'http://localhost:5113/api/',
  fileBaseUrl: 'http://localhost:5113/',
  fireSwal: async (message: string, isSuccess: boolean = true) => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: isSuccess ? 'success' : 'error',
      title: message,
    });
  },

  fireConfirmSwal: (message:string) => {
    return Swal.fire({
      title: message,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    });
  },
};
