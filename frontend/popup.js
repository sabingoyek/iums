
var dialog,
    openDialog,
    closeDialog,
    dialogContainer = null;

dialog = {};

dialog.view = function(vnode) {
    return m('.dialog', m('.dialogContent', [
        // m('h2', 'modal'),
        m(outlet, vnode.children),
        m('button', {
            style: 'float: right; margin-right: 12px',
            class: 'btn btn-light',
            onclick: closeModal
        }, 'Cancel')
    ]));
};


function forceRedraw(){
    var dom = null;

    for(let i = globalVar.routing.levels.length -1; i >= 0; i--) {
        dom = m(globalVar.routing.levels[i], dom);
    }

    return  dom;
}


closeModal = function() {
    console.log('yes');
    m.mount(dialogContainer, null);
    let content = document.getElementById('maincontent');
    m.mount(content, {view: function () {
            return forceRedraw();
        }});
};

openModal = function(content) {
    if(dialogContainer == null){
        dialogContainer = document.getElementById('modals');
    }
    console.log(dialogContainer);
    m.mount(dialogContainer, {view:

        function () {
            return m(dialog, m(content));
        }

    });
};




