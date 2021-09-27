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
                <h1>{item.title}</h1>
                <img src={require("../../images/caste.jpg").default}/>
                <h1>{"$"+item.price}</h1>
                <Item.Content floated='right'>
                    <AddButton>Add</AddButton>
                    <RemoveButton>Remove</RemoveButton>
                </Item.Content>
              </Item>

            );
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