import React from "react";
import {
  Container,
  Item,
  Label
} from "semantic-ui-react";
import {PRODUCTS, ORDERS} from "../../config.js";
import {Button} from "../Button";

class ProductList extends React.Component {
 constructor(props) {
    super(props);

    this.state = {
      cart: {},
      allProducts: [],
      checkoutMode: false,
      order: [],
      filter : ''
    };
  }


handleClick(state, product, quantity) {
     const productsInCartNum = state.cartSize;
     const productId = product.id;
     if (productId in state.cart){
        if(quantity == 1){
            state.cart[productId] += quantity;
        }
        else{
            if(state.cart[productId]>0){
                state.cart[productId] += quantity;
            }
        }
     } else {
        if(quantity == 1){
            state.cart[productId] = 1;
        }
     }

     this.setState({
         cart: state.cart,
     });
  };

handleMode(mode){
    if(mode){
        this.setOrder();
    }
    this.setState({
             checkoutMode: mode
         });
  }

handleFilter(fil){
    this.setState({filter: fil})
}

   componentDidMount() {
      this.getProducts();
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

   setOrder(){
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
  if(!this.state.checkoutMode){
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
        <div class="large ui vertical animated button" tabindex="0"  onClick={() => this.handleMode(true)}>
          <div class="visible content">Shop</div>
          <div class="hidden content">
            <i class="right arrow icon"></i>
          </div>
        </div>
    </div>

    <div class="three ui buttons">
         <button class="ui button" onClick={() => this.handleFilter('Dairy')}>
           Dairy
         </button>
         <div class="ui button" tabindex="0" onClick={() => this.handleFilter('Protein')}>
           Protein
         </div>
         <div class="ui button" tabindex="0" onClick={() => this.handleFilter('Fruit')}>
           Fruit
         </div>
       </div>
    {this.state.allProducts.filter(item => item.category.title.includes(this.state.filter)).map(product => {
     return (
     <Item key={product.id}>
        <Item.Image src={product.image}  size='small' />
        <Item.Content>
          <Item.Header as='a'>{product.title}</Item.Header>
          <Item.Meta>
            <Label>{product.category.title}</Label>
            <Label icon='dollar' content={product.price} />
            <Label icon='cart' content={this.state.cart[product.id]} />
          </Item.Meta>
          <Item.Extra>
              <Button onClick={() => this.handleClick(this.state, product, 1)}>Add</Button>
              <Button onClick={() => this.handleClick(this.state, product, -1)}>Remove</Button>
          </Item.Extra>
        </Item.Content>
      </Item>);
      })}
    </Item.Group>
    </Container>
      );
  }
  else{
      return (
      <Container>
         <div class="two ui buttons">
             <div class="large ui animated button" tabindex="0" onClick={() => this.handleMode(false)}>
               <div class="visible content">Store</div>
               <div class="hidden content">
                 <i class="shop icon"></i>
               </div>
             </div>
             <div class="large ui vertical animated button" tabindex="0"  onClick={() => this.handleMode(true)}>
               <div class="visible content">Shop</div>
               <div class="hidden content">
                 <i class="right arrow icon"></i>
               </div>
             </div>
         </div>
            <div class="ui labeled button" tabindex="0">
              <div class="ui red button">
                <i class="dollar icon"></i> Total
              </div>
              <a class="ui basic red left pointing label">
                {this.state.order.total}
              </a>
            </div>
            <div class="ui labeled button" tabindex="0">
              <div class="ui basic blue button">
                <i class="tag icon"></i> Discount
              </div>
              <a class="ui basic left pointing blue label">
                {this.state.order.discount}
              </a>
            </div>
            <div class="ui labeled button" tabindex="0">
              <div class="ui basic blue button">
                <i class="chart line icon"></i> Tax
              </div>
              <a class="ui basic left pointing blue label">
                {this.state.order.tax}
              </a>
            </div>
            <div class="ui labeled button" tabindex="0">
              <div class="ui basic blue button">
                <i class="circle icon"></i> Subtotal
              </div>
              <a class="ui basic left pointing blue label">
                {this.state.order.subtotal}
              </a>
            </div>
      </Container>
        );
  }
  }
}
export default ProductList;