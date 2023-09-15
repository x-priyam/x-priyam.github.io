class Page {
  pageContent;
  pageNumber;

  // To eliminate the need for a custom middleware server
  // We give all project files their name as numbers
  // We then use fetch API to keep opening files till we run into an error
  // A counter helps us get the number of files on the client side
  static async _getNumberOfPages(folderLocation) {
    let numberOfPages = 1;
    while (true) {
      let file = await fetch(folderLocation + numberOfPages + ".html");
      if (!file.ok) {
        // console.log("Number of Pages: " + numberOfPages)
        break;
      }
      numberOfPages += 1;
    }
    return numberOfPages - 1;
  }

  async _loadPageContent(pageFolder, pageNumber) {
    this.pageNumber = pageNumber;
    this.pageContent = new DOMParser().parseFromString(
      await (await fetch(pageFolder + pageNumber + ".html")).text(),
      "text/html"
    );
    // console.log("Block Read:");
    // console.log(pageContent);
  }
}

export { Page };
