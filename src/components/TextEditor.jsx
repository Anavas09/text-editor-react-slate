import React, { Component, Fragment } from 'react';
import { Editor } from 'slate-react';
import Icon from 'react-icons-kit';
import {
	bold,
	code,
	italic,
	list,
	underline
} from 'react-icons-kit/feather';
import { ic_title, ic_format_quote } from 'react-icons-kit/md';

import initialValue from '../constants/initialValue'

import { BoldMark, ItalicMark, FormatToolbar } from './index';

export default class TextEditor extends Component {
	state = {
		value: initialValue,
	};

	// On change, update the app's React state with the new editor value.
	onChange = ({ value }) => {
		this.setState({ value });
	};

	onKeyDown = (e, change) => {
		/*
			All our commands start with the user pressing ctrl,
			if they don't, we cancel the action.
		*/

		if (!e.ctrlKey) {
			return;
		}

		e.preventDefault();

		/* Decide what to do based on the key code... */
		switch (e.key) {
			/* When "b" is pressed, add a "bold" mark to the text. */
			case 'b': {
				change.toggleMark('bold');
				return true;
			}
			/* When "c" is pressed, add a "bold" mark to the text. */
			case 'c': {
				change.toggleMark('code');
				return true;
			}
			/* When "h" is pressed, add a "bold" mark to the text. */
			case 'h': {
				change.toggleMark('title');
				return true;
			}
			/* When "i" is pressed, add a "bold" mark to the text. */
			case 'i': {
				change.toggleMark('italic');
				return true;
			}
			/* When "l" is pressed, add a "bold" mark to the text. */
			case 'l': {
				change.toggleMark('list');
				return true;
			}
			/* When "q" is pressed, add a "bold" mark to the text. */
			case 'q': {
				change.toggleMark('quote');
				return true;
			}
			/* When "u" is pressed, add a "bold" mark to the text. */
			case 'u': {
				change.toggleMark('underline');
				return true;
			}
			
			default: {
				return;
			}
		}
	};

	renderMark = (props) => {
		switch (props.mark.type) {
			case 'bold':
				return <BoldMark {...props} />;

			case 'italic':
				return <ItalicMark {...props} />;

			case 'code':
				return <code {...props.attributes}>{props.children}</code>;

			case 'list':
				return (
					<ul {...props.attributes}>
						<li>{props.children}</li>
					</ul>
				);

			case 'underline':
				return <u {...props.attributes}>{props.children}</u>;

			case 'quote':
				return <blockquote {...props.attributes}>{props.children}</blockquote>;

			case 'title':
				return <h1 {...props.attributes}>{props.children}</h1>;

			default: {
				return;
			}
		}
	};

	onMarkClick = (e, type) => {
		/* disabling browser default behavior like page refresh, etc */
		e.preventDefault();
		this.editor.toggleMark(type);
	};

	renderMarkIcon = (type, icon) => (
		<button
			onPointerDown={(e) => this.onMarkClick(e, type)}
			className="tooltip-icon-button"
		>
			<Icon icon={icon}/>
		</button>
	);

	ref = editor => {
		this.editor = editor
	}

	render() {
		return (
			<Fragment>
				<FormatToolbar>
					{this.renderMarkIcon('bold', bold)}
					{this.renderMarkIcon('code', code)}
					{this.renderMarkIcon('title', ic_title)}
					{this.renderMarkIcon('quote', ic_format_quote)}
					{this.renderMarkIcon('italic', italic)}
					{this.renderMarkIcon('list', list)}
					{this.renderMarkIcon('underline', underline)}
				</FormatToolbar>
				<Editor
					spellCheck
					autoFocus
		  			ref={this.ref}
					value={this.state.value}
					onChange={this.onChange}
					onKeyDown={this.onKeyDown}
					renderMark={this.renderMark}
				/>
			</Fragment>
		);
	}
}
