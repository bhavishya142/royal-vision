function BattingTable({ data }) {

    return (

        <div className="batting-table-card">

            <h3 className="batting-table-title">
                Batting Performance
            </h3>

            <div className="batting-table-wrapper">

                <table className="batting-table">

                    <thead>

                        <tr>

                            <th>Rank</th>

                            <th>Batter</th>

                            <th>Runs</th>

                            <th>4s</th>

                            <th>6s</th>

                            <th>Strike Rate</th>

                            <th>Average</th>

                        </tr>

                    </thead>


                    <tbody>

                        {data.map((player, index) => (

                            <tr key={player.batter}>

                                <td>
                                    {index + 1}
                                </td>

                                <td className="batting-player">

                                    {player.batter}

                                </td>

                                <td>
                                    {player.runs}
                                </td>

                                <td>
                                    {player.fours}
                                </td>

                                <td>
                                    {player.sixes}
                                </td>

                                <td>
                                    {player.strikeRate}
                                </td>

                                <td>
                                    {player.average}
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default BattingTable;