let timerInterval, timeLeft = 0;
let paragraphPosition = 0;
let paragraph = "";
let lessons;

async function getLessions() {
    const response = await fetch("lessions.json");
    lessons = await response.json();
}

getLessions();

function startTest() {
    const name = document.getElementById('nameInput').value.trim();
    const id = document.getElementById('idInput').value.trim();
    if (!name || !id) return alert("Enter both Name and ID!");

    //hide form area
    document.getElementById('form-area').style.display = 'none';

    // prevent from restart
    document.getElementById('startTestBtn').disabled = true;

    document.getElementById("typing-area").textContent = paragraph;
    document.getElementById("inputArea").value = "";
    document.getElementById("inputArea").disabled = false;
    document.getElementById("inputArea").focus()
    document.getElementById("manualSubmitBtn").disabled = false;
    document.getElementById("results").innerHTML = "";

    timeLeft = parseInt(document.getElementById("timeSelect").value);
    updateTimer();
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimer();
        if (timeLeft <= 0) {
            autoSubmit();
            clearInterval(timerInterval);
        }
    }, 1000);
}


function loadLessonParagraph() {
    const selected = document.getElementById("lessonSelect").value;
    if (lessons[selected]) {
        paragraph = lessons[selected]; // ← Set selected paragraph
        document.getElementById("typing-area").textContent = paragraph;
        lockedText = ""; // Reset typed values
        currentWord = "";
        document.getElementById("inputArea").value = "";

        // 👉 Focus the typing area so cursor blinks
        document.getElementById("inputArea").focus();
    }
}


let lockedText = "";
let currentWord = "";

function handleKeyControl(e) {

    const inputArea = document.getElementById("inputArea");
    if (e.key === "Backspace" && currentWord.length === 0 && lockedText.trim() === "") {
        e.preventDefault();
        return;
    }

    if (e.key === " ") {
        lockedText += currentWord + " ";
        currentWord = "";
        inputArea.value = lockedText;

        // start scroll logic
        const typingArea = document.getElementById("typing-area");

        const inputLength = inputArea.value.split(' ').length;

        const totalWidth = typingArea.offsetWidth;
        const fontSize = parseInt(getComputedStyle(typingArea).fontSize);

        const avgCharacters = parseInt(totalWidth / (0.5 * fontSize));

        if (inputArea.value.length > avgCharacters) {

            const countWords = inputArea.value.slice(-1 * avgCharacters).split(' ').length

            if (inputLength > 0 && inputLength % countWords === 0) {
                typingArea.scrollTop += (fontSize * 1.5);
            }
        }

        // end scroll logic
        e.preventDefault();

    } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
        currentWord += e.key;
    } else if (e.key === "Backspace") {
        currentWord = currentWord.slice(0, -1);
    }

    const typingArea = document.getElementById("typing-area");

    const typedLength = inputArea.value.length;

    // Calculate scroll based on the ratio of typed characters to total characters
    // const totalText = typingArea.textContent.length;

    // if (totalText > 0) {
    //     const ratio = typedLength / totalText;
    //     const scrollPosition = typingArea.scrollHeight * ratio;

    //     // Set scrollTop of typingArea
    //     typingArea.scrollTop = scrollPosition;
    // }




    // if (inputArea.value.split(' ').length % 45 === 0) {
    //     const computedStyle = window.getComputedStyle(typingArea);
    //     const lineHeight = parseFloat(computedStyle.lineHeight);

    //     // Fallback if `lineHeight` is 'normal' or invalid
    //     const fallbackLineHeight = parseFloat(computedStyle.fontSize) * 1.2;

    //     typingArea.scrollTop += (isNaN(lineHeight) ? fallbackLineHeight : lineHeight);

    // }


    setTimeout(() => {

        inputArea.value = lockedText + currentWord;
        checkTyping();

    }, 0);


    // submit manual if paragram completes
    if ((lockedText + currentWord).trim().split(" ").length >= paragraph.trim().split(" ").length) {
        manualSubmit();
    }


    // if (inputArea.value.length + 1 > paragraph.length) {

    //     paragraphPosition++;

    //     //check if there is no paragraph left
    //     if (paragraphPosition > allParagraphs.length - 1) {
    //         paragraphPosition = 0;
    //     }
    //     paragraph += '\n';
    //     paragraph += allParagraphs[paragraphPosition];
    //     document.getElementById("typing-area").innerHTML = "\n";
    //     document.getElementById("typing-area").textContent = allParagraphs[paragraphPosition];

    //     inputArea.value += "\n";

    // }
}

function resetTest() {
    clearInterval(timerInterval);
    document.getElementById('startTestBtn').disabled = false;
    document.getElementById("inputArea").value = "";
    document.getElementById("timer").textContent = "Timer: 00:00";
    document.getElementById("progress").style.width = "0%";
    document.getElementById("inputArea").disabled = true;
    document.getElementById("typing-area").innerHTML = "";
    document.getElementById("results").innerHTML = "";
}

function updateTimer() {
    const min = String(Math.floor(timeLeft / 60)).padStart(2, '0');
    const sec = String(timeLeft % 60).padStart(2, '0');
    const timerElem = document.getElementById("timer");

    timerElem.textContent = `Timer: ${min}:${sec}`;

    // Add countdown effect for last 15 seconds
    if (timeLeft <= 15) {
        timerElem.style.color = "#d32f2f"; // red
        timerElem.style.fontWeight = "bold";
        timerElem.style.animation = "flash 1s infinite";
    } else {
        // Reset to normal style
        timerElem.style.color = "#333";
        timerElem.style.fontWeight = "normal";
        timerElem.style.animation = "none";
    }
}

function checkTyping() {
    const fullInput = lockedText + currentWord;
    const rawWords = (lockedText).split(" "); // Count actual space hits including blanks
    const currentIndex = rawWords.length - 1; // Last locked index

    const originalWords = paragraph.trim().split(" ");
    let display = "";
    let correct = 0;

    for (let i = 0; i < originalWords.length; i++) {
        if (i < currentIndex) {
            if (rawWords[i] === originalWords[i]) {
                display += `<span style='background:#c8e6c9;'>${originalWords[i]}</span> `;
                correct++;
            } else {
                display += `<span style='background:#ffcdd2;'>${originalWords[i]}</span> `;
            }
        } else if (i === currentIndex) {
            // Current word (to be typed now)
            if (currentWord === "") {
                display += `<span style='background:#2eccff;'>${originalWords[i]}</span> `;
            } else if (originalWords[i].startsWith(currentWord)) {
                display += `<span style='background:#2eccff;'>${originalWords[i]}</span> `;
            } else {
                display += `<span style='background:#ffcdd2;'>${originalWords[i]}</span> `;
            }
        } else {
            display += originalWords[i] + " ";
        }
    }

    const progress = Math.min(100, Math.floor((fullInput.length / paragraph.length) * 100));
    document.getElementById("progress").style.width = `${progress}%`;
    document.getElementById("typing-area").innerHTML = display.trim();

    // Live stats
    const typedWordsFiltered = rawWords.filter(w => w !== "");
    const elapsedTime = parseInt(document.getElementById("timeSelect").value) - timeLeft;
    if (elapsedTime > 0) {
        const grossSpeed = Math.round((typedWordsFiltered.length / (elapsedTime / 60)));
        const netSpeed = Math.round((correct / (elapsedTime / 60)));
        const accuracy = typedWordsFiltered.length > 0 ? Math.round((correct / typedWordsFiltered.length) * 100) : 0;

        document.getElementById("liveStats").innerText =
            `Live Speed: ${netSpeed} WPM | Accuracy: ${accuracy}%`;
    }
}


function autoSubmit() {
    clearInterval(timerInterval);
    document.getElementById("inputArea").disabled = true;
    showResult();
}

function manualSubmit() {
    clearInterval(timerInterval);
    document.getElementById("inputArea").disabled = true;
    document.getElementById("manualSubmitBtn").disabled = true;
    showResult();
}

function showResult() {
    //show form area
    document.getElementById('form-area').style.display = 'block';

    const name = document.getElementById('nameInput').value.trim();
    const id = document.getElementById('idInput').value.trim();
    const typedText = document.getElementById("inputArea").value.trim();

    const totalWords = paragraph.trim().split(" ").length;
    const typedWords = typedText.trim().split(" ");
    const correctWords = typedWords.filter((word, i) => word === paragraph.trim().split(" ")[i]).length;
    const mistakes = totalWords - correctWords;

    const duration = parseInt(document.getElementById("timeSelect").value) / 60;
    const grossSpeed = Math.round(typedWords.length / duration);
    const netSpeed = Math.round(correctWords / duration);
    const accuracy = Math.round((correctWords / typedWords.length) * 100);

    const resultText = `
      Name: ${name} || ID: ${id} || Total Words: ${totalWords} || Correct Words: ${correctWords} || Mistakes: ${mistakes} || Gross Speed: ${grossSpeed} WPM || Net Speed: ${netSpeed} WPM || Accuracy: ${accuracy}%\n`;

    document.getElementById("results").innerHTML = resultText.replace(/\n/g, '<br>');

    const bodyData = {
        name,
        id,
        typedText,
        totalWords,
        correctWords,
        mistakes,
        grossSpeed,
        netSpeed,
        accuracy
    };
    console.log(bodyData)

    // Send to Google Sheet
    fetch('https://script.google.com/macros/s/AKfycbyO-50R2O-D1jC0N80to9xJDNAhDyORZYe2mb5gh73KlHv44eSqu7SRLQ3-_5BVlJ60Hw/exec', {
        method: 'POST',
        body: JSON.stringify(bodyData)
    })
        .then(res => res.text())
        .then(data => {
            console.log("✅ Data sent to Google Sheet:", data);
        })
        .catch(error => {
            console.error("❌ Failed to send data:", error);
        });


    // Download Certificate
    const blob = new Blob([resultText], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${name}_${id}_TypingCertificate.txt`;
    link.click();
}

let fullScreen = false;
function toggleFullScreen() {

    if (!fullScreen) {
        fullScreen = true;
        document.querySelector('#toogleFullScreenBtn').src = 'assets/close_full_screen_icon.png'
        const element = document.documentElement; // Fullscreen for the entire page
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) { // Firefox
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) { // Chrome, Safari, Opera
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) { // IE/Edge
            element.msRequestFullscreen();
        }
    } else {
        fullScreen = false;
        document.querySelector('#toogleFullScreenBtn').src = 'assets/full_screen_icon.png'

        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { // Firefox
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { // Chrome, Safari, Opera
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE/Edge
            document.msExitFullscreen();
        }

    }

}