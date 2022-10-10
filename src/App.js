import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import WorkshopRequest from "./pages/WorkshopRequest";
import WorkplaceSubscription from "./pages/WorkplaceSubscription";
import CourseSubscription from "./pages/CourseSubscription";

function Main() {
    return (
        <h1>Test App</h1>
    )
}

export default function App() {
  return (
      <Router>
          <h1>De formulieren</h1>
          <nav>
              <ul>
                  <li>
                      <Link to="/abonnee_inschrijving">Abonnee Inschrijving</Link>
                  </li>
                  <li>
                      <Link to="/cursus_inschrijving">Cursus Inschrijving</Link>
                  </li>
                  <li>
                      <Link to="/workshop_aanvraag">Workshop Aanvraag</Link>
                  </li>
              </ul>
          </nav>
          <br/>
          <br/>
          <Routes>
              <Route path="/" element={<Main/>}/>
              <Route path="/abonnee_inschrijving" element={<WorkplaceSubscription/>}/>
              <Route path="/cursus_inschrijving" element={<CourseSubscription/>}/>
              <Route path="/workshop_aanvraag" element={<WorkshopRequest/>}/>
          </Routes>
      </Router>
  );
}
