import React, {Component} from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.Module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients);
        
        this.setState({loading: true});
        
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Jonas',
                adress: {
                    street: 'Teststreet',
                    zipCode: '12321',
                    country: 'Sweden'
                },
                email: 'test@test.com'    
            },
            deliveryMethod: 'fastest'
        }

        axios.post('/orders.json', order)
        .then(response => {
            console.log(response)
            this.setState({loading: false});
            this.props.history.push('/');
        })
        .catch(error => {
            this.setState({loading: false});
            console.log(error)
        } );
        
    }

    render () {
        let form = (
            <form>
            <input className={classes.Input} type="text" name="name" placeholder="Your name" />
            <input className={classes.Input} type="email" name="email" placeholder="Your email" />
            <input className={classes.Input} type="text" name="street" placeholder="Your street" />
            <input className={classes.Input} type="text" name="postal code" placeholder="Your postal code" />
            <Button buttonType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>
        );

        if (this.state.loading){
            form= <Spinner />
        }
       return (
            <div className={classes.ContactData}>
                <h4>Enter your contact details</h4>
                {form}
            </div>
       );
    }
}

export default ContactData;