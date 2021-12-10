document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const formData = {
      nama_karyawan: document.querySelector("input[name='nama_karyawan']")
        .value,
      alamat_ktp: document.querySelector("input[name='alamat_ktp']").value,
      nomor_hp: document.querySelector("input[name='nomor_hp']").value,
      nomor_serumah: document.querySelector("input[name='nomor_serumah']")
        .value,
      jenis_kelamin: document.querySelector("select[name='jenis_kelamin']")
        .value,
      no_ktp: document.querySelector("input[name='no_ktp']").value,
      no_sim: document.querySelector("input[name='no_sim']").value,
      no_npwp: document.querySelector("input[name='no_npwp']").value,
    };

    const resp = await axios.post("api/personaldata", formData);
    $("#result-message").html(resp.data.msg);
    $("#confirm-modal").modal("show");
    setTimeout(() => {
      location.reload();
    }, 2000);
  } catch (error) {
    console.log(error);
  }
});
