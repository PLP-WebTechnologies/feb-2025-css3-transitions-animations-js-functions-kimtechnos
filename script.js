document.addEventListener("DOMContentLoaded", function () {
  // DOM elements
  const animatedBox = document.getElementById("animated-box");
  const animateBtn = document.getElementById("animate-btn");
  const resetBtn = document.getElementById("reset-btn");
  const savePrefsBtn = document.getElementById("save-prefs");
  const themeSelect = document.getElementById("theme");
  const speedSelect = document.getElementById("animation-speed");

  // Available animation classes
  const animations = ["rotate", "bounce", "color-change"];
  let currentAnimationIndex = 0;

  // Load saved preferences from localStorage
  loadPreferences();

  // Handle Animate button click
  animateBtn.addEventListener("click", () => {
    // Remove previous animation class
    animatedBox.classList.remove(animations[currentAnimationIndex]);

    // Cycle to next animation
    currentAnimationIndex = (currentAnimationIndex + 1) % animations.length;

    // Add new animation class
    animatedBox.classList.add(animations[currentAnimationIndex]);

    // Apply selected animation speed
    const speed = speedSelect.value;
    animatedBox.style.animationDuration =
      speed === "slow" ? "3s" : speed === "fast" ? "0.5s" : "1.5s";
  });

  // Handle Reset button click
  resetBtn.addEventListener("click", () => {
    // Remove all animation classes
    animations.forEach((anim) => animatedBox.classList.remove(anim));

    // Reset animation index
    currentAnimationIndex = 0;

    // Clear inline styles
    animatedBox.style.animationDuration = "";
  });

  // Handle Save Preferences button click
  savePrefsBtn.addEventListener("click", () => {
    const theme = themeSelect.value;
    const speed = speedSelect.value;

    // Save preferences to localStorage
    localStorage.setItem("theme", theme);
    localStorage.setItem("speed", speed);

    // Apply theme immediately
    applyTheme(theme);
  });

  // Function to load preferences from localStorage
  function loadPreferences() {
    const savedTheme = localStorage.getItem("theme") || "light";
    const savedSpeed = localStorage.getItem("speed") || "normal";

    // Set dropdowns to saved values
    themeSelect.value = savedTheme;
    speedSelect.value = savedSpeed;

    // Apply theme on page load
    applyTheme(savedTheme);
  }

  // Function to apply theme by adding class to body
  function applyTheme(theme) {
    // Remove previously applied theme classes
    document.body.classList.remove("light", "dark", "blue");

    // Add the selected theme class
    document.body.classList.add(theme);
  }
});
