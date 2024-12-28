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

function sortTable(columnIndex, headerElement) {
    const table = document.getElementById("competencies-table");
    const rows = Array.from(table.rows).slice(1); // Get all rows except the header
    const isAscending = table.getAttribute("data-sort-order") === "asc";

    // Toggle sort order
    table.setAttribute("data-sort-order", isAscending ? "desc" : "asc");
    // Add appropriate class to the clicked header
    headerElement.classList.remove(isAscending ? "sorted-desc" : "sorted-asc");
    headerElement.classList.add(isAscending ? "sorted-asc" : "sorted-desc");

    // Sort rows based on the selected column
    rows.sort((a, b) => {
        const cellA = a.cells[columnIndex].innerText.trim();
        const cellB = b.cells[columnIndex].innerText.trim();

        if (!isNaN(cellA) && !isNaN(cellB)) {
            // Numeric sorting
            return isAscending ? cellA - cellB : cellB - cellA;
        } else {
            // String sorting
            return isAscending ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA);
        }
    });

    // Append sorted rows back to the table
    const tbody = table.querySelector("tbody");
    rows.forEach(row => tbody.appendChild(row));
}

document.getElementById("delSelectedBtn").addEventListener("click", function () {
    const checkboxes = document.querySelectorAll(".rowCheckbox:checked");
    const selectedEventIds = Array.from(checkboxes).map(cb => cb.getAttribute("data-row-id"));

    if (selectedEventIds.length === 0) {
        alert("No events selected!");
        return;
    }

    // Confirm deletion
    if (!confirm("Are you sure you want to delete the selected events?")) return;

    // Send the selected IDs to the backend
    fetch("/delete_selected_events", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ event_ids: selectedEventIds }),
    })
        .then(response => {
            if (response.ok) {
                alert("Selected events deleted successfully!");
                // Optionally, refresh the page or remove the deleted rows from the table
                selectedEventIds.forEach(id => {
                    const row = document.querySelector(`input[data-row-id="${id}"]`).closest("tr");
                    row.remove();
                });
            } else {
                alert("Error deleting events.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Error deleting events.");
        });
});

