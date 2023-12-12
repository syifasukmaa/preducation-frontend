import React from 'react';
import Swal from 'sweetalert2';

export default function DeleteSuccessAlert(item) {
  Swal.fire({
    title: 'Deleted!',
    text: `${item} has been deleted.`,
    icon: 'success',
  });

  return null;
}
