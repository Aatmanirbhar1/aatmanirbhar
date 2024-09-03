document.addEventListener('DOMContentLoaded', function () {
    const closeFormBtn = document.getElementById('closeFormBtn');
    const formContainer = document.getElementById('formContainer');
    const uploadForm = document.getElementById('uploadForm');
    const imageInput = document.getElementById('imageInput');
    const imagePreviewContainer = document.getElementById('imagePreviewContainer');
    const imagePreview = document.getElementById('imagePreview');
    const cropBtn = document.getElementById('cropBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const uploadBtn = document.getElementById('uploadBtn');
    const studentList = document.getElementById("student-list");
    const studentIdInput = document.getElementById('studentId');
    const searchInput = document.getElementById('searchInput');
    const loadingEle = document.getElementById("loading");
    let cropper;
    let students = [];
    let isDev = false;
    const URL_PRODUCTION = 'https://script.google.com/macros/s/AKfycbyLYkcxRE5PzYFYufV42EG1WSz4zAuoP8M2fB0u1GpEZEJo6AqTSUApxGnLUoZzzAVpnQ/exec';
    const URL = "https://script.google.com/macros/s/AKfycbwvFkdNynv7uA3xAH7KzE4a8bHY-ebBJM1H_ld6vxA3/dev";
    const TOKEN = "ya29.a0AcM612xgsyIsFhn7TKlu_gf3B4dOTGXEAQ-9HwJYpN3wFtJ1_qNxqX_RVSjiAPlAf0X9DkUF3FpOC6biaVt_aNMvy1PkVYQp5WTaZRPZhTYnuObpLRDDEluTddBbbJ8vPsByKCcs0_-rG5rnTZosRT5ptb7XSM5_wEgmPvoNYgYaCgYKASASARASFQHGX2Mijk0TTbv-WWG_HHxgolvxWg0178";

    let SECRETE_CODE = localStorage.getItem('code');
    let FINAL_URL;

    getKeyFromUser();

    function getKeyFromUser() {
        while (!SECRETE_CODE || SECRETE_CODE.length <= 3) {
            SECRETE_CODE = prompt("Enter your Secrete Code?");
            localStorage.setItem('code', SECRETE_CODE);
        }
        FINAL_URL = isDev ? `${URL}?access_token=${TOKEN}&secret_key=${SECRETE_CODE}` : `${URL_PRODUCTION}?secret_key=${SECRETE_CODE}`;

        loadingEle.style.display = 'block';
        // Fetch student data from the API
        fetch(FINAL_URL)
            .then(response => response.json())
            .then(data => {
                if (data?.status === 'NOT_OK') {
                    alert("wrong key entered. TRY AGAIN..");
                    SECRETE_CODE = '';
                    getKeyFromUser();
                    return;
                }
                // We will use only the first 10 entries for demonstration purposes
                students = data.map(item => ({
                    id: item.studentId,
                    name: item.name,
                    profileImage: item.imageUrl,
                    batch: item.batch
                }));

                // Display the student list
                displayStudentsCards(students, 60);

            })
            .then(() => {
                const search_params = new URLSearchParams(window.location.search);
                if (search_params.has('stdId')) {
                    const id = search_params.get('stdId');
                    searchInput.value = id;
                    filterList(id);
                }
            })
            .catch(error => console.error('Error fetching student data:', error))
            .finally(() => {
                loadingEle.style.display = 'none';
            });
    }



    // function to display students
    function displayStudentsCards(studentsArr, totalDisplay) {

        studentList.innerHTML = '';
        studentsArr.slice(0, totalDisplay).forEach(student => {
            const card = createStudentCard(student);
            studentList.appendChild(card);
        });
    }

    // Function to create a student card
    function createStudentCard(student) {
        const card = document.createElement("div");
        card.className = "card";

        const img = document.createElement("img");
        img.src = student.profileImage;
        img.alt = `${student.name}'s profile picture`;
        img.loading = "lazy";
        img.onclick = () => open(student.profileImage.replace('w80', 'w350'), '_blank');
        img.style.cursor = 'pointer';

        const content = document.createElement("div");
        content.className = "card-content";

        const name = document.createElement("h2");
        name.textContent = student.name;

        const id = document.createElement("p");
        id.textContent = `ID: ${student.id} | Batch: ${student.batch}`;


        const button = document.createElement("button");
        button.textContent = "Upload Image";
        // button.innerHTML = "<img class='upload-img' src='./assets/images/upload-icon.png'></img>"
        button.addEventListener("click", () => imageUpload(student.id));

        content.appendChild(name);
        content.appendChild(id);
        content.appendChild(button);

        card.appendChild(img);
        card.appendChild(content);

        return card;
    }

    function imageUpload(id) {
        formContainer.showModal();
        studentIdInput.value = id;
        studentIdInput.disabled = true;
    }

    closeFormBtn.addEventListener('click', function () {
        formContainer.close();
        resetForm();
    });

    imageInput.addEventListener('change', function (e) {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function (event) {
                imagePreview.src = event.target.result;
                imagePreviewContainer.style.display = 'block';
                cropBtn.style.display = 'inline-block';
                if (cropper) {
                    cropper.destroy();
                }
                cropper = new Cropper(imagePreview, {
                    aspectRatio: 1,
                    viewMode: 1
                });
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please upload a valid image file.');
        }
    });

    cropBtn.addEventListener('click', function () {
        if (cropper) {
            const canvas = cropper.getCroppedCanvas({
                width: 500,
                height: 500
            });
            imagePreview.src = canvas.toDataURL();
            cropper.destroy();
            cropper = null;
            downloadBtn.style.display = 'inline-block';
            uploadBtn.style.display = 'inline-block';
            cropBtn.style.display = "none";
        }
    });

    downloadBtn.addEventListener('click', function () {
        const studentId = studentIdInput.value.trim();
        if (!studentId) {
            alert('Please enter the student ID.');
            return;
        }
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.onload = function () {
            // Resize the image to a smaller size (e.g., 500x500)
            const scale = Math.min(350 / img.width, 350 / img.height);
            const width = img.width * scale;
            const height = img.height * scale;

            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);
            canvas.toBlob(function (blob) {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = `${studentId}.jpg`;
                link.click();
            }, 'image/png');
        };
        img.src = imagePreview.src;
    });

    uploadBtn.addEventListener('click', function () {
        const studentId = studentIdInput.value.trim();
        if (!studentId) {
            alert('Please enter the student ID.');
            return;
        }
        // close the form
        formContainer.close();

        loadingEle.style.display = 'block';

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.onload = function () {
            // Resize the image to a smaller size (e.g., 300x300)
            const scale = Math.min(350 / img.width, 350 / img.height);
            const width = img.width * scale;
            const height = img.height * scale;
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);

            const imageBase64 = canvas.toDataURL("image/png").split(',')[1];
            const formData = {
                studentId,
                imageBase64
            }
            fetch(FINAL_URL, {
                method: 'POST',
                body: JSON.stringify(formData)
            }).then(res => res.json())
                .then(data => {
                    students = data.map(item => ({
                        id: item.studentId,
                        name: item.name,
                        profileImage: item.imageUrl,
                        batch: item.batch
                    }));

                    // Display the student list
                    displayStudentsCards(students, 60);

                }).catch(error => {
                    console.error('Error uploading the image:', error);
                    alert('Error uploading the image.');
                }).finally(() => {
                    loadingEle.style.display = 'none';
                    resetForm();
                });
        };
        img.src = imagePreview.src;

    });

    function resetForm() {
        uploadForm.reset();
        imagePreviewContainer.style.display = 'none';
        imagePreview.src = '';
        cropBtn.style.display = 'none';
        downloadBtn.style.display = 'none';
        uploadBtn.style.display = 'none';
        if (cropper) {
            cropper.destroy();
            cropper = null;
        }
    }

    searchInput.addEventListener('input', e => {
        const searchTerm = e.target.value.toLowerCase();
        filterList(searchTerm);
    });

    function filterList(searchTerm) {
        let filteredStudents = students.filter(student => (student.id.toString().includes(searchTerm) || student.name.toLowerCase().includes(searchTerm)));
        displayStudentsCards(filteredStudents, filteredStudents.length);
    }
});