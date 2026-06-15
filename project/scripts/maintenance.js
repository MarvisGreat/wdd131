const maintenanceForm = document.querySelector('#maintenance-form');
const logsDisplayContainer = document.getElementById('logs-display-container');

function renderServiceLogs() {
    const serviceLogs = JSON.parse(localStorage.getItem('autoSolLogs')) || [];

    if (serviceLogs.length === 0) {
        logsDisplayContainer.innerHTML = `
            <div class="empty-state-notice">
                <p>No logged services found. Use the form to submit your first service update.</p>
            </div>
        `;
        return;
    }

    let logsHtmlContent = '<div class="logs-list-wrapper">';
    serviceLogs.forEach((log) => {
        logsHtmlContent += `
            <div class="service-history-card">
                <div class="history-card-header">
                    <span class="history-date">📅 ${log.date}</span>
                    <span class="history-badge">${log.type.toUpperCase()}</span>
                </div>
                <p class="history-mileage"><strong>Mileage:</strong> ${Number(log.mileage).toLocaleString()} KM</p>
            </div>
        `;
    });
    logsHtmlContent += '</div>';
    logsDisplayContainer.innerHTML = logsHtmlContent;
}

function handleFormSubmit(event) {
    event.preventDefault();

    const dateInput = document.getElementById('service-date').value;
    const mileageInput = document.getElementById('service-mileage').value;
    const typeSelect = document.getElementById('service-type');
    const typeText = typeSelect.options[typeSelect.selectedIndex].text;

    const newLogObject = {
        id: Date.now(),
        date: dateInput,
        mileage: mileageInput,
        type: typeText
    };

    const currentLogsArray = JSON.parse(localStorage.getItem('autoSolLogs')) || [];
    currentLogsArray.unshift(newLogObject);

    localStorage.setItem('autoSolLogs', JSON.stringify(currentLogsArray));

    maintenanceForm.reset();
    renderServiceLogs();
}

if (maintenanceForm) {
    maintenanceForm.addEventListener('submit', handleFormSubmit);
}

document.addEventListener('DOMContentLoaded', renderServiceLogs);