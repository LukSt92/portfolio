import {
  homeSection,
  aboutSection,
  messagesSection,
  headerSectionInfo,
  projectsSection,
} from "./data.js";
const mainSection = document.querySelector("main");

function headerGenerator() {
  const logoAndNavbar = document.querySelector(".logoAndNavBar");
  const logo = logoGenerator();
  const navBar = navBarGenerator();

  logoAndNavbar.append(logo, navBar);
}

function footerGenerator() {
  const footerNavBar = document.querySelector(".footerNavBar");
  const contactDataAndLogo = document.querySelector(".contactDataAndLogo");
  const navBar = navBarGenerator();
  const logo = logoGenerator();
  const copyright = document.createElement("p");
  const email = document.createElement("p");
  const telNumber = document.createElement("p");

  copyright.textContent = "© 2024";
  email.textContent = "jan_kowalski@gmail.com";
  telNumber.textContent = "+123 456 789";
  footerNavBar.append(navBar);
  contactDataAndLogo.append(email, telNumber, logo);
  logo.append(copyright);
}

function logoGenerator() {
  const logo = document.createElement("div");
  const firstPartLogo = document.createElement("p");
  const secPartLogo = document.createElement("p");

  logo.className = "logo";
  firstPartLogo.className = "firstPartLogo";
  firstPartLogo.textContent = "ITP";
  secPartLogo.className = "secPartLogo";
  secPartLogo.textContent = "ortfolio";
  logo.append(firstPartLogo, secPartLogo);
  return logo;
}

function navBarGenerator() {
  const sectionNames = ["home", "projects", "about", "contact", "messages"];
  const list = document.createElement("ul");

  sectionNames.forEach((name) => {
    const li = document.createElement("li");
    const section = document.createElement("a");
    section.className = name;
    section.value = name;
    section.textContent = name.toUpperCase();
    section.href = "#";
    section.addEventListener("click", () => {
      navigationSupport(section);
    });
    li.append(section);
    list.append(li);
  });
  return list;
}
function navigationSupport(section) {
  const chooser = section.value;
  const mainText = document.querySelector("h1");
  const subText = document.querySelector("h2");
  const allLinks = document.querySelectorAll("a");

  allLinks.forEach((link) => {
    if (link.value === chooser) link.style.color = "#ADB6C4";
    else link.style.color = "#FFFFFF";
  });
  mainSection.textContent = "";
  if (chooser === "home") {
    homeSectionGenerator();
    mainText.textContent = headerSectionInfo[0].mainText;
    subText.textContent = headerSectionInfo[0].subText;
  }
  if (chooser === "projects") {
    projectsSectionGenerator();
    mainText.textContent = headerSectionInfo[1].mainText;
    subText.textContent = headerSectionInfo[1].subText;
  }
  if (chooser === "about") {
    aboutSectionGenerator();
    mainText.textContent = headerSectionInfo[2].mainText;
    subText.textContent = headerSectionInfo[2].subText;
  }
  if (chooser === "contact") {
    contactSectionGenerator();
    mainText.textContent = headerSectionInfo[3].mainText;
    subText.textContent = headerSectionInfo[3].subText;
  }
  if (chooser === "messages") {
    messagesSectionGenerator();
    mainText.textContent = headerSectionInfo[4].mainText;
    subText.textContent = headerSectionInfo[4].subText;
  }
}

function articleGenerator(data, articleClassName) {
  const article = document.createElement("article");
  const imgDiv = document.createElement("div");

  imgDiv.className = "imgDiv";
  article.className = articleClassName;
  article.append(imgDiv);
  data.forEach((subSection) => {
    const subSectionCont = document.createElement("div");
    const subSectionTitle = document.createElement("div");
    const subSectionDesc = document.createElement("div");

    subSectionCont.className = "subSectionCont";
    subSectionTitle.className = "subSectionTitle";
    subSectionDesc.className = "subSectionDesc";
    subSectionTitle.textContent = subSection.descName;
    if (Array.isArray(subSection.desc)) {
      subSection.desc.forEach((item) => {
        subSectionDesc.className = "skillSection";
        subSectionDesc.append(skillGenerator(item));
      });
    } else subSectionDesc.textContent = subSection.desc;
    subSectionCont.append(subSectionTitle, subSectionDesc);
    article.append(subSectionCont);
  });
  return article;
}
function skillGenerator(skill) {
  const skillContainer = document.createElement("div");
  const skillImg = document.createElement("img");
  const skillSummary = document.createElement("div");
  const skillName = document.createElement("p");
  const skillPointsContainer = document.createElement("div");
  const skillExperience = document.createElement("p");
  let yearValidation = 0;

  skillContainer.className = "skillContainer";
  skillImg.className = "skillImg";
  skillSummary.className = "skillSummary";
  skillName.className = "skillName";
  skillPointsContainer.className = "skillPointsContainer";
  skillExperience.className = "skillExperience";
  skillImg.src = `img/${skill.name.toLowerCase()}.png`;
  skillImg.alt = `${skill.name} icon`;
  skillName.textContent = skill.name;
  skillExperience.textContent = `${skill.yearsOfExperience} year${
    skill.yearsOfExperience > 1 ? "s" : ""
  }`;
  for (let i = 0; i < 5; i++) {
    const skillPoint = document.createElement("div");

    skillPoint.className = "skillPoint";
    if (skill.yearsOfExperience > yearValidation) {
      skillPoint.className = "activeSkillPoint";
      yearValidation++;
    }
    skillPointsContainer.append(skillPoint);
  }
  skillSummary.append(skillName, skillPointsContainer, skillExperience);
  skillContainer.append(skillImg, skillSummary);
  return skillContainer;
}

function homeSectionGenerator() {
  const article = articleGenerator(homeSection, "homeArticle");

  mainSection.append(article);
}
function aboutSectionGenerator() {
  const article = articleGenerator(aboutSection, "aboutArticle");
  const contactBtn = document.createElement("button");
  const arrRightImg = document.createElement("img");
  const textSpan = document.createElement("span");
  const contactPageSelector = document.querySelector(".contact");

  arrRightImg.src = "img/arrowRight.png";
  arrRightImg.className = "arrow";
  textSpan.textContent = "Contact me";
  contactBtn.className = "bigBtn";
  contactBtn.addEventListener("click", () => {
    navigationSupport(contactPageSelector);
  });
  contactBtn.append(arrRightImg, textSpan);
  mainSection.append(article, contactBtn);
}

function messagesSectionGenerator() {
  const allMessagesContainer = document.createElement("div");

  allMessagesContainer.className = "allMessagesContainer";
  messagesSection.forEach((message) => {
    const messageContainer = document.createElement("div");
    const senderName = document.createElement("span");
    const senderEmail = document.createElement("span");
    const senderMessage = document.createElement("span");

    messageContainer.className = "messageContainer";
    senderName.textContent = `Name: ${message.name}`;
    senderEmail.textContent = `Email: ${message.email}`;
    senderMessage.textContent = `Message: ${message.message}`;
    messageContainer.append(senderName, senderEmail, senderMessage);
    allMessagesContainer.append(messageContainer);
    mainSection.append(allMessagesContainer);
  });
}

function contactSectionGenerator() {
  const contactInputNames = ["Name", "Email", "Message"];
  const contactSection = document.createElement("div");
  const contactForm = document.createElement("form");
  const contactMeContainer = document.createElement("div");
  const nameAndEmailContainer = document.createElement("div");
  const sendMessageBtn = document.createElement("button");

  nameAndEmailContainer.className = "nameAndEmailContainer";
  contactMeContainer.className = "contactMeContainer";
  contactMeContainer.textContent = "Contact me";
  contactForm.className = "contactForm";
  contactSection.className = "contactSection";
  sendMessageBtn.className = "bigBtn";
  sendMessageBtn.type = "submit";
  sendMessageBtn.textContent = "Send message";
  sendMessageBtn.addEventListener("click", tryToSendMsg);
  contactInputNames.forEach((name) => {
    if (name === "Message") contactForm.append(inputCreator(name));
    else nameAndEmailContainer.append(inputCreator(name));
  });
  contactForm.insertBefore(nameAndEmailContainer, contactForm.firstChild);
  contactForm.insertBefore(contactMeContainer, contactForm.firstChild);
  contactSection.append(contactForm, sendMessageBtn);
  mainSection.append(contactSection);
}

function inputCreator(name) {
  const inputContainer = document.createElement("div");
  const input = document.createElement("input");
  const label = document.createElement("label");
  const span = document.createElement("span");

  input.id = `input${name}`;
  label.className = "label";
  label.for = input.id;
  label.textContent = name;
  span.id = `error${name}`;
  span.className = "errorSpan";
  if (name === "Name") input.placeholder = "Your Name";
  if (name === "Message") input.placeholder = "Hello, my name is...";
  if (name === "Email") input.placeholder = "email@example.com";
  inputContainer.className = `${name.toLowerCase()}InputContainer`;
  inputContainer.append(label, input, span);
  return inputContainer;
}
function tryToSendMsg() {
  const nameInput = document.querySelector("#inputName");
  const emailInput = document.querySelector("#inputEmail");
  const messageInput = document.querySelector("#inputMessage");
  let isNameValid =
    nameInput.value.length >= 3 && nameInput.value.length < 20 ? true : false;
  let isEmailValid = emailInput.value.includes("@") ? true : false;
  let isMessageValid =
    messageInput.value.length > 0 && messageInput.value.length < 100
      ? true
      : false;

  inputValidation(nameInput);
  inputValidation(emailInput);
  inputValidation(messageInput);
  nameInput.addEventListener("keyup", () => {
    inputValidation(nameInput);
  });
  emailInput.addEventListener("keyup", () => {
    inputValidation(emailInput);
  });
  messageInput.addEventListener("keyup", () => {
    inputValidation(messageInput);
  });
  if (isNameValid && isEmailValid && isMessageValid) {
    const newMessage = {
      name: nameInput.value,
      email: emailInput.value,
      message: messageInput.value,
    };
    messagesSection.push(newMessage);
    nameInput.value = "";
    emailInput.value = "";
    messageInput.value = "";
  }
}
function inputValidation(input) {
  const nameSpan = document.querySelector("#errorName");
  const emailSpan = document.querySelector("#errorEmail");
  const messageSpan = document.querySelector("#errorMessage");
  let isError = true;

  if (input.id === "inputName") {
    const nameLength = input.value.length;
    if (nameLength <= 2)
      nameSpan.textContent = "The name must be at least 3 characters long.";
    else if (nameLength > 20)
      nameSpan.textContent = "The name must not exceed 20 characters.";
    else {
      nameSpan.textContent = "";
      isError = false;
    }
  }
  if (input.id === "inputEmail") {
    const emailValue = input.value;
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(emailValue))
      emailSpan.textContent = "Please enter a valid email address";
    else {
      emailSpan.textContent = "";
      isError = false;
    }
  }
  if (input.id === "inputMessage") {
    const messageLength = input.value.length;
    if (messageLength === 0)
      messageSpan.textContent = "The message cannot be empty.";
    else if (messageLength > 100)
      messageSpan.textContent = "The message must not exceed 100 characters.";
    else {
      messageSpan.textContent = "";
      isError = false;
    }
  }
  if (isError) input.style.borderColor = "#AF0808";
  else input.style.borderColor = "#1F2041";
}
function projectsSectionGenerator() {
  const addProjectBtn = document.createElement("button");
  const allProjectsContainer = document.createElement("div");
  const plusIconImg = document.createElement("img");
  const textSpan = document.createElement("span");

  addProjectBtn.className = "bigBtn";
  addProjectBtn.id = "addProjectBtn";
  plusIconImg.className = "plusIcon";
  plusIconImg.src = "img/plusIcon.png";
  textSpan.textContent = "Add project";
  addProjectBtn.append(plusIconImg, textSpan);
  allProjectsContainer.className = "allProjectsContainer";
  projectsSection.forEach((project) => {
    const projectContainer = projectGenerator(project);
    const deleteBtn = document.createElement("button");
    const deleteIcon = document.createElement("img");

    deleteBtn.className = "deleteBtn";
    deleteIcon.className = "deleteIcon";
    deleteIcon.src = "img/deleteIcon.png";
    deleteBtn.append(deleteIcon);
    projectContainer.append(deleteBtn);
    allProjectsContainer.append(projectContainer);
  });
  mainSection.append(addProjectBtn, allProjectsContainer);
}
function projectGenerator(project) {
  const projectContainer = document.createElement("div");
  const projectName = document.createElement("span");
  const techList = document.createElement("ul");

  projectContainer.className = "projectContainer";
  projectName.className = "projectName";
  techList.className = "techList";
  projectName.textContent = project.projectName;
  project.technologyUsed.forEach((tech) => {
    const techName = document.createElement("li");

    techName.className = "techName";
    techName.textContent = tech;
    techList.append(techName);
  });
  projectContainer.append(projectName, techList);
  return projectContainer;
}
headerGenerator();
footerGenerator();
const startingPageSelector = document.querySelector(".home");
navigationSupport(startingPageSelector);
