const dataScript = document.currentScript.getAttribute("dataScript");
const contractmodaldetail = document.currentScript.getAttribute(
  "contractmodaldetail"
);

$.getScript("js/pages/home/divisiondata/modalcontractdetail.js", () => {
  showModalContractDetails(contractmodaldetail);
});

$(".js-example-basic-single1").select2();
$(".js-example-basic-single2").select2();
$(".js-example-basic-multiple").select2();
$(".js-example-basic-single1").on("select2:select", function (e) {
  let data = e.params.data;
  let divisionData = JSON.parse(dataScript);
  let filteredDivision = divisionData
    .filter((_) => {
      return _.name === data.id;
    })
    .map((_) => _.rank)[0];
  $(".js-example-basic-single2").html(
    filteredDivision.map(
      (_) =>
        `<option value="${_}">
            ${_}
        </option>`
    )
  );
});

function autoFillField(statement1, statement2, statetement3) {
  document
    .querySelector(`input[name='${statement1}']`)
    .addEventListener("focusout", (e) => {
      document.querySelector(`input[name='${statement2}']`).value =
        e.currentTarget.value * statetement3;
    });
}

autoFillField("full_sallary", "attendance_compensation", 0.1);
autoFillField("full_sallary", "transport_compensation", 0.005);
autoFillField("full_sallary", "launch_compensation", 0.005);

document.getElementById("form2").addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const formData = {
      division: document.querySelector("select[name='division']").value,
      rank: document.querySelector("select[name='rank']").value,
      offdays: $(".js-example-basic-multiple").val(),
      full_sallary: $("input[name='full_sallary']").val(),
      attendance_compensation: $("input[name='attendance_compensation']").val(),
      transport_compensation: $("input[name='transport_compensation']").val(),
      launch_compensation: $("input[name='launch_compensation']").val(),
    };

    console.log(formData);
    const resp = await axios.post("api/divisiondata", formData);
    $("#result-message").html(resp.data.msg);
    $("#confirm-modal").modal("show");
    setTimeout(() => {
      location.reload();
    }, 2000);
  } catch (error) {
    console.log(error);
  }
});
