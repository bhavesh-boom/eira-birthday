const PASSWORD = "GAURI";

const messages = [

  {
    title: "Happy Birthday Eira",
    text: "I don't know this bhondu managed to become this important to me... but here we are. ❤️"
  },

  {
    title: "Our First Meet",
    text: "Four years of knowing you, and somehow, meeting you for the first time still felt like coming home.❤️"
  },

  {
    title: "Our GMeet Calls",
    text: "Before I could hold your hand, I had countless screens to look at you through — and somehow, I never got tired of seeing you. ❤️"
  },

  {
    title: " Weird Face",
    text: "Me when i can't talk to you for a while"
  },

  {
    title: "Korean Café",
    text: "You drinking my drink instead of yours was such a tiny thing, but I swear, sharing little moments like that with you felt so special."
  },

  {
    title: "Our Second Meet",
    text: "You came for just a day, yet you left me with a piece of you..a Handmade muffler.. I'll always treasure because you made it for me"
  },

  {
    title: "Walking Together",
    text: "Just you, me, a quiet night, and nowhere we needed to be...I remember how ridiculously happy I felt just walking beside you."
  },

  {
    title: "Your Stupidity",
    text: " I don't think I'll ever stop loving the silly, stupid side of you — because that's one of the versions of you I love the most."
  },

  {
    title: "That Face Again",
    text: "You can make the dumbest face in the world and I'll still look at you like you're the prettiest person I've ever seen."
  },

  {
    title: "Our First McD",
    text: "Our first McDonald's together, your first chicken burger, and another little memory I'll always smile about"
  },

  {
    title: "Fries & Us",
    text: "You always make me click these kinda clicks"
  },

  {
    title: "After Chaos Selfie",
    text: "Only we know what happened before this picture"
  },

  {
    title: "Your Eyes",
    text: "I could get lost in your eyes a thousand times and still hope you never show me the way back."
  },

  {
    title: "Distance",
    text: "Sometimes you're just a few kilometres away. Sometimes it feels like a whole universe. But somehow, you still feel close to me."
  },

  {
    title: "Looking At You",
    text: "ometimes I catch myself looking at you like you're the most beautiful thing my eyes have ever found."
  },

  {
    title: "Hot Hot Me",
    text: "Ig this boy's girlfriend must be very beautiful"
  },

  {
    title: "Koi-No-Yokan",
    text: "I hope we get to make a ridiculous number of memories together. The kind we'll look back at and laugh about years later."
  },

  {
    title: "You",
    text: "Even when I can only see you walking away, somehow you still look like a poem I could spend forever reading."
  },

  {
    title: "Almost There",
    text: "If you've made it this far, congratulations. You've officially survived an unnecessarily elaborate birthday message from me."
  },

  {
    title: "One Last Thing",
    text: "Okay, enough jokes. There's one thing I really want you to remember."
  },

  {
    title: "The Heart",
    text: "No matter how many photos I put here, none of them can really explain how much you mean to me. So instead of trying to fit everything into words... I kept one last thing for you."
  }

];


let current = 0;


const $ = (id) => {
  return document.getElementById(id);
};


function showScreen(id) {

  document
    .querySelectorAll(".screen")
    .forEach(screen => {
      screen.classList.remove("active");
    });

  $(id).classList.add("active");

  window.scrollTo(0, 0);
}


function loadPhoto(number) {

  const file =
    `${String(number).padStart(2, "0")}.jpg`;

  const img = $("photo");

  const error = $("photoError");

  img.classList.remove("hidden");

  error.classList.add("hidden");

  $("missingName").textContent =
    `${String(number).padStart(2, "0")}.jpg`;


  img.onload = () => {

    img.classList.remove("hidden");

    error.classList.add("hidden");

  };


  img.onerror = () => {

    img.classList.add("hidden");

    error.classList.remove("hidden");

  };


  img.src = file;
}


function renderPhoto() {

  const item = messages[current];

  const number = current + 1;


  $("counter").textContent =
    `${String(number).padStart(2, "0")} / 21`;


  $("messageTitle").textContent =
    item.title;


  $("messageText").textContent =
    item.text;


  if (number === 21) {

    $("nextBtn").textContent =
      "ONE LAST STEP 🔐";

  } else {

    $("nextBtn").textContent =
      "NEXT ❤️";

  }


  loadPhoto(number);
}


/* START */

$("startBtn").addEventListener("click", () => {

  current = 0;

  renderPhoto();

  showScreen("photoScreen");

});


/* NEXT */

$("nextBtn").addEventListener("click", () => {

  if (current < 20) {

    current++;

    renderPhoto();

} else {

  stopVoiceNote();

  showScreen("passwordScreen");

  $("passwordInput").focus();

}

});


/* PASSWORD */

$("unlockBtn").addEventListener("click", unlock);


$("passwordInput").addEventListener(
  "keydown",
  (event) => {

    if (event.key === "Enter") {

      unlock();

    }

  }
);


function unlock() {

  const answer =
    $("passwordInput")
      .value
      .trim()
      .toUpperCase();


  if (answer === PASSWORD) {

    showScreen("finalScreen");

  } else {

    $("errorText").textContent =
      "Hmm... nice try. 😂 Try again.";

    $("passwordInput").select();

  }

}


/* FINAL PHOTO ERROR */

$("finalPhoto").onerror = () => {

  $("finalPhoto").classList.add("hidden");

  $("finalError").classList.remove("hidden");

};
/* VOICE NOTES */

const voiceNotes = {
  1: $("voice1"),
  15: $("voice2"),
  21 : $("voice3")
};

const voiceBtn = $("voiceBtn");

let currentVoice = null;


/* Stop the currently playing voice note */

function stopVoiceNote() {

  if (currentVoice) {

    currentVoice.pause();

    currentVoice.currentTime = 0;

    currentVoice = null;

  }

  voiceBtn.classList.add("hidden");

  voiceBtn.textContent = "▶️ Play Voice Note";
}


/* Set up voice note for the current photo */

function setupVoiceNote(number) {

  stopVoiceNote();

  const voice = voiceNotes[number];

  if (!voice) {
    return;
  }

  currentVoice = voice;

  voiceBtn.classList.remove("hidden");

  voiceBtn.textContent = "▶️ Play Voice Note";


  voiceBtn.onclick = () => {

    if (voice.paused) {

      voice.play();

      voiceBtn.textContent = "⏸ Pause Voice Note";

    } else {

      voice.pause();

      voiceBtn.textContent = "▶️ Play Voice Note";

    }

  };


  voice.onended = () => {

    voiceBtn.textContent = "▶️ Play Voice Note";

  };
  /* AUTO-PLAY VOICE NOTE 1 ON PHOTO 01 */

  if (number === 1) {

    voice.play();

    voiceBtn.textContent = "⏸ Pause Voice Note";

  }

}




/* Update voice note whenever a photo is shown */

const originalRenderPhoto = renderPhoto;

renderPhoto = function () {

  originalRenderPhoto();

  setupVoiceNote(current + 1);

};
