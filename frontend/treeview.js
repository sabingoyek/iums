// inspiré de https://github.com/CJEnright/mithril-tree-example/blob/master/file-tree-script.js
let tree = {};
let actions;
let setter;
let hook;
var treeview = {};

tree.view = function(vnode) {
    if (vnode.attrs.children) { // Then it is a folder
        if (vnode.attrs.isOpen) {
            return m("li",
                [
                    m('div',[
                        m('span', { onclick: function () { tree.click(vnode);} }, " [-] "),
                        m('span', { onclick: function () { hooker(vnode); } }, vnode.attrs.name),
                                actions.map(function(action){
                                return m('span.action-item', {class:action.icon, onclick: ()=>{action.fn(vnode.attrs)}, })
                        })
                    ]),
                    m("ul",
                        vnode.attrs.children.map(function (v) {
                             v.actions = vnode.attrs.actions;
                             //v.hook = vnode.attrs.hook;
                            // v.setter = vnode.attrs.setter;
                        return m(tree, v);
                    })
                )
                ]
            ) ;
        }
        else {
            return m("li", [
                m('div', [
                    m('span', { onclick: function () { tree.click(vnode);} }, " [+] " ),
                    m('span', { onclick: function () { hooker(vnode);} }, vnode.attrs.name),
                    actions.map(function(action){
                        return m('span.action-item', {class:action.icon, onclick: ()=>{console.log('enfants'); action.fn();}})
                    })
                ])

            ]);
        }
    }
    else {
        return  m("li", [
            m('div', [
                m('span', { onclick: function () { tree.click(vnode);} }, ""),
                m('span', { onclick: function () { hooker(vnode); } }, vnode.attrs.name),
                 actions.map(function(action){
                    return m('span.action-item', {class:action.icon,  onclick: ()=>{ action.fn(vnode.attrs); }})
                })
            ])

        ]);
    }
};

treeview.oninit  = (vnode) =>{
    actions = vnode.attrs.actions;
    hook = vnode.attrs.hook;
    setter = vnode.attrs.setter;
};

treeview.view = (vnode) => {
    return m('ul.root.noselect#rootapp', vnode.attrs.nodes.map(function (comp) {
        // comp.actions = vnode.attrs.actions;
        // comp.hook = vnode.attrs.hook;
        // comp.setter = vnode.attrs.setter;
        return  m(tree, comp)
    }))
};
var hooker = function(vnode){

    if(setter)
        setter(vnode.attrs);

    if(hook)
        hook(vnode.attrs);
};
tree.click = function(vnode) {
    if(vnode.attrs.children) { // Then it is a folder
        vnode.attrs.isOpen = !vnode.attrs.isOpen;
    }

};
