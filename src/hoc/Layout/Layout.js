import React, { useState } from 'react';
import { connect } from 'react-redux';
import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.Module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = props => {


    const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

    const sideDrawerCloserHander = () => {
        setSideDrawerIsVisible(false);
    }

    const sideDrawerToggleHandler = () => {
        setSideDrawerIsVisible(!sideDrawerIsVisible);
    }

        return (
            <Aux>
            <Toolbar 
            drawerToggleClicked={sideDrawerToggleHandler} 
            isAuth={props.isAuthenticated}
            />
            <SideDrawer 
                open={sideDrawerIsVisible} 
                closed={sideDrawerCloserHander}
                isAuth={props.isAuthenticated}
            />
        <main className={classes.Content}>
            {props.children}
        </main>
        </Aux>
    
        );
    
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null
    }

}


export default connect(mapStateToProps)(Layout);
