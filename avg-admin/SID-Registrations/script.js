document.addEventListener("DOMContentLoaded", async function () {
    const searchBtn = document.getElementById("searchBtn");
    const enrollmentDiv = document.getElementById("student-enrollment-details");
    const loadingIndicator = document.getElementById("loadingIndicator");
    const studentIdInput = document.getElementById("student-id");
    studentIdInput.focus();
    studentIdInput.addEventListener("keydown", keyDownFunction);
    const readClipboard = async () => {
      try {
        return await navigator.clipboard.readText();
      } catch (e) {
        console.error(e);
      }
    };
    let linkId;
    const url =
      "https://script.google.com/macros/s/AKfycbx0n1pb0MvYHKKZHBSH_j4hIL6MGjjYkCvjTK5-OehH3Cn9pDzTSxs7aznNMLJPl8Nc/exec";
  
    searchBtn.addEventListener("click", async function () {
      const studentId = studentIdInput.value;
      linkId = await readClipboard();
      if (studentId.length === 4) {
        showLoading(true);
        fetch(`${url}?studentId=${studentId}`)
          .then((response) => response.json())
          .then((data) => {
            displayStudentDetails(data);
          })
          .then(async () => {
            linkId = await readClipboard();
            displayRegistrationInfo(linkId);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      } else {
        alert("Please enter a valid student ID (4 digits).");
      }
    });
  
    function showLoading(isLoading) {
      loadingIndicator.style.display = isLoading ? "block" : "none";
    }
  
    async function displayStudentDetails(data) {
      enrollmentDiv.innerHTML = "";
      if (data.status === 200) {
        const studentData = data.data;
        const table = document.createElement("table");
        table.innerHTML = `
        <thead>
          <tr>
            <th>Student Id</th>
            <th>Temp Id</th>
            <th>Student Name</th>
            <th>Batch</th>
            <th>Course</th>
            <th>Mobile</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${studentData.studentId}</td>
            <td>${studentData.tempId}</td>
            <td>${studentData.name}</td>
            <td>${studentData.batch}</td>
            <td>${studentData.course}</td>
            <td>${studentData.mobile}</td>
          </tr>
        </tbody>
      `;
        enrollmentDiv.appendChild(table);
  
        // Additional user info section
        const inputUrl = document.createElement("input");
        inputUrl.type = "text";
        inputUrl.placeholder = "Paste link here";
        // inputUrl.classList.add("input-url");
        inputUrl.setAttribute("value", linkId);
        inputUrl.addEventListener("change", function (e) {
          linkId = e.target.value;
          displayRegistrationInfo(linkId);
          inputUrl.setAttribute("value", linkId);
        });
        const inputPassword = document.createElement("input");
        inputPassword.type = "text";
        inputPassword.placeholder = "four digit password";
        inputPassword.setAttribute("value", "");
        inputPassword.pattern = "\\d{4}";
        inputPassword.maxlength = "4";
        enrollmentDiv.appendChild(inputUrl);
        enrollmentDiv.appendChild(inputPassword);
        inputPassword.addEventListener("keydown", keyDownFunction);
        inputPassword.focus();
        const submitBtn = document.createElement("button");
        submitBtn.textContent = "Submit Form";
        submitBtn.classList.add("submit-btn");
        enrollmentDiv.appendChild(submitBtn);
      } else {
        enrollmentDiv.innerHTML = `<p>Error: ${data.message}</p>`;
      }
    }
  
    function displayRegistrationInfo(link) {
      const id = link.match(/([^\/?]+)\?/);
      if (id) {
        showLoading(true);
        fetch(`${url}?linkId=${id}`)
          .then((response) => response.json())
          .then((data) => {
            displayUserInfo(data);
          })
          .catch((error) => {
            console.error("Error fetching user info:", error);
          })
          .finally(() => {
            showLoading(false);
          });
      } else {
        alert("wrong url copied try againg with correct url");
        showLoading(false);
      }
    }
  
    function displayUserInfo(user) {
      const fullName = user.Data.FullName;
      const mobileNumber = user.Data.MobileNumber;
      const address = user.Data.AddressDetails[0];
      const photo = 'data:image/jpg;base64,'+user.Data.Photo; // Assuming base64 encoded image data
      const IsAadhaarVerified = user.Data.IsAadhaarVerified;
  
      let userInfoHTML = `<br><h2>User Information</h2>
      <table class="user-info-table">
        <tr><td><strong>Name:</strong></td><td>${fullName}</td>
        <td rowspan="4"><img src="${photo}" alt="Profile Photo"></td>
        </tr>
        <tr><td><strong>Mobile Number:</strong></td><td>${mobileNumber}</td></tr>`;
  
      if (IsAadhaarVerified) {
        userInfoHTML += `
        <tr><td><strong>Address Line 1:</strong></td><td>${address.AddressLine1}</td></tr>
        <tr><td><strong>Address Line 2:</strong></td><td>${address.AddressLine2}</td></tr>
        <tr><td><strong>Country:</strong></td><td>${address.Country}</td></tr>
        <tr><td><strong>State:</strong></td><td>${address.State}</td></tr>
        <tr><td><strong>District:</strong></td><td>${address.District}</td></tr>
        <tr><td><strong>Village:</strong></td><td>${address.Village}</td></tr>
        <tr><td><strong>Pin:</strong></td><td>${address.Pin}</td></tr>
        <tr><td><strong>Landmark:</strong></td><td>${address.Landmark}</td></tr>
        <tr><td><strong>Address Type:</strong></td><td>${address.AddressType}</td></tr>
    `;
      } else {
        userInfoHTML += `
        <tr><td style="color:red; font-weight: bold;">Aadhar Ekyc is Pending.</td><td>
        <textarea></textarea>
        </td></tr>
        `;
      }
  
      userInfoHTML += "</table>";
  
      enrollmentDiv.innerHTML += userInfoHTML;
    }
  });
  
  function keyDownFunction(e) {
    if (e.key === "Backspace") return;
  
    if (!Number.isInteger(+e.key) || e.target.value.length > 3) {
      e.preventDefault();
      return false;
    }
  }
  