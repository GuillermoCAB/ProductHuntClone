import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Main from "./pages/Main";
import Product from "./pages/Product";
import New from "./pages/New";

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/products/:id" component={Product} />            
            <Route path="/new" component={New} />
        </Switch>
    </BrowserRouter>
);

export default Routes;