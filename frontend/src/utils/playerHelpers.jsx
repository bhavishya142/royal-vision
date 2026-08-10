export function getPlayerImage(name) {

    const mapping = {

        "JC Buttler": "jos_buttler.png",
        "YS Chahal": "yuzi.png",
        "V Kohli": "virat.png",
        "RG Sharma": "rohitsharma.png",
        "DA Warner": "warner.png",
        "KL Rahul": "rahul.png",
        "Shubman Gill": "gill.png",
        "JJ Bumrah": "bumrah.png",
        "Mohammed Shami": "shami.png",
        "Mohammed Siraj": "siraj.png",
        "SP Narine": "narine.png",
        "AD Russell": "russel.png",
        "RD Gaikwad": "ruturaj.png",
        "Kuldeep Yadav": "kuldeep.png",
        "PJ Cummins": "cummins.png",
        "TM Head": "head.png",
        "Arshdeep Singh": "arsh.png",
        "JM Bairstow": "bairstow.png",
        "R Bishnoi": "bishnoi.png",
        "RA Jadeja": "jadeja.png",
        "YBK Jaiswal": "yashasvi.png",

    };

    return `/players/${mapping[name] || "default.png"}`;

}


export function getTeamLogo(team) {

    const mapping = {

        "Rajasthan Royals": "rr.png",
        "Mumbai Indians": "mi.png",
        "Chennai Super Kings": "csk.png",
        "Royal Challengers Bangalore": "rcb.png",
        "Kolkata Knight Riders": "kkr.png",
        "Delhi Capitals": "dc.png",
        "Punjab Kings": "pbks.png",
        "Sunrisers Hyderabad": "srh.png",
        "Lucknow Super Giants": "lsg.png",
        "Gujarat Titans": "gt.png"

    };

    return `/teams/${mapping[team] || "default.png"}`;
}

export function getPlayerRole(name) {

    const roles = {

        "JC Buttler": "Batter",
        "Yashasvi Jaiswal": "Batter",
        "Sanju Samson": "Wicketkeeper Batter",
        "Yuzvendra Chahal": "Bowler",

        "Virat Kohli": "Batter",
        "Rohit Sharma": "Batter",
        "KL Rahul": "Wicketkeeper Batter",
        "Shubman Gill": "Batter",

        "Jasprit Bumrah": "Bowler",
        "Mohammed Shami": "Bowler",
        "Mohammed Siraj": "Bowler",
        "Kuldeep Yadav": "Bowler",
        "Ravi Bishnoi": "Bowler",

        "Ravindra Jadeja": "All-Rounder",
        "Andre Russell": "All-Rounder",
        "Sunil Narine": "All-Rounder",

        "Ruturaj Gaikwad": "Batter",
        "Pat Cummins": "Bowler",
        "Travis Head": "Batter",
        "Arshdeep Singh": "Bowler",
        "Jonny Bairstow": "Wicketkeeper Batter",
        "David Warner": "Batter"

    };

    return roles[name] || "Player";
}