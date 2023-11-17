document.addEventListener("DOMContentLoaded", function () {
    const botonReactivos = document.querySelector('.agregar-fila-reactivos');
    const botonEquipos = document.querySelector('.agregar-fila-equipos');
    const botonGenerarPDF = document.getElementById('generar-pdf');

    botonReactivos.addEventListener('click', function () {
        agregarFila('.reactivos table');
    });

    botonEquipos.addEventListener('click', function () {
        agregarFila('.equipos table');
    });

    botonGenerarPDF.addEventListener('click', function () {
        generarPDF();
    });

    function agregarFila(tableSelector) {
        const table = document.querySelector(tableSelector);

        if (table) {
            const newRow = table.insertRow(table.rows.length);
            const cellCount = table.rows[0].cells.length;

            for (let i = 0; i < cellCount; i++) {
                const cell = newRow.insertCell(i);
                const input = document.createElement('input');
                input.type = 'text';
                input.className = 'input-table';
                cell.appendChild(input);
            }
        }
    }

    function generarPDF() {
        const element = document.body;  // Cambia esto si quieres generar el PDF solo para una parte específica
        const options = {
            margin: 10,
            filename: 'documento.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().from(element).set(options).outputPdf(function(pdf) {
            const blob = new Blob([pdf], { type: 'application/pdf' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'documento.pdf';
            link.click();
        });
    }
});
