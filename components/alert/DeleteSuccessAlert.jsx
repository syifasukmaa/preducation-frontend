import React from 'react';
import Swal from 'sweetalert2';

export default function DeleteSuccessAlert(item) {
  Swal.fire({
    title: 'Berhasil!',
    text: `${item} berhasil dihapus.`,
    icon: 'success',
    customClass: {
      title: 'custom-title-class',
      content: 'custom-text-class',
      popup: 'custom-card-class',
    },
  });

  return null;
}
