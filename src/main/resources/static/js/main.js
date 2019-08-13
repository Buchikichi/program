/**
 * Main.
 */
document.addEventListener('DOMContentLoaded', ()=> {
	console.log('loaded.');

	$('#tree').jstree({
		core: {
			dblclick_toggle: false,
		},
		dnd: {
			is_draggable: true,
		},
		plugins: ['checkbox', 'dnd'],
	});
	$('#tree').jstree('open_all');
//	$('li').draggable();
//	$('li.element').selectable();
//	$('.root > li').sortable();
//	$('li').sortable();
});
