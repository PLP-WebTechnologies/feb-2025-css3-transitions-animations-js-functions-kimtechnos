document.addEventListener("DOMContentLoaded", function () {
  // DOM elements
  const animatedBox = document.getElementById("animated-box");
  const animateBtn = document.getElementById("animate-btn");
  const resetBtn = document.getElementById("reset-btn");
  const savePrefsBtn = document.getElementById("save-prefs");
  const themeSelect = document.getElementById("theme");
  const speedSelect = document.getElementById("animation-speed");

  // Animation types
  const animations = ["rotate", "bounce", "color-change"];
  let currentAnimationIndex = 0;

  // Load saved preferences
  loadPreferences();

  // Event listeners
  animateBtn.addEventListener("click", triggerAnimation);
  resetBtn.addEventListener("click", resetAnimation);
  savePrefsBtn.addEventListener("click", savePreferences);

  // Function to trigger animation
  function triggerAnimation() {
    // Remove any existing animation classes
    resetAnimation();

    // Add the current animation class
    const animationClass = animations[currentAnimationIndex];
    animatedBox.classList.add(animationClass);

    // Update animation index for next click
    currentAnimationIndex = (currentAnimationIndex + 1) % animations.length;

    // Save the current animation state
    localStorage.setItem("lastAnimation", animationClass);
  }

  // Function to reset animation
  function resetAnimation() {
    animations.forEach((anim) => {
      animatedBox.classList.remove(anim);
    });
  }

  // Function to save user preferences
  function savePreferences() {
    const theme = themeSelect.value;
    const speed = speedSelect.value;

    localStorage.setItem("userTheme", theme);
    localStorage.setItem("animationSpeed", speed);

    // Apply preferences immediately
    applyPreferences(theme, speed);

    // Show confirmation animation
    savePrefsBtn.textContent = "Saved!";
    savePrefsBtn.style.backgroundColor = "#2ecc71";
    setTimeout(() => {
      savePrefsBtn.textContent = "Save Preferences";
      savePrefsBtn.style.backgroundColor = "#4CAF50";
    }, 1500);
  }

  // Function to load and apply saved preferences
  function loadPreferences() {
    const savedTheme = localStorage.getItem("userTheme") || "light";
    const savedSpeed = localStorage.getItem("animationSpeed") || "normal";
    const lastAnimation = localStorage.getItem("lastAnimation");

    // Set select values
    themeSelect.value = savedTheme;
    speedSelect.value = savedSpeed;

    // Apply preferences
    applyPreferences(savedTheme, savedSpeed);

    // If there was a last animation, show it
    if (lastAnimation) {
      // Find the index of the last animation
      currentAnimationIndex = animations.indexOf(lastAnimation);
      if (currentAnimationIndex === -1) currentAnimationIndex = 0;

      // Apply the animation
      animatedBox.classList.add(lastAnimation);
    }
  }

  // Function to apply preferences to the page
  function applyPreferences(theme, speed) {
    // Apply theme
    document.body.className = ""; // Clear any existing theme classes
    document.body.classList.add(`${theme}-theme`);

    // Apply animation speed
    let speedValue;
    switch (speed) {
      case "slow":
        speedValue = "3s";
        break;
      case "fast":
        speedValue = "0.5s";
        break;
      default:
        speedValue = "1.5s";
    }

    document.documentElement.style.setProperty("--animation-speed", speedValue);
  }

  //  Add hover effect animation
  animatedBox.addEventListener("mouseenter", function () {
    if (
      !this.classList.contains("rotate") &&
      !this.classList.contains("bounce") &&
      !this.classList.contains("color-change")
    ) {
      this.style.transform = "scale(1.1)";
    }
  });

  animatedBox.addEventListener("mouseleave", function () {
    if (
      !this.classList.contains("rotate") &&
      !this.classList.contains("bounce") &&
      !this.classList.contains("color-change")
    ) {
      this.style.transform = "scale(1)";
    }
  });
});