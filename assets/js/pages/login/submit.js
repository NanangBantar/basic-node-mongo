document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const formData = {
      email: document.querySelector("input[name='email']").value,
      password: document.querySelector("input[name='password']").value,
    };
    const resp = await axios.post("api/user", formData);
    window.location.href = "/home";
  } catch (error) {
    console.log(error);
  }
});
