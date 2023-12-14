var routes = {}, showModal = false, imported_mod;
const outlet ={
    view: (vnode)=> { return m("outlet.outlet", vnode.children)}
};

var navBar = {
    view :(vnode)=> {
        return m('header#header',
        m("nav.navbar.navbar-expand-lg.navbar-light.bg-light",
            {style: 'background-color: #fff !important; height: 56px'}, [
            m('a.navbar-brand.sidedrawer-toggle.sidedrawer-toggle.mui--hidden-xs.mui--hidden-sm.js-hide-sidedrawer', m('img', {src:'assets/outline-menu.svg'})),
            m("a.navbar-brand.mname[href='#']", vnode.attrs.mname || "PORTAL"),
                m('i', {class:'zmdi zmdi-chevron-right'}),
                m('h3', {style:'margin: 1px 0 0 10px; text-transform: uppercase'}, vnode.attrs.cname),
            m('button.navbar-toggler[data-toggle="collapse"][data-target="#navbarSupportedContent"][aria-controls="navbarSupportedContent"][aria-expanded="false"][aria-label="Toggle navigation"]', {type:"button"},
                m('span.navbar-toggler-icon')
            ),
            // m('.navbar-nav.mr-auto'),
            m('.collapse.navbar-collapse#navbarSupportedContent', {style:'margin-right: 100px'}, [
                m('.navbar-nav.mr-auto'),
                m("div.form-inline.my-2 my-lg-0",
                    m('ul.navbar-nav.ml-auto', [
                        m('li.nav-item.dropdown', [
                            m('a.nav-link.dropdown-toggle.no-after[href=#][id=navbarDropdown][role=button][data-toggle=dropdown][aria-haspopup=true][aria-expanded=false]', m('span.fas.fa-th')),
                            m('div#modules[class="dropdown-menu"][aria-labelledby="navbarDropdown"]',
                            vnode.attrs.modules.map(function (value) {
                                    return m('a.dropdown-item', {onclick:vnode.attrs.changeroute, name: value.name},
                                        m('i', {class:"zmdi zmdi-view-dashboard", style:'margin: 7px'})
    
                                        , value.name);
                                }))
                        ]),
                        // m('li.nav-item.dropdown', [
                        //     m('a.no-after[class="nav-link dropdown-toggle"][href="#"][id="navbarDropdown"][role="button"][data-toggle="dropdown"][aria-haspopup="true"][aria-expanded="false"]', m('span.far.fa-bell')),
                        //     m('div#notifications[class="dropdown-menu"][aria-labelledby="navbarDropdown"]',
                        //     vnode.state.notifications.map(function (value) {
                        //             return m('a.dropdown-item', value.name);
                        //         }))
                        // ]),
                        m('li.nav-item.dropdown', [
                            m('a.no-after[class="nav-link dropdown-toggle"][href="#"][id="navbarDropdown"][role="button"][data-toggle="dropdown"][aria-haspopup="true"][aria-expanded="false"]', m('span.far.fa-user-circle')),
                            m('div#profile[class="dropdown-menu"][aria-labelledby="navbarDropdown"]')
                        ])
                    ])
                )
            ])
        ]))
    }
}

const sideBar = {

    view : (vnode) => { 
        
       return m('.mui--no-user-select#sidedrawer',[
         m('.mui--appbar-line-height#sidedrawer-brand',
             m('span.mui--text-title.t', {id:'minimo'}, "PEHU")
         ),
         m('.mui-divider'),
         m('.content', m('ul.menu', [
             m('li.dashboard', m('a',{href:"#!"},[
                 m('i.fas.fa-tachometer-alt'),
             ], "Dashboard")),
             m('ul.secondary_menu',
                 vnode.attrs.items.map( (v) => {
                     return  m('li',[
                         m('i', {class: v.menu.icon}),
                         m('a',{href:"#!"+v.ref}, v.menu.name)
                     ])
                 })
             )
             // m('ul.secondary_menu',
             //     globalVar.sidebar.items.map( (v) => {
             //         return  m('li',[
             //             m('i', {class: v.menu.icon}),
             //             m('a',{href:"#!"+v.ref}, v.menu.name)
             //         ])
             //     })
             // )

         ]))

     ]
 )
    }
};

const wspace = {
    view : (vnode)=>{
        return m('#content-wrapper',
        [
            m('.mui--appbar-height'),
            m('div.action_bar',[
                //  m('h6',{style:'margin-top: 1%'}, globalVar.module.actionsbar.currentMenu),
                m('.alert-title', {style:'display: inline-flex;'}, [
                    m('h3', vnode.attrs.cname),
                    m('.actions#actions',
                    vnode.attrs.ws_actions.map( (act) => {
                                 return  m('a.actions__item',{onclick: act.fn, class:act.icon? act.icon : 'zmdi zmdi-cloud-outline-alt'})
                             })
                         ) 
                ])
              
            ]),
             m('.mui-container-fluid', m('.wspace', {id:'wspace'},
                 [
                     vnode.children.length > 0 ? m(outlet, vnode.children): m('.col-md-12', [
                         m('.col-md-12',  {style:'height: 100%'}, [
                             m('.alert-content', {style: 'height: -webkit-fill-available; background-color: #fff; border: 1px solid lightgray; '})

                         ])
                     ])
                 ]
             ))
        ]);
    }
   
};



const app = function (){
    const state = {
        showModal: false,
        actions: [],
        modal: {
            title: '',
            content : ()=>{
                return {
                    view: ()=>{
                       return m('label', 'TEST');
                    }
                }
            },
            buttons:[]
        }
    };
    let userdata = null;
    return {
        set_userdata : (data)=>{
            userdata = data;
        },
        get_userdata: ()=>{
            return userdata;
        },
        openModal: (comp) => {
            console.log("Open Modal");
            state.showModal = true;
            state.modal.content = comp.content;
            state.modal.title = comp.title;
            state.modal.buttons = comp.buttons;
        },
        closeModal : ()=>{
            state.showModal = false;
        },
        setActions: (actions) => {
            console.log("setAction");
            state.actions.splice(0,state.actions.length)        
            actions.forEach(elt => {
                state.actions.push(elt);
            })
            m.redraw();
        },        
        getActions : ()=>{
            return state.actions;
        },
        getModalContent: ()=>{
            return state.modal;
        },
        isOpened : ()=>{
            return state.showModal;
        },
        go:(r)=>{
            m.route.set(r);
        },
        request: (r) => {
            return(m.request(r));
        }

    }
}();

const portail = ()=>{

  
    let modules = [], //liste des modules de l'utilisateur courant
     mname= 'Welcome', //Le nomdu module courant
     cname='Tasks', //Le nom du composant courant
     items= [], // tableau des menus de la sidebar
     linked= [] //Tableau des modules lies
     ws_actions = app.getActions(); //current component actions

     ; //
    let getmodules = (args) =>{
        modules.length = 0;
        args.forEach(elt => {
            modules.push(elt);
        });
    };
  
    let setlinked = (args) =>{
        linked.length = 0;
        args.forEach(elt => {
            linked.push(elt);
        });
    };
    

    let changeroute = (e)=>{
        var module = e.target.attributes.name.value;
        
        var ref, defpath = null;
        return m.request(
            {
                method: 'GET',
                url: './modules/'+ module + '/' + module + '.json'
            }
        ).then( (md) => {

            let menus = [];
            md.paths.forEach (elt=>{
    
                ref = '/home/' + md.name + '/' + elt.component;
                if ( elt.menu)              
                    menus.push({ref:ref, menu: elt.menu});
                
                if(elt.default && defpath == null)
                    defpath = ref;
               
            })
            m.route.set(defpath);
            items = menus;
            mname = md.name;
        
        })
    }

    return {
        oninit: ()=>{
            m.request(
                {
                    method: 'GET',
                    url: './modules.json'
                }
            ).then((m)=> modules = m)
        },

        view:(vnode)=>
            [
                m(sideBar, {items}), 
                m(navBar, {modules, mname, cname, items, changeroute}),
                m(wspace,  {ws_actions, cname}, vnode.children),
                app.isOpened() && m(Modal, {
                    title: app.getModalContent().title,
                    content: app.getModalContent().content,
                    buttons: app.getModalContent().buttons,
                    onClose(id) {
                        // state.showModal = false
                    }
                  })
            ]
        
    }
}

/**
 * Définition de la route par défaut
 */
// var components = {};

routes['/home'] = {render: ()=>{
    return m(portail)
    }
};
routes['/login'] = {render: ()=>{
    return m(login)
    }
};
routes['/home/:module/:component'] = 
    {
    
        onmatch:function (args) {
            console.log('1');
            url = './modules/'+ args.module + '/' + args.component + '.js';
            console.log(url);
        return m.request(
            {
                method: "GET",
                url: url,
                extract: function(xhr) {
                    imported_mod = new Function('var module = {}; ' + xhr.responseText + "; return module.export; ")();
                    return imported_mod;
                }
            })
        }, render: (vnode) =>{
            
            return m(portail, vnode) ;  
        }
    };

routes['/home/:module/:component/:subcomp'] = {
    onmatch:function (args) {
        console.log('2');
        url = './modules/'+ args.module + '/' + args.component + '/' + args.subcomp +'.js';
    return m.request(
        {
            method: "GET",
            url: url,
            extract: function(xhr) {
                return new Function('var module = {}; ' + xhr.responseText + "; return module.export; ")();
                
            }
        })
    }, render: (vnode) =>{
        
        return m(portail, m(imported_mod,  vnode)) ;  
    }
}


m.route.prefix = "#!";

var maincontent = document.querySelector('#maincontent')
m.route(maincontent, '/login', routes);
