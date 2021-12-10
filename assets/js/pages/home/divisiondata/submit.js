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

document.getElementById("form2").addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const formData = {
      division: document.querySelector("select[name='division']").value,
      rank: document.querySelector("select[name='rank']").value,
      offdays: $(".js-example-basic-multiple").val(),
    };
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
