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
    },

    "P0102": {
        meaning: "Mass or Volume Air Flow (MAF) Circuit Low Input",
        severity: "Moderate",
        fix: "Clean or replace the MAF sensor; check for intake track vacuum leaks or damaged wiring."
    },
    "P0113": {
        meaning: "Intake Air Temperature (IAT) Circuit High Input",
        severity: "Low Warning",
        fix: "Check IAT sensor connector tracks, verify wiring harness harness stability, or replace sensor."
    },
    "P0115": {
        meaning: "Engine Coolant Temperature (ECT) Circuit Malfunction",
        severity: "Critical",
        fix: "Inspect coolant levels, check engine thermostat operation, or replace the ECT sensor."
    },
    "P0122": {
        meaning: "Throttle Position Sensor (TPS) Circuit Low Input",
        severity: "Moderate",
        fix: "Adjust, clean, or replace the throttle position sensor; check wiring for shorts to ground."
    },
    "P0130": {
        meaning: "02 Sensor Circuit Malfunction (Bank 1 Sensor 1)",
        severity: "Moderate",
        fix: "Check upstream oxygen sensor wiring connections or replace the sensor element."
    },
    "P0135": {
        meaning: "02 Sensor Heater Circuit Malfunction (Bank 1 Sensor 1)",
        severity: "Low Warning",
        fix: "Replace the upstream oxygen sensor (the internal heating circuit has failed)."
    },
    "P0141": {
        meaning: "02 Sensor Heater Circuit Malfunction (Bank 1 Sensor 2)",
        severity: "Low Warning",
        fix: "Inspect downstream oxygen sensor wiring or replace the downstream sensor unit."
    },
    "P0172": {
        meaning: "System Too Rich (Bank 1)",
        severity: "Moderate",
        fix: "Check for leaking fuel injectors, a faulty fuel pressure regulator, or a dirty air filter."
    },
    "P0174": {
        meaning: "System Too Lean (Bank 2)",
        severity: "Moderate",
        fix: "Inspect unmetered vacuum lines on Bank 2, clean MAF sensor, or check for weak fuel delivery."
    },
    "P0201": {
        meaning: "Injector Circuit Malfunction - Cylinder 1",
        severity: "Critical",
        fix: "Test Cylinder 1 fuel injector resistance, inspect harness plug tracks, or check injector pulse."
    },
    "P0234": {
        meaning: "Engine Overboost Condition",
        severity: "Critical",
        fix: "Inspect turbocharger wastegate solenoid, check lines, or test boost pressure sensors."
    },
    "P0301": {
        meaning: "Cylinder 1 Misfire Detected",
        severity: "Critical",
        fix: "Swap spark plug or ignition coil to another cylinder to isolate and replace the faulty unit."
    },
    "P0302": {
        meaning: "Cylinder 2 Misfire Detected",
        severity: "Critical",
        fix: "Check Cylinder 2 plug gap, inspect ignition coil boot for carbon tracking, or check injector."
    },
    "P0340": {
        meaning: "Camshaft Position Sensor Circuit Malfunction",
        severity: "Critical",
        fix: "Check camshaft sensor wiring connections, test sensor reference voltage, or replace sensor."
    },
    "P0351": {
        meaning: "Ignition Coil A Primary/Secondary Circuit Malfunction",
        severity: "Critical",
        fix: "Inspect wiring connection to ignition coil #1; replace coil pack if internal resistance is out of spec."
    },
    "P0401": {
        meaning: "Exhaust Gas Recirculation (EGR) Flow Insufficient Detected",
        severity: "Low Warning",
        fix: "Remove EGR valve and clean out carbon deposits; check EGR vacuum lines and position sensor."
    },
    "P0440": {
        meaning: "Evaporative Emission Control (EVAP) System Malfunction",
        severity: "Low Warning",
        fix: "Check for loose or broken gas cap, trace EVAP charcoal canister lines, or inspect purge valve."
    },
    "P0442": {
        meaning: "Evaporative Emission Control (EVAP) System Leak Detected (Small Leak)",
        severity: "Low Warning",
        fix: "Tighten fuel filler cap or run a smoke machine diagnostic track to locate pinhole EVAP leaks."
    },
    "P0455": {
        meaning: "Evaporative Emission Control (EVAP) System Leak Detected (Gross Leak)",
        severity: "Moderate",
        fix: "Check for a completely missing/loose fuel cap or a stuck open EVAP vent solenoid valve."
    },
    "P0500": {
        meaning: "Vehicle Speed Sensor (VSS) Malfunction",
        severity: "Moderate",
        fix: "Inspect speed sensor connections on transmission tailshaft, check gear teeth, or replace VSS."
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