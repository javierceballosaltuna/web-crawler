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
      const points = document.getElementById(`score_${item.id}`)?.textContent;
      let comments;
      const commentTag = document
        .getElementsByClassName("subtext")
        [index]?.getElementsByTagName("a")[3];

      if (
        commentTag?.getAttribute("href")?.split("=")[1] === item.id.toString()
      ) {
        comments = commentTag?.textContent;
      } else comments = "0 comments";
      data.push({
        number: index + 1,
        title: title ?? "No title",
        points: points ?? "0 points",
        comments: comments ?? "No comments",
      });
    }

    res.send(data);
  }
  if (!response.ok) {
    return response.statusText;
  }
};

export default getData;
