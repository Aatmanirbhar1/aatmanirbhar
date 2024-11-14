// Elements
const studentIdInput = document.getElementById('studentId');
const form = document.getElementById('attendance-form');
const resultDiv = document.getElementById('result');
const calendarDiv = document.getElementById('calendar');
const loadingEle = document.getElementById("loading");

// Constants
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let dates = {};
const BASE_URL = "https://script.google.com/macros/s/AKfycbyBanhiGhs7wcUDJUYI_MbEXKLoRWzUCvSI-ACC76GuVJb_eS96ssenJR5rVV3D_jaB/exec";

// Event Listener
form.addEventListener('submit', handleFormSubmit);
const stdId = new URL(window.location).searchParams.get('stdId');
if (stdId) {
    studentIdInput.value = stdId;
    fetchStudentData(stdId);
}
/**
 * Handle form submission.
 * @param {Event} e - The form submit event.
 */
function handleFormSubmit(e) {
    e.preventDefault();
    const studentId = studentIdInput.value.trim();
    if (studentId && +studentId > 1200) {
        fetchStudentData(studentId);
    } else {
        alert("Enter Correct Student Id and try again.");
        studentIdInput.value = '';
        studentIdInput.focus();
    }
}

/**
 * Fetch student data from the server.
 * @param {string} studentId - The student ID.
 */
async function fetchStudentData(studentId) {
    loadingEle.style.display = 'flex';
    // Mock server call
    // google.script.run.withSuccessHandler((result) => {
    //     const responseData = JSON.parse(result);
    //     if (responseData) {
    //         renderStudentDetails(responseData);
    //     } else {
    //         resultDiv.innerHTML = '<p>No Data Found, enter correct student id and try again.</p>';
    //     }
    // }).getDetailsById(studentId);

    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch(`${BASE_URL}?stdId=${studentId}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            renderStudentDetails(result);

            loadingEle.style.display = 'none';
        })
        .catch((error) => {
            resultDiv.innerHTML = `<p>Error :  No Data Found, enter correct student id and try again.</p>`;
            console.error(error);
            loadingEle.style.display = 'none';
        });
}


/**
 * Render student details and calendar.
 * @param {Object} data - The student data.
 */
function renderStudentDetails(data) {
    clearElement(resultDiv);
    clearElement(calendarDiv);

    const table = document.createElement('table');

    const fields = {
        "Student ID": data.studentId,
        "Admission Date": new Date(data.admissionDate).toLocaleString("en-IN", { year: "numeric", month: "long", day: "numeric", }),
        "Session": data.session,
        "Batch": `<a href="/student/report/?batch=${data.batch}" target="_blank">${data.batch}</a>`,
        "Name": data.name,
        "Present Days": data.presentDays,
        "Absent Days": data.absentDays,
        "Present Percentage": data.presentPercentage
    };

    for (const key in fields) {
        const tr = document.createElement('tr');
        tr.innerHTML = `<th>${key}</th><td>${fields[key]}</td>`;
        table.appendChild(tr);
    }
    resultDiv.appendChild(table);
    resultDiv.innerHTML += `<h1>Attendance History - ${data.name}</h1>`;

    // Fill dates object with attendance history
    dates = data.attendanceHistory;
    createAttendanceCalendar(data.session);
}

/**
 * Create attendance calendar.
 * @param {string} session - The session string.
 */
function createAttendanceCalendar(session) {
    const [start, , end, year] = session.split(" ");
    const endIndex = monthNames.findIndex((month) => month.slice(0, 3) === end);

    for (let i = 0; i < 3; i++) {
        let endDate = new Date(parseInt(year), endIndex - i, 1)
        //ignore if month is future months
        if (endDate.getTime() > new Date().getTime()) continue;
        renderCalendar(endDate.getFullYear(), endDate.getMonth());
    }
}

/**
 * Render calendar for a specific month and year.
 * @param {number} year - The year.
 * @param {number} monthIndex - The month index (0-11).
 */
function renderCalendar(year, monthIndex) {
    const firstDay = new Date(year, monthIndex, 1);
    const lastDay = new Date(year, monthIndex + 1, 0);
    const startingDay = firstDay.getDay();
    const monthLength = lastDay.getDate();
    const monthName = monthNames[firstDay.getMonth() % monthNames.length];

    let html = `<h2>${monthName} ${year}</h2>`;
    html += "<table>";
    html += "<tr>";

    daysOfWeek.forEach(day => {
        html += `<th>${day}</th>`;
    });

    html += "</tr><tr>";

    let day = 1;

    for (let i = 0; i < 7; i++) {
        if (i < startingDay) {
            html += "<td></td>";
        } else {
            html += `<td>${day} <span class="${getClasses(year, firstDay.getMonth(), day)}"></span></td>`;
            day++;
        }
    }

    html += "</tr>";

    while (day <= monthLength) {
        html += "<tr>";
        for (let i = 0; i < 7; i++) {
            if (day <= monthLength) {
                html += `<td class="${isToday(year, firstDay.getMonth(), day) ? "today" : ""}">${day} <span class="${getClasses(year, firstDay.getMonth(), day)}"></span></td>`;
                day++;
            } else {
                html += "<td></td>";
            }
        }
        html += "</tr>";
    }

    html += "</table>";
    calendarDiv.innerHTML += html;
}

/**
 * Get CSS classes for a specific date.
 * @param {number} year - The year.
 * @param {number} month - The month (0-11).
 * @param {number} date - The date.
 * @returns {string} - The CSS classes.
 */
function getClasses(year, month, date) {
    const classList = [];
    const dateString = `${date}-${month}-${year}`;
    const currentDate = new Date(year, month, date);
    const today = new Date();

    if (isTodaySunOrFirstOrThirdSat(currentDate)) {
        classList.push('weekend');
    } else if (currentDate.getTime() > today.getTime()) {
        classList.push('');
    } else if (dateString in dates) {
        const check = dates[dateString] ? "present" : "absent";
        classList.push(check);
    } else {
        classList.push('holiday');
    }

    return classList.join(' ');
}

/**
 * Check if a date is Sunday or the first/third Saturday of the month.
 * @param {Date} [today=new Date()] - The date object.
 * @returns {boolean} - True if the date is Sunday or the first/third Saturday, otherwise false.
 */
function isTodaySunOrFirstOrThirdSat(today = new Date()) {
    if (today.getDay() === 0) return true; // Sunday check

    const [date, month, year] = [today.getDate(), today.getMonth(), today.getFullYear()];
    const firstDayOfMonth = new Date(year, month, 1);
    const firstSaturday = new Date(year, month, 7 - firstDayOfMonth.getDay());
    const thirdSaturday = new Date(year, month, firstSaturday.getDate() + 14);

    return compareDates(today, firstSaturday) || compareDates(today, thirdSaturday);
}

/**
 * Compare two dates.
 * @param {Date} d1 - The first date.
 * @param {Date} d2 - The second date.
 * @returns {boolean} - True if the dates are the same, otherwise false.
 */
function compareDates(d1, d2) {
    return (
        d1.getDate() === d2.getDate() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getFullYear() === d2.getFullYear()
    );
}

/**
 * Clear all child elements of a parent element.
 * @param {HTMLElement} element - The parent element.
 */
function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function isToday(date, month, year) {
    return compareDates(new Date(date, month, year), new Date());
}