document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const formData = {
      email: document.querySelector("input[name='email']").value,
      password: document.querySelector("input[name='password']").value,
    };
    const resp = await axios.post("api/createuser", formData);
    $("#result-message").html(resp.data.msg);
    $("#confirm-modal").modal("show");
  } catch (error) {
    console.log(error);
  }
});
