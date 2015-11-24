import React from 'react';
import { IndexRoute, Route } from 'react-router';
import PostsRoute from './PostsRoute';
import AppRoute from './AppRoute';

export default (
  <Route path='/' component={AppRoute}>
    <IndexRoute component={PostsRoute} />
    <Route path='popular' name='popular' component={PostsRoute} />
    <Route path='mine' name='mine' component={PostsRoute} />
    <Route path='discussed' name='discussed' component={PostsRoute} />
  </Route>
);
