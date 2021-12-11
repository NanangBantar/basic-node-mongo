document.getElementById("form4").addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const formData = {
      image_ktp: document.querySelector("input[name='image_ktp']").value,
      image_sim: document.querySelector("input[name='image_sim']").value,
      image_bpjs: document.querySelector("input[name='image_bpjs']").value,
      image_npwp: document.querySelector("input[name='image_npwp']").value,
    };
    const resp = await axios.post("api/documentdata", formData);

    console.log(resp.data);
  } catch (error) {
    console.log(error);
  }
});
