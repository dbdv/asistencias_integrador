function ingresar() {
  const regexEmail = /^[a-zA-Z]+@+[a-zA-Z]+.+com$/;
  const errorSpan = document.querySelector("#span");
  const user = {
    email: document.querySelector("#emailLog").value,
    pass: document.querySelector("#passLog").value,
  };

  console.log(user);

  if (!user.email || !user.pass) {
    errorSpan.classList.add("login-error-on");
    return;
  }

  fetch("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => {
    console.log(res);
    if (res.status === 404 || res.status === 401)
      errorSpan.classList.add("login-error-on");
  });

  //   if (!regexEmail.test(user.email)) {
  //     alert("Correo invalido.");
  //     return false;
  //   }

  //   var xhttp = new XMLHttpRequest();
  //   xhttp.open("POST", "/auth", true);
  //   xhttp.setRequestHeader("Content-Type", "application/json");
  //   xhttp.onreadystatechange = function () {
  //     if (this.readyState == 4 && this.status == 200) {
  //       // Response
  //       var response = this.responseText;
  //     }
  //   };
  //   var data = { ...user };
  //   console.table(data);
  //   xhttp.send(JSON.stringify(data));
  //   setTimeout(() => {
  //     location.reload();
  //   }, 800);
}

document.onkeydown = function (evt) {
  if (document.getElementsByClassName("modal").length !== 0) {
    //console.log(document.getElementsByClassName("modal"))
    evt = evt || window.event;
    if (evt.keyCode == 27) {
      toggleSignForm();
    }
  }
};

function preventSubmit() {
  return false;
}

function toggleSignForm() {
  document.getElementById("modal").classList.toggle("modal");
  //document.getElementById("imgIndex").classList.toggle("on-back");
  document.getElementById("div").classList.toggle("on-back");
}

function fadeSpan() {
  if (document.querySelector("#span") !== null)
    document.querySelector("#span").classList.remove("login-error-on");
}

function fadeSignMessage() {
  document.querySelector("#signYes").classList.toggle("modal");
  document.querySelector("#signYes").classList.toggle("modal-off-msg");
}

const signUP_btn = document.querySelector("#signUP");
signUP_btn.addEventListener("click", () => {
  const regexEmail = /^[a-zA-Z]+@+[a-zA-Z]+.+com$/;
  const user = {
    email: document.querySelector("#inp-email").value,
    pass: document.querySelector("#inp-pass").value,
    career:
      document.querySelector("#inp-career")[
        document.querySelector("#inp-career").selectedIndex
      ].value,
    dni: document.querySelector("#inp-dni").value,
    firstName: document.querySelector("#inp-firstName").value,
    lastName: document.querySelector("#inp-lastName").value,
  };

  //console.table(user)

  if (
    !user.email ||
    !user.pass ||
    !user.firstName ||
    !user.lastName ||
    !user.dni ||
    !user.career
  ) {
    alert("No completó todos los campos.");
    return false;
  }

  if (!regexEmail.test(user.email)) {
    alert("Correo invalido.");
    return false;
  }

  var data = {};
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/auth/signUp", true);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log("por mandar");
    }
  };
  data = { ...user };
  setTimeout(() => {
    xhttp.send(JSON.stringify(data));
    //document.querySelector("#signYes").classList.toggle("modal");

    setTimeout(() => {
      //document.querySelector("#signYes").classList.toggle("modal");
      //toggleSignForm()
      location.reload();
    }, 1500);
  }, 1000);
});
