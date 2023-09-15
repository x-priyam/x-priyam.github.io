import { Project } from "./modules/projects.js";
import { Skill } from "./modules/skills.js";

// set the theme switch icon matching the current theme
async function setThemeIcon() {
  let themeIcon = document.querySelector("#theme-switch");

  themeIcon.classList.add("theme-switch-animation");
  const transition = document.startViewTransition(() => {
    // iconify-icons load inner svg element using the icon attribuite
    if (document.documentElement.classList.contains("light-theme")) {
      themeIcon.setAttribute("icon", "tabler:sun-filled");
    } else {
      themeIcon.setAttribute("icon", "tabler:moon-filled");
    }
  });

  await transition.finished;
  themeIcon.classList.remove("theme-switch-animation");

  themeIcon.classList.add("bounce-animation");
  return;
}

window.addEventListener("load", async () => {
  // check media query for system light/dark theme
  if (window.matchMedia("prefers-color-scheme: light").matches) {
    document.documentElement.classList.add("light-theme");
  }
  await setThemeIcon();

  // change theme on click of theme-switch button
  document
    .querySelector("#theme-switch")
    .addEventListener("click", async () => {
      document.documentElement.classList.toggle("light-theme");
      await setThemeIcon();
    });

  // load the first project
  let projectBox = document.querySelector(".project-box");
  await Project.setNumberOfPages("/pages/projects/");
  let currProject = new Project(await Project.build(1));
  projectBox.replaceWith(currProject.getProjectBox());

  // Replace old project box with project box which is previous in position
  document
    .querySelector("#project-scroll-prev")
    .addEventListener("click", async () => {
      // projectBox must be reselected from the DOM for it to update
      projectBox = document.querySelector(".project-box");
      projectBox.classList.add("project-prev"); // animation class
      currProject = new Project(await currProject.prev());

      const transition = document.startViewTransition(() => {
        projectBox.replaceWith(currProject.getProjectBox());
        // projectBox must be reselected from the DOM for it to update
        projectBox = document.querySelector(".project-box");
        projectBox.classList.add("project-prev"); // animation class
      });

      await transition.finished;
      projectBox.classList.remove("project-prev");
    });

  // Replace old project box with project box which is next in position
  document
    .querySelector("#project-scroll-next")
    .addEventListener("click", async () => {
      // projectBox must be reselected from the DOM for it to update
      projectBox = document.querySelector(".project-box");
      projectBox.classList.add("project-next"); // animation class
      currProject = new Project(await currProject.next());

      const transition = document.startViewTransition(() => {
        projectBox.replaceWith(currProject.getProjectBox());
        // projectBox must be reselected from the DOM for it to update
        projectBox = document.querySelector(".project-box");
        projectBox.classList.add("project-next"); // animation class
      });

      await transition.finished;
      projectBox.classList.remove("project-next");
    });

  // load all skills
  let skillContainer = document.querySelector(".skills");
  skillContainer.removeChild(document.querySelector(".skill-box")); // removing template
  await Skill.setNumberOfPages("/pages/skills/");
  for (let i = 1; i <= Skill.numberOfPages; i++) {
    let skillBox = new Skill(await Skill.build(i)).getSkillBox();
    skillContainer.appendChild(skillBox);
  }

  console.log("Page Loaded");
});
