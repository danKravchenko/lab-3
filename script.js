let students = []; //// array of studets
let count = 0;
let choosenRows;
let elements = document.getElementsByTagName("tr");
let changeData = false;

function createElementInTable() {
        let table = document.getElementById("tb-body");
        let elem = document.createElement("tr");
        table.appendChild(elem);
        createTextRows(elem);
}

function createTextRows(element) {
        let student = students[count];

        for (i = 0; i < 6; i++) {
                let elem = document.createElement("td");

                if (Object.keys(student)[i] == 'gender' && Object.values(student)[i] == true) {
                        elem.innerHTML = "male";
                }

                else if (Object.keys(student)[i] == 'gender' && Object.values(student)[i] == false) {
                        elem.innerHTML = "female";
                }

                else {
                        elem.innerHTML = Object.values(student)[i];
                }

                if (Object.values(student)[i] == null) {
                        elem.innerHTML = '<img src="#" class="change-btn" onclick="openDialogWindow(2)"></div>' +
                                '<img src="#" class="delete-btn" onclick="deleteStudent()"></div>';
                }

                element.appendChild(elem);
        }
        count++;
}

function addNewStudent(rating, firstName, lastName, gender, id) {
        let student = {
                rating: rating,
                firstName: firstName,
                lastName: lastName,
                gender: gender,
                id: id
        }

        students.push(student);
        createElementInTable();

        let newRow = document.getElementById("tb-body").lastElementChild;
        newRow.addEventListener("mouseover", overInTableElement);
        newRow.addEventListener("mouseout", outInTableElement);
}



function changeDataStudent(rating, firstName, lastName, gender, id) {
        let ratingRows = choosenRows.childNodes[0];
        let firstNameRows = choosenRows.childNodes[1];
        let lastNameRows = choosenRows.childNodes[2];
        let genderRows = choosenRows.childNodes[3];
        let idRows = choosenRows.childNodes[4];

        for (i = 0; i < students.length; i++) {
                let studentValues = students[i];

                for (k = 0; k < 6; k++) {
                        if (Object.keys(studentValues)[k] == 'id' && Object.values(studentValues)[k] == idRows.innerHTML) {

                                let student = {
                                        rating: rating,
                                        firstName: firstName,
                                        lastName: lastName,
                                        gender: gender,
                                        id: id
                                }

                                students.splice(i, 1, student);

                                ratingRows.innerHTML = rating;
                                firstNameRows.innerHTML = firstName;
                                lastNameRows.innerHTML = lastName;

                                if (gender == true) {
                                        genderRows.innerHTML = "male";
                                }

                                else {
                                        genderRows.innerHTML = "female";
                                }

                                idRows.innerHTML = id;

                        }
                }
        }
}


function save() {
        let ratingFieldValue = document.getElementById("rating").value;
        let firstNameFieldValue = document.getElementById("firstName").value;
        let lastNameFieldValue = document.getElementById("lastName").value;
        let genderMaleFieldValue = document.getElementById("genderMale");
        let genderFemaleFieldValue = document.getElementById("genderFemale");
        let idFieldValue = document.getElementById("idStudent").value;

        if (ratingFieldValue > 0 && firstNameFieldValue.length > 0 && lastNameFieldValue.length > 0 && idFieldValue > 0) {

                let gender = true;

                if (genderMaleFieldValue.checked != genderFemaleFieldValue.checked) {
                        if (genderMaleFieldValue.checked) {
                                gender = true;
                        }

                        if (genderFemaleFieldValue.checked) {
                                gender = false;
                        }

                        if (changeData == false) {
                                addNewStudent(ratingFieldValue, firstNameFieldValue, lastNameFieldValue, gender, idFieldValue);
                        }

                        else {
                                changeDataStudent(ratingFieldValue, firstNameFieldValue, lastNameFieldValue, gender, idFieldValue);
                        }

                        cancel();
                }
        }
}

function deleteStudent() {
        let idRows = choosenRows.childNodes[4];

        for (i = 0; i < students.length; i++) {
                let studentValues = students[i];

                for (k = 0; k < 6; k++) {
                        if (Object.keys(studentValues)[k] == 'id' && Object.values(studentValues)[k] == idRows.innerHTML) {

                                let table = document.getElementById("tb-body").children;
                                students.splice(i, 1);
                                console.log(students);
                                if (students.length >= 0) {
                                        table[i + 1].remove();
                                        count--;
                                }
                        }
                }
        }
}

function cancel() {
        let dialogWindow = document.getElementById("dialogWindow");
        dialogWindow.style.display = "none";
        let btnsAdd = document.getElementById("dialog-btns-add");
        btnsAdd.style.display = "flex";
        let btnsChange = document.getElementById("dialog-btns-change");
        btnsChange.style.display = "inherit";
        console.log(students)
        changeData = false;
}

function openDialogWindow(idWindow) {
        if (idWindow == 1) {
                let dialogWindow = document.getElementById("dialogWindow");
                dialogWindow.style.display = "inherit";

                let btnsChange = document.getElementById("dialog-btns-change");
                btnsChange.style.display = "none";

                let btnsAdd = document.getElementById("dialog-btns-add");
                btnsAdd.style.display = "flex";
        }

        if (idWindow == 2) {
                let dialogWindow = document.getElementById("dialogWindow");
                dialogWindow.style.display = "inherit";

                let btnsAdd = document.getElementById("dialog-btns-add");
                btnsAdd.style.display = "none";

                let btnsChange = document.getElementById("dialog-btns-change");
                btnsChange.style.display = "flex";
                changeData = true;
        }

        if (changeData == true) {
                document.getElementById("rating").value = choosenRows.children[0].innerHTML;
                document.getElementById("firstName").value = choosenRows.children[1].innerHTML;
                document.getElementById("lastName").value = choosenRows.children[2].innerHTML;
                let genderMaleFieldValue = document.getElementById("genderMale");
                let genderFemaleFieldValue = document.getElementById("genderFemale");
                document.getElementById("idStudent").value = choosenRows.children[4].innerHTML;
                let genderRows = choosenRows.childNodes[3];

                if (genderRows.innerHTML == "male") {
                        genderMaleFieldValue.checked = true;
                        genderFemaleFieldValue.checked = false;
                        console.log("q3r")
                }

                else if (genderRows.innerHTML == "female") {
                        genderMaleFieldValue.checked = false;
                        genderFemaleFieldValue.checked = true;
                        console.log("32123")
                }
        }

}

for (i = 2; i < elements.length; i++) {
        let elem = elements[i];
        elem.addEventListener("mouseover", overInTableElement);
        elem.addEventListener("mouseout", outInTableElement);
}

function overInTableElement() {
        this.style.backgroundColor = "#acd5f0";
        if (changeData == false) {
                choosenRows = this;
                let lastCell = choosenRows.lastElementChild;
                let childrenCell = lastCell.children;
                childrenCell[0].style.display = "inline";
                childrenCell[1].style.display = "inline";
        }
}

function outInTableElement() {
        this.style.backgroundColor = "#fff";
        let lastCell = choosenRows.lastElementChild;
        let childrenCell = lastCell.children;
        childrenCell[0].style.display = "none";
        childrenCell[1].style.display = "none";
}



addNewStudent(1, "Kravchenko", "Dan", true, 345);
addNewStudent(2, "firstName", "lastName", false, 282);
addNewStudent(3, "firstName", "lastName", false, 286);
