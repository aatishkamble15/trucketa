document.getElementById('etaForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const miles = parseFloat(document.getElementById('miles').value);
    const mph = parseFloat(document.getElementById('mph').value);
    const datetime = new Date(document.getElementById('datetime').value);
    let hosRemaining = parseFloat(document.getElementById('hos').value);

    // Constants
    const SLEEPER_BERTH_HOURS = 10;
    const FUELING_TIME_HOURS = 2;
    const BREAK_TIME_HOURS = 0.5; // 30 minutes
    const INSPECTION_TIME_HOURS = 0.5; // 15 minutes + 15 minutes

    // Calculate travel time
    const travelTimeHours = miles / mph;

    // Start with basic total time including necessary breaks and inspections
    let totalTimeHours = travelTimeHours + FUELING_TIME_HOURS + INSPECTION_TIME_HOURS;

    // Add 30-minute break if driving exceeds 8 hours
    if (travelTimeHours > 8) {
        totalTimeHours += BREAK_TIME_HOURS;
    }

    // Add 10-hour sleeper berth period
    totalTimeHours += SLEEPER_BERTH_HOURS;

    // Adjust total time based on remaining HOS hours
    const totalHours = Math.max(totalTimeHours, hosRemaining);

    // Calculate ETA
    const eta = new Date(datetime.getTime() + totalHours * 60 * 60 * 1000);

    // Format ETA
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    const etaFormatted = eta.toLocaleString('en-US', options);

    // Display results
    document.getElementById('result').innerHTML = `
        <p><strong>Estimated Time of Arrival (ETA):</strong> ${etaFormatted}</p>
        <p><strong>Explanation:</strong> The ETA was calculated based on the miles to travel, speed, and additional time for sleeper berth (10 hours), fueling (2 hours), and inspections (30 minutes total). A 30-minute break was added if driving time exceeded 8 hours. The total time was adjusted based on the remaining HOS hours.</p>
    `;
});
