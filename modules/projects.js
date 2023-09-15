import { Page } from "./pages.js";

class Project extends Page {
  static #folderLocation;

  static setLocation(folderLocation) {
    Project.#folderLocation = folderLocation;
  }

  static async getCount() {
    return await Page._getNumberOfPages(Project.#folderLocation);
  }

  async load(projectNumber) {
    await this._loadPageContent(Project.#folderLocation, projectNumber);
  }

  getBox() {
    return this.pageContent.querySelector(".project-box");
  }
}

export { Project };
