let retypepasswordmodal = document.currentScript.getAttribute(
  "retypepasswordmodaldetail"
);

retypepasswordmodal = JSON.parse(retypepasswordmodal);

document.getElementById("form3").addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const password = document.querySelector("input[name='password']").value;
    const new_password = document.querySelector(
      "input[name='new_password']"
    ).value;
    const retype_new_password = document.querySelector(
      "input[name='new_password']"
    ).value;

    if (new_password !== retype_new_password) {
      $("#modal_title").html(retypepasswordmodal.retypepasswordModalTitle);
      $("#result-message").html(retypepasswordmodal.retypepasswordModalContent);
    }
    const formData = {
      password,
      new_password,
      retype_new_password,
    };

    const resp = await axios.post("api/settingdata", formData);

    console.log(resp.data);

    $("#result-message").html(resp.data.msg);
    $("#confirm-modal").modal("show");
    setTimeout(() => {
      location.reload();
    }, 2000);
  } catch (error) {
    console.log(error);
  }
});
