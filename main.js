
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recognition.lang = "en-US";

    const startButton = document.getElementById("startButton");
    const resultDiv = document.getElementById("result");

    let isListening = false;

    startButton.addEventListener("click", () => {
      if (isListening) {
        recognition.stop();
        startButton.textContent = "Start Recording";
      } else {
        recognition.start();
        startButton.textContent = "Stop Recording";
      }

      isListening = !isListening;
    });

    recognition.addEventListener("result", event => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join("");

      resultDiv.textContent = transcript;
    });

    recognition.addEventListener("end", () => {
      if (isListening) {
        recognition.start();
      }
    });