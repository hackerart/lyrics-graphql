import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import fetchSongs from '../../queries/fetchSongs';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.deleteSong = this.deleteSong.bind(this);
        this.renderSongs = this.renderSongs.bind(this);
    }
    deleteSong(id) {
        this.props.mutate({
            variables: { id }
        }).then(() => this.props.data.refetch());
    }
    renderSongs({ id, title }) {
        return (
            <li key={id} className="collection-item">
                <Link to={`/songs/${id}`}>{title}</Link>
                <i
                    className="material-icons right"
                    style={{ display: 'block', color: 'red' }}
                    onClick={this.deleteSong.bind(this, id)}
                >
                    delete
                </i>
            </li>
        );
    }
    render() {
        const { songs } = this.props.data;
        if (!songs) { return <div>loading...</div>; }
        return (
            <div>
                <ul className="collection">
                    {songs.map(this.renderSongs)}
                </ul>
                <Link
                    to="/songs/new"
                    className="btn-floating btn-medium blue right"
                >
                    <i className="material-icons">add</i>
                </Link>
            </div>
        );
    }
}

const mutation = gql`
    mutation deleteSong($id: ID) {
        deleteSong(id: $id) {
            id
        }
    }
`;

export default graphql(mutation)(graphql(fetchSongs)(Home));
