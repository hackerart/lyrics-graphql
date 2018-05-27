import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';
import fetchSongs from '../../queries/fetchSongs';

class CreateSong extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: ''
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(e) {
        this.setState({
            title: e.target.value
        });
    }

    onSubmit(e) {
        e.stopPropagation();
        this.props.mutate({
            variables: { title: this.state.title },
            refetchQueries: [{ query: fetchSongs }]
        }).then(() => hashHistory.push('/'));
    }

    render() {
        return (
            <div>
                <Link to='/'>back</Link>
                <h3> create new song</h3>
                <form onSubmit={this.onSubmit}>
                    <input
                        type="text"
                        value={this.state.title}
                        onChange={this.onChange}
                        placeholder="new song"
                    />
                </form>
            </div>
        );
    }
}

const mutation = gql`
    mutation addSong($title: String) {
        addSong(title: $title) {
            id
            title
        }
    }
`;

export default graphql(mutation)(CreateSong);
