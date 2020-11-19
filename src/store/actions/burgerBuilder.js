import * as actionTypes from './actionsTypes';
import axios from '../../axios-orders';


export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    };
}

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    };
}

export const setIngredients = (ing) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ing
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = (ingredients) => {
    return dispatch => {
        axios.get('https://react-my-burger-7d177.firebaseio.com/ingredients.json')
        .then(repsonse => {
            dispatch(setIngredients(repsonse.data));
        })
        .catch(error => {
           dispatch(fetchIngredientsFailed());
        });
    };
};
