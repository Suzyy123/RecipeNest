import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import DefaultHome from './components/HomePage';
import Login from './components/Login';
import Register from './components/Register';
import AllChef from './components/AllChef';
import Allrecipes from './components/AllRecipes';
import AboutUs from './components/home1/AboutUs';
import CProfile from './components/ChefHome/CProfile';
import AddRecipe from './components/ChefHome/AddRecipe';
import RecipeDetail from './components/Recipes/RecipeDetail';
import ChefDetail from './components/ChefHome/ChefDetail';
import FProfile from './components/FoodLovers/FProfile';
import FoodLoverUpdate from './components/Actions/Update';
import SearchResults from './components/Search/SearchResult';
import UpdateRecipe from  './components/Actions/UpdateRecipe';
import ShowFoodLovers from './components/Admin/ShowFoodLovers';
import ChefUpdate from './components/Actions/UpdateChef';
import Contact from './components/Contact';
function App() {
  const location = useLocation();
  const [role, setRole] = useState(localStorage.getItem("role"));

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole !== role) {
      setRole(storedRole);
    }
  }, [location.pathname, role]);

  return (
    <>
      <Navbar /> 

      <Routes>
        {/* Auth */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        {/* Pages */}
        <Route path='/aboutUs' element={<AboutUs />} />
        <Route path='/home' element={<DefaultHome />} />
        <Route path='/chefs' element={<AllChef />} />
        <Route path='/recipes' element={<Allrecipes />} />

        {/* Profiles */}
        <Route path='/FProfile' element={<FProfile />} />
        <Route path='/UpdateFoodLover' element={<FoodLoverUpdate />} />
        <Route path='/CProfile' element={<CProfile />} />

        {/* Detail Views */}
        <Route path='/viewRecipe/:id' element={<RecipeDetail />} />
        <Route path='/viewChefDetail/:id' element={<ChefDetail />} />
        <Route path="/search-results" element={<SearchResults />} />
        {/* Chef-specific feature */}
        <Route path='/addrecipe' element={<AddRecipe />} />
        <Route path='/UpdateRecipe/:id' element={<UpdateRecipe />} />
        <Route path='/foodlovers' element = {<ShowFoodLovers/>}/>
        <Route path='/ChefUpdate' element = {<ChefUpdate/>}/>
        <Route path='/contact' element = {<Contact/>}/>
      </Routes>
    </>
  );
}

export default App;
