import React from 'react';
import classes from './NavigationItems.Module.css';
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = (props) => (
<ul className={classes.NavigationItems}>
    <NavigationItem link="/" active>Burger builder</NavigationItem>
    <NavigationItem link="/">Checkout</NavigationItem>

</ul>
);

export default navigationItems;