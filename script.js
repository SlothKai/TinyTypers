function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

document.getElementById("enter-button").addEventListener("click", function () {
  document.getElementById("title-screen").style.display = "none"; // Hide title
  document.getElementById("typing-screen").style.display = "block"; // Show typing area
});

document.addEventListener("keydown", (event) => {
  let container = document.getElementById("typing-screen");
  let newElement = document.createElement("span");

  let randomColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
    Math.random() * 255
  })`;

  let randomSize = Math.floor(Math.random() * 50) + 20; // Between 20px and 70px

  // Get the screen width and height
  let screenWidth = container.clientWidth;
  let screenHeight = container.clientHeight;

  // Get a random position but ensure it's within bounds
  let randomX = Math.random() * (screenWidth - 100); // 100px buffer
  let randomY = Math.random() * (screenHeight - 100);

  //   effect_choice = getRandomInt(1, 3);
  effect_choice = getRandomInt(2);
  if (effect_choice == 1) {
    // Make the letter fade out after 3 seconds
    setTimeout(() => {
      newElement.style.transition = "opacity 1s";
      newElement.style.opacity = "0";
      setTimeout(() => newElement.remove(), 500); // Remove from DOM
    }, 1000);
  } else {
    // Make the letter move slightly
    let moveX = (Math.random() - 0.2) * 100; // Random movement range
    let moveY = (Math.random() - 0.2) * 100;

    setTimeout(() => {
      newElement.style.transition = "transform 1s linear";
      newElement.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }, 100);

    // Remove after some time
    setTimeout(() => {
      newElement.style.opacity = "0";
      setTimeout(() => newElement.remove(), 1000);
    }, 3000);
  }
  // Input all attributes into the new element
  newElement.innerText = event.key;
  newElement.style.position = "absolute";
  newElement.style.left = `${randomX}px`;
  newElement.style.top = `${randomY}px`;
  newElement.style.color = randomColor;
  newElement.style.fontSize = `${randomSize}px`;
  container.appendChild(newElement);
});
