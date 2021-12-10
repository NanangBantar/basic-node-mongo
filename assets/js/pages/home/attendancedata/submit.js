document.getElementById("form1").addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const formData = {
      jam_masuk: document.querySelector("input[name='jam_masuk']").value,
      jam_istirahat: document.querySelector("input[name='jam_istirahat']")
        .value,
      jam_selesai_istirahat: document.querySelector(
        "input[name='jam_selesai_istirahat']"
      ).value,
      jam_pulang: document.querySelector("input[name='jam_pulang']").value,
    };

    const resp = await axios.post("api/attendancedata", formData);
    $("#result-message").html(resp.data.msg);
    $("#confirm-modal").modal("show");
    setTimeout(() => {
      location.reload();
    }, 2000);
  } catch (error) {
    console.log(error);
  }
});
