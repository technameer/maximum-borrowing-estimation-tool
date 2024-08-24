const predefinedSchema = ['Year', 'Quarter', 'Region', 'Department', 'Process Name', 'Total Emissions', 'Emissions per Single'];
let csvHeaders = [];
let csvData = [];

document.getElementById('csvFileInput').addEventListener('change', handleFileUpload);

function handleFileUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const content = e.target.result;
        processCSV(content);
    };
    reader.readAsText(file);
}

function processCSV(content) {
    const lines = content.split('\n');
    csvHeaders = lines[0].split(',');
    csvData = lines.slice(1).map(line => line.split(','));
    showMappingOptions();
}

function showMappingOptions() {
    const mappingSection = document.getElementById('mappingSection');
    const mappingContainer = document.getElementById('mappingContainer');
    mappingContainer.innerHTML = '';
    csvHeaders.forEach((header, index) => {
        const select = document.createElement('select');
        predefinedSchema.forEach(schema => {
            const option = document.createElement('option');
            option.value = schema;
            option.textContent = schema;
            if (schema.toLowerCase() === header.trim().toLowerCase()) {
                option.selected = true;
            }
            select.appendChild(option);
        });
        mappingContainer.appendChild(select);
        mappingContainer.appendChild(document.createElement('br'));
    });
    mappingSection.style.display = 'block';
}

function finalizeMapping() {
    const resultTable = document.getElementById('resultTable');
    resultTable.innerHTML = '';
    const headerRow = document.createElement('tr');
    predefinedSchema.forEach(schema => {
        const th = document.createElement('th');
        th.textContent = schema;
        headerRow.appendChild(th);
    });
    resultTable.appendChild(headerRow);

    csvData.forEach(dataRow => {
        const row = document.createElement('tr');
        predefinedSchema.forEach(schema => {
            const td = document.createElement('td');
            const headerIndex = csvHeaders.findIndex(h => h.trim().toLowerCase() === schema.toLowerCase());
            td.textContent = dataRow[headerIndex];
            row.appendChild(td);
        });
        resultTable.appendChild(row);
    });

    document.getElementById('resultSection').style.display = 'block';
}
