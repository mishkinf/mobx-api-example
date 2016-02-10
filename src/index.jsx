import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {observable} from 'mobservable';
import {observer} from 'mobservable-react';
import store from './stores/app-state';
import TodoList from './components/todo-list';
import { PageHeader, Grid, Row, Col } from 'react-bootstrap';
var Loader = require('react-loader');

// uncomment next line to enable the dev-tools.
// import 'mobservable-react-devtools';

@observer
class App extends Component {
    
     render() {
        if(this.props.store.articles == undefined || this.props.store.articles.data == undefined) {
            debugger;
        }
        var count = this.props.store.get('articles').data.length
        return (
            <Grid>
                <Row className="show-grid">
                    <Col md={12}>
                        <PageHeader>React Magic <small>The Ultimate In React Magic</small></PageHeader>
                    </Col>
                </Row>
                
                <Row className="show-grid">
                    <Col md={8}>
                        <Loader loaded={!this.props.store.articles.isFetching}>
                            <TodoList store={this.props.store} />
                        </Loader>
                    </Col>
                     <Col md={4}>
                        <div style={{fontSize: 150}}>{count}</div>
                    </Col>
                </Row>
            </Grid>
        );
     }
};

ReactDOM.render(<App store={store} />, document.getElementById('root'));
