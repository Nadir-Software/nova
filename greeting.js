const today = new Date();
const hourNow = today.getHours();
const greeting = getGreeting(hourNow);
const answerElement = document.getElementById('answer');
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
    }
  }, 25);
}