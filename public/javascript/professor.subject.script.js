window.onload = function () {
  const week = JSON.stringify(course.week);
  //console.log(week)
  for (const day in week) {
    if (week[day].scheduled) {
      document
        .getElementById(`${day}start${week[day].startAt}`)
        .setAttribute("selected", true);
      document
        .getElementById(`${day}end${week[day].endAt}`)
        .setAttribute("selected", true);
    }
  }
};

function preventSubmit() {
  return false;
}
function logout() {
  console.log("chau");
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/auth/logout", true);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // Response
      var response = this.responseText;
    }
  };
  xhttp.send();
  setTimeout(() => {
    location.replace("/");
  }, 700);
}

function validateHours(day) {
  const startAt = document.querySelector(`#${day}StartSelect`),
    endAt = document.querySelector(`#${day}EndSelect`);
  let hours = [
    startAt[startAt.selectedIndex].value,
    endAt[endAt.selectedIndex].value,
  ];
  hours = [hours[0].split(":"), hours[1].split(":")];

  if (parseInt(hours[0][0]) > parseInt(hours[1][0])) {
    alert("La hora de finalizacion no puede ser anterior a la de inicio");
    return false;
  }
  if (
    hours[0][0] == hours[1][0] &&
    parseInt(hours[0][1]) > parseInt(hours[1][1])
  ) {
    alert("La hora de finalizacion no puede ser anterior a la de inicio");
    return false;
  }
  console.log(hours);
}
