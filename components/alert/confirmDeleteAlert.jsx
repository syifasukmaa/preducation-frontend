import React from 'react';
import Swal from 'sweetalert2';

export default async function ConfirmDeleteAlert(message) {
  const result = await Swal.fire({
    title: 'Are you sure ?',
    text: message || "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#167F71',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  });

  return result.isConfirmed;
}
