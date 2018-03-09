import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

import Expand from '../src/Expand';

const Container = styled.div`
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto; 
`;

const Header = Container.extend`
  text-align: center; 
  color: palevioletred;
  font-weight: bold;
  font-size: 24px;
  padding: 20px;
`;

const Main = Container.extend``;

const BoxToggle = styled.div`
  max-width: 300px;
  margin: 30px auto;
  text-align: center;
`;

const BoxExpand = styled.div`
  max-width: 300px;
  color: #fff;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  background-color: #12b47d;
  border-radius: 4px;
  margin: 20px;
  flex: auto;
`;

const BoxExpand1 = BoxExpand.extend`
  background-color: #7795f8;
`;

const Button = styled.a`
  cursor: pointer;
  white-space: nowrap;
  display: inline-block;
  height: 40px;
  line-height: 40px;
  padding: 0 14px;
  background: #3ecf8e;
  text-shadow: 0 1px 3px rgba(36,180,126,.4);
  border-radius: 4px;
  font-size: 15px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .025em;
  color: #fff;
  text-decoration: none;
  
  &:hover {
      transform: translateY(-2px);
      box-shadow: 0 7px 14px rgba(50,50,93,.1), 0 3px 6px rgba(0,0,0,.08);
  }
`;

const ExpandBoxes = styled.div`
  display: flex;
  justify-content: space-around;
`;

class App extends Component {
  state = { open: false };

  toggle = () => {
    this.setState(prevState => ({ open: !prevState.open }));
  };

  render() {
    return (
      <Fragment>
        <Header>React Expand</Header>
        <Main>
          <BoxToggle>
            <Button onClick={this.toggle}>Open</Button>
          </BoxToggle>
          <Expand open={this.state.open}>
            <ExpandBoxes>
              <BoxExpand>Hello</BoxExpand>
              <BoxExpand1>Hallo</BoxExpand1>
            </ExpandBoxes>
          </Expand>
        </Main>
      </Fragment>
    );
  }
}

export default App;
