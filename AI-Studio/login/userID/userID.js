document.addEventListener("DOMContentLoaded", () => {
  console.log("Profile page JS loaded");


  const avatars = document.querySelectorAll(".avatar");
  const selectedAvatarImg = document.getElementById("selectedAvatarImg");
  const usernameInput = document.getElementById("usernameInput");
  const selectedAvatar = document.querySelector(".selected-avatar");
  const colorInput = document.getElementById("background-color");
  const nextButton = document.getElementById("nextButton");

  if (!avatars.length || !nextButton || !usernameInput) {
    console.error("Critical DOM elements missing");
    return;
  }

 
  const adjectives = [
    "Bouncy","Zippy","Snappy","Wiggly","Sparkly",
    "Chunky","Fizzy","Speedy","Goofy","Spooky",
    "Flashy","Slinky","Loopy","Cheeky","Buzzy"
  ];

  const nouns = [
    "Orb","Boost","Zap","Token","Pad",
    "Bar","Ring","Beam","Tile","Dash",
    "Loop","Meter","Core","Chip","Pulse"
  ];

  let usernameAssigned = false;
  const usedUsernames = new Set();


  const getRandomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const isValidUsername = (name) =>
    /^[a-zA-Z0-9_]{8,16}$/.test(name);

  const generateUsername = () => {
    let name;
    do {
      name =
        adjectives[getRandomInt(0, adjectives.length - 1)] +
        nouns[getRandomInt(0, nouns.length - 1)] +
        getRandomInt(0, 9);
    } while (usedUsernames.has(name));

    usedUsernames.add(name);
    return name;
  };

  let bannedWords = [];
  let profanityLoaded=false;

  fetch("../words.json")
    .then(res => {
      if(!res.ok) throw new Error("words.json not found");
      return res.json();
    })
    .then(data => {
      bannedWords = data.map(w => w.toLowerCase());
      profanityLoaded = true; 
      console.log("Profanity list loaded:", bannedWords.length);
      updateNextButtonState();
    })
    .catch(err => {
      console.warn("Profanity list failed to load", err);

    });

  avatars.forEach(avatar => {
    avatar.addEventListener("click", () => {
      avatars.forEach(a => a.classList.remove("selected"));
      avatar.classList.add("selected");

      const img = avatar.querySelector("img");
      if (!img) return;

      selectedAvatarImg.src = img.src;
      selectedAvatarImg.style.display = "block";
      sessionStorage.setItem("selectedAvatar", img.src);
      
      usernameInput.disabled=false; 
      usernameInput.classList.add("enabled");

      if (!usernameAssigned) {
        const name = generateUsername();
        usernameInput.value = name;
        sessionStorage.setItem("username", name);
        usernameAssigned = true;

      }

      updateNextButtonState();
    });
  });

  usernameInput.addEventListener("input", () => {
    sessionStorage.setItem("username", usernameInput.value.trim());
    updateNextButtonState();
  });

  colorInput.addEventListener("input", () => {
    selectedAvatar.style.backgroundColor = colorInput.value;
    sessionStorage.setItem("avatarBgColor", colorInput.value);
    updateNextButtonState();
  });

  nextButton.addEventListener("click", () => {
  window.location.replace("../Chat/chat.html");
});

  function updateNextButtonState() {
    const hasAvatar = !!sessionStorage.getItem("selectedAvatar");
    const hasUsername = !!sessionStorage.getItem("username");
    const hasBg = !!sessionStorage.getItem("avatarBgColor");

    nextButton.disabled = !(hasAvatar && hasUsername && hasBg);
  }
});
