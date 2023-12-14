import React from 'react';
import Swal from 'sweetalert2';

export default function DeleteSuccessAlert(item) {
  Swal.fire({
    title: 'Berhasil!',
    text: `${item} berhasil dihapus.`,
    icon: 'success',
  });

  return null;
}
