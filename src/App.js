import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";

import {
    Authentication,
    DiscoverByGenrePage,
    HomePage, InfoPage,
    MoviesListPage,
    SearchPage,
    SelectedMovieDetailsPage
} from "./pages";
import {MainLayout} from "./layouts";



function App() {
  return (

      <Routes>
          <Route path={'/'} element={<MainLayout/>}>
              <Route index element={<Navigate to={'info'}/>}/>
              <Route path={'home'} element={<HomePage/>}>
                  <Route path={':id'} element={<SelectedMovieDetailsPage/>}/>
              </Route>
              <Route path={'auth'} element={<Authentication/>}/>
              <Route path={'movies'} element={<MoviesListPage/>}>
                  <Route path={':id'} element={<SelectedMovieDetailsPage/>}/>
              </Route>
              <Route path={'search/:request'} element={<SearchPage/>}>
                  <Route path={':id'} element={<SelectedMovieDetailsPage/>}/>
              </Route>
              <Route path={'search'} element={<Navigate to={`'`}/>}/>
              <Route path={'discoverGenre/:genre'} element={<DiscoverByGenrePage/>}>
                  <Route path={':id'} element={<SelectedMovieDetailsPage/>}/>
              </Route>
              <Route path={'info'} element={<InfoPage/>}/>
          </Route>
          <Route path={'*'} element={<Navigate to={'home'}/>}/>
      </Routes>
      );
}

export default App;
