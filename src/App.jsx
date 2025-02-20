import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./components/pages/Layout";
import Summarizer from "./components/pages/Summarizer";
import Translator from "./components/pages/Translator";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Summarizer />} />
          <Route path="translator" element={<Translator />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
