import { Page } from "./pages.js";

class Skill extends Page {
  getSkillBox() {
    return this.pageContent.querySelector(".skill-box");
  }

  async next() {
    if (this.pageNumber == Project.numberOfPages) {
      throw new Error("Going beyond Limit");
    }
    return await Project.build(this.pageNumber + 1);
  }

  async prev() {
    if (this.pageNumber == 1) {
      throw new Error("Going beyond Limit");
    }
    return await Project.build(this.pageNumber - 1);
  }
}

export { Skill };
