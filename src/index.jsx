import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {observable} from 'mobservable';
import {observer} from 'mobservable-react';
import store from './stores/app-state';
import ArticlesList from './components/articles-list';
import { PageHeader, Grid, Row, Col } from 'react-bootstrap';

// uncomment next line to enable the dev-tools.
// import 'mobservable-react-devtools';

@observer
class App extends Component {
    
     render() {
        if(this.props.store.articles == undefined || this.props.store.articles.data == undefined) {
            debugger;
        }
        var count = this.props.store.articles.data.length
        return (
            <Grid>
                <Row className="show-grid">
                    <Col md={12}>
                        <PageHeader>mobservable-api<small> example application</small></PageHeader>
                    </Col>
                </Row>
                
                <Row className="show-grid">
                    <Col md={12}>
                        Toggle using local storage vs using a real restful api. Add, delete, read and update operations demonstrated in this example. Click a title or author in order to edit.
                    </Col>
                </Row>
                <br/>
                <Row className="show-grid">
                    <Col md={8}>
                        <ArticlesList store={this.props.store} />
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
