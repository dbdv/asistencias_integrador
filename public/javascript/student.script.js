document.onkeydown = function (evt) {
  if (document.getElementsByClassName("modal").length !== 0) {
    //console.log(document.getElementsByClassName("modal"))
    evt = evt || window.event;
    if (evt.keyCode == 27) {
      toggleInscripForm();
    }
  }
};

const handleSignUpSubject = (evt) => {
  //   console.log(evt);
  evt.preventDefault();

  const selectElement = document.querySelector("#subjects");
  const optionSelected = selectElement[selectElement.selectedIndex];

  const idSubjectSelected = optionSelected.value;

  //   console.log("Id de la materia: " + idSubjectSelected);

  fetch("/Student/signUpSubject", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ idSubject: idSubjectSelected }),
  }).then(async (res) => {
    if (res.status !== 201) {
      const data = await res.json();
      const message = data.message;
      showErrorMessage(message);
      return;
    }

    location.reload();
  });

  return false;
};

function markAttendance(id) {
  fetch("/Student/markAttendance", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ idSubject: id }),
  }).then(async (res) => {
    if (res.status !== 201) {
      const data = await res.json();
      const message = data.message;
      showAttendanceErrorMessage(message);
      return;
    }

    location.reload();
  });
}

function toggleInscripForm() {
  //   evt.preventDefault();
  document.getElementById("modal").classList.toggle("modal");
  document.getElementById("misMaterias").classList.toggle("on-back");
  document.getElementById("nav").classList.toggle("on-back");
  document.getElementById("ul").classList.toggle("on-back");

  return false;
}

function showErrorMessage(message) {
  const errorModal = document.querySelector("#errorModal");
  const errorText = document.querySelector("#errorText");

  errorText.innerText = message;
  errorModal.classList.add("errorModal-on");
}

function showAttendanceErrorMessage(message) {
  const attendanceErrorModal = document.querySelector("#attendanceErrorModal");
  const errorText = document.querySelector("#attendanceErrorText");

  errorText.innerText = message;
  attendanceErrorModal.classList.add("errorModal-on");
}

function closeErrorModal() {
  const errorModal = document.querySelector("#errorModal");
  errorModal.classList.remove("errorModal-on");
}

function closeattendanceErrorModal() {
  const errorModal = document.querySelector("#attendanceErrorModal");
  errorModal.classList.remove("errorModal-on");
}

function logout() {
  console.log("chau");

  fetch("/auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    location.replace("/");
  });
}
