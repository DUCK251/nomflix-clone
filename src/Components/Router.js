import React from "react";
import {
  HashRouter,
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

const Router = () => (
  <HashRouter forceRefresh>
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/tv" component={TV} />
        <Route path="/search" component={Search} />
        <Route path="/favs" component={Favs} />
        <Route path="/movie/:id" component={Detail} />
        <Route path="/collection/:id" component={Collection} />
        <Route exact path="/show/:id" component={Detail} />
        <Redirect from="*" to="/" />
      </Switch>
    </>
  </HashRouter>
);

export default Router;