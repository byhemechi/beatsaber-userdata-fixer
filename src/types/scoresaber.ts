export interface paths {
  "/api/leaderboards": {
    get: {
      parameters: {
        query: {
          search?: string;
          /** Filter by verified (⚠️️deprecation notice) */
          verified?: boolean;
          /** Filter by ranked */
          ranked?: boolean;
          /** Filter by qualified */
          qualified?: boolean;
          /** Filter by loved */
          loved?: boolean;
          /** Filter by minimum star value */
          minStar?: number;
          /** Filter by maxiumum star value */
          maxStar?: number;
          /** Which category to sort by (0 = trending, date ranked = 1, scores set = 2, star difficulty = 3, author = 4) */
          category?: number;
          /** Which direction to sort (0 = descending, 1 = ascending) */
          sort?: number;
          /** Only return one leaderboard of each id */
          unique?: boolean;
          page?: number;
          /** (default true) */
          withMetadata?: boolean;
        };
      };
      responses: {
        /** A list of leaderboards */
        200: {
          content: {
            "application/json": components["schemas"]["LeaderboardInfoCollection"];
          };
        };
        /** Invalid parameter */
        422: unknown;
      };
    };
  };
  "/api/leaderboard/by-id/{leaderboardId}/info": {
    get: {
      parameters: {
        path: {
          /** ScoreSaber leaderboardId */
          leaderboardId: number;
        };
      };
      responses: {
        /** Leaderboard information */
        200: {
          content: {
            "application/json": components["schemas"]["LeaderboardInfo"];
          };
        };
        /** Not found */
        404: unknown;
      };
    };
  };
  "/api/leaderboard/by-hash/{hash}/info": {
    get: {
      parameters: {
        path: {
          /** Map hash */
          hash: string;
        };
        query: {
          /** (1 = Easy, 3 = Normal, 5 = Hard, 7 = Expert, 9 = Expert+) */
          difficulty: number;
          /** (e.g SoloStandard) */
          gameMode?: string;
        };
      };
      responses: {
        /** Leaderboard information */
        200: {
          content: {
            "application/json": components["schemas"]["LeaderboardInfo"];
          };
        };
        /** Not found */
        404: unknown;
      };
    };
  };
  "/api/leaderboard/by-id/{leaderboardId}/scores": {
    get: {
      parameters: {
        path: {
          /** ScoreSaber leaderboardId */
          leaderboardId: number;
        };
        query: {
          /** Filter by ISO 3166-1 alpha-2 code (comma delimitered) */
          countries?: string;
          search?: string;
          page?: number;
          /** (default true) */
          withMetadata?: boolean;
        };
      };
      responses: {
        /** A colleciton of Score */
        200: {
          content: {
            "application/json": components["schemas"]["ScoreCollection"][];
          };
        };
        /** Not found */
        404: unknown;
      };
    };
  };
  "/api/leaderboard/by-hash/{hash}/scores": {
    get: {
      parameters: {
        path: {
          /** Map hash */
          hash: string;
        };
        query: {
          /** (1 = Easy, 3 = Normal, 5 = Hard, 7 = Expert, 9 = Expert+) */
          difficulty: number;
          /** Filter by ISO 3166-1 alpha-2 code (comma delimitered) */
          countries?: string;
          search?: string;
          page?: number;
          /** (e.g SoloStandard) */
          gameMode?: string;
          /** (default true) */
          withMetadata?: boolean;
        };
      };
      responses: {
        /** A collection of Score */
        200: {
          content: {
            "application/json": components["schemas"]["ScoreCollection"][];
          };
        };
        /** Not found */
        404: unknown;
      };
    };
  };
  "/api/leaderboard/get-difficulties/{hash}": {
    get: {
      parameters: {
        path: {
          /** Map hash */
          hash: string;
        };
      };
      responses: {
        /** An Array of Difficulty */
        200: {
          content: {
            "application/json": components["schemas"]["Difficulty"][];
          };
        };
        /** Not found */
        404: unknown;
      };
    };
  };
  "/api/players": {
    get: {
      parameters: {
        query: {
          search?: string;
          page?: number;
          /** Filter by ISO 3166-1 alpha-2 code (comma delimitered) */
          countries?: string;
          /** (default true) */
          withMetadata?: boolean;
        };
      };
      responses: {
        /** A collection of Player */
        200: {
          content: {
            "application/json": components["schemas"]["PlayerCollection"][];
          };
        };
        /** Not found */
        404: unknown;
      };
    };
  };
  "/api/players/count": {
    get: {
      parameters: {
        query: {
          search?: string;
          /** Filter by ISO 3166-1 alpha-2 code (comma delimitered) */
          countries?: string;
        };
      };
      responses: {
        /** OK */
        200: {
          content: {
            "text/plain": number;
          };
        };
        /** Not found */
        404: unknown;
      };
    };
  };
  "/api/player/{playerId}/basic": {
    get: {
      parameters: {
        path: {
          playerId: number;
        };
      };
      responses: {
        /** OK */
        200: {
          content: {
            "application/json": components["schemas"]["Player"][];
          };
        };
        /** Not found */
        404: unknown;
      };
    };
  };
  "/api/player/{playerId}/full": {
    get: {
      parameters: {
        path: {
          playerId: number;
        };
      };
      responses: {
        /** OK */
        200: {
          content: {
            "application/json": components["schemas"]["Player"][];
          };
        };
        /** Not found */
        404: unknown;
      };
    };
  };
  "/api/player/{playerId}/scores": {
    get: {
      parameters: {
        path: {
          playerId: string;
        };
        query: {
          /** The amount of scores to return */
          limit?: number;
          sort?: "top" | "recent";
          /** Page */
          page?: number;
          /** (default true) */
          withMetadata?: boolean;
        };
      };
      responses: {
        /** A collection of PlayerScore */
        200: {
          content: {
            "application/json": components["schemas"]["PlayerScoreCollection"][];
          };
        };
        /** Not found */
        404: unknown;
      };
    };
  };
  "/api/user/{playerId}/refresh": {
    get: {
      parameters: {
        path: {
          playerId: number;
        };
      };
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/api/user/@me": {
    get: {
      responses: {
        /** OK */
        200: {
          content: {
            "application/json": components["schemas"]["UserData"][];
          };
        };
        /** Not logged in */
        401: unknown;
      };
    };
  };
  "/api/user/quest-key": {
    get: {
      responses: {
        /** The quest key */
        200: {
          content: {
            "text/plain": string;
          };
        };
        /** Not logged in */
        401: unknown;
      };
    };
  };
  "/api/ranking/requests/top": {
    get: {
      responses: {
        /** An Array of RankRequestListing */
        200: {
          content: {
            "application/json": components["schemas"]["RankRequestListing"][];
          };
        };
      };
    };
  };
  "/api/ranking/requests/belowTop": {
    get: {
      responses: {
        /** An Array of RankRequestListing */
        200: {
          content: {
            "application/json": components["schemas"]["RankRequestListing"][];
          };
        };
      };
    };
  };
  "/api/ranking/request/{requestId}": {
    get: {
      parameters: {
        path: {
          requestId: number;
        };
      };
      responses: {
        /** Rank request information */
        200: {
          content: {
            "application/json": components["schemas"]["RankRequestInformation"];
          };
        };
        /** Not found */
        404: unknown;
      };
    };
  };
  "/api/ranking/request/by-id/{leaderboardId}": {
    get: {
      parameters: {
        path: {
          /** ScoreSaber leaderboardId */
          leaderboardId: number;
        };
      };
      responses: {
        /** Rank request information */
        200: {
          content: {
            "application/json": components["schemas"]["RankRequestInformation"];
          };
        };
        /** Not found */
        404: unknown;
      };
    };
  };
  "/api/ranking/request/action/rt/create": {
    post: {
      responses: {
        /** The created requestId */
        200: {
          content: {
            "text/plain": number;
          };
        };
        /** You don't have permission to view this! */
        403: unknown;
      };
      requestBody: {
        content: {
          "application/x-www-form-urlencoded": components["schemas"]["rt_create_body"];
        };
      };
    };
  };
  "/api/ranking/request/action/rt/vote": {
    post: {
      responses: {
        /** OK */
        200: unknown;
        /** You don't have permission to view this! */
        403: unknown;
      };
      requestBody: {
        content: {
          "application/x-www-form-urlencoded": components["schemas"]["rt_vote_body"];
        };
      };
    };
  };
  "/api/ranking/request/action/rt/comment": {
    post: {
      responses: {
        /** OK */
        200: unknown;
        /** You don't have permission to view this! */
        403: unknown;
      };
      requestBody: {
        content: {
          "application/x-www-form-urlencoded": components["schemas"]["rt_comment_body"];
        };
      };
    };
  };
  "/api/ranking/request/action/qat/vote": {
    post: {
      responses: {
        /** OK */
        200: unknown;
        /** You don't have permission to view this! */
        403: unknown;
      };
      requestBody: {
        content: {
          "application/x-www-form-urlencoded": components["schemas"]["qat_vote_body"];
        };
      };
    };
  };
  "/api/ranking/request/action/qat/comment": {
    post: {
      responses: {
        /** OK */
        200: unknown;
        /** You don't have permission to view this! */
        403: unknown;
      };
      requestBody: {
        content: {
          "application/x-www-form-urlencoded": components["schemas"]["qat_comment_body"];
        };
      };
    };
  };
  "/api/ranking/request/action/nat/replace": {
    post: {
      responses: {
        /** OK */
        200: unknown;
        /** You don't have permission to view this! */
        403: unknown;
      };
      requestBody: {
        content: {
          "application/x-www-form-urlencoded": components["schemas"]["nat_replace_body"];
        };
      };
    };
  };
  "/api/ranking/request/action/nat/qualify": {
    post: {
      responses: {
        /** OK */
        200: unknown;
        /** You don't have permission to view this! */
        403: unknown;
      };
      requestBody: {
        content: {
          "application/x-www-form-urlencoded": components["schemas"]["nat_qualify_body"];
        };
      };
    };
  };
  "/api/ranking/request/action/nat/deny": {
    post: {
      responses: {
        /** OK */
        200: unknown;
        /** You don't have permission to view this! */
        403: unknown;
      };
      requestBody: {
        content: {
          "application/x-www-form-urlencoded": components["schemas"]["nat_deny_body"];
        };
      };
    };
  };
}

export interface components {
  schemas: {
    Metadata: {
      total: number;
      page: number;
      itemsPerPage: number;
    };
    LeaderboardInfo: {
      id: number;
      songHash: string;
      songName: string;
      songSubName: string;
      songAuthorName: string;
      levelAuthorName: string;
      difficulty: components["schemas"]["Difficulty"];
      maxScore: number;
      /** Format: date-time */
      createdDate: string;
      rankedDate: string | (unknown | null);
      qualifiedDate: string | (unknown | null);
      lovedDate: string | (unknown | null);
      ranked: boolean;
      qualified: boolean;
      loved: boolean;
      maxPP: number;
      stars: number;
      positiveModifiers: boolean;
      plays: number;
      dailyPlays: number;
      coverImage: string;
      playerScore: components["schemas"]["Score"] | (unknown | null);
      difficulties: components["schemas"]["Difficulty"][];
    } & {
      difficultyRaw: unknown;
    };
    LeaderboardInfoCollection: {
      leaderboards: components["schemas"]["LeaderboardInfo"][];
      metadata: components["schemas"]["Metadata"];
    };
    LeaderboardPlayer: {
      id: string;
      name: string;
      profilePicture: string;
      country: string;
      permissions: number;
      role: string;
    };
    Difficulty: {
      leaderboardId: number;
      difficulty: number;
      gameMode: string;
      difficultyRaw: string;
    };
    ScoreCollection: {
      scores: components["schemas"]["Score"][];
      metadata: components["schemas"]["Metadata"];
    };
    Score: {
      id: number;
      leaderboardPlayerInfo?: components["schemas"]["LeaderboardPlayer"];
      rank: number;
      baseScore: number;
      modifiedScore: number;
      pp: number;
      weight: number;
      modifiers: string;
      multiplier: number;
      badCuts: number;
      missedNotes: number;
      maxCombo: number;
      fullCombo: boolean;
      hmd: number;
      hasReplay: boolean;
      /** Format: date-time */
      timeSet: string;
    };
    PlayerCollection: {
      players: components["schemas"]["Player"][];
      metadata: components["schemas"]["Metadata"];
    };
    Player: {
      id: string;
      name: string;
      profilePicture: string;
      country: string;
      pp: number;
      rank: number;
      countryRank: number;
      role: string;
      badges: components["schemas"]["Badge"][] | (unknown | null);
      histories: string;
      scoreStats: components["schemas"]["ScoreStats"] | (unknown | null);
      permissions: number;
      banned: boolean;
      inactive: boolean;
    };
    ScoreStats: {
      totalScore: number;
      totalRankedScore: number;
      averageRankedAccuracy: number;
      totalPlayCount: number;
      rankedPlayCount: number;
      replaysWatched: number;
    };
    Badge: {
      description: string;
      image: string;
    };
    PlayerScoreCollection: {
      playerScores: components["schemas"]["PlayerScore"][];
      metadata: components["schemas"]["Metadata"];
    };
    PlayerScore: {
      score: components["schemas"]["Score"];
      leaderboard: components["schemas"]["LeaderboardInfo"];
    };
    VoteGroup: {
      upvotes: number;
      downvotes: number;
      myVote: boolean;
      neutral?: number;
    };
    RankRequestListing: {
      requestId: number;
      weight: number;
      leaderboardInfo: components["schemas"]["LeaderboardInfo"];
      created_at: string;
      totalRankVotes: components["schemas"]["VoteGroup"];
      totalQATVotes: components["schemas"]["VoteGroup"];
      difficultyCount: number;
    };
    RankRequestInformation: {
      requestId: number;
      requestDescription: string;
      leaderboardInfo: components["schemas"]["LeaderboardInfo"];
      created_at: string;
      rankVotes: components["schemas"]["VoteGroup"];
      qatVotes: components["schemas"]["VoteGroup"];
      rankComments: components["schemas"]["Comment"][];
      qatComments: components["schemas"]["Comment"][];
      requestType: number;
      approved: number;
      difficulties: components["schemas"]["RankingDifficulty"][];
    };
    RankingDifficulty: {
      requestId: number;
      difficulty: number;
    };
    Comment: {
      username: string;
      userId: string;
      comment: string;
      timeStamp: string;
    };
    UserData: {
      playerId: string;
      permissions: number;
      questKey: string;
    };
    rt_create_body: {
      leaderboardId: string;
      /** @description (0 = unrank, 1 rank) */
      requestType: number;
      description: string;
    };
    rt_vote_body: {
      requestId: string;
      /** @description (0 = down, 1 up) */
      vote: number;
    };
    rt_comment_body: {
      requestId: string;
      comment?: string;
    } & {
      vote: unknown;
    };
    qat_vote_body: {
      requestId: string;
      /** @description (0 = down, 1 up, 2 = neutral) */
      vote: number;
    };
    qat_comment_body: {
      requestId: string;
      comment?: string;
    } & {
      vote: unknown;
    };
    nat_replace_body: {
      /** @description The requestId affected */
      requestId: number;
      /** @description The leaderboardId to replace the current requests leaderboardId */
      leaderboardId: number;
      /** @description An updated description */
      description: string;
    };
    nat_qualify_body: {
      requestId: number;
    };
    nat_deny_body: {
      requestId: number;
    };
  };
}

export interface operations {}

export interface external {}
