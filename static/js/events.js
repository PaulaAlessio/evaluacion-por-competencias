    document.getElementById('create_btn').addEventListener('click', function () {
        const form = document.getElementById('dynamicForm');
        form.action = '/create_events'; // Set form action to Route 2
        //form.method = "POST";
        form.submit();          // Submit the form
    });

        document.getElementById('filter_btn').addEventListener('click', function () {
        const form = document.getElementById('dynamicForm');
        form.action = '/filter_by_form'; // Set form action to Route 2
        form.method = "GET";
        form.submit();          // Submit the form
    });

    document.getElementById('export_pdf_btn').addEventListener('click', function () {
        const elements = document.querySelectorAll('.no_print');
        elements.forEach(el => {
            el.style.display = 'none'; // Hide the element
        });

        const checkboxes = document.querySelectorAll('.rowCheckbox');
        checkboxes.forEach(cb => {
        if (!cb.checked) {
            const rowId = cb.getAttribute("data-row-id");
            if (rowId) {
                const riga = document.getElementById(rowId);
                if (riga) {
                    riga.style.display = 'none';
                }
            }
        }
        });

        const data = document.getElementById('competencias');
        // Use html2canvas to capture the data
        html2canvas(data).then(function (canvas) {
        const imgData = canvas.toDataURL('image/png');

        // Load jsPDF from the global window
        const { jsPDF } = window.jspdf;

        // Create a new jsPDF instance
        const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: 'a4'
         });

        // Get page dimensions
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        // Get the dimensions of the canvas
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        // Calculate scale ratio to fit the image to the PDF size
        const ratio = Math.min(pageWidth / canvasWidth, pageHeight / canvasHeight);

        // Set the width and height based on the ratio
        const width = canvasWidth * ratio;
        const height = canvasHeight * ratio;

        // Add the image to the PDF, centered on the page
        pdf.addImage(imgData, 'PNG', (pageWidth - width) / 2, 20, width, height);

        // Save the PDF with a filename
        pdf.save('competencias.pdf');
        }).catch(function (error) {
        console.error('Error exporting to PDF:', error);
        }
        );

        checkboxes.forEach(cb => {
        if (!cb.checked) {
            const rowId = cb.getAttribute("data-row-id");
            if (rowId) {
                const riga = document.getElementById(rowId);
                if (riga) {
                    riga.style.display = '';
                }
            }
        }
        });
        elements.forEach(el => {
            el.style.display = ''; // Show the element
        });
    });

    // Select all checkboxes
    document.getElementById('selectAllBtn').addEventListener('click', () => {
       const checkboxes = document.querySelectorAll('.rowCheckbox');
       checkboxes.forEach(cb => cb.checked = true);
    });

    // Unselect all checkboxes
    document.getElementById('unselectAllBtn').addEventListener('click', () => {
       const checkboxes = document.querySelectorAll('.rowCheckbox');
       checkboxes.forEach(cb => cb.checked = false);
     });
