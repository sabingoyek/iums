(m("div.collapse.navbar - collapse#navbarSupportedContent"), [
        m("ul.navbar-nav.mr-auto", [
          m("li.nav-item.active", [
            m("a.nav-link", { href: "#" }, [m("Programme"), m("span.sr-only"), "(current)"])
          ]),
          m("li.nav-item", [
            m("a.nav-link", { href: "#" }, "Planification")
          ]),
          m("li.nav-item", [
            m("a.nav-link", { href: "#" }, "Suivi")
          ]),
          m("li.nav-item.dropdown", [
            m("a.nav-link.dropdown-toggle#navbarDropdown", { href: "#", role: "button", data- toggle: "dropdown", aria - hashpopup: "true", aria - expanded: "false")}
          ])
        ])        
])
      

m("div.accordion#accordionExample", [
            m("div.card", [
              m("div.card-header#headingOne"+index, [
              m("h2.mb-0", [
                m(
                  'button[class = "btn btn-link btn-btn-lock text-right"][type="button"][data-toggle="collapse"][data-target="#collapseOne'+index+'"][aria-expanded="true"][aria-controls="collapseOne'+index+'"]',
                  v
                )
              ])
            ]),
            m('div#collapseOne'+index+'.collapse.show[aria-labelledby="headingOne'+index+'"][data-parent="#accordionExample"]',
            [m("div.card-body", "UES")])
            ])
          ]);