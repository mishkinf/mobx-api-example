import React, {Component} from 'react';
import {observable} from 'mobservable';
import {observer} from 'mobservable-react';
import { Table } from 'react-bootstrap';

@observer
class ArticleList extends Component {
     render() {
        const { data, isFetching, errors } = this.props.store.articles;
        
        if(errors.length == 0) {
            if(data.length == 0) {
                return (
                    <div style={style}>
                        <span style={style}>Search: </span><input onChange={this.onChange} style={inputStyle} placeholder='Reddit...'  />
                        <div style={noContentStyle}>Sorry, there were no records for this subreddit!</div>                    
                    </div>
                )
            } else {
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
                            {data.map(article => {
                                return (<tr key={article.data.id}>
                                    <td><a href={article.data.url} target='_blank'>{article.data.title}</a></td>
                                    <td>{article.data.author}</td>
                                </tr>);
                            })}
                            </tbody>
                        </Table>
                    </div>
                );    
            }
        } else  {
            return (
              <div>
                <span style={style}>Search: </span><input onChange={this.onChange} style={inputStyle} placeholder='Search...'  />
                <div style={noContentStyle}>{errors}</div>  
              </div>
            );
        }
     }
     
     onChange = (e) => {
         const { store } = this.props;
         
         var successFn = (response) => response.data.children;
         var errorFn = (error) => 'There was an issue';
         
         store.apiRequest('articles', 'http://www.reddit.com/r/' + e.target.value + '.json', successFn, errorFn);
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