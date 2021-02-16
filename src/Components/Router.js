import React from "react";
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import Home from "Routes/Home";
import TV from "Routes/TV";
import Favs from "Routes/Favs";
import Header from "Components/Header";
import Search from "Routes/Search";
import Detail from "Routes/Detail";
import Collection from "Routes/Collection";
import Genre from "Routes/Genre";

const Router = () => (
  <BrowserRouter forceRefresh>
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route exact path="/tv" component={TV} />
        <Route path="/search" component={Search} />
        <Route path="/favs" component={Favs} />
        <Route exact path="/movie/:id" component={Detail} />
        <Route exact path="/movie/genre/:id" component={Genre} />
        <Route exact path="/tv/genre/:id" component={Genre} />
        <Route path="/collection/:id" component={Collection} />
        <Route exact path="/show/:id" component={Detail} />
        <Redirect from="*" to="/" />
      </Switch>
    </>
  </BrowserRouter>
);

export default Router;