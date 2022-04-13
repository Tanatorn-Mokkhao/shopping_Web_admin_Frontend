import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Config_ls } from '../../utils/config'

const PrivateRoute = ({component: Component, ...rest}) => {
    return <Route {...rest} component={(props) => {
        const token = window.localStorage.getItem(Config_ls.userToken);
        if(token){
            return <Component {...props} />
        }else{
            return <Redirect to={`/signin`} />
        }
    }} />
}

export default PrivateRoute;