import React, {Component} from 'react'
import {RouteComponentProps} from 'react-router'

type RouteParams = {
	id: string, // из /posts/:id
}

interface IPost {
	title?: string,
	body?: string,
}

type PostState = {
	post: IPost,
}

export async function http<T>(request: string): Promise<T> {
	const response = await fetch(request)
	const body = await response.json()

	return body
}

class Post extends Component<RouteComponentProps<RouteParams>, PostState> { // RouteParams как дженерик
	state = {
		post: {
			title: '',
			body: '',
		},
	}

	async componentDidMount() {
		const id = this.props.match.params.id || ''
		try {
			const post = await http<IPost>(`https://jsonplaceholder.typicode.com/posts/${id}`) // дженерик тип http

			this.setState({post})
		} catch (e) {

		}
	}

	render() {
		const {post} = this.state
		const {title, body} = post

		return (
			<section>
				<h1>Post</h1>
				<article>
					<h2>{title}</h2>
					<p>{body}</p>
				</article>
			</section>
		)
	}
}

export default Post
