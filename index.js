$(document).ready(function () {
    caches.open('my-cache').then(function(cache) {
  cache.add('/my-file.txt');
   });
    // Add event listener to the "Add Row" button
    $("#add-row-btn").click(function () {
      addRow();
    });
  
    // Add event listener to the input fields to update the total row
    $("#rows-container").on("input", "input", function () {
      updateTotalRow();
    });
  
    // Function to add a new row
    function addRow() {
      // Get the rows container
      var rowsContainer = document.getElementById("rows-container");
  
      // Create a new row element
      var newRow = document.createElement("div");
      newRow.classList.add("row");
  
      // Add input fields to the new row
      for (var i = 0; i < 6; i++) {
        var newCol = document.createElement("div");
        newCol.classList.add("col-sm-2");
  
        var newInput = document.createElement("input");
        newInput.classList.add("form-control");
        newInput.setAttribute("type", "text");
        newCol.appendChild(newInput);
  
        newRow.appendChild(newCol);
      }
  
      // Add the new row to the rows container
      rowsContainer.appendChild(newRow);
  
      // Set the focus to the first input field in the new row
      $(newRow).find("input:first").focus();
    }
  
    // Function to update the total row
    function updateTotalRow() {
      var totalNoOfBags = 0;
      var totalQty = 0;
      var totalLessBagWeight = 0;
      var totalNetWeight = 0;
      var totalCQty = 0;
  
      // Loop through all the rows
      $("#rows-container .row").each(function () {
        var noOfBags = parseInt($(this).find("input:eq(1)").val()) || 0;
        var qty = parseFloat($(this).find("input:eq(2)").val()) || 0;
        var lessBagWeight = Math.ceil(noOfBags / 2) || 0;
        var netWeight = qty - lessBagWeight;
        var cQty = netWeight + totalCQty;
  
        // Update the input fields in the row
        $(this).find("input:eq(3)").val(lessBagWeight);
        $(this).find("input:eq(4)").val(netWeight);
        $(this).find("input:eq(5)").val(cQty);
  
        // Update the total variables
        totalNoOfBags += noOfBags;
        totalQty += qty;
        totalLessBagWeight += lessBagWeight;
        totalNetWeight += netWeight;
        totalCQty = cQty;
      });
  
      // Update the total row input fields
      $("#total-row input:eq(0)").val(totalNoOfBags);
      $("#total-row input:eq(1)").val(totalQty.toFixed(2));
      $("#total-row input:eq(2)").val(totalLessBagWeight.toFixed(2));
      $("#total-row input:eq(3)").val(totalNetWeight.toFixed(2));
      $("#total-row input:eq(4)").val(totalCQty.toFixed(2));
    }
  });
  
