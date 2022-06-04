import { playerData } from "./paths.ts";
import type { PlayerData } from "./types/PlayerData.ts";
import { getPage } from "./util/getPage.ts";
import { components } from "./types/scoresaber.ts";

const difficulties = [
  "_Easy_SoloStandard",
  "_Normal_SoloStandard",
  "_Hard_SoloStandard",
  "_Expert_SoloStandard",
  "_ExpertPlus_SoloStandard",
];

export const getRankName = (percent: number) => {
  if (percent >= 90) return 6;
  if (percent >= 80) return 5;
  if (percent >= 65) return 4;
  if (percent >= 50) return 3;
  if (percent >= 35) return 2;
  if (percent >= 20) return 1;
  return 0;
};

export const main = async () => {
  const data = JSON.parse(await Deno.readTextFile(playerData)) as PlayerData;

  const page1 = await getPage(1);
  if (!page1) return;
  const scores = [...(page1.playerScores ?? [])];

  const setScore = ({
    score,
    leaderboard,
  }: components["schemas"]["PlayerScore"]) => {
    const index = data.localPlayers[0].levelsStatsData.findIndex(
      (level) =>
        level.levelId == `custom_level_${leaderboard.songHash.toUpperCase()}` &&
        level.difficulty ==
          difficulties.indexOf(leaderboard.difficulty.difficultyRaw)
    );
    if (index < 0)
      return data.localPlayers[0].levelsStatsData.push({
        beatmapCharacteristicName: "Standard",
        fullCombo: score.fullCombo,
        difficulty: difficulties.indexOf(leaderboard.difficulty.difficultyRaw),
        highScore: score.modifiedScore,
        playCount: 1,
        validScore: true,
        levelId: `custom_level_${leaderboard.songHash.toUpperCase()}`,
        maxCombo: score.maxCombo,
        maxRank: leaderboard.maxScore
          ? getRankName((score.modifiedScore / leaderboard.maxScore) * 100)
          : 0,
      });
    data.localPlayers[0].levelsStatsData[index].fullCombo = score.fullCombo;
    data.localPlayers[0].levelsStatsData[index].maxCombo = score.maxCombo;
    data.localPlayers[0].levelsStatsData[index].highScore = score.modifiedScore;
    data.localPlayers[0].levelsStatsData[index].maxRank = leaderboard.maxScore
      ? getRankName((score.modifiedScore / leaderboard.maxScore) * 100)
      : 0;
    data.localPlayers[0].levelsStatsData[index].validScore = true;
  };

  for (const i of page1.playerScores) {
    console.log(i.leaderboard.songName);
    setScore(i);
  }

  for (
    let i = 2;
    i < Math.ceil(page1.metadata.total / page1.metadata.itemsPerPage);
    ++i
  ) {
    const page = await getPage(i);
    console.log(`got page ${i}`);
    if (!page) break;
    for (const i of page.playerScores) {
      console.log(i.leaderboard.songName);
      setScore(i);
    }
  }

  await Deno.writeTextFile(playerData, JSON.stringify(data));
};
