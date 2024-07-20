document.getElementById('etaForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const miles = parseFloat(document.getElementById('miles').value);
    const mph = parseFloat(document.getElementById('mph').value);
    const datetime = new Date(document.getElementById('datetime').value);
    let hosRemaining = parseFloat(document.getElementById('hos').value);

    // Constants
    const DAILY_DRIVING_LIMIT_HOURS = 10;
    const SLEEPER_BERTH_HOURS = 10;
    const FUELING_TIME_HOURS = 2;
    const BREAK_TIME_HOURS = 0.5; // 30 minutes
    const INSPECTION_TIME_HOURS_PER_DAY = 0.5; // 30 minutes total for pre-trip and post-trip inspections

    // Calculate travel time
    const travelTimeHours = miles / mph;

    // Initialize total time including fueling
    let totalTimeHours = travelTimeHours + FUELING_TIME_HOURS;

    // Add 30-minute break if driving exceeds 8 hours
    if (travelTimeHours > 8) {
        totalTimeHours += BREAK_TIME_HOURS;
    }

    // Calculate the number of full driving days required
    const fullDrivingDays = Math.floor(travelTimeHours / DAILY_DRIVING_LIMIT_HOURS);
    const remainingDrivingTime = travelTimeHours % DAILY_DRIVING_LIMIT_HOURS;

    // Add inspection times for each full driving day
    totalTimeHours += fullDrivingDays * INSPECTION_TIME_HOURS_PER_DAY;

    // Add sleeper berth periods for each full driving day
    totalTimeHours += fullDrivingDays * SLEEPER_BERTH_HOURS;

    // If there is remaining driving time beyond a full driving day, add additional sleeper berth and inspection time
    if (remainingDrivingTime > 0) {
        totalTimeHours += INSPECTION_TIME_HOURS_PER_DAY;
        if (remainingDrivingTime > DAILY_DRIVING_LIMIT_HOURS) {
            totalTimeHours += SLEEPER_BERTH_HOURS;
        }
    }

    // Calculate ETA
    const eta = new Date(datetime.getTime() + totalTimeHours * 60 * 60 * 1000);

    // Format ETA
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    const etaFormatted = eta.toLocaleString('en-US', options);

    // Explanation
    let explanation = `
        <p><strong>Estimated Time of Arrival (ETA):</strong> ${etaFormatted}</p>
        <p><strong>Explanation:</strong></p>
        <ul>
            <li>Travel Time: ${travelTimeHours.toFixed(2)} hours (${miles} miles / ${mph} mph)</li>
            <li>Fueling Time: ${FUELING_TIME_HOURS} hours</li>
            <li>30-Minute Break: ${travelTimeHours > 8 ? BREAK_TIME_HOURS : 0} hours (added if driving time exceeds 8 hours)</li>
            <li>Sleeper Berth: ${fullDrivingDays * SLEEPER_BERTH_HOURS + (remainingDrivingTime > DAILY_DRIVING_LIMIT_HOURS ? SLEEPER_BERTH_HOURS : 0)} hours</li>
            <li>Inspection Time: ${fullDrivingDays * INSPECTION_TIME_HOURS_PER_DAY + (remainingDrivingTime > 0 ? INSPECTION_TIME_HOURS_PER_DAY : 0)} hours</li>
        </ul>
        <p><strong>Total Time:</strong> ${totalTimeHours.toFixed(2)} hours</p>
    `;

    // Display results
    document.getElementById('result').innerHTML = explanation;
});
