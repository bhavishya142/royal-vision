// const pool = require("../config/db");

// const getBatters = async (req, res) => {
//   try {
//     const result = await pool.query(`
//     SELECT
//         f.player_id,
//         f.player_name,
//         p.team_name,
//         f.performance_score,
//         f.consistency_score,
//         f.final_score,
//         f.pressure_matches,
//         f.positive_matches
//     FROM public.superr_batter_final_70_30 f
//     INNER JOIN public.superr_players p
//         ON f.player_id = p.player_id
//        AND p.comp_id = 3298
//     ORDER BY f.final_score DESC
//     LIMIT 10;
// `);

//     res.json(result.rows);
//   } catch (error) {
//     console.error("Error fetching SupeRR batters:", error);
//     res.status(500).json({ error: "Failed to fetch batter analytics" });
//   }
// };

// const getBowlers = async (req, res) => {
//   try {
//     const result = await pool.query(`
//     SELECT
//         f.player_id,
//         f.player_name,
//         p.team_name,
//         f.performance_score,
//         f.consistency_score,
//         f.final_score,
//         f.pressure_matches,
//         f.positive_matches
//     FROM public.superr_bowler_final_70_30 f
//     INNER JOIN public.superr_players p
//         ON f.player_id = p.player_id
//        AND p.comp_id = 3298
//     ORDER BY f.final_score DESC
//     LIMIT 10;
// `);
//     res.json(result.rows);
//   } catch (error) {
//     console.error("Error fetching SupeRR bowlers:", error);
//     res.status(500).json({ error: "Failed to fetch bowler analytics" });
//   }
// };

// module.exports = {
//   getBatters,
//   getBowlers
// };
const getBatters = async (req, res) => {
  const batters = [
    {
      player_name: "Suryakumar Yadav",
      team_name: "Mumbai Indians",
      performance_score: 60.613739,
      consistency_score: 60.9756,
      final_score: 60.7223,
      pressure_matches: 41,
      positive_matches: 25
    },
    {
      player_name: "Shashank Singh",
      team_name: "Punjab Kings",
      performance_score: 53.678943,
      consistency_score: 76.9231,
      final_score: 60.652183,
      pressure_matches: 26,
      positive_matches: 20
    },
    {
      player_name: "Tristan Stubbs",
      team_name: "Delhi Capitals",
      performance_score: 55.358533,
      consistency_score: 69.4444,
      final_score: 59.584307,
      pressure_matches: 36,
      positive_matches: 25
    },
    {
      player_name: "Sanju Samson",
      team_name: "Chennai Super Kings",
      performance_score: 52.463737,
      consistency_score: 73.0769,
      final_score: 58.647692,
      pressure_matches: 26,
      positive_matches: 19
    },
    {
      player_name: "Tim David",
      team_name: "Royal Challengers Bengaluru",
      performance_score: 53.714294,
      consistency_score: 66.6667,
      final_score: 57.600006,
      pressure_matches: 45,
      positive_matches: 30
    },
    {
      player_name: "Marcus Stoinis",
      team_name: "Punjab Kings",
      performance_score: 51.362119,
      consistency_score: 65.7895,
      final_score: 55.690325,
      pressure_matches: 38,
      positive_matches: 25
    },
    {
      player_name: "Nicholas Pooran",
      team_name: "Lucknow Super Giants",
      performance_score: 52.233286,
      consistency_score: 59.0909,
      final_score: 54.290573,
      pressure_matches: 44,
      positive_matches: 26
    },
    {
      player_name: "Tilak Varma",
      team_name: "Mumbai Indians",
      performance_score: 51.438612,
      consistency_score: 60.7143,
      final_score: 54.221314,
      pressure_matches: 56,
      positive_matches: 34
    },
    {
      player_name: "Rinku Singh",
      team_name: "Kolkata Knight Riders",
      performance_score: 50.917199,
      consistency_score: 58.4906,
      final_score: 53.189209,
      pressure_matches: 53,
      positive_matches: 31
    },
    {
      player_name: "Jos Buttler",
      team_name: "Gujarat Titans",
      performance_score: 62.256763,
      consistency_score: 51.85,
      final_score: 59.13,
      pressure_matches: 27,
      positive_matches: 14
    }
  ];

  res.json(batters);
};

const getBowlers = async (req, res) => {
  const bowlers = [
    {
      player_name: "Rashid Khan",
      team_name: "Gujarat Titans",
      performance_score: 67.557092,
      consistency_score: 53.6585,
      final_score: 63.387525,
      pressure_matches: 82,
      positive_matches: 44
    },
    {
      player_name: "Mitchell Santner",
      team_name: "Mumbai Indians",
      performance_score: 63.011985,
      consistency_score: 55.814,
      final_score: 60.852576,
      pressure_matches: 43,
      positive_matches: 24
    },
    {
      player_name: "Jasprit Bumrah",
      team_name: "Mumbai Indians",
      performance_score: 66.291858,
      consistency_score: 44.4444,
      final_score: 59.737634,
      pressure_matches: 63,
      positive_matches: 28
    },
    {
      player_name: "Sunil Narine",
      team_name: "Kolkata Knight Riders",
      performance_score: 54.244952,
      consistency_score: 65.8537,
      final_score: 57.727564,
      pressure_matches: 41,
      positive_matches: 27
    },
    {
      player_name: "Matheesha Pathirana",
      team_name: "Kolkata Knight Riders",
      performance_score: 56.755077,
      consistency_score: 54.3478,
      final_score: 56.032901,
      pressure_matches: 46,
      positive_matches: 25
    },
    {
      player_name: "Adam Zampa",
      team_name: "Punjab Kings",
      performance_score: 56.046357,
      consistency_score: 55.5556,
      final_score: 55.899116,
      pressure_matches: 36,
      positive_matches: 20
    },
    {
      player_name: "Yuzvendra Chahal",
      team_name: "Punjab Kings",
      performance_score: 56.585412,
      consistency_score: 46.2687,
      final_score: 53.490385,
      pressure_matches: 67,
      positive_matches: 31
    },
    {
      player_name: "Arshdeep Singh",
      team_name: "Punjab Kings",
      performance_score: 55.208922,
      consistency_score: 44.5312,
      final_score: 52.00562,
      pressure_matches: 128,
      positive_matches: 57
    },
    {
      player_name: "Varun Chakravarthy",
      team_name: "Kolkata Knight Riders",
      performance_score: 54.194056,
      consistency_score: 41.8182,
      final_score: 50.481293,
      pressure_matches: 55,
      positive_matches: 23
    },
    {
      player_name: "Jacob Duffy",
      team_name: "Royal Challengers Bengaluru",
      performance_score: 42.517154,
      consistency_score: 52.94,
      final_score: 45.64,
      pressure_matches: 17,
      positive_matches: 9
    }
  ];

  res.json(bowlers);
};

module.exports = {
  getBatters,
  getBowlers
};