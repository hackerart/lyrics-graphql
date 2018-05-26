import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

class Home extends React.Component {
    renderSongs(song) {
        return (
            <li key={song.id} className="collection-item">
                {song.title}
            </li>
        );
    }
    render() {
        const songs = this.props.data.songs || [];
        return (
            <div>
                <ul className="collection">
                    {songs.map(this.renderSongs)}
                </ul>
                <Link to="/song/new">+</Link>
            </div>
        );
    }
}

const query = gql`
    {
        songs {
            id
            title
        }
    }
`;

export default graphql(query)(Home);
