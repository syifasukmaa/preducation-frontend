export const loginAdmin = async (username, password) => {
  try {
    const response = await fetch(`${process.env.API_URL}/auths/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const createNewCourse = async (token, courseData) => {
  try {
    const response = await fetch(`${process.env.API_URL}/courses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(courseData),
    });

    return response;
  } catch (error) {
    console.error("Error creating a new course:", error);
    throw error;
  }
};

export const updateCourse = async (token, courseId, updatedCourseData) => {
  try {
    const response = await fetch(`${process.env.API_URL}/courses/${courseId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: updatedCourseData,
    });

    return response;
  } catch (error) {
    console.error("Error updating the course:", error);
    throw error;
  }
};

export const deleteCourse = async (token, courseId) => {
  try {
    const response = await fetch(`${process.env.API_URL}/courses/${courseId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Error updating the course:", error);
    throw error;
  }
};
