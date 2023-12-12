import React from 'react';
import Swal from 'sweetalert2';

export default function successAlert(action, item) {
  return Swal.fire({
    title: `Berhasil ${action} ${item}!`,
    text: `Berhasil ${action} ${item} ${action === 'membuat' ? 'baru' : ''}`,
    icon: 'success',
  });
}
