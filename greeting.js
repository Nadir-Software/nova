const today = new Date();
const hourNow = today.getHours();
const greeting = getGreeting(hourNow);
const answerElement = document.getElementById('answer');
var voiceEnabled = localStorage.getItem("voice") || "enabled";
type(greeting);

function getGreeting(hour) {
  if (hour >= 5 && hour < 12) {
    return 'Good morning';
  } else if (hour >= 12 && hour < 18) {
    return 'Good afternoon';
  } else if (hour >= 18 && hour < 22) {
    return 'Good evening';
  } else {
    return 'Good night';
  }
}

function type(str) {
  console.log("Started!");

  if (voiceEnabled == "enabled"){
    responsiveVoice.speak(str);
  }

  againLink.classList.add("hidden");
  againLink.style.animation = "";

  document.getElementById("query").classList.add("hidden-but-takes-up-space");
  document.getElementById("query").style.animation = "";
  document.getElementById("query").tabIndex= "-1";

  const element = document.getElementById("answer");
  element.innerText = ""; // Clear the element's innerText before typing
  let i = 0;
  const typeInterval = setInterval(() => {
    const char = str[i];
    element.innerText += char;
    if (char === " ") {
      // If the character is a space, add a non-breaking space instead
      element.innerHTML += "&nbsp;";
    }
    i++;
    if (i === str.length) {
      clearInterval(typeInterval);
      againLink.classList.remove("hidden");
      againLink.style.animation = "0.25s fade-in";

      document.getElementById("query").style.animation = "0.25s fade-in";
      document.getElementById("query").classList.remove("hidden-but-takes-up-space");
      document.getElementById("query").tabIndex= "";
    }
  }, 25);
}