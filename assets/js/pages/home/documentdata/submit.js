document.getElementById("form4").addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    let formData = new FormData();
    formData.append(
      "image_ktp",
      document.querySelector("input[name='image_ktp']").files[0]
    );
    formData.append(
      "image_sim",
      document.querySelector("input[name='image_sim']").files[0]
    );
    formData.append(
      "image_bpjs",
      document.querySelector("input[name='image_bpjs']").files[0]
    );
    formData.append(
      "image_npwp",
      document.querySelector("input[name='image_npwp']").files[0]
    );

    const resp = await axios.post("api/documentdata", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(resp.data);
  } catch (error) {
    console.log(error);
  }
});
