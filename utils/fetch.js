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
