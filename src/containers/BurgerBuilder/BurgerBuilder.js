import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary.js';
import Burger from '../../components/Burger/Burger.js';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
}

class BurgerBuilder extends Component {
    
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount () {
        axios.get('https://react-my-burger-7d177.firebaseio.com/ingredients.json')
        .then(repsonse => {
            this.setState({ingredients: repsonse.data});
        })
        .catch(error => {
            this.setState({error: true});
        });
    }

    addIngredientHandler = (type) => {
        const oldCount = (this.state.ingredients[type]);
        const updatedCount = oldCount + 1;
        const updatedIngredients = { 
            ...this.state.ingredients
        };

        updatedIngredients[type] = updatedCount;
       
        const priceAddition = INGREDIENT_PRICES[type]
        const oldPrice= this.state.totalPrice;
        const newPrice=oldPrice+priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.uppdatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = (this.state.ingredients[type]);
        if (oldCount <= 0) {

            return;
        }

        const updatedCount = oldCount - 1;
        const updatedIngredients = { 
            ...this.state.ingredients
        };

        updatedIngredients[type] = updatedCount;
       
        const priceDeducution = INGREDIENT_PRICES[type]
        const oldPrice= this.state.totalPrice;
        const newPrice=oldPrice-priceDeducution;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.uppdatePurchaseState(updatedIngredients);
    }

    uppdatePurchaseState(ingredients) {
      
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey]
        }).reduce((sum, el) => {
            return sum+el;
        },0); 
        this.setState({ purchasable: sum > 0 })
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing:false});
    }

    purchaseContinueHandler = () => {

        // alert('Continued!');
        // this.setState({loading: true});
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Jonas',
        //         adress: {
        //             street: 'Teststreet',
        //             zipCode: '12321',
        //             country: 'Sweden'
        //         },
        //         email: 'test@test.com'    
        //     },
        //     deliveryMethod: 'fastest'
        // }

        // axios.post('/orders.json', order)
        // .then(response => {
        //     console.log(response)
        //     this.setState({loading: false, purchasing:false});
        // })
        // .catch(error => {
        //     this.setState({loading: false, purchasing:false});
        //     console.log(error)
        // } );
        const queryParams = [];
        for (let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]));
        }
        const queryString=queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?'+queryString
            
        });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
      
      
        let burger = this.state.error ? <p>Ingredients could not be fetched</p> : <Spinner />
        if (this.state.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                        <BuildControls 
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        price={this.state.totalPrice}
                        ordered={this.purchaseHandler}
                         />
                </Aux>
                );
            orderSummary = <OrderSummary 
            ingredients={this.state.ingredients} 
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinue={this.purchaseContinueHandler}
            price={this.state.totalPrice.toFixed(2)}
            />
        }
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}
export default withErrorHandler(BurgerBuilder, axios);