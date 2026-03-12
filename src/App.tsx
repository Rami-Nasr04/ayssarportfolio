import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/home";
// import Contact from "./pages/Contact";
// import Portfolio from "./pages/Portfolio";
// import About from "./pages/About";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/contact" element={<Contact />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/about" element={<About />} /> */}
      </Routes>
    </Router>
  );
}

export default App;