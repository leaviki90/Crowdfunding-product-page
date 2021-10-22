const toggleButton = document.getElementById("toggle");
const image = document.querySelector("#toggle > img");
const progressButton = document.getElementById("progress-button");
const bookmarkButton = document.querySelector(".bookmark-button").parentElement;
const modal = document.getElementById("modal");
const modalWrapper = document.getElementById("modalWrapper");
const backButton = document.querySelector(".back-button");
const closeBtn = document.getElementById("close-btn");
const body = document.getElementsByTagName("body")[0];
const clicks = document.querySelectorAll(
  "div.header-wrapper.accordion-wrapper"
);
const form1 = document.getElementById("form1");
const form2 = document.getElementById("form2");
const form3 = document.getElementById("form3");
const amountElement = document.getElementById("amountElement");
const backersElement = document.getElementById("backersElement");
const progressBar = document.getElementById("progressBar");
const packet1span = document.getElementById("packet1span");
const packet2span = document.getElementById("packet2span");
const packet1spanM = document.getElementById("packet1spanM");
const packet2spanM = document.getElementById("packet2spanM");
const modalSuccess = document.getElementById("modal-success");
const buttonGotIt = document.getElementById("got-it");
const selectReward1 = document.getElementById("select-reward1");
const selectReward2 = document.getElementById("select-reward2");

console.log(clicks);
//Toggle image
function toggleImg() {
  let initialImg = image.src;
  let srcTest = initialImg.includes("css/images/icon-hamburger.svg");
  let newImg = {
    true: "css/images/icon-close-menu.svg",
    false: "css/images/icon-hamburger.svg",
  }[srcTest];

  return newImg;
}

//Click on the toggleButton
toggleButton.addEventListener("click", () => {
  image.src = toggleImg();
  let wrapper = document.querySelector("div.nav-wrapper");
  wrapper.classList.toggle("active");
});

//CLICK ON THE bookmark button
bookmarkButton.addEventListener("click", () => {
  bookmarkButton.classList.toggle("active");
});

//CLICK ON THE MODAL - back to project

backButton.addEventListener("click", () => {
  modal.classList.add("show");
  body.classList.add("fixed");
});

//CLICK ON THE MODAL - specific part of a project
selectReward1.addEventListener("click", () => {
  modal.classList.add("show");
  body.classList.add("fixed");
  const bamboo = document.getElementById("bamboo");
  bamboo.scrollIntoView({
    behavior: "smooth",
    inline: "center",
  });

  openAccordion(bamboo.querySelector("div.header-wrapper.accordion-wrapper"));
});
selectReward2.addEventListener("click", () => {
  modal.classList.add("show");
  body.classList.add("fixed");
  const blackEdition = document.getElementById("black-edition");
  blackEdition.scrollIntoView({
    behavior: "smooth",
  });

  openAccordion(
    blackEdition.querySelector("div.header-wrapper.accordion-wrapper")
  );
});

//CLOSE-BTN IN MODAL CLICKED
closeBtn.addEventListener("click", function (e) {
  modal.classList.remove("show");
  body.classList.remove("fixed");
});

const openAccordion = (clickedElement) => {
  const content = clickedElement
    .closest("article")
    .querySelector("div.accordion");
  clickedElement.classList.add("active");
  content.classList.add("active");
  content.style.maxHeight = content.scrollHeight + "px";
  clickedElement.querySelector("input").checked = "true";
};

const closeAccordion = (clickedElement) => {
  const content = clickedElement
    .closest("article")
    .querySelector("div.accordion");
  clickedElement.classList.remove("active");
  content.classList.remove("active");
  content.style.maxHeight = null;
  clickedElement.querySelector("input").checked = "false";
};

clicks.forEach((clickedElement) => {
  const content = clickedElement
    .closest("article")
    .querySelector("div.accordion");

  clickedElement.onclick = (event) => {
    console.log("clicked");
    event.preventDefault();
    if (content.style.maxHeight) {
      // closeAccordion(clickedElement);
    } else {
      clicks.forEach((clickedElement) => closeAccordion(clickedElement));
      openAccordion(clickedElement);
    }
  };
});

let totalAmount = 89914;
let totalBackers = 5007;
let packet1 = 101;
let packet2 = 64;

const calcPercent = function (amount) {
  console.log("perc", (totalAmount / 100000) * 100);
  return (totalAmount / 100000) * 100;
};

const changeTotal = function (amount) {
  // increment total amount and total backers
  totalAmount = totalAmount + amount;
  ++totalBackers;

  // change text in spans
  amountElement.innerText = totalAmount.toLocaleString();
  backersElement.innerText = totalBackers.toLocaleString();

  // increment progress bar's width
  progressBar.style.width =
    calcPercent(totalAmount) > 100 ? "100%" : calcPercent(totalAmount) + "%";

  console.log(totalAmount);
  console.log(totalBackers);
};

const addToPledge = function (event) {
  event.preventDefault();

  const inputValue = +this.querySelector("input").value;
  // console.log(inputValue);
  // if (isNaN(inputValue) || inputValue <= 0) {
  //   // console.log("error: must enter a propper amount!");
  //   form2.querySelector("small").classList.add("error");
  //   form2.querySelector("small").innerText =
  //     "You have to enter a propper amount!";
  //   form1.querySelector("small").classList.add("error");
  //   form1.querySelector("small").innerText =
  //     "You have to enter a propper amount!";
  //   return;
  // }

  //Pledge with no reward
  // if ((this.id = "form1")) {
  //   if (isNaN(inputValue) || inputValue <= 0) {
  //     this.querySelector("small").classList.add("error");
  //     this.querySelector("small").innerText =
  //       "You have to enter a propper amount!";
  //     return;
  //   } else {
  //     modalSuccess.classList.add("active");
  //   }
  // }
  // Pledge $25 or more
  if (this.id === "form2") {
    if (isNaN(inputValue) || inputValue <= 0) {
      this.querySelector("small").classList.add("error");
      this.querySelector("small").innerText =
        "You have to enter a propper amount!";
      return;
    }
    // required amount check
    if (inputValue > 25) {
      --packet1;
      console.log(packet1);
      packet1span.innerText = packet1;
      packet1spanM.innerText = packet1;
      modalSuccess.classList.add("active");
      modal.classList.remove("show");
      body.classList.remove("fixed");
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (packet1 === 0) {
        console.log("no more");
        document.querySelectorAll(".bamboo").forEach((elem) => {
          elem.classList.add("disabled");
        });
      }
    } else {
      modalSuccess.classList.remove("active");
      // console.log("minimum value 25");
      form2.querySelector("small").classList.add("error");
      form2.querySelector("small").innerText = "The minimum amount is 25.";
      return;
    }

    // Pledge $75 or more
  } else if (this.id === "form3") {
    console.log("form3");
    if (isNaN(inputValue) || inputValue <= 0) {
      this.querySelector("small").classList.add("error");
      this.querySelector("small").innerText =
        "You have to enter a propper amount!";
      return;
    }
    // required amount check
    if (inputValue > 75) {
      --packet2;
      console.log(packet2);
      packet2span.innerText = packet2;
      packet2spanM.innerText = packet2;
      modalSuccess.classList.add("active");
      modal.classList.remove("show");
      body.classList.remove("fixed");
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (packet2 === 0) {
        console.log("no more");
        document.querySelectorAll(".black-edition").forEach((elem) => {
          elem.classList.add("disabled");
        });
      }
    } else {
      modalSuccess.classList.remove("active");
      // console.log("minimum value 75");
      form3.querySelector("small").classList.add("error");
      form3.querySelector("small").innerText = "The minimum amount is 75.";
      return;
    }
  }

  changeTotal(inputValue);
  this.reset();
};

form1.addEventListener("submit", addToPledge);
form2.addEventListener("submit", addToPledge);
form3.addEventListener("submit", addToPledge);

//CLOSE-BTN IN Succes MODAL
buttonGotIt.addEventListener("click", function (e) {
  modalSuccess.classList.remove("active");
});

modalWrapper.addEventListener("click", function (e) {
  if (e.target === e.currentTarget) {
    modal.classList.remove("show");
    body.classList.remove("fixed");
  }
});
