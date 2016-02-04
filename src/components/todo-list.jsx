import React, {Component} from 'react';
import {observable} from 'mobservable';
import {observer} from 'mobservable-react';
import { Table } from 'react-bootstrap';
import Faker from 'faker';
import Toggle from 'react-toggle';

@observer
class TodoList extends Component {
     render() {
        const { store } = this.props;
        const articles = store.get('articles');
         
        return (
            <div style={style}>
                <button style={inputStyle} onClick={this.addArticle}>Add Article</button>
                
                <label style={{float:'right'}}>
                    <Toggle
                        defaultChecked={store.isFakeApi} 
                        onChange={this.handleApiChange} 
                        />
                        <span style={{lineHeight: '50px'}}>&nbsp;Use Fake Api</span>
                </label>
                <Table striped bordered condensed hover>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {articles.data.map(article => {
                        return (<tr key={article.id}>
                            <td>{article.id}</td>
                            <td>{article.title}</td>
                            <td>{article.author}</td>
                            <td><button onClick={() => store.delete('articles', article.id)}>Delete</button></td>
                        </tr>);
                    })}
                    </tbody>
                </Table>
            </div>
        );    
     }
     
     handleApiChange = (e) => {
        const { store } = this.props;
        store.setFakeApi(e.target.checked);
        store.read_all('articles')
     }
     
     addArticle = (e) => {
         const { store } = this.props;
         var fakeArticle = { title: Faker.commerce.productName(), author: Faker.name.findName() };
         console.log('fake article: ', fakeArticle);
         store.create('articles', fakeArticle);
     }
};

const inputStyle = {
    fontSize: 18,
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

export default TodoList;