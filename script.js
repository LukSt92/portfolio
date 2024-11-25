import { home } from "./data.js";

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

headerGenerator();
footerGenerator();
