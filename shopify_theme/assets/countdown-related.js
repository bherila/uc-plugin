function pluralize(unit, value) {
  return `${value} ${unit}${value === 1 ? "" : "S"}`;
}

function initializeRelatedCountdownTimer(productId) {
  if (!document) {
    console.log("document not ready.");
    return;
  }
  // Get the main element by ID
  const elementId = `related-timer-${productId}`;
  const element = document.getElementById(elementId);

  if (element) {
    // Get the display element by ID
    const countdownDisplay = document.getElementById(
      `related-display-${productId}`
    );
    // Parse the end time from the element's data attribute
    const parsedTime = element.getAttribute("data-end-time");
    let endTime;

    // Check if parsedTime is already in seconds (Unix timestamp) or needs parsing from a date string
    if (/^\d+$/.test(parsedTime)) {
      endTime = parseInt(parsedTime, 10);
    } else {
      // Assuming the time is in an ISO 8601 format or similar
      endTime = new Date(parsedTime).getTime() / 1000;
    }

    // Check if endTime is NaN
    if (isNaN(endTime)) {
      console.error(
        `Invalid end time for product ID: ${productId}:`,
        parsedTime
      );
      countdownDisplay.innerHTML = "TBD";
      return; // Exit the function if endTime is not a valid number
    }

    // Log initialization details
    // console.log(`Initializing countdown for product ID: ${productId}`);
    // console.log(`End time (parsed): ${endTime}`);
    // console.log(`End time attribute: ${element.getAttribute("data-end-time")}`);

    // Function to update the countdown
    const updateCountdown = () => {
      const currentTime = Math.floor(Date.now() / 1000);
      let secondsLeft = endTime - currentTime;

      // Log current time and seconds left
      // console.log(`Current time: ${currentTime}`);
      // console.log(`Seconds left: ${secondsLeft}`);

      // Calculate time components
      const days = Math.floor(secondsLeft / 86400);
      secondsLeft %= 86400;
      const hours = Math.floor(secondsLeft / 3600);
      secondsLeft %= 3600;
      const minutes = Math.floor(secondsLeft / 60);
      const seconds = secondsLeft % 60;

      // Update the countdown display
      let countdownText;
      if (days > 0) {
        countdownText = `<div><span class="bold">${pluralize(
          "DAY",
          days
        )}</span></div>`;
      } else if (hours > 0) {
        countdownText = `<div><span class="bold">${pluralize(
          "HOUR",
          hours
        )}</span></div>`;
      } else if (minutes > 0) {
        countdownText = `<div><span class="bold">${pluralize(
          "MINUTE",
          minutes
        )}</span></div>`;
      } else if (seconds > 0) {
        countdownText = `<div><span class="bold"><1 MINUTE</span></div>`;
      } else {
        countdownText = `<div><span class="bold whitespace-nowrap">SOLD OUT</span></div>`;
      }

      const innerDiv =
        "<div class='countdown-container'>" +
        countdownText +
        "</div>";
      countdownDisplay.innerHTML = innerDiv;

      // Check if the countdown has ended
      if (secondsLeft <= 0) {
        clearInterval(intervalId);
        return;
      }
    };

    // Set an interval to update the countdown every second
    const intervalId = setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial update
  } else {
    // Log if the main element is not found
    console.log(`Countdown timer element with ID ${elementId} not found.`);
  }
}
