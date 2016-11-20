import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {observer} from 'mobx-react';
import store from './stores';
import ArticlesList from './components/ArticlesList';
import RandomList from './components/RandomList';
import { PageHeader, Grid, Row, Col, Panel } from 'react-bootstrap';
import DevTools from 'mobx-react-devtools';

@observer
class App extends Component {

  render() {
    const { store } = this.props;

    return (
      <Grid>

        <Row>
          <Col md={12}>
            <PageHeader>mobx-api<small> example application</small></PageHeader>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            Quickly interact with localStorage, sessionStorage or RESTFul APIs in your applications. Add, delete, read and update operations demonstrated in this example. Click a title or author in order to edit.
          </Col>
        </Row>

        <br/>

        <Row>
          <Col md={12}>
            <DevTools />

            <Panel header={<h2>Articles (Local Storage or RESTFul API)</h2>}>
              <ArticlesList articles={store.articles} isFakeApi={store.isFakeApi} setFakeApi={store.setFakeApi} />
            </Panel>

            <Panel header={<h2>Random (Session Storage)</h2>}>
              <RandomList randomstuff={store.randomstuff} />
            </Panel>
          </Col>
        </Row>

      </Grid>
    );
  }
};

ReactDOM.render(<App store={store} />, document.getElementById('root'));
