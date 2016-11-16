import React, {Component} from 'react';
import {observer} from 'mobx-react';
import { Table } from 'react-bootstrap';
import Faker from 'faker';
import Toggle from 'react-toggle';
import InlineEdit from 'react-edit-inline';

@observer
class RandomList extends Component {
     render() {
        const { store } = this.props;
        const randomstuff = store.randomstuff;

        return (
            <div style={style}>
                <button style={inputStyle} onClick={this.addSomething}>Add Something</button>

                <Table striped bordered condensed hover>
                    <thead>
                    <tr>
                        <th>Something</th>
                    </tr>
                    </thead>
                    <tbody>
                    {randomstuff.data.map(something => {
                        return (<tr>
                            <td>{something.name}</td>
                        </tr>);
                    })}
                    </tbody>
                </Table>
            </div>
        );
     }

    addSomething = (e) => {
        const { store } = this.props;
        var fakeThing = { name: Faker.name.findName() };
        store.randomstuff.create(fakeThing);
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

export default RandomList;
