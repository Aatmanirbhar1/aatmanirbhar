let timerInterval, timeLeft = 0;
let paragraphPosition = 0;
let paragraph = "";


const lessons = {
    lesson1: "sad lad; dad ask lad; lad lad fell; sakk dalk; lad dad ask jaj jag jalsa dalda jakk kala lala jala; sad lad; dad ask lad; lad lad fell; sakk dalk; lad dad ask jaj jag jalsa dalda jakk kala lala jala; sad lad; dad ask lad; lad lad fell; sakk dalk; lad dad ask jaj jag jalsa dalda jakk kala lala jala; sad lad; dad ask lad; lad lad fell; sakk dalk; lad dad ask jaj jag jalsa dalda jakk kala lala jala; sad lad; dad ask lad; lad lad fell; sakk dalk; lad dad ask jaj jag jalsa dalda jakk kala lala jala; sad lad; dad ask lad; lad lad fell; sakk dalk; lad dad ask jaj jag jalsa dalda jakk kala lala jala; sad lad; dad ask lad; lad lad fell; sakk dalk; lad dad ask jaj jag jalsa dalda jakk kala lala jala; sad lad; dad ask lad; lad lad fell; sakk dalk; lad dad ask jaj jag jalsa dalda jakk kala lala jala; sad lad; dad ask lad; lad lad fell; sakk dalk; lad dad ask jaj jag jalsa dalda jakk kala lala jala; sad lad; dad ask lad; lad lad fell; sakk dalk; lad dad ask jaj jag jalsa dalda jakk kala lala jala; sad lad; dad ask lad; lad lad fell; sakk dalk; lad dad ask jaj jag jalsa dalda jakk kala lala jala; sad lad; dad ask lad; lad lad fell; sakk dalk; lad dad ask jaj jag jalsa dalda jakk kala lala jala; sad lad; dad ask lad; lad lad fell; sakk dalk; lad dad ask jaj jag jalsa dalda jakk kala lala jala; sad lad; dad ask lad; lad lad fell; sakk dalk; lad dad ask jaj jag jalsa dalda jakk kala lala jala; sad lad; dad ask lad; lad lad fell; sakk dalk; lad dad ask jaj jag jalsa dalda jakk kala lala jala; sad lad; dad ask lad; lad lad fell; sakk dalk; lad dad ask jaj jag jalsa dalda jakk kala lala jala; sad lad; dad ask lad; lad lad fell; sakk dalk; lad dad ask jaj jag jalsa dalda jakk kala lala jala; sad lad; dad ask lad; lad lad fell; sakk dalk; lad dad ask jaj jag jalsa dalda jakk kala lala jala; sad lad; dad ask lad; lad lad fell; sakk dalk; lad dad ask jaj jag jalsa dalda jakk kala lala jala; sad lad; dad ask lad; lad lad fell; sakk dalk; lad dad ask jaj jag jalsa dalda jakk kala lala jala;",
    lesson2: "Auld Eddie fulfils a surreal ideal. A real dear idea, i.e., a rare safari, allures Auld Eddie. Dad fusses as usual, as Eddie realises ideas. I feel afraid, said Dad. Safari failure is a risk, Dad added. A Dakar safari is real, safe, Eddie reassures Dad. A real airfare sale is assured as Eddie adjures salesladies. Auld Eddie kisses Elsie, Adieu, adieu, says fair Elsie. As Elsie fusses, he adds deals and ideas — Eddie flies. Auld Eddie dislikes air rides, as Eddie feels all ill. Air ride is dull; assesses Eddie, as sad disease eases. Eddie likes Dakar, assesses Dakar laddies and lasses. Are all lads Aussies asks Auld Eddie. Add fuel, Ed, all Aussie ladies address Eddie. Eddie likes Aussies, adds fuel as asked. Lads, ladies, and lasses — Eddie sees them all at a real Dakar safari. All safari leaders are real skillful Kikujus, said the Aussies. Auld Eddie sees real kudus — silk-furred deer. Auld Eddie fulfils a surreal ideal. A real dear idea, i.e., a rare safari, allures Auld Eddie. Dad fusses as usual, as Eddie realises ideas. I feel afraid, said Dad. Safari failure is a risk, Dad added. A Dakar safari is real, safe, Eddie reassures Dad. A real airfare sale is assured as Eddie adjures salesladies. Auld Eddie kisses Elsie, Adieu, adieu, says fair Elsie. As Elsie fusses, he adds deals and ideas — Eddie flies. Auld Eddie dislikes air rides, as Eddie feels all ill. Air ride is dull; assesses Eddie, as sad disease eases. Eddie likes Dakar, assesses Dakar laddies and lasses. Are all lads Aussies asks Auld Eddie. Add fuel, Ed, all Aussie ladies address Eddie. Eddie likes Aussies, adds fuel as asked. Lads, ladies, and lasses — Eddie sees them all at a real Dakar safari. All safari leaders are real skillful Kikujus, said the Aussies. Auld Eddie sees real kudus — silk-furred deer.",
    lesson3: "artist alfred adores florida tastes i.e. seafood tastes. droll sailor ross tailors seafood to florida tastes. droll sailor ross dated loud lottie at a dakota feast.   toasted seafood tastes like defrosted roasted tossed oats. todd sees auroras after riotous florida seafood feast. eduardo takes furious lisa to eat soft tofu at a kiosk. josef tells jokes to rosa at floodlit roadside fort stairs. aristotle likes roasted seafood tastes. rosa likes laos lotuses like artist alfred likes defrosted tofu. sailor ross likes aristotle as does furious lisa. todd toasts toffee taoist sailor roasts soft tofu at sea. loud lottie likes retro stilettos as do riotous daffodils. toddler otto lassos sofa. raoul strokes stout toledo rats. delirious daffodils fade tudor folklore. riotous retro stiletto daffodils ride off road asteroids. aloof leo likes odious audio tales told after dark. lost furious lisa looks out at deforested areas i.e. deserts. furious lisa likes deserts a lot if oases are lustrous. artist alfred adores florida tastes i.e. seafood tastes. droll sailor ross tailors seafood to florida tastes. droll sailor ross dated loud lottie at a dakota feast.   toasted seafood tastes like defrosted roasted tossed oats. todd sees auroras after riotous florida seafood feast. eduardo takes furious lisa to eat soft tofu at a kiosk. josef tells jokes to rosa at floodlit roadside fort stairs. aristotle likes roasted seafood tastes. rosa likes laos lotuses like artist alfred likes defrosted tofu. sailor ross likes aristotle as does furious lisa. todd toasts toffee taoist sailor roasts soft tofu at sea. loud lottie likes retro stilettos as do riotous daffodils. toddler otto lassos sofa. raoul strokes stout toledo rats. delirious daffodils fade tudor folklore. riotous retro stiletto daffodils ride off road asteroids. aloof leo likes odious audio tales told after dark. lost furious lisa looks out at deforested areas i.e. deserts. furious lisa likes deserts a lot if oases are lustrous.",
    lesson4: "Cecilia takes a Cadillac to Caracas, eats alfalfa cakes at a roadside kiosk, rejoices at a food feast as caterers cook delicious crocodile casseroles and difficult sauces; after the feast, she takes a fleece outfit to couturier Dolores who is sad as all scissors are lost, Cecilia looks for scissors to assist her, then takes Dolores to disco Descartes where ladies decide discos are too loud, Cecilia rests as she's tired; later, she sees Jackie at Cafe Julio where Cecilia orders a roasted duck salad, iced tea, and cake, Jackie orders a toasted tofu salad, cold soda, and cocoa coffee, all delicious; after Cafe Julio, Cecilia sits outside looking at clouds, tries to cross a creek to see sailors lure trout, falls and decides to see Doctor Saldos who advises rest; after that, Cecilia sees Colette and tries to sell her Cadillac, but Colette dislikes cars Cecilia takes a Cadillac to Caracas, eats alfalfa cakes at a roadside kiosk, rejoices at a food feast as caterers cook delicious crocodile casseroles and difficult sauces; after the feast, she takes a fleece outfit to couturier Dolores who is sad as all scissors are lost, Cecilia looks for scissors to assist her, then takes Dolores to disco Descartes where ladies decide discos are too loud, Cecilia rests as she's tired; later, she sees Jackie at Cafe Julio where Cecilia orders a roasted duck salad, iced tea, and cake, Jackie orders a toasted tofu salad, cold soda, and cocoa coffee, all delicious; after Cafe Julio, Cecilia sits outside looking at clouds, tries to cross a creek to see sailors lure trout, falls and decides to see Doctor Saldos who advises rest after that, Cecilia sees Colette and tries to sell her Cadillac, but Colette dislikes cars Cecilia takes a Cadillac to Caracas, eats alfalfa cakes at a roadside kiosk, rejoices at a food feast as caterers cook delicious crocodile casseroles and difficult sauces; after the feast, she takes a fleece outfit to couturier Dolores who is sad as all scissors are lost, Cecilia looks for scissors to assist her, then takes Dolores to disco Descartes where ladies decide discos are too loud, Cecilia rests as she's tired; later, she sees Jackie at Cafe Julio where Cecilia orders a roasted duck salad, iced tea, and cake, Jackie orders a toasted tofu salad, cold soda, and cocoa coffee, all delicious; after Cafe Julio, Cecilia sits outside looking at clouds, tries to cross a creek to see sailors lure trout, falls and decides to see Doctor Saldos who advises rest; after that, Cecilia sees Colette and tries to sell her Cadillac, but Colette dislikes cars.x",
    lesson5: "Gloria got glitter goggles to see fish at the sea. Gleeful Gloria ogled a glut of goldfish through her goggles. The goldfish ogled Gloria too as her goggles glittered. I could ogle goldfish through goggles for ages, declared Gloria. Lethargic lighthearted lifeguard Lou laughed out loud. Shake the schoolteacher's share of seahorses outside, ordered Lou. Lou directed the kids to clear the seashore of seahorses. Kids disliked orders so the kids hid the seahorses at Lou's house. The Ogre dodges the gladiator for he fears to get hurt. The distraught Ogre hollers: The ghoulish gladiator tries to hurt all ogres. The gladiator gloats as he chases the ogre. Hugh the hero hears the hollers. Hugh is fast to rescue the ogre. The ogre gloats as Hugh starts to chase the gladiator. The Greek ace actor Geordi strode to the Hague Hotel. I lost a hat, shouted the distraught Geordi. I shall look for it at the lifts, or the huts outside, said the cautious clerk. I looked there, assured Geordi. There is a hat I see, sir, sighed the clerk. Do tell, said Geordi. The clerk lifted a hat off Geordi's head. Hugh the hero rescued his dearest at the gorilla gate. Hugh is so heroic, said his dearest Gertrud, he is just great. Heroes are a rare treat, thought the other ladies.",
    lesson6: "The internet has empowered students with access to global knowledge and virtual learning tools.",
    lesson7: "Good communication skills can boost confidence and improve professional relationships.",
    lesson8: "Self-discipline is key to consistent progress and success, both in academics and professional life.",
    lesson9: "Environmental awareness is essential for sustainable development and a better future.",
    lesson10: "Time management helps in achieving goals efficiently by reducing stress and increasing productivity."
};

function startTest() {

    // prevent from restart
    document.getElementById('startTestBtn').disabled = true;

    const name = document.getElementById('nameInput').value.trim();
    const id = document.getElementById('idInput').value.trim();
    if (!name || !id) return alert("Enter both Name and ID!");

    document.getElementById("typing-area").textContent = paragraph;
    document.getElementById("inputArea").value = "";
    document.getElementById("inputArea").disabled = false;
    document.getElementById("inputArea").focus()
    document.getElementById("manualSubmitBtn").disabled = false;
    document.getElementById("results").innerHTML = "";

    timeLeft = parseInt(document.getElementById("timeSelect").value);
    updateTimer();
    timerInterval = setInterval(() => {
        console.log(timeLeft);
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
        e.preventDefault();
    } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
        currentWord += e.key;
    } else if (e.key === "Backspace") {
        currentWord = currentWord.slice(0, -1);
    }

    if (inputArea.value.split(' ').length % 45 === 0) {
        const typingArea = document.getElementById("typing-area");
        const computedStyle = window.getComputedStyle(typingArea);
        const lineHeight = parseFloat(computedStyle.lineHeight);

        // Fallback if `lineHeight` is 'normal' or invalid
        const fallbackLineHeight = parseFloat(computedStyle.fontSize) * 1.2;

        console.log({fallbackLineHeight, lineHeight});

        typingArea.scrollTop += (isNaN(lineHeight) ? fallbackLineHeight : lineHeight);

    }


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
                display += `<span style='background:#add8e6;'>${originalWords[i]}</span> `;
            } else if (originalWords[i].startsWith(currentWord)) {
                display += `<span style='background:#add8e6;'>${originalWords[i]}</span> `;
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
