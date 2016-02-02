import React, {Component} from 'react';
import {observable} from 'mobservable';
import {observer} from 'mobservable-react';
import { Table } from 'react-bootstrap';

@observer
class ArticleList extends Component {
     render() {
        const { articles, isFetchingArticles } = this.props.store;
        
        if(articles.length > 0) {
            return (
                <div style={style}>
                    <span style={style}>Search: </span><input onChange={this.onChange} style={inputStyle} placeholder='Reddit...'  />
                    
                    <Table striped bordered condensed hover>
                        <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                        </tr>
                        </thead>
                        <tbody>
                        {articles.map(article => {
                            return (<tr key={article.data.id}>
                                <td><a href={article.data.url} target='_blank'>{article.data.title}</a></td>
                                <td>{article.data.author}</td>
                            </tr>);
                        })}
                        </tbody>
                    </Table>
                </div>
            );
        } else  {
            return (
              <div>
                <span style={style}>Search: </span><input onChange={this.onChange} style={inputStyle} placeholder='Search...'  />
                <div style={noContentStyle}>{this.props.store.fetchingStatus}</div>  
              </div>
            );
        }
     }
     
     onChange = (e) => {
         console.log(e.target.value);
         this.props.store.fetchArticles(e.target.value);
     }
};

const inputStyle = {
    fontSize: 20,
    padding: 5
}

const noContentStyle = {
    fontSize: 30,
    textAlign: 'center',
    lineHeight: 10
}

const style = {
    fontSize: 30
}

export default ArticleList;