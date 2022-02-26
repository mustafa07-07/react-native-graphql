import React from 'react';
import { Container, Text, Button, Content } from 'native-base';

class Logout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: true,
    };
  }
  handleLogout = () => {
    //this.props.navigation.navigate("Login");
    console.log(this.props.navigation.navigate({"name":"Home"}));
    this.setState({loggedIn:false});
    
  };

  render() {
    return (
      <Container>
        <Content>
          <Button full onPress={this.handleLogout}>
            <Text>Log Out</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default Logout;
