class Page {
  static numberOfPages;
  static pageLocation;
  pageContent;
  pageNumber;

  // To eliminate the need for a custom middleware server
  // We give all project files their name as numbers
  // We then use fetch API to keep opening files till we run into an error
  // A counter helps us get the number of files on the client side
  static async setNumberOfPages(location) {
    Page.pageLocation = location;
    // console.log("Page Location: " + Page.pageLocation);
    let pageNumber = 1;
    while (true) {
      let file = await fetch(Page.pageLocation + pageNumber + ".html");
      if (!file.ok) {
        // console.log("Number of Pages: " + pageNumber)
        break;
      }
      pageNumber += 1;
    }
    this.numberOfPages = pageNumber - 1;
  }

  static async build(pageNumber) {
    let pageContent = new DOMParser().parseFromString(
      await (await fetch(Page.pageLocation + pageNumber + ".html")).text(),
      "text/html"
    );
    // console.log("Block Read:");
    // console.log(pageContent);
    return { pageNumber, pageContent };
  }

  constructor({ pageNumber, pageContent }) {
    this.pageNumber = pageNumber;
    this.pageContent = pageContent;
  }
}

export { Page };
