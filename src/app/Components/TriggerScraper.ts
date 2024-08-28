"use server";
import https from "node:https";
import { JSDOM } from "jsdom";
import { Data } from "../../app/styles/common";

let data: Data[] = [];

export const initScraping = async () => {
  const request = https.request(
    {
      hostname: "news.ycombinator.com",
      port: 443,
      path: "/",
      method: "GET",
    },

    (result) => {
      let html = "";

      result.on("data", (dataBuffer) => {
        const partialHTML = dataBuffer.toString();
        html += partialHTML;
      });

      result.on("end", () => {
        // DO SOMETHING WITH THE HTML STRING

        // const contents = new DOMParser()
        //   .parseFromString(html, "text/html")
        // .querySelectorAll('score')
        // const titles = Array.prototype.filter.call(contents, ((elm, i)=>  {if(i== 1) return {...elm}}))
        // // const contents = [...html.matchAll(/ <tr class="athing" (.*?) <\/tr>/gm)].map(match =>match[1])
        // x = titles

        // const titles: string[] = [];
        // const points: string[] = [];
        // const comments: string[] = [];
        // const titleMatches =
        //   contents.window.document.getElementsByClassName("titleline");
        // const pointsMatches =
        //   contents.window.document.getElementsByClassName("score");
        // const commentsMatches =
        //   contents.window.document.getElementsByClassName("subline");

        //   const dataByID = [];

        // const getElementByHREF = (tag: string, href: string) => {
        //   if (!href) return null;
        //   var resolvedURL = resolveUri(href).toString();
        //   return getElementByValues(tag, getElementHREF, [href, resolvedURL]);
        // }

        const contents = new JSDOM(html);
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
            ?.getElementsByClassName("titleline")[0].firstChild?.textContent; //?.getElementsByClassName('titleline')[0]?.querySelector('a')?.textContent
          const points = Number(
            document
              .getElementById(`score_${item.id}`)
              ?.textContent?.split(" ")[0]
          );
          let comments;
          const commentTag = document
            .getElementsByClassName("subtext")
            [index]?.getElementsByTagName("a")[3];

          if (
            commentTag?.getAttribute("href")?.split("=")[1] ===
            item.id.toString()
          ) {
            comments = Number(
              commentTag?.textContent
                ?.replace(new RegExp(String.fromCharCode(160), "g"), " ")
                .split(" ")[0]
            );
          } else comments = 0; //Number(item.id) === Number(document.getElementsByClassName('score')[0]?.id) ? document.getElementsByClassName('score')[0].textContent : null  //?.getElementsByClassName('titleline')[0]?.querySelector('a')?.textContent
          data.push({
            number: index + 1,
            title: title ?? "No title",
            points: points ? points : 0,
            comments: comments ? comments : 0,
          });
        }

        // console.log(dataByID, "data");
        // data = dataByID ?? undefined

        // console.log(dataByID)

        // for (let i = 0; i <= 29; i++) {
        //   titles.push(
        //     titleMatches[Number(i)].querySelector("a")?.textContent ??
        //       "title not found"
        //   );
        //   points.push(
        //     pointsMatches[Number(i)]?.textContent ?? "points not found"
        //   );
        //   comments.push(
        //     commentsMatches[Number(i)]?.getElementsByTagName("a")[3]
        //       .textContent ?? "No comments"
        //   );
        // }

        // data = {
        //   title: title,
        //   points: points,
        //   comments: comments,
        // };

        // console.log(data, "resultado");
      });
    }
  );

  request.on("error", (error) => {
    console.error(error, "edl errorrrr");
  });

  request.end();

  return { data, timeStamp: new Date() };

  //--------------
  //  await fetch("https://news.ycombinator.com", { cache: "force-cache" })
  // .then(async(response) => {
  //   const body = await response.clone().text();

  //   console.log(body, "bodyyyyyyy"); // prints a chock full of HTML richness
  //   const contents = new JSDOM(body);
  //   const byids = contents.window.document.getElementsByClassName("athing");
  //   for (let item of byids) {
  //     const document = contents.window.document;

  //     const index =
  //       Number(
  //         document
  //           .getElementById(item.id)
  //           ?.getElementsByTagName("span")[0]
  //           .textContent?.replace(".", "")
  //       ) - 1;

  //     const title = document
  //       .getElementById(item.id)
  //       ?.getElementsByClassName("titleline")[0].firstChild?.textContent; //?.getElementsByClassName('titleline')[0]?.querySelector('a')?.textContent
  //     const points = document.getElementById(
  //       `score_${item.id}`
  //     )?.textContent; //Number(item.id) === Number(document.getElementsByClassName('score')[0]?.id) ? document.getElementsByClassName('score')[0].textContent : null  //?.getElementsByClassName('titleline')[0]?.querySelector('a')?.textContent
  //     let comments;
  //     const commentTag = document
  //       .getElementsByClassName("subtext")
  //       [index]?.getElementsByTagName("a")[3];

  //     if (
  //       commentTag?.getAttribute("href")?.split("=")[1] ===
  //       item.id.toString()
  //     ) {
  //       comments = commentTag?.textContent;
  //     } else comments = "0 comments"; //Number(item.id) === Number(document.getElementsByClassName('score')[0]?.id) ? document.getElementsByClassName('score')[0].textContent : null  //?.getElementsByClassName('titleline')[0]?.querySelector('a')?.textContent
  //     data.push({
  //       number: index + 1,
  //       title: title ?? "No title",
  //       points: points ?? "0 points",
  //       comments: comments ?? "No comments",
  //     });
  //   }
  // return data
  // })
  // .catch((error) => console.log(error));
};
