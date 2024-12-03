import { homeSection, aboutSection, messagesSection } from "./data.js";
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
    section.addEventListener("click", navigationSupport);
    li.append(section);
    list.append(li);
  });
  return list;
}
function navigationSupport(event) {
  const chooser = event.target.value;

  mainSection.textContent = "";
  if (chooser === "home") homeSectionGenerator();
  if (chooser === "about") aboutSectionGenerator();
  if (chooser === "messages") messagesSectionGenerator();
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

  mainSection.append(article);
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
headerGenerator();
footerGenerator();
// homeSectionGenerator();
// aboutSectionGenerator();
// messagesSectionGenerator();

// Ogarnąć nawigację
