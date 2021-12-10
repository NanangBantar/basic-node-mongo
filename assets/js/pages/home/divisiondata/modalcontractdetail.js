const showModalContractDetails = (statement) => {
  document
    .getElementById("contract_details_modal")
    .addEventListener("click", () => {
      $("#confirm-modal").modal("show");
    });
};
