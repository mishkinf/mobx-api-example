import React, {Component, PropTypes} from 'react';
import {observer} from 'mobx-react';
import { Table } from 'react-bootstrap';
import Faker from 'faker';
import Toggle from 'react-toggle';
import InlineEdit from 'react-edit-inline';
import Radium from 'radium';

@observer
class ArticlesList extends Component {
  static propTypes = {
    articles: PropTypes.object.isRequired,
    isFakeApi: PropTypes.bool.isRequired,
    setFakeApi: PropTypes.func.isRequired
  };

  render() {
    const { articles , isFakeApi } = this.props;

    return (
      <div style={styles.main}>
        <button style={styles.input} onClick={this.addArticle}>Add Article</button>

        <br/>

        <label style={styles.toggle}>
          <Toggle defaultChecked={isFakeApi} onChange={this.toggleFakeApi} /> Use Fake Api
        </label>

        { articles.data.length > 0 ? this.renderArticlesTable() : <h3>There are no articles yet!</h3>}
      </div>
    );
  }

  renderArticlesTable() {
    return (
      <Table>
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
    const { articles } = this.props;

    return articles.data.map(article => {
      return (
        <tr key={article.id.toString() + article.title}>
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
          <td><button onClick={() => articles.delete(article)}>Delete</button></td>
        </tr>);
      }
    );
  }

  customValidateText(text) {
    return (text.length > 0 && text.length < 64);
  }

  updateField(data) {
    const { articles } = this.props;

    articles.update(data);
  }

  toggleFakeApi = (e) => {
    const { setFakeApi, articles } = this.props;

    setFakeApi(e.target.checked);
    articles.readAll()
  }

  addArticle = (e) => {
    const { articles } = this.props;

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
