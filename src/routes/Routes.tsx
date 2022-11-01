import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import App from "../App"
import MajorScales from "../pages/scales/MajorScales"
import MinorScales from "../pages/scales/MinorScales"
import SelectedScale from "../pages/selected-scale/SelectedScale"

export const ROUTES = {
    MINOR_SCALES: '/minor-scales',
    MAJOR_SCALES: '/major-scales',
    SELECTED_SCALE: '/selected/:type/:note',
}

const Routing = (): JSX.Element => {
    return (<BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
                <Route path="/" element={<Navigate to={ROUTES.MAJOR_SCALES} />} />
                <Route path={ROUTES.MAJOR_SCALES} element={<MajorScales />} />
                <Route path={ROUTES.MINOR_SCALES} element={<MinorScales />} />
                <Route path={ROUTES.SELECTED_SCALE} element={<SelectedScale />} />
            </Route>
            <Route
                path="*"
                element={
                    <main style={{ padding: "1rem" }}>
                        <p>There's nothing here!</p>
                    </main>
                }
            />
        </Routes>
    </BrowserRouter>)
}

export default Routing;