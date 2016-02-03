import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {observable} from 'mobservable';
import {observer} from 'mobservable-react';
import store from './stores/app-state';
import ArticleList from './components/article-list';
import { PageHeader, Grid, Row, Col } from 'react-bootstrap';

// uncomment next line to enable the dev-tools.
// import 'mobservable-react-devtools';

@observer
class App extends Component {
     render() {
        return (
            <Grid>
                <Row className="show-grid">
                    <Col md={12}>
                        <PageHeader>Reddit Pro <small>The Ultimate Reddit Search Tool</small></PageHeader>
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col md={12}>
                        <ArticleList store={this.props.store} />
                    </Col>
                </Row>
            </Grid>
        );
     }
};

ReactDOM.render(<App store={store} />, document.getElementById('root'));
