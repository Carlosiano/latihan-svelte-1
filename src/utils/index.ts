let capitalizeFirstLetter = (string: string) => {
	return string.charAt(0).toUpperCase() + string.slice(1);
};
let getJsVariables = {
	cssVariables: function (node: any, variables: any) {
		this.setCssVariables(node, variables);
		let setCssVariables = this.setCssVariables;
		return {
			update(variables: any) {
				setCssVariables(node, variables);
			}
		};
	},
	setCssVariables: function (node: any, variables: any) {
		for (const name in variables) {
			node.style.setProperty(`--${name}`, variables[name]);
		}
	}
};

let navLinkActive = {
	value: 0,
	get: function () {
		return this.value;
	},
	set: function (value: number) {
		this.value = value;
	}
};

export { navLinkActive, getJsVariables, capitalizeFirstLetter };
