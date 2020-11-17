import React from 'react';
import classes from './NavigationItems.Module.css';
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = (props) => (
<ul className={classes.NavigationItems}>
    <NavigationItem link="/">Burger builder</NavigationItem>
    <NavigationItem link="/orders">Orders</NavigationItem>

</ul>
);

export default navigationItems;