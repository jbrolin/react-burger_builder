import React from 'react'
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

const OrderSummary = props => {
    // This could be a functional component, do not have to be a class
  
    const ingredientsSummary = Object.keys(props.ingredients)
    .map(igKey => {
        return (
            <li key={igKey}>
                <span style={{textTransform: 'capitalize'}}>{igKey}</span> : {props.ingredients[igKey]}
            </li>
        );
        
    });

    return (
        <Aux>
        <h3>Your order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
            {ingredientsSummary}
        </ul>
        <p><strong>Total price: {props.price}</strong></p>
        <p>Continue to checkout?</p>
        <Button buttonType="Danger" clicked={props.purchaseCanceled}>CANCEL</Button>
        <Button buttonType="Success" clicked={props.purchaseContinue}>CONTINUE</Button>
    </Aux>
    )
}

export default OrderSummary;