import React from 'react';
import classes from './Logo.Module.css';
import burgerLogo from '../../assets/images/burger-logo.png';

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={burgerLogo} alt="MyLogo" />
    </div>
);

export default logo;