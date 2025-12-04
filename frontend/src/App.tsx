import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { PropertyFormPage } from "./pages/PropertyFormPage";
import { PropertyDetailPage } from "./pages/PropertyDetailPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
          <nav className="bg-white border-b border-slate-200 sticky top-0 z-10">
            <Link to={"/"}>
              <div className="container mx-auto px-6 py-4">
                <h1 className="font-bold text-xl text-slate-900">ImmoApp</h1>
              </div>
            </Link>
          </nav>

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<PropertyFormPage />} />
            <Route path="/edit/:id" element={<PropertyFormPage />} />
            <Route path="/property/:id" element={<PropertyDetailPage />} />{" "}
          </Routes>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
