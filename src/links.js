
class Links { 
	
	constructor() {
		this.links = []
	}

	addLink(link) {
		this.links.push(link);
	}

	removeLink(link) {
		link.removeLink();
		var index = this.links.indexOf(link);
		this.links.splice(index, 1);
	}

	update() {
		this.links.forEach( (link) => {
			link.updateLink();
		})
	}

}

export default new Links();
