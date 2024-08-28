import { JSDOM } from "jsdom";

const getData = async (req: any, res: any) => {
  let data = [];
  const response = await fetch("https://news.ycombinator.com", {
    cache: "force-cache", //!revisar cache
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

    res.send(data);
  }
  if (!response.ok) {
    return response.statusText;
  }
};

export default getData;
