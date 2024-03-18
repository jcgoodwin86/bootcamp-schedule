import puppeteer from "puppeteer";
import fs from "fs";

// Constants
const SCRAPING_URL = "https://scrimba.com/learn/frontend";
const RESULTS_FILE_PATH = "results.json";

const getQuotes = async () => {
  // Start a Puppeteer session with:
  // - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
  // - no default viewport (`defaultViewport: null` - website page will in full width and height)
  try {
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
    });

    // Open a new page
    const page = await browser.newPage();

    // Listen for console logs in the page context
    page.on("console", (message) => {
      console.log(`From page console: ${message.text()}`);
    });

    // On this new page:
    // - open the website
    // - wait until the dom content is loaded (HTML is ready)
    await page.goto(SCRAPING_URL, {
      waitUntil: "domcontentloaded",
    });

    const results = await page.evaluate(() => {
      function getModule(moduleEle) {
        // Head element contains the title and meta data
        const headElement = moduleEle.querySelector(".head");
        const moduleTitle = headElement.querySelector(".name").textContent;
        const moduleMetaData = headElement.querySelector(".meta").textContent;
        const [_, lessonCount, duration] = moduleMetaData
          .split(/–|-/)
          .map((part) => part.trim());
        // Extract before and after data to get the module number
        const targetElement = moduleEle.querySelector(".bullet");
        const beforeData = window
          .getComputedStyle(targetElement, ":before")
          .getPropertyValue("content");
        const afterData = window
          .getComputedStyle(targetElement, ":after")
          .getPropertyValue("content");

        // Combine before and after data and remove the quotes
        const combinedData =
          beforeData.replace(/['"]/g, "") + afterData.replace(/['"]/g, "");

        // Extract data from playlist element
        const playlistElement = moduleEle.querySelector("playlist-list");
        const chapters = Array.from(
          playlistElement.querySelectorAll(".list")
        ).map((chapter, index) => {
          console.log(chapter);
          return getChapter(chapter);
        });

        return {
          title: moduleTitle,
          module: combinedData,
          totalLessons: lessonCount,
          totalTime: duration,
          id: crypto.randomUUID(),
          chapters: chapters,
        };
      }

      function getChapter(chapterEle) {
        const chapterTitle = chapterEle.querySelector(".name").textContent;
        console.log(chapterTitle);
        const chapterMetaData = chapterEle.querySelector("p.small");
        console.log(chapterMetaData);
        const chapterLessonCount =
          chapterMetaData.childNodes[0].nodeValue.trim(); // Get the text node
        console.log(chapterLessonCount);
        const totalChapterTime = chapterMetaData
          .querySelector("span")
          .textContent.trim(); // Get the span text
        console.log(totalChapterTime);
        return {
          title: chapterTitle,
          totalLessons: chapterLessonCount,
          totalTime: totalChapterTime,
          id: crypto.randomUUID(),
          lessons: getLessons(chapterEle.querySelector(".children")),
        };
      }

      function getLessons(data) {
        return Array.from(data.children).map((lesson, index) => {
          const lessonTitle = lesson.querySelector(".content").textContent;
          const lessonTime = lesson.querySelector(".meta").textContent;

          // Return an object for each lesson
          return {
            title: lessonTitle,
            time: lessonTime,
            id: crypto.randomUUID(),
          };
        });
      }

      const moduleListEle = document.querySelectorAll("course-module");
      const data = Array.from(moduleListEle).map((module, index) => {
        return getModule(module);
      });

      // Return the extracted data
      return data;
    });

    // Close the browser
    await browser.close();

    const json = JSON.stringify(results, null, 2);

    // Write JSON string to a file
    fs.writeFile(RESULTS_FILE_PATH, json, (err) => {
      if (err) {
        console.error("Error writing file", err);
      } else {
        console.log("Successfully wrote file");
      }
    });
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Done");
  }
};

// Start the scraping
getQuotes();
