import { JSDOM } from "jsdom";
import { NextApiRequest, NextApiResponse } from "next";

const findScrapData = async (req: NextApiRequest, res: NextApiResponse) => {
  //Declare data variable to insert the first 30 results on it with the fields we are interested on
  let data = [];
  //GET request to external URL provided
  const response = await fetch("https://news.ycombinator.com", {
    cache: "default",
  });
  //When successful:
  if (response.ok) {

    //Convert response to String and then transform it using JSDOM to an object with all Tags within HTML 
    const body = await response.text();
    const contents = new JSDOM(body);

    //Filter all HTML elements by ClassName "athing" which is the Class to identify each of the table-results on the external URL
    const filteredByClassName = contents.window.document.getElementsByClassName("athing");

    //Iterate on each one of them to manipulate DOM and extract the values of each field we are interested on, as follos:
    //title, points and comments
    for (let item of filteredByClassName) {
      const document = contents.window.document;
      const index =
        Number(
          document
            .getElementById(item.id)
            ?.getElementsByTagName("span")[0]
            .textContent?.replace(".", "")
        ) - 1;

      let title = document
        .getElementById(item.id)
        ?.getElementsByClassName("titleline")[0].firstChild?.textContent;
      const points = Number(
        document.getElementById(`score_${item.id}`)?.textContent?.split(" ")[0]
      );
      let comments;
      const commentTag = document
        .getElementsByClassName("subtext")
        [index]?.getElementsByTagName("a")[3];

      if (
        commentTag?.getAttribute("href")?.split("=")[1] === item.id.toString()
      ) {
        comments = Number(
          commentTag?.textContent
            ?.replace(new RegExp(String.fromCharCode(160), "g"), " ")
            .split(" ")[0] 
        );
      } else comments = 0;
       title = title?.replaceAll(/\W\s\:/g, '')

      // Insert each result with the desired format on our previously declared "data" variable
      data.push({
        number: index + 1,
        title: title ?? "No title",
        points: points ? points : 0,
        comments: comments ? comments : 0,
      });
    }

    let dataFiltered = data;

    //Filtering which will be executed depending on we have filters on the request headers or not. 
    const filter = async (filterSelected: string) => {

      //filtering titles with >5words and order by comments (decided to do it descendant)
      if (filterSelected === ">5words") {
        const strRegex = "[^A-Za-z0-9]";

        dataFiltered = dataFiltered?.filter((elm, i) => {
          return elm.title ? elm.title.split(" ").length > 5 : false;
        });
        dataFiltered = dataFiltered?.sort((a, b) => {
          const aComments: number = a.comments ?? 0;
          const bComments: number = b.comments ?? 0;
          if (aComments < bComments) {
            return +1;
          }
          if (aComments > bComments) {
            return -1;
          }

          return 0;
        });
      }

      //filtering titles with <5words and order by points (decided to do it descendant)
      if (filterSelected === "<5words") {
        //   const strRegex = "[^A-Za-z0-9]";

        dataFiltered = dataFiltered?.filter((elm, i) => {
          return elm.title ? elm.title.split(" ").length <= 5 : false;
        });
        dataFiltered = dataFiltered?.sort((a, b) => {
          const aPoints: number = a.points ?? 0;
          const bPoints: number = b.points ?? 0;
          if (aPoints < bPoints) {
            return +1;
          }
          if (aPoints > bPoints) {
            return -1;
          }

          return 0;
        });
      }
      //When clearing filters, return original not filtered data
      if (filterSelected === "reset") dataFiltered = data;

      res.send([
        dataFiltered,

      // Here is where we add Usage data to the request response
        {
          timeStamp: new Date(),
          filterApplied: filterSelected === "reset" ? "None" : filterSelected,
          ipAddress: req?.headers["x-forwarded-for"],
        },
      ]);
    };
    if (req.headers.filters) filter(req.headers.filters as string);

    //if there are no filters, simply return data plus Usage data
    if (!req.headers.filters)
      res.send([
        data,
        {
          timeStamp: new Date(),
          filterApplied: "None",
          ipAddress: req?.headers["x-forwarded-for"],
        },
      ]);
  }
  if (!response.ok) {
    return response.statusText;
  }
};

export default findScrapData;
