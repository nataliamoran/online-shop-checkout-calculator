import React from "react";
import {
  Container,
  Dimmer,
  Image,
  Item,
  Label,
  Loader,
  Message,
  Segment
} from "semantic-ui-react";
import {PRODUCTS} from "../../config.js";
import {AddButton} from "./AddButton";
import {RemoveButton} from "./RemoveButton";

class ProductList extends React.Component {
 constructor(props) {
    super(props);

    this.state = {
      items: []
    };
  }

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
      <Item.Image src={require('../../images/castle.jpg').default}  size='small' />
      <Item.Content>
        <Item.Header as='a'>{item.title}</Item.Header>
        <Item.Meta>
          <Label>{item.category.title}</Label>
          <Label icon='dollar' content={item.price} />
        </Item.Meta>
        <Item.Extra>
            <AddButton>Add</AddButton>
            <RemoveButton>Remove</RemoveButton>
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