document.getElementById('eta-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const distance = parseFloat(document.getElementById('distance').value);
    const speed = parseFloat(document.getElementById('speed').value);
    const startTime = new Date(document.getElementById('start-time').value);
    const hoursLeft = parseFloat(document.getElementById('hours-left').value);

    const drivingHoursPerDay = 11;
    const breakTime = 0.5; // 30 minutes in hours
    const offDutyTime = 10; // 10 hours in hours
    const preTripInspection = 0.25; // 15 minutes in hours
    const postTripInspection = 0.25; // 15 minutes in hours
    const fuelingTime = 0.5; // 30 minutes in hours

    let totalDrivingTime = distance / speed;
    let remainingDrivingTime = totalDrivingTime;

    let currentDateTime = new Date(startTime);

    // If driver has some hours left to drive before starting the trip
    if (hoursLeft > 0) {
        let dailyDrivingTime = Math.min(remainingDrivingTime, hoursLeft);
        let totalDayTime = dailyDrivingTime + breakTime + preTripInspection + postTripInspection + fuelingTime;

        currentDateTime.setHours(currentDateTime.getHours() + totalDayTime);
        remainingDrivingTime -= dailyDrivingTime;

        if (remainingDrivingTime > 0) {
            currentDateTime.setHours(currentDateTime.getHours() + offDutyTime);
        }
    }

    while (remainingDrivingTime > 0) {
        let dailyDrivingTime = Math.min(remainingDrivingTime, drivingHoursPerDay);
        let totalDayTime = dailyDrivingTime + breakTime + preTripInspection + postTripInspection + fuelingTime;

        currentDateTime.setHours(currentDateTime.getHours() + totalDayTime);
        remainingDrivingTime -= dailyDrivingTime;

        if (remainingDrivingTime > 0) {
            currentDateTime.setHours(currentDateTime.getHours() + offDutyTime);
        }
    }

    document.getElementById('result').textContent = `ETA: ${currentDateTime.toISOString()}`;
});
