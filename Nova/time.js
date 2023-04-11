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

setInterval(function() {document.getElementById("answer").innerText = new Date().toLocaleTimeString();
setTimeout(function() {
    // do your thing!
}, 2000);}, 100);