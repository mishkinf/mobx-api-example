import React, {Component} from 'react';
import {observable} from 'mobservable';
import {observer} from 'mobservable-react';
import { Table } from 'react-bootstrap';
import Faker from 'faker';
import Toggle from 'react-toggle';
import InlineEdit from 'react-edit-inline';

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
                        onChange={this.toggleFakeApi} />
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
                            <td> 
                                <InlineEdit
                                    activeClassName="editing"
                                    text={article.title}
                                    paramName="title"
                                    change={(data) => this.updateField({id: article.id, title: data.title})}
                                    />
                            </td>
                            <td>
                             <InlineEdit
                                    activeClassName="editing"
                                    text={article.author}
                                    paramName="author"
                                    change={(data) => this.updateField({id: article.id, author: data.author})}
                                    />
                            </td>
                            <td><button onClick={() => store.delete('articles', article.id)}>Delete</button></td>
                        </tr>);
                    })}
                    </tbody>
                </Table>
            </div>
        );    
     }
        
    customValidateText(text) {
        return (text.length > 0 && text.length < 64);
    }

    updateField(data) {
        const { store } = this.props;
        console.log(data);
        store.update('articles', data);
    }
        
    toggleFakeApi = (e) => {
        const { store } = this.props;
        store.setFakeApi(e.target.checked);
        store.read_all('articles')
    }

    addArticle = (e) => {
        const { store } = this.props;
        var fakeArticle = { title: Faker.commerce.productName(), author: Faker.name.findName() };
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