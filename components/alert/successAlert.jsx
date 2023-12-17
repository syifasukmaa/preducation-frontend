import React from 'react';
import Swal from 'sweetalert2';
import '../style.css';

export default function successAlert(action, item) {
  return Swal.fire({
    title: `Berhasil!`,
    text: `Berhasil ${action} ${item} ${action === 'membuat' ? 'baru' : ''}`,
    icon: 'success',
    customClass: {
      title: 'custom-title-class',
      content: 'custom-text-class',
      popup: 'custom-card-class',
    },
  });
}
