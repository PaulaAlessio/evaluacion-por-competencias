document.addEventListener('DOMContentLoaded', function() {
  // Loop through all the editable cells in the table
  const editableCells = document.querySelectorAll('td.editable');

  editableCells.forEach(cell => {
    const value = cell.innerText;

    // Apply styles based on the value of the cell
    if (value === 'None') {
      cell.classList.add('gray');  // For 'None' values
    } else {
      const numValue = parseFloat(value); // Convert string to number
      if (isNaN(numValue)) {
	// Skip if it's not a valid number
	return;
      }
      if (numValue < 5) {
	  //cell.style.backgroundColor = 'IndianRed';
	  cell.classList.add('red'); // For values below 5
      } else {
	cell.classList.add('green'); // For values 5 or greater
      }
    }
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const editableCells = document.querySelectorAll(".editable");
  editableCells.forEach(cell => {
    cell.addEventListener("keydown", function (event) {
      // Check if Enter key is pressed
      if (event.key === "Enter") {
	event.preventDefault();  // Prevent Enter from creating a new line in contenteditable

	const newValue = cell.textContent.trim();  // Get the edited value
	const column = cell.getAttribute("data-column");  // Get the column name (CE1, CE2, etc.)
	const eventId = cell.getAttribute("data-event-id");  // Get the event ID

	// Construct the URL with query parameters
	const url = `/update_event?event_id=${eventId}&column=${column}&value=${newValue}`;

	if (newValue === 'None' || newValue === '') {
          cell.classList.add('gray');  // For 'None' values
	} else if (newValue < 5) {
	  cell.classList.remove('gray'); // For values below 5
	  cell.classList.add('red'); // For values below 5
	} else {
	  cell.classList.remove('gray'); // For values below 5
	  cell.classList.add('green'); // For values 5 or greater
	}

	// Send the GET request with the URL args
	fetch(url)
	  .then(response => response.text())  // Expecting text response
	  .then(data => {
	    // Handle success (e.g., show a success message, update the table, etc.)
	    console.log("Event updated successfully:", data);
	  })
	  .catch(error => {
	    // Handle error (e.g., show an error message)
	    console.error("Error updating event:", error);
	  });
      }
    });
  });
});
