const showModalContractDetails = (statement) => {
  document
    .getElementById("contract_details_modal")
    .addEventListener("click", () => {
      const message = JSON.parse(statement);
      $("#modal_title").html(message.contractModalTitle);
      $("#result-message").html(message.contractModalContent);
      $("#confirm-modal").modal("show");
    });
};
