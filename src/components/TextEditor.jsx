import React, { Component } from 'react'
import { Editor } from 'slate-react'
import { Value } from 'slate'
import { BoldMark, ItalicMark } from './index';

// Create the initial value...
const initialValue = Value.fromJSON({
	document: {
		nodes: [
			{
				object: 'block',
				type: 'paragraph',
				nodes: [
					{
						object: 'text',
						text: 'My first paragraph!'
					},
				],
			},
		],
	},
})


class TextEditor extends Component {
	constructor(props){
		super(props)
		
		this.state = {
			value: initialValue
		}
	}

	// On change, update the app's React state with the new editor value.
	onChange({ value }){
		this.setState({ value })
	}

	onKeyDown(e, change){

		/*
			we want all our commands to start with the user pressing ctrl,
			if they don't--we cancel the action.
		*/

		if (!e.ctrlKey) { return }
		e.preventDefault()

		/* Decide what to do based on the key code... */
		switch (e.key) {
			/* When "b" is pressed, add a "bold" mark to the text. */
			case 'b': {
				change.toggleMark('bold')
				return true
			}
			case 'i': {
				change.toggleMark('italic')
				return true
			}

			default: {
				return;
			}

		}
	}

	renderMark(props){
		switch (props.mark.type) {
			case 'bold':
				return <BoldMark {...props} />

			case 'italic':
				return <ItalicMark {...props} />

			default: {
				return;
			}
		}
	}

	render() {
		return (
			<Editor
				value={this.state.value}
				onChange={this.handleOnChange}
				onKeyDown={this.handleOnKeyDown}
				renderMark={this.handleRenderMark}
			/>
		)
	}
}

export default TextEditor