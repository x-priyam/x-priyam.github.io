import { Page } from "./pages.js";

class Project extends Page {
  getProjectBox() {
    return this.pageContent.querySelector(".project-box");
  }

  async next() {
    if (this.pageNumber == Project.numberOfPages) {
      // console.log("Going from last project to first")
      return await Project.build(1);
    }
    return await Project.build(this.pageNumber + 1);
  }

  async prev() {
    if (this.pageNumber == 1) {
      // console.log("Going from first project to last")
      return await Project.build(Project.numberOfPages);
    }
    return await Project.build(this.pageNumber - 1);
  }
}

export { Project };
