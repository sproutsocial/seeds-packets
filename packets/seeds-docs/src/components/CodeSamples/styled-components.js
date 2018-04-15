import outdent from 'outdent';

export const BasicExample = outdent`
	const Test = styled.div\`
		background: papayawhip;
		color: palevioletred;
		height: 100%;
		display: flex;
		align-items: center;

		h2 {
			color: palevioletred;
			text-align: center;
			width: 100%;
		}
	\`

	render(
		<Test><h2>Testing...</h2></Test>
	)
`;
