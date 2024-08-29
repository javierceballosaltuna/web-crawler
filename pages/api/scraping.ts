import { JSDOM } from "jsdom";
import { NextApiRequest, NextApiResponse } from "next";

const getData = async (req: NextApiRequest, res: NextApiResponse) => {
  let data = [];
  const response = await fetch("https://news.ycombinator.com", {
    cache: "default",
  });

  if (response.ok) {
    const body = await response.text();
    const contents = new JSDOM(body);
    const byids = contents.window.document.getElementsByClassName("athing");

    for (let item of byids) {
      const document = contents.window.document;
      const index =
        Number(
          document
            .getElementById(item.id)
            ?.getElementsByTagName("span")[0]
            .textContent?.replace(".", "")
        ) - 1;

      const title = document
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
      data.push({
        number: index + 1,
        title: title ?? "No title",
        points: points ? points : 0,
        comments: comments ? comments : 0,
      });
    }

    let dataFiltered = data;
    const filter = async (filterSelected: string) => {
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
      if (filterSelected === "reset") dataFiltered = data;

      res.send([
        dataFiltered,
        {
          timeStamp: new Date(),
          filterApplied: filterSelected === "reset" ? "None" : filterSelected,
          ipAddress: req?.headers["x-forwarded-for"],
        },
      ]);
    };
    if (req.headers.filters) filter(req.headers.filters as string);

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

export default getData;
