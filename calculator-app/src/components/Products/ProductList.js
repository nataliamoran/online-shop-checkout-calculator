import React from "react";
import {
  Container,
  Item,
  Label
} from "semantic-ui-react";
import {PRODUCTS} from "../../config.js";
import {Button} from "../Button";

class ProductList extends React.Component {
 constructor(props) {
    super(props);

    this.state = {
      cart: {},
      allProducts: [],
      cartSize: 0
    };
  }


handleClick(state, product) {
     const productsInCartNum = state.cartSize;
     const productId = product.id;
     if (productId in state.cart){
         state.cart[productId] += 1;
     } else {
         state.cart[productId] = 1;
     }

     this.setState({
         cartSize: productsInCartNum + 1,
         cart: state.cart,
     });
  };

// handleClick2 = item => () => {
//     const exist = this.state.cartItems.find((x) => x.id === item.id);
//     if (exist) {
//       this.state.cartItems(
//         this.state.cartItems.map((x) =>
//           x.id === item.id ? { ...exist, qty: exist.qty + 1 } : x
//         )
//       );
//     } else {
//       this.state.cartItems([...this.state.cartItems, { ...item, qty: 1 }]);
//     }
//   };

   componentDidMount() {
      this.getItems();
   }

   getItems() {
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




  render() {
       console.log(this.state.cart);
    return (
  <Container>
  <Item.Group divided>
  {this.state.allProducts.map(item => {
   return (
   <Item key={item.id}>
      <Item.Image src={item.image}  size='small' />
      <Item.Content>
        <Item.Header as='a'>{item.title}</Item.Header>
        <Item.Meta>
          <Label>{item.category.title}</Label>
          <Label icon='dollar' content={item.price} />
          <Label icon='cart' content={this.state.cartSize} />
        </Item.Meta>
        <Item.Extra>
            <Button onClick={() => this.handleClick(this.state, item)}>Add</Button>
            <Button>Remove</Button>
        </Item.Extra>
      </Item.Content>
    </Item>);
    })}

  </Item.Group>
  </Container>
    );
  }
}
/*
const mapDispatchToProps = dispatch => {
  return {
    refreshCart: () => dispatch(fetchCart())
  };
};


export default connect(
  null,
  mapDispatchToProps
)(ProductList);
*/
export default ProductList;