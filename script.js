function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getRandomCharacter() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789`~!@#$%^&*()-=_+][}{|;':/.,<>?";
  return characters.charAt(getRandomInt(characters.length));
}

function spawnCharacters(event) {
  let container = document.getElementById("typing-screen");
  let newElement = document.createElement("span");

  // Generate a random character
  let randomChar = getRandomCharacter();

  // Random color
  let randomColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
    Math.random() * 255
  })`;

  // Random font size
  let randomSize = Math.floor(Math.random() * 50) + 20; // Between 20px and 70px

  // Get touch position
  // let touch = event.touches[0] || event.changedTouches[0]; // Support different touch events
  let randomX = event.clientX;
  let randomY = event.clientY;

  // Randomly choose an effect
  let effect_choice = Math.floor(Math.random() * 2);

  if (effect_choice == 1) {
    // Fade-out effect after 3 seconds
    setTimeout(() => {
      newElement.style.transition = "opacity 1s";
      newElement.style.opacity = "0";
      setTimeout(() => newElement.remove(), 500);
    }, 1000);
  } else {
    // Move slightly effect
    let moveX = (Math.random() - 0.2) * 100;
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

  // Apply styles and append to screen
  newElement.innerText = randomChar;
  newElement.style.position = "absolute";
  newElement.style.left = `${randomX}px`;
  newElement.style.top = `${randomY}px`;
  newElement.style.color = randomColor;
  newElement.style.fontSize = `${randomSize}px`;

  container.appendChild(newElement);
}

document.getElementById("enter-button").addEventListener("click", function () {
  document.getElementById("title-screen").style.display = "none"; // Hide title
  document.getElementById("typing-screen").style.display = "block"; // Show typing area
});

const isTouchDevice = "ontouchstart" in window;

//--------------------------------------------- PC   SIDE OF THINGS
if (!isTouchDevice) {
  document.addEventListener("keydown", function (event) {
    event.preventDefault(); // Block all default behavior
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
}

//--------------------------------------------- MOBILE SIDE OF THINGS
let lastTouchEnd = 0;

if (isTouchDevice) {
  document.addEventListener(
    "touchstart",
    function (event) {
      if (event.touches.length > 1) {
        event.preventDefault(); // Prevents pinch-to-zoom
      }
    },
    { passive: false }
  );

  document.addEventListener("dblclick", function (event) {
    event.preventDefault(); // Prevents double-tap zoom
  });

  // Variables for tap and hold functionality
  let spawnInterval;
  let isTouching = false;
  let currentTouch; // Store the current touch position

  document
    .getElementById("typing-screen")
    .addEventListener("touchstart", (event) => {
      isTouching = true; // Set the flag to true when touch starts
      currentTouch = event.touches[0];
      spawnCharacters(currentTouch); // Spawn the first character immediately

      // Start spawning characters repeatedly while the user is holding
      spawnInterval = setInterval(() => {
        if (isTouching) {
          spawnCharacters(currentTouch);
        }
      }, 100); // Adjust the interval (in milliseconds) for faster/slower spawning
    });

  // Update the touch position if the user moves their finger
  document
    .getElementById("typing-screen")
    .addEventListener("touchmove", (event) => {
      if (isTouching) {
        currentTouch = event.touches[0]; // Update the touch position
      }
    });

  // Stop spawning characters on touch end
  document.getElementById("typing-screen").addEventListener("touchend", () => {
    isTouching = false; // Set the flag to false when touch ends
    clearInterval(spawnInterval); // Stop spawning characters
  });
}
