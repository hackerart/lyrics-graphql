import React from 'react';
import { Link } from 'react-router';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import CreateLyric from './components/CreateLyric';
import LyricList from './components/LyricList';

const SongDetails = (props) => {
    const { song } = props.data;
    if (!song) { return <div>loading...</div>; }
    return (
        <div>
            <div><Link to="/">back</Link></div>
            <h3>{song.title}</h3>
            <LyricList lyrics={song.lyrics} />
            <CreateLyric id={song.id} />
        </div>
    );
}

const query = gql`
    query song($id: ID!) {
        song(id: $id) {
            id
            title
            lyrics {
                id
                content
                likes
            }
        }
    }
`;

export default graphql(query, {
    options: ({ params: { id } }) => ({ variables: { id }})
})(SongDetails);