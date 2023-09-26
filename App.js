import { Project } from "./modules/projects.js";
import { Skill } from "./modules/skills.js";

const projectFolder = "/pages/projects/";
const skillFolder = "/pages/skills/";

// set the theme switch icon matching the current theme
async function setThemeIcon() {
  let themeIcon = document.querySelector("#theme-switch iconify-icon");

  // If View Transitions API is not supported
  if (!document.startViewTransition) {
    if (document.documentElement.classList.contains("light-theme")) {
      themeIcon.setAttribute("icon", "tabler:sun-filled");
    } else {
      themeIcon.setAttribute("icon", "tabler:moon-filled");
    }
  } else {
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
  }

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
  Project.setLocation(projectFolder);
  let currProject = new Project();
  await currProject.load(1);

  let projectBox = document.querySelector(".project-box");
  projectBox.replaceWith(currProject.getBox());

  const numberOfProjects = await Project.getCount();
  // Replace old project box with project box which is previous in position
  document
    .querySelector("#project-scroll-prev")
    .addEventListener("click", async () => {
      // projectBox must be reselected from the DOM for it to update
      projectBox = document.querySelector(".project-box");

      // For infinite carousel of projects:
      // if current page number is 1
      // then previous page number must be the last
      // otherwise, it's current - 1
      let prevProject = new Project();
      if (currProject.pageNumber == 1) {
        await prevProject.load(numberOfProjects);
      } else {
        await prevProject.load(currProject.pageNumber - 1);
      }

      // If View Transitions API is not supported
      if (!document.startViewTransition) {
        projectBox.replaceWith(prevProject.getBox());
      } else {
        projectBox.classList.add("project-prev"); // Animation class
        const transition = document.startViewTransition(() => {
          projectBox.replaceWith(prevProject.getBox());

          // projectBox must be reselected from the DOM for it to update
          projectBox = document.querySelector(".project-box");
          projectBox.classList.add("project-prev"); // Animation class
        });

        await transition.finished;
        // Post animation:
        // Remove the animation class
        projectBox.classList.remove("project-prev");
      }

      // Set the current project object to the previous project object
      currProject = prevProject;
    });

  document
    .querySelector("#project-scroll-next")
    .addEventListener("click", async () => {
      // projectBox must be reselected from the DOM for it to update
      projectBox = document.querySelector(".project-box");

      // For infinite carousel of projects:
      // if current page number is last
      // then next page number must be 1
      // otherwise, it's current + 1
      let nextProject = new Project();
      if (currProject.pageNumber == numberOfProjects) {
        await nextProject.load(1);
      } else {
        await nextProject.load(currProject.pageNumber + 1);
      }

      // If View Transitions API is not supported
      if (!document.startViewTransition) {
        projectBox.replaceWith(nextProject.getBox());
      } else {
        projectBox.classList.add("project-next"); // Animation class
        const transition = document.startViewTransition(() => {
          projectBox.replaceWith(nextProject.getBox());

          // projectBox must be reselected from the DOM for it to update
          projectBox = document.querySelector(".project-box");
          projectBox.classList.add("project-next"); // Animation class
        });

        await transition.finished;
        // Post animation:
        // Remove the animation class
        projectBox.classList.remove("project-next");
      }

      // Set the current project object to the previous project object
      currProject = nextProject;
    });

  // load all skills
  let skillContainer = document.querySelector(".skills");
  skillContainer.removeChild(document.querySelector(".skill-box")); // removing template

  Skill.setLocation(skillFolder);
  const numberOfSkills = await Skill.getCount();
  let currSkill = new Skill();
  for (let i = 1; i <= numberOfSkills; i++) {
    await currSkill.load(i);
    skillContainer.appendChild(currSkill.getBox());
  }

  console.log("Page Loaded");
});
