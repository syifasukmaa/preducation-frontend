const BASE_URL = process.env.API_URL

export const loginAdmin = async (username, password) => {
  const response = await fetch(`${BASE_URL}/auths/admin/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  })
  return response
}

export const createNewCourse = async (token, courseData) => {
  const response = await fetch(`${BASE_URL}/courses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(courseData),
  })

  return response
}

export const updateCourse = async (token, courseId, updatedCourseData) => {
  const response = await fetch(`${BASE_URL}/courses/${courseId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: updatedCourseData,
  })

  return response
}

export const deleteCourse = async (token, courseId) => {
  const response = await fetch(`${BASE_URL}/courses/${courseId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  return response
}

export const createNewChapter = async (token, chapterData, courseId) => {
  const response = await fetch(`${BASE_URL}/chapters/?courseId=${courseId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(chapterData),
  })

  return response
}

export const updateChapter = async (token, chapterData, chapterId) => {
  const response = await fetch(`${BASE_URL}/chapters/${chapterId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(chapterData),
  })

  return response
}
export const deleteChapter = async (token, chapterId) => {
  const response = await fetch(`${BASE_URL}/chapters/${chapterId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  return response
}

export const createNewVideo = async (token, videoData, Id) => {
  const response = await fetch(`${BASE_URL}/videos/?chapterId=${Id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(videoData),
  })

  return response
}

export const updateVideo = async (token, videoData, Id) => {
  const response = await fetch(`${BASE_URL}/videos/${Id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(videoData),
  })

  return response
}

export const deleteVideo = async (token, videoId) => {
  const response = await fetch(`${BASE_URL}/videos/${videoId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response
}

export const resetPassword = async (passwordResetToken, password, confirmPassword) => {
  const response = await fetch(`${BASE_URL}/auths/reset-password/${passwordResetToken}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      password,
      confirmPassword,
    }),
  })

  return response
}

export const createUser = async (token, body) => {
  const response = await fetch(`${BASE_URL}/users/create-user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })

  return response
}

export const deleteUser = async (token, userId) => {
  const response = await fetch(`${BASE_URL}/users/${userId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response
}

export const updateUser = async (token, id, formData) => {
  const response = await fetch(`${BASE_URL}/users/${id}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })
  return response
}

export const getAllCourse = async () => {
  const response = await fetch(`${BASE_URL}/courses`, {})
  const data = await response.json()
  return data
}

export const createNotif = async (token, notifData) => {
  const response = await fetch(`${BASE_URL}/notifications`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(notifData),
  })

  return response
}
