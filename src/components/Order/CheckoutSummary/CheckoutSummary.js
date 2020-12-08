import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.Module.css'

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>Great choice!</h1>
            <div style={{width: '100%', margin:'auto'}}>
                <Burger ingredients={props.ingredients}/>        
            </div>
            <Button 
            buttonType='Danger' 
            clicked={props.checkoutCanceled}>CANCEL</Button>
            <Button 
            buttonType='Success'
            clicked={props.checkoutContinue}>CONTINUE</Button>
        </div>

    );

}

export default checkoutSummary;