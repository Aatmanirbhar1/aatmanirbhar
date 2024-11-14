async function loadReport(batch) {
    const loader = document.getElementById("loader");
    loader.style.display = "block"; // Show loader

    const response = await fetch("https://script.google.com/macros/s/AKfycbyBanhiGhs7wcUDJUYI_MbEXKLoRWzUCvSI-ACC76GuVJb_eS96ssenJR5rVV3D_jaB/exec?batch=" + batch);
    let data = await response.json();

    loader.style.display = "none"; // Hide loader after data load

    // Sort by attendance percentage
    data.sort((a, b) => parseFloat(b.presentPercentage) - parseFloat(a.presentPercentage));

    // Display session info
    document.getElementById("session-info").innerText = `Batch : ${batch} | Session: ${(data[0]?.session || "N/A")}`;

    // Populate table with sorted data and rank
    const reportBody = document.getElementById('reportBody');
    reportBody.innerHTML = "";
    data.forEach((student, index) => {
        const isLowAttendance = parseFloat(student.presentPercentage) < 75;
        const row = `
    <tr>
        <td class="rank">${index + 1}</td>
        <td>${student.studentId}</td>
        <td class="name">${student.name}</td>
        <td>${student.presentDays}</td>
        <td>${student.absentDays}</td>
        <td class="attendance ${isLowAttendance ? 'low' : ''}">${student.presentPercentage}%</td>
    </tr>
    `;
        reportBody.innerHTML += row;
    });
}

async function shareReport() {
    const reportTable = document.querySelector("body");

    html2canvas(reportTable).then((canvas) => {
        canvas.toBlob((blob) => {
            const file = new File([blob], "attendance_report.png", { type: "image/png" });
            const filesArray = [file];

            if (navigator.share) {
                navigator.share({
                    title: 'Attendance Report',
                    text: 'Attendance report for Batch B50/Morning/9:30AM-1:30PM',
                    files: filesArray
                }).catch((error) => console.log("Sharing failed", error));
            } else {
                alert("Sharing is not supported on this browser.");
            }
        });
    });
}

// Load data when the page loads

const BATCH = new URL(window.location).searchParams.get('batch');
if (BATCH) {
    loadReport(BATCH);
}

document.getElementById('today').innerText = new Date().toLocaleString();