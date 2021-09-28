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
      cartItems: [],
      setCartItems: [],
      items: [],
      chosenItem : '',
      chosenQuantity : 0,
      value : 0
    };
  }


handleClick = item => () => {
    this.setState({value: item.id});
  };

handleClick2 = item => () => {
    const exist = this.state.cartItems.find((x) => x.id === item.id);
    if (exist) {
      this.state.cartItems(
        this.state.cartItems.map((x) =>
          x.id === item.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      this.state.cartItems([...this.state.cartItems, { ...item, qty: 1 }]);
    }
  };
   componentDidMount() {
      this.getItems();
   }

   getItems() {
     fetch(PRODUCTS)
       .then((response) => response.json())
       .then((json) => {
            this.setState({
              items: json,
            });
            this.forceUpdate();
          })
          .catch(() => {
       });
   }




  render() {
    return (
  <Container>
  <Item.Group divided>
  {this.state.items.map(item => {
   return (
   <Item key={item.id}>
      <Item.Image src={item.image}  size='small' />
      <Item.Content>
        <Item.Header as='a'>{item.title}</Item.Header>
        <Item.Meta>
          <Label>{item.category.title}</Label>
          <Label icon='dollar' content={item.price} />
          <Label icon='cart' content={this.state.value} />
        </Item.Meta>
        <Item.Extra>
            <Button onClick={this.handleClick(item)}>Add</Button>
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