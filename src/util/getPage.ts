import { components } from "../types/scoresaber.ts";

export const getPage = async (page: number) => {
  const url = new URL(
    `https://scoresaber.com/api/player/76561198101382389/scores`
  );
  url.searchParams.set("page", page.toString());

  const response = await fetch(url.toString());
  if (response.status == 200) {
    const data =
      (await response.json()) as components["schemas"]["PlayerScoreCollection"];
    return data;
  } else return null;
};
