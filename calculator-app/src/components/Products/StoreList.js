import React from "react";
import {
    Container,
    Item,
    Label
} from "semantic-ui-react";
import {PRODUCTS, ORDERS, CATEGORIES} from "../../config.js";
import {Button} from "../Button";

class StoreList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cart: {},
            allProducts: [],
            allCategories: [],
            checkoutMode: false,
            order: [],
            filter: ''
        };
    }


    handleClick(state, product, quantity) {
        const productId = product.id;
        if (productId in state.cart) {
            if (state.cart[productId] + quantity > 0) {
                state.cart[productId] += quantity;
            } else {
                delete state.cart[productId]
            }
        } else {
            if (quantity === 1) {
                state.cart[productId] = 1;
            }
        }

        this.setState({
            cart: state.cart,
        });
    };

    handleMode(mode) {
        mode = mode && Object.keys(this.state.cart).length > 0
        if (mode) {
            this.setOrder();
        }
        this.setState({
            checkoutMode: mode
        });
    }

    handleFilter(fil) {
        this.setState({filter: fil})
    }

    componentDidMount() {
        this.getProducts();
        this.getCategories();
    }

    getProducts() {
        fetch(PRODUCTS)
            .then((response) => response.json())
            .then((json) => {
                this.setState({
                    allProducts: json,
                });
                this.forceUpdate();
            })
            .catch(() => {
            });
    }

    getCategories() {
        fetch(CATEGORIES)
            .then((response) => response.json())
            .then((json) => {
                this.setState({
                    allCategories: json,
                });
                this.forceUpdate();
            })
            .catch(() => {
            });
    }

    setOrder() {
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(this.state.cart),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        fetch(ORDERS, requestOptions)
            .then((response) => response.json())
            .then((json) => {
                this.setState({
                    order: json
                });
            })
            .catch(() => {
            });
    }

    render() {
        let checkout_on_hover;
        if (Object.keys(this.state.cart).length > 0) {
            checkout_on_hover = (<i className="right arrow icon"></i>);
        } else {
            checkout_on_hover = (<i className="times circle icon"></i>);
        }
        if (!this.state.checkoutMode) {
            return (
                <Container>
                    <Item.Group divided>
                        <div class="two ui buttons">
                            <div class="large ui animated button" tabindex="0" onClick={() => this.handleMode(false)}>
                                <div class="visible content">Store</div>
                                <div class="hidden content">
                                    <i class="shop icon"></i>
                                </div>
                            </div>
                            <div class="large ui vertical animated button" tabindex="0"
                                 onClick={() => this.handleMode(true)}>
                                <div class="visible content">Shop</div>
                                <div class="hidden content">
                                    {checkout_on_hover}
                                </div>
                            </div>
                        </div>

                        <div class={" ui buttons"}>
                            <Button onClick={() => this.handleFilter('')}>{"All"}</Button>
                            {this.state.allCategories.map(category => {
                                return (
                                    <Button onClick={() => this.handleFilter(category.title)}>{category.title}</Button>
                                );
                            })}
                        </div>
                        {this.state.allProducts.filter(item => item.category.title.includes(this.state.filter)).map(product => {
                            return (
                                <Item key={product.id}>
                                    <Item.Image src={product.image} size='small'/>
                                    <Item.Content>
                                        <Item.Header as='a'>{product.title}</Item.Header>
                                        <Item.Meta>
                                            <Label>{product.category.title}</Label>
                                            <Label icon='dollar' content={product.price}/>
                                            <Label icon='cart' content={this.state.cart[product.id]}/>
                                        </Item.Meta>
                                        <Item.Extra>
                                            <Button
                                                onClick={() => this.handleClick(this.state, product, 1)}>Add</Button>
                                            <Button
                                                onClick={() => this.handleClick(this.state, product, -1)}>Remove</Button>
                                        </Item.Extra>
                                    </Item.Content>
                                </Item>);
                        })}
                    </Item.Group>
                </Container>
            );
        } else {
            return (
                <Container>
                    <div class="two ui buttons">
                        <div class="large ui animated button" tabindex="0" onClick={() => this.handleMode(false)}>
                            <div class="visible content">Store</div>
                            <div class="hidden content">
                                <i class="shop icon"></i>
                            </div>
                        </div>
                        <div class="large ui vertical animated button" tabindex="0"
                             onClick={() => this.handleMode(true)}>
                            <div class="visible content">Shop</div>
                            <div class="hidden content">
                                {checkout_on_hover}
                            </div>
                        </div>
                    </div>
                    <div class="ui labeled button" tabindex="0">
                        <div class="ui teal button">
                            <i class="dollar icon"></i> Total
                        </div>
                        <a class="ui basic teal left pointing label" href="/#">
                            ${Math.round(this.state.order.total * 100) / 100}
                        </a>
                    </div>
                    <div class="ui labeled button" tabindex="0">
                        <div class="ui basic blue button">
                            <i class="tag icon"></i> Discount
                        </div>
                        <a class="ui basic left pointing blue label" href="/#">
                            {this.state.order.discount * 100}%
                        </a>
                    </div>
                    <div class="ui labeled button" tabindex="0">
                        <div class="ui basic blue button">
                            <i class="chart line icon"></i> Tax
                        </div>
                        <a class="ui basic left pointing blue label" href="/#">
                            {this.state.order.tax * 100}%
                        </a>
                    </div>
                    <div class="ui labeled button" tabindex="0">
                        <div class="ui basic blue button">
                            <i class="circle icon"></i> Subtotal
                        </div>
                        <a class="ui basic left pointing blue label" href="/#">
                            ${this.state.order.subtotal}
                        </a>
                    </div>
                </Container>
            );
        }
    }
}

export default StoreList;