import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Overview from "./pages/Overview";
import Team from "./pages/Team";
import Batting from "./pages/Batting";
import Bowling from "./pages/Bowling";
import Venue from "./pages/Venue";
import Players from "./pages/Player";

function App() {
    return (
        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Navigate to="/overview" replace />}
                />

                <Route
                    path="/overview"
                    element={<Overview />}
                />

                <Route
                    path="/team"
                    element={<Team />}
                />

                <Route
                    path="/players"
                    element={<Players />}
                />

                <Route
                    path="/batting"
                    element={<Batting />}
                />

                <Route
                    path="/bowling"
                    element={<Bowling />}
                />

                <Route
                    path="/venue"
                    element={<Venue />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;