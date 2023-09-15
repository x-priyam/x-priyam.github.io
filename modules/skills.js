import { Page } from "./pages.js";

class Skill extends Page {
  static #folderLocation;

  static setLocation(folderLocation) {
    Skill.#folderLocation = folderLocation;
  }

  static async getCount() {
    return await Skill._getNumberOfPages(Skill.#folderLocation);
  }

  async load(skillNumber) {
    await this._loadPageContent(Skill.#folderLocation, skillNumber);
  }

  getBox() {
    return this.pageContent.querySelector(".skill-box");
  }
}

export { Skill };
