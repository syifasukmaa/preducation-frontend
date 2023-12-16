import React from 'react';
import Swal from 'sweetalert2';

export default async function ConfirmDeleteAlert(message) {
  const result = await Swal.fire({
    title: 'Apakah Yakin?',
    text: message || "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#167F71',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Hapus',
    cancelButtonText: 'Batal',
    customClass: {
      title: 'custom-title-class',
      content: 'custom-text-class',
      popup: 'custom-card-class',
    },
  });

  return result.isConfirmed;
}
