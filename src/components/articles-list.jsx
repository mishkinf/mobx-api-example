import React, {Component} from 'react';
import {observer} from 'mobx-react';
import { Table } from 'react-bootstrap';
import Faker from 'faker';
import Toggle from 'react-toggle';
import InlineEdit from 'react-edit-inline';
import Radium from 'radium';

@observer
class ArticlesList extends Component {
  render() {
    const { store: { articles }, store } = this.props;

    return (
      <div style={styles.main}>
        <button style={styles.input} onClick={this.addArticle}>Add Article</button>

        <br/>

        <label style={styles.toggle}>
          <Toggle defaultChecked={store.isFakeApi} onChange={this.toggleFakeApi} /> Use Fake Api
        </label>

        { articles.data.length > 0 ? this.renderArticlesTable() : <h3>There are no articles yet!</h3>}
      </div>
    );
  }

  renderArticlesTable() {
    return (
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
          { this.renderArticles() }
        </tbody>
      </Table>
    );
  }

  renderArticles() {
    const { store: { articles }, store } = this.props;

    return articles.data.map(article => {
      return (
        <tr key={article.id}>
          <td>{article.id}</td>
          <td>
            <InlineEdit
              activeClassName="editing"
              text={article.title}
              paramName="title"
              change={(data) => this.updateField({id: article.id, title: data.title})} />
          </td>
          <td>
            <InlineEdit
              activeClassName="editing"
              text={article.author}
              paramName="author"
              change={(data) => this.updateField({id: article.id, author: data.author})} />
          </td>
          <td><button onClick={() => store.articles.delete(article.id)}>Delete</button></td>
        </tr>);
      }
    );
  }

  customValidateText(text) {
    return (text.length > 0 && text.length < 64);
  }

  updateField(data) {
    const { store: { articles } } = this.props;
    
    articles.update(data);
  }

  toggleFakeApi = (e) => {
    const { store: { setFakeApi, articles } } = this.props;

    setFakeApi(e.target.checked);
    articles.readAll()
  }

  addArticle = (e) => {
    const { store: { articles } } = this.props;

    const fakeArticle = { title: Faker.commerce.productName(), author: Faker.name.findName() };
    articles.create(fakeArticle);
  }
};

const styles = {
  input: {
    fontSize: 18,
    padding: 5
  },
  noContent: {
    fontSize: 30,
    textAlign: 'center',
    lineHeight: 10
  },
  toggle: {
    float: 'right'
  },
  main: {
    fontSize: 30
  }
}

export default Radium(ArticlesList);
