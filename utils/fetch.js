export const loginAdmin = async (username, password) => {
  try {
    const response = await fetch(`${process.env.API_URL}/auths/admin/login`, {
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
  } catch (error) {
    console.log(error)
  }
}

export const createNewCourse = async (token, courseData) => {
  try {
    const response = await fetch(`${process.env.API_URL}/courses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(courseData),
    })

    return response
  } catch (error) {
    console.error('Error creating a new course:', error)
    throw error
  }
}

export const updateCourse = async (token, courseId, updatedCourseData) => {
  try {
    const response = await fetch(`${process.env.API_URL}/courses/${courseId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: updatedCourseData,
    })

    return response
  } catch (error) {
    console.error('Error updating the course:', error)
    throw error
  }
}

export const deleteCourse = async (token, courseId) => {
  try {
    const response = await fetch(`${process.env.API_URL}/courses/${courseId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    return response
  } catch (error) {
    console.error('Error updating the course:', error)
    throw error
  }
}

export const createNewChapter = async (token, chapterData, courseId) => {
  try {
    const response = await fetch(`${process.env.API_URL}/chapters/?courseId=${courseId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(chapterData),
    })

    return response
  } catch (error) {
    console.error('Error creating a new course:', error)
    throw error
  }
}

export const updateChapter = async (token, chapterData, chapterId) => {
  try {
    const response = await fetch(`${process.env.API_URL}/chapters/${chapterId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(chapterData),
    })

    return response
  } catch (error) {
    console.error('Error creating a new course:', error)
    throw error
  }

};
export const deleteChapter = async (token, chapterId) => {
  try {
    const response = await fetch(`${process.env.API_URL}/chapters/${chapterId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.error('Error updating the course:', error);
    throw error;
  }
};

export const createNewVideo = async (token, videoData, Id) => {
  try {
    const response = await fetch(`${process.env.API_URL}/videos/?chapterId=${Id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(videoData),
    })

    return response
  } catch (error) {
    console.error('Error creating a new course:', error)
    throw error
  }
}

export const updateVideo = async (token, videoData, Id) => {
  try {
    const response = await fetch(`${process.env.API_URL}/videos/${Id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(videoData),
    })

    return response
  } catch (error) {
    console.error('Error creating a new course:', error)
    throw error
  }
}

export const deleteVideo = async (token, videoId) => {
  try {
    const response = await fetch(`${process.env.API_URL}/videos/${videoId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    return response
  } catch (error) {
    console.error('Error updating the course:', error)
    throw error
  }
}

export const resetPassword = async (passwordResetToken, password, confirmPassword) => {
  try {
    const response = await fetch(`${process.env.API_URL}/auths/reset-password/${passwordResetToken}`, {
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
  } catch (error) {
    console.log('Error creating a new course:', error)
    throw error
  }
}
