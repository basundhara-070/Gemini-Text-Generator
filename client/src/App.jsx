
import Chat from "./components/Chat";
import NavBar from "./components/Navbar";

import SearchPage from "./components/SearchPage";
import Dashboard from "./components/Dasboard";
import { ThemeProvider } from "./components/ui/theme-provider";
import { AppSidebar } from "./components/ui/app-sidebar";
import HomePage from "./components/HomePage"
import Layout from "./components/ui/layout";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";
function App(){

  const { isAuthenticated } = useAuth0();

  return(
    
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
         
        {
        isAuthenticated?(
         <>
         <Layout>
         <Router>
         <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            {/* <Route path="/notes" element={<NotesPage />} />
            <Route path="/pdf" element={<PDFNotesPage />} /> */}
          </Routes>
          </Router>
          </Layout>
          </>
        )
        :(<Login/>)
        }
  
    </ThemeProvider>
  
  )
}

export default App;