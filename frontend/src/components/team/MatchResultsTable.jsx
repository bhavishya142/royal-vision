function MatchResultsTable({ data, team }) {

    return (
        <div className="match-table-wrapper">

            <table className="match-table">

                <thead>
                    <tr>
                        <th>Season</th>
                        <th>Opponent</th>
                        <th>Venue</th>
                        <th>Result</th>
                    </tr>
                </thead>

                <tbody>

                    {data?.map((match, index) => {

                        const won =
                            match.winner === team;

                        return (
                            <tr key={index}>

                                <td className="season-cell">
                                    {match.season}
                                </td>

                                <td className="opponent-cell">
                                    {match.opponent}
                                </td>

                                <td className="venue-cell">
                                    {match.venue}
                                </td>

                                <td>

                                    <span
                                        className={
                                            won
                                                ? "result-badge result-win"
                                                : "result-badge result-loss"
                                        }
                                    >
                                        {won ? "WIN" : "LOSS"}
                                    </span>

                                </td>

                            </tr>
                        );

                    })}

                </tbody>

            </table>

        </div>
    );
}

export default MatchResultsTable;