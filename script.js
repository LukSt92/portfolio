import { home } from "./data.js";
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
    section.textContent = name.toUpperCase();
    li.append(section);
    list.append(li);
  });
  return list;
}

function articleGenerator(data) {
  const article = document.createElement("article");
  const imgDiv = document.createElement("div");

  imgDiv.className = "imgDiv";
  article.append(imgDiv);
  data.forEach((section) => {
    const sectionTitle = document.createElement("div");
    const sectionDesc = document.createElement("div");

    sectionTitle.className = "sectionTitle";
    sectionDesc.className = "sectionDesc";
    sectionTitle.textContent = section.descName;
    // Dodać warunek sprawdzający czy section.desc jest stringiem i czy jest tablicą array.isarray()
    if (Array.isArray(section.desc)) {
      section.desc.forEach((skill) => {
        sectionDesc.append(skillGenerator(skill));
      });
    } else sectionDesc.textContent = section.desc;
    article.append(sectionTitle, sectionDesc);
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
    const skillPointRadio = document.createElement("input");

    skillPointRadio.type = "radio";
    skillPointRadio.disabled = true;
    if (skill.yearsOfExperience > yearValidation) {
      skillPointRadio.checked = true;
      yearValidation++;
    }
    skillPointsContainer.append(skillPointRadio);
  }
  skillSummary.append(skillName, skillPointsContainer, skillExperience);
  skillContainer.append(skillImg, skillSummary);
  return skillContainer;
}

function homeGenerator() {
  const article = articleGenerator(home);

  mainSection.append(article);
}

headerGenerator();
footerGenerator();
homeGenerator();
