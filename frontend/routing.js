var routes = {};

// Verification des droit d'acces à la route
function checkright(){
    return true;
}

// /**
//  * Définition de la route par défaut
//  */
// routes['/home'] = portail;
// routes['/home/:module/:component'] = 
//     {
    
//         onmatch:function (args) {
//         return m.request(
//             {
//                 method: "GET",
//                 url: './modules/'+ args.module + '/' + args.component + '.js' ,
//                 extract: function(xhr) {
//                     return  new Function('var module = {}; ' + xhr.responseText + "; return module.export; ")();
//                 }
//             })
//         }, render: (vnode) =>{ return m(portail, m(vnode, {setactions})) ;  }
//     };



// m.route.prefix = "#!";

// var maincontent = document.querySelector('#maincontent')
// m.route(maincontent, '/home', routes);
