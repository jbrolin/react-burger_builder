import React, {Component} from 'react'
import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    // This could be a functional component, do not have to be a class
    render() {
        const ingredientsSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>{igKey}</span> : {this.props.ingredients[igKey]}
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
            <p><strong>Total price: {this.props.price}</strong></p>
            <p>Continue to checkout?</p>
            <Button buttonType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
            <Button buttonType="Success" clicked={this.props.purchaseContinue}>CONTINUE</Button>
        </Aux>
        )
    }
   
    

   
}

export default OrderSummary;