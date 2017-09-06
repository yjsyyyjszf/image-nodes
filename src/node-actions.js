import ImageMath from "./image-math.js";

class NodeActions {
	runAction(action, args) {
		var actions = {
			add: () => { return this.runAdd(args); },
			custom: () => { return this.runCustom(args); },
			fit: ()=> { return this.runFit(args); },
			image: () => { return this.runImage(args); },
			view: () => { return this.runView(args); }
		}
		return actions[action]();
	}

	runAdd(args) {
		var node = args.node;
		var data = node.getInputNode(0).runNode();
		var data2 = node.getInputNode(1).runNode();
		var dataOut = ImageMath.getBlankImageData(data.width, data.height);
		ImageMath.addImage(data, data2, dataOut);
		return dataOut;
	}
	
	runCustom(args) {
		return null;
	}

	runFit(args) { 
		var node = args.node;
		var data = Array(5);
		data[0] = node.getInputNode(0).runNode();
		data[1] = node.getInputNode(1).runNode();
		data[2] = node.getInputNode(2).runNode();
		data[3] = node.getInputNode(3).runNode();
		data[4] = node.getInputNode(4).runNode();
		var dataOut = ImageMath.getBlankImageData(data[0].width, data[0].height);
		var times = [15, 30, 45, 60, 75];
		ImageMath.linearImageMap(times, data, dataOut);
		return dataOut;
	}

	runImage(args) {
		return ImageMath.getImageData(args.node.img);
	}
	
	runView(args) {
		var node = args.node;
		var data = node.getInputNode(0).runNode();
		var img = ImageMath.createImg(data);
		img.onload = () => { node.createImg(img.src); }		
		return img;
	}
}

export default new NodeActions();
