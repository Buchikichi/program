/**
 * Main.
 */
document.addEventListener('DOMContentLoaded', ()=> {
	console.log('loaded.');

	$('#tree').jstree({
		core: {
			dblclick_toggle: false,
			check_callback: checkTree,
			themes: {
				icons: false,
				dots: false,
				responsive: true,
				variant: 'large',
			}
		},
		dnd: {
			is_draggable: true,
		},
		plugins: ['dnd'],
	});
	$('#tree').jstree('open_all');
});

function checkTree(operation, node, node_parent, node_position, more) {
	if (operation !== 'move_node') {
		return;
	}
	if (node_parent.li_attr == null) {
		return false;
	}
	let clazz = node_parent.li_attr.class;

	return clazz.indexOf('process') == -1;
}
