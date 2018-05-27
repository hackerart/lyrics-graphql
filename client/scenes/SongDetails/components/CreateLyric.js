import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class CreateLyric extends React.Component {
    constructor(props) {
        super(props);
        this.state = { content: '' };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({ content: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.mutate({
            variables: {
                id: this.props.id,
                content: this.state.content
            }
        });
        this.setState({ content: '' });
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input
                    type="text"
                    onChange={this.onChange}
                    value={this.state.content}
                    placeholder="new lyric"
                />
            </form>
        );
    }
}

const mutation = gql`
    mutation addLyric($id: ID, $content: String) {
        addLyricToSong(songId: $id, content: $content) {
            id
            lyrics {
                id
                content
                likes
            }
        }
    }
`;

export default graphql(mutation)(CreateLyric);