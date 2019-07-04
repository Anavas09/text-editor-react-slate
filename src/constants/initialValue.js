import { Value } from 'slate'

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

export default initialValue;