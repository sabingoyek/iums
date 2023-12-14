var login = {};
signin = function(){
    log = 'yes';
};
login.view = function (vnode) {
    return m('.container-fluid', m('div',
       m('form.login', [
            m('.form-group', [
                m('label', {for: 'email'}, 'Email'),
                m('input', {type: 'email', class:'form-control', id:'email', placeholder: 'Enter your email address ' })
            ]),
           m('.form-group', [
               m('label', {for: 'passwd'}, 'Password'),
               m('input', {type: 'password', class:'form-control', id:'passwd', placeholder: 'Enter your password' })
           ]),
           m('a',
               {
                   class:'btn btn-primary',
                   href: '#!/home',
                   style: 'width: 50%;',
                   onclick: ()=>{}
                }, 'Sign in'),
           m('button', {type: 'submit', class:'btn btn-light', style: 'width: 50%;'}, 'I forget my password')
       ]),

    ));
};

