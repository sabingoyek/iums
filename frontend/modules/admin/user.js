
var user = {
    list: [],
    current: {},
    index: -1,
    prev : ()=>{
        if(user.index - 1 >= 0){
            user.current = users[user.index - 1]
            user.index --;
        }
    },
    next : ()=>{
        if(user.index + 1 < user.list.length){
            user.current = user.list[user.index + 1]
            user.index ++;
        }
    }
};

next = ()=>{
    if(user.index + 1 < user.list.length){
        user.current = user.list[user.index + 1]
        user.index += 1;
        m.redraw();
    }
}

prev = ()=>{
    if(user.index - 1 >= 0){
        user.current = user.list[user.index - 1]
        user.index --;
        m.redraw();
    }
}

module.export = {
    oninit: (vnode)=>{

        user.list = app.get_userdata();
        user.index = parseInt(vnode.attrs.id);
        user.current = user.list[vnode.attrs.id];

    },
    view : ()=>{
      
        
        return m('.col-md-12',m('.row', 
        [
            m('.col-md-2', 
                m.trust('<svg width="3em" onclick="prev()" height="8em" viewBox="0 0 16 16" class="bi bi-chevron-compact-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9.224 1.553a.5.5 0 0 1 .223.67L6.56 8l2.888 5.776a.5.5 0 1 1-.894.448l-3-6a.5.5 0 0 1 0-.448l3-6a.5.5 0 0 1 .67-.223z"/> </svg>')
            ),
            m('.col-md-8',
                [

                    m('.user_info', [
                        m('h1', user.current.name),
                        m('h4', user.current.title),
                        m('.hr-left'),
                        m('.info_content',  [
                            m('.g1', [
                                m('label', 'User type :'),
                                m('label', user.current.type),
                                m('label', 'Gender : '),
                                m('label', user.current.gender)
                            ]),
                             m('.g1', [
                                m('label', 'Birthday :'),
                                m('label', user.current.birthday),
                                m('label', 'birth place :'),
                                m('label', user.current.birthplace),
                                ])
                            ])
                    ]),
                
                    m('.user_info', 
                        [
                            m('h1', 'Contact'),
                            m('.hr-left'),
                            m('.info_content',
                                [
                                    m('.g1',
                                        [
                                            m('div', [
                                                m('label', "City :"),
                                                m('label', user.current.city)
                                            ]),

                                            m('div',[
                                                m('label', "Phone : "),
                                                m('.phones', [
                                                    user.current.phones && user.current.phones.map((p)=>{
                                                        return m('label', p.number);
                                                    })
                                                ])
                                            ])
                                        ]
                                    ),
                                    m('.g1', 
                                        [
                                            m('label', "E-mail : "),

                                            m('.emails', [
                                                user.current.emails && user.current.emails.map((p)=>{
                                                    return m('label', p.email);
                                                }
                                                )
                                            ])
                                        ]
                                    )
                                ]
                            )
                        ]
                        ),
                        m('.user_info', [
                            m('h1', 'User credientials'),
                            m('.info_content',[
                                m('.g1', [
                                    m('label', "Login :"),
                                    m('label', user.current.login),
                                    m('label', "Expires on :"),
                                    m('label', user.current.loginExp)
                                ])
                            ])
                        ]),
                        m('.user_info', [
                            m('h1', 'User groups'),
                            m('.info_content',[
                                user.current.groups && user.current.groups.map(grp=>{
                                    return m('h3', m('span', {class: "badge badge-success", onclick:()=>{
                                            
                                    }}, grp.name))
                                })
                            ])
                        ])
                ]
            ),
            m('.col-md-2', 
                m.trust('<svg width="3em" onclick="next()" height="8em" viewBox="0 0 16 16" class="bi bi-chevron-compact-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">            <path fill-rule="evenodd" d="M6.776 1.553a.5.5 0 0 1 .671.223l3 6a.5.5 0 0 1 0 .448l-3 6a.5.5 0 1 1-.894-.448L9.44 8 6.553 2.224a.5.5 0 0 1 .223-.671z"/> </svg>'),
            )
            ])
        )
    }
}