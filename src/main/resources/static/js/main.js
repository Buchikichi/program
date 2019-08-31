/**
 * Main.
 */
document.addEventListener('DOMContentLoaded', ()=> {
	let tree = $('#tree');
	tree.jstree({
		plugins: ['dnd'],
		dnd: {
			is_draggable: true,
		},
		core: {
			themes: {
				icons: false,
				dots: false,
				responsive: true,
				variant: 'large',
			},
			dblclick_toggle: false,
			multiple: false,
			check_callback: (op, node, parent)=> {
//console.log('op:' + op);
				if (op !== 'move_node') {
					return true;
				}
				let parentNode = document.getElementById(parent.id);
//console.log(parentNode);
				return parentNode.classList.contains('control');
			},
		},
	}).on('ready.jstree', ()=> {
//console.log('ready.jstree.');
		tree.jstree('open_all');
	});
	new TreeView(tree.jstree(true));
});

function checkTree(op, node, parent) {
}

class TreeView {
	constructor(tree) {
		this.tree = tree;
		this.setupButtons();
	}

	setupButtons() {
		let processButton = document.getElementById('processButton');
		let ifButton = document.getElementById('ifButton');
		let removeButton = document.getElementById('removeButton');
		let executeButton = document.getElementById('executeButton'); 

		processButton.addEventListener('click', ()=> {
			this.addNode({text: '//nop', state:{selected: true}});
		});
		ifButton.addEventListener('click', ()=> {
			let id = this.addNode({text: 'if (true)', state:{selected:true, opened:true}, li_attr:{class:'control'}});
//console.log('id:' + id);
			this.addNode({text: '//nop', state:{selected: true}});
		});
		removeButton.addEventListener('click', ()=> this.removeSelectedNode());
		executeButton.addEventListener('click', ()=> evaluateScript(this.makeScript()));
	}

	addNode(node) {
		let selected = this.tree.get_selected();
		let isControl = selected != '' ? document.getElementById(selected).classList.contains('control') : false;
		let pos = isControl ? 'first' : 'after';

		if (selected.length == 0) {
			selected = this.tree.get_node('.root');
			pos = 'last';
		}
//console.log(pos);
		this.tree.deselect_node(selected);
//		this.tree.redraw(true);
		return this.tree.create_node(selected, node, pos);
	}

	removeSelectedNode() {
		let selected = this.tree.get_selected();
		if (selected == '') {
			return;
		}
		let node = document.getElementById(selected);
		let next = node.nextSibling;
		let prev = node.previousSibling;
		let parent = node.parentNode;
		let isEmpty = false;

//console.log(next);
		if (next != null && next.classList.contains('jstree-leaf')) {
			this.tree.select_node(next);
		} else if (prev != null && prev.classList.contains('jstree-leaf')) {
			this.tree.select_node(prev);
		} else if (parent != null && !parent.classList.contains('root')) {
			// empty parent
			this.tree.select_node(parent);
			isEmpty = true;
		}
		this.tree.delete_node(selected);
		if (isEmpty) {
			this.addNode({text: '//nop', state:{selected: true}});
		}
	}

	makeScript() {
		let children = document.querySelector('#tree .root').querySelectorAll('.jstree-node');
		let lastLevel = 0;
		let lines = [];

		lines.push('function* declaredScript() {');
		Array.from(children, li => {
			let level = li.getAttribute('aria-level');
			let isControl = li.classList.contains('control');
			let content = li.querySelector('a');
			let line = content.textContent;

			if (level < lastLevel) {
				lastLevel = level;
				lines.push('}');
			}
			if (isControl) {
				// control flow
				line += '{';
			} else {
				line += ';';
			}
//console.log(line);
			lines.push(line);
			if (!isControl) {
				lines.push('yield {line:' + lines.length + ", id:'" + li.id + "'};");
			}
			lastLevel = level;
		});
		lines.push('}');
		return lines.join('\n');
	}
}

function evaluateScript(script) {
//console.log(script);
	eval(script);
	let iterator = declaredScript();
	let tree = $('#tree').jstree(true);
	let lastId = null;
	let func = ()=> {
		let obj = iterator.next()

		if (obj.done) {
			return;
		}
		tree.deselect_node(lastId);
		tree.select_node(obj.value.id);
		lastId = obj.value.id;
		setTimeout(()=> {
			func();
		}, 200);
	};
	func();
}
