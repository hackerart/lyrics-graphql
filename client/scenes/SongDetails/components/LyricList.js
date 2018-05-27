import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class LyricList extends React.Component {
    likeLyric(id, likes) {
        this.props.mutate({
            variables: { id },
            optimisticResponse: {
                __typename: 'Mutation',
                likeLyric: {
                    id, likes: likes + 1,
                    __typename: 'LyricType'
                }
            }
        });
    }
    render() {
        return (
            <ul className="collection">
                {this.props.lyrics.map(lyric =>
                    <li
                        key={lyric.id}
                        className="collection-item"
                    >
                        <span>{lyric.content}</span>

                        <span
                            className="right"
                            style={{ display: 'flex', alignItems: 'center' }}
                        >
                            <span style={{ marginRight: '10px' }}>{lyric.likes}</span>
                            <i
                                className="material-icons"
                                style={{ cursor: 'pointer' }}
                                onClick={this.likeLyric.bind(this, lyric.id, lyric.likes)}
                            >
                                thumb_up
                            </i>
                        </span>
                    </li>)}
            </ul>
        );
    }
}

const mutation = gql`
    mutation likeLyric($id: ID) {
        likeLyric(id: $id) {
            id
            likes
        }
    }
`;

export default graphql(mutation)(LyricList);