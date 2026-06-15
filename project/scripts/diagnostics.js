const diagnosticDatabase = {
    "P0300": {
        meaning: "Random/Multiple Cylinder Misfire Detected",
        severity: "Critical",
        fix: "Check spark plugs, ignition coils, and fuel delivery circuits."
    },
    "P0171": {
        meaning: "System Too Lean (Bank 1)",
        severity: "Moderate",
        fix: "Inspect vacuum lines, mass airflow (MAF) sensor, and fuel filter."
    },
    "P0420": {
        meaning: "Catalytic Converter Efficiency Below Threshold",
        severity: "Low Warning",
        fix: "Check for exhaust leaks before the converter or test O2 sensor voltages."
    }
};

function checkDiagnosticCode(userCode) {
    const cleanCode = userCode.trim().toUpperCase();
    return diagnosticDatabase[cleanCode] || null;
}

function renderDiagnosticResult(result) {
    if (result === null) {
        return `
            <div class="result-card error-state">
                <h3>System Readout</h3>
                <p>⚠️ Fault code not found in local database tracks. Double check input formatting.</p>
            </div>
        `;
    }

    return `
        <div class="result-card severity-${result.severity.toLowerCase().replace(' ', '-')}">
            <h3>Diagnostic Result</h3>
            <p><strong>Meaning:</strong> ${result.meaning}</p>
            <p><strong>Severity Level:</strong> ${result.severity}</p>
            <p><strong>Recommended Fix:</strong> ${result.fix}</p>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    const scanButton = document.querySelector('#scan-btn');
    const codeInput = document.querySelector('#obd-input');
    const outputDisplay = document.querySelector('#diagnostic-display-box');

    if (scanButton && codeInput && outputDisplay) {
        scanButton.addEventListener('click', (event) => {
            event.preventDefault();

            const enteredCode = codeInput.value;
            const matchedData = checkDiagnosticCode(enteredCode);
            const dynamicHTML = renderDiagnosticResult(matchedData);

            outputDisplay.innerHTML = dynamicHTML;
        });
    }
});