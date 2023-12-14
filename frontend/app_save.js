var navBar = {}, sideBar = {}, wspace = {},
  outlet = {}, portail = {};

var globalVar = {
    module: {
    name:'',
    menus: [],
    routes: [],
    linkedmods: [],
    actionsbar: {
        actions: [],
        currentMenu: ''
    },
    
    sharedData: {},
    },
    routing:{
    outlet: [],
    levels: []
    },

    set_module: (module)=>{
        globalVar.module.name = module.name;
    },
    get_module_name: ()=>{
        return globalVar.module.name;
    },
    // actions setters
    reset_actions: ()=>{
        globalVar.module.actionsbar.actions.length = 0;
    },
    set_actions: (items)=>{
        globalVar.actionsbar.actions.push(items);
    },    
    /*menus setters */
    reset_menus: ()=>{
        globalVar.module.menus.length = 0;
    },
    add_menu: (item)=>{
        globalVar.module.menus.push(item);
    }
    
};

// function actionsbar(){
//     var 
// }



navBar.modules = null;
navBar.name = 'TOTO1';
navBar.modules = ['TOTO2'];
navBar.notification = ['TOTO3'];

navBar.view = (vnode)=> {
    return m('header#header',
    m("nav.navbar.navbar-expand-lg.navbar-light.bg-light",
        {style: 'background-color: #fff !important; height: 56px'}, [
        m('a.navbar-brand.sidedrawer-toggle.sidedrawer-toggle.mui--hidden-xs.mui--hidden-sm.js-hide-sidedrawer', m('img', {src:'assets/outline-menu.svg'})),
        m("a.navbar-brand.mname[href='#']", globalVar.module.name || "PORTAL"),
            m('i', {class:'zmdi zmdi-chevron-right'}),
            m('h3', {style:'margin: 1px 0 0 10px; text-transform: uppercase'}, globalVar.module.actionsbar.currentMenu),
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
                        vnode.state.modules.map(function (value) {
                                return m('a.dropdown-item', {onclick:changeRoute, name: value.name},
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
};

navBar.oninit =  (vnode) => {
    return m.request({
        method: "GET",
        url: "./modules/config.json"
    }).then( (data) => {
        vnode.state.modules = data.modules;
    })
};




sideBar.view = (vnode) => {
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
                    globalVar.module.menus.map( (v) => {
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
};


outlet.view = (vnode) =>{
    return m("outlet.outlet", vnode.children)
};


wspace.view = (vnode) => {
    return m('#content-wrapper',
        [
            m('.mui--appbar-height'),
            m('div.action_bar',[
                 m('h6',{style:'margin-top: 1%'}, globalVar.module.actionsbar.currentMenu),
                globalVar.module.actionsbar.actions.length > 0 ? m('.actions',
                        globalVar.module.actionsbar.actions.map( (act) => {
                            return  m('a.actions__item',{onclick: act.fn, class:act.icon? act.icon : 'zmdi zmdi-cloud-outline-alt'})
                        })
                    ) : m('.alert-title', {style:'display: inline-flex;'}, [
                    m('i.zmdi.zmdi-notifications', {style:'font-size: 32px;     margin-left: 14px;'}),
                    m('h3', 'Tasks'),
                ]),
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
};

portail.view = function (vnode) {
    return m('div', [m(sideBar), m(navBar), m(wspace, vnode.children)])
};