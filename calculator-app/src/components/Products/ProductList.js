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

class ProductList extends React.Component {
 constructor(props) {
    super(props);

    this.state = {
      items: null,
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
                <Item.Image src={item.image} />
                <Item.Content>
                  <Item.Header
                    as="a"
                    onClick={() =>
                      this.props.history.push(`/products/${item.id}`)
                    }
                  >
                    {item.title}
                  </Item.Header>
                  <Item.Meta>
                    <span className="cinema">{item.category}</span>
                  </Item.Meta>
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