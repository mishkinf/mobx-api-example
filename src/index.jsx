import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import store from './stores';
import ArticlesList from './components/ArticlesList';
import RandomList from './components/RandomList';
import { PageHeader, Grid, Row, Col, Panel } from 'react-bootstrap';
import DevTools from 'mobx-react-devtools';

@observer
class App extends Component {

  render() {
    var count = this.props.store.articles.data.length;

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
              <ArticlesList store={this.props.store} />
            </Panel>

            <Panel header={<h2>Random (Session Storage)</h2>}>
              <RandomList store={this.props.store} />
            </Panel>
          </Col>
        </Row>

      </Grid>
    );
  }
};

ReactDOM.render(<App store={store} />, document.getElementById('root'));
