var ecus = [];
var ues = [];
var idf = 1;
var ids = 1;
popup = {
  name: "",
  from: "",
  modal: {
    title: "Ajout d'une seances de cours",
    content: {
      view: function (v) {
        return [
          m("form-group", [
            m("br"),
            m("label", "Enseignant:  "),
            m("select", [
              m("option", "Dr Toto"),
              m("option", "Dr Feyman"),
              m("option", "Dr Abel"),
              m("option", "Dr Alice"),
              m("option", "Dr NGOM"),
            ]),
            m("br"),
            m("br"),
            m("label", "Duree:  "),
            m("input"),
            m("br"),
            m("br"),
          ]),
        ];
      },
    },
    buttons: [
      {
        type: "button",
        click: () => {
          popup.create();
        },
        text: "Save",
      },
      {
        type: "button",
        click: app.closeModal,
        text: "Cancel",
      },
    ],
  },
};

module.export = () => {
  return {
    oninit: function (vnode) {
      app.setActions([
        {
          icon: "zmdi zmdi-file-plus",
          fn: () => {
            app.openModal(popup.modal);
          },
        },
        {
          icon: "zmdi zmdi-assignment",
          fn: () => {
            app.openModal(popup.modal);
          },
        },
      ]);

      
      app
        .request({
          method: "get",
          url: "//localhost:3000/pedagogie/enseignants/{id}/ecus",
        })
        .then((r) => {
          formations = r;
          app.set_userdata(formations);
          //console.log(formations[0]);
        });
    },
    view: function (vnode) {
      return [
        m(
          "h2",
          { style: "text-align: center;" },
          "Mathematiques Fondamentales et Applications"
        ),
        m("br"),
        m("h2", { style: "text-align: center;" }, "Semestre 1"),
        m("div", [
          m("div.formation-container", [
            m("div", [
              m("input[type=checkbox]"),
              m(
                "h2",
                { style: "display: inline;" },
                m(
                  "a",
                  { href: "#!/home/pedagogie/suiviUE.js" },
                  "Géométrie des courbes et des surfaces"
                )
              ),
            ]),
            m("div.formation-details", [
              m("div", [
                m("span.formation-label", "Enseignant: "),
                m("span", "Dr Toto"),
              ]),
              m("div", [
                m("span.formation-label", "Cumule: "),
                m("span", "20/45"),
              ]),
              m("div", [
                m("span.formation-label", "Devoir effectué: "),
                m("span", "2"),
              ]),
              m("div", [
                m("span.formation-label", "Note reçue: "),
                m("span", "2"),
              ]),
              m("br"),
              m("br"),
            ]),
          ]),
          m("div.formation-container", [
            m("div", [
              m("input[type=checkbox]"),
              m(
                "h2",
                { style: "display: inline;" },
                m(
                  "a",
                  { href: "#!/home/pedagogie/suiviUE.js" },
                  "Géométrie différentielle, groupes et algèbres de Lie"
                )
              ),
            ]),
            m("div.formation-details", [
              m("div", [
                m("span.formation-label", "Enseignant: "),
                m("span", "Dr Toto"),
              ]),
              m("div", [
                m("span.formation-label", "Cumule: "),
                m("span", "40/45"),
              ]),
              m("div", [
                m("span.formation-label", "Devoir effectué: "),
                m("span", "0"),
              ]),
              m("div", [
                m("span.formation-label", "Note reçue: "),
                m("span", "0"),
              ]),
              m("br"),
              m("br"),
            ]),
          ]),
          m("div.formation-container", [
            m("div", [
              m("input[type=checkbox]"),
              m(
                "h2",
                { style: "display: inline;" },
                m(
                  "a",
                  { href: "#!/home/pedagogie/suiviUE.js" },
                  "Analyse de Fourier et Analyse hilbertienne"
                )
              ),
            ]),
            m("div.formation-details", [
              m("div", [
                m("span.formation-label", "Enseignant: "),
                m("span", "Dr Bismark"),
              ]),
              m("div", [
                m("span.formation-label", "Cumule: "),
                m("span", "0/45"),
              ]),
              m("div", [
                m("span.formation-label", "Devoir effectué: "),
                m("span", "0"),
              ]),
              m("div", [
                m("span.formation-label", "Note reçue: "),
                m("span", "0"),
              ]),
              m("br"),
              m("br"),
            ]),
          ]),
          m("div.formation-container", [
            m("div", [
              m("input[type=checkbox]"),
              m(
                "h2",
                { style: "display: inline;" },
                m(
                  "a",
                  { href: "#!/home/pedagogie/suiviUE.js" },
                  "Introduction à la théorie du Contrôle"
                )
              ),
            ]),
            m("div.formation-details", [
              m("div", [
                m("span.formation-label", "Enseignant: "),
                m("span", "Dr Toto"),
              ]),
              m("div", [
                m("span.formation-label", "Cumule: "),
                m("span", "4/45"),
              ]),
              m("div", [
                m("span.formation-label", "Devoir effectué: "),
                m("span", "1"),
              ]),
              m("div", [
                m("span.formation-label", "Note reçue: "),
                m("span", "1"),
              ]),
              m("br"),
              m("br"),
            ]),
          ]),
          m("div.formation-container", [
            m("div", [
              m("input[type=checkbox]"),
              m(
                "h2",
                { style: "display: inline;" },
                m(
                  "a",
                  { href: "#!/home/pedagogie/suiviUE.js" },
                  "Espaces fonctionnels et Espaces de Sobolev"
                )
              ),
            ]),
            m("div.formation-details", [
              m("div", [
                m("span.formation-label", "Enseignant: "),
                m("span", "Dr Hadamard"),
              ]),
              m("div", [
                m("span.formation-label", "Cumule: "),
                m("span", "35/45"),
              ]),
              m("div", [
                m("span.formation-label", "Devoir effectué: "),
                m("span", "2"),
              ]),
              m("div", [
                m("span.formation-label", "Note reçue: "),
                m("span", "0"),
              ]),
              m("br"),
              m("br"),
            ]),
          ]),
          m("div.formation-container", [
            m("div", [
              m("input[type=checkbox]"),
              m(
                "h2",
                { style: "display: inline;" },
                m(
                  "a",
                  { href: "#!/home/pedagogie/suiviUE.js" },
                  "Analyse convexe"
                )
              ),
            ]),
            m("div.formation-details", [
              m("div", [
                m("span.formation-label", "Enseignant: "),
                m("span", "Dr Truman"),
              ]),
              m("div", [
                m("span.formation-label", "Cumule: "),
                m("span", "45/45"),
              ]),
              m("div", [
                m("span.formation-label", "Devoir effectué: "),
                m("span", "2"),
              ]),
              m("div", [
                m("span.formation-label", "Note reçue: "),
                m("span", "1"),
              ]),
              m("br"),
              m("br"),
            ]),
          ]),
          m("div.formation-container", [
            m("div", [
              m("input[type=checkbox]"),
              m(
                "h2",
                { style: "display: inline;" },
                m(
                  "a",
                  { href: "#!/home/pedagogie/suiviUE.js" },
                  "Topologie générale"
                )
              ),
            ]),
            m("div.formation-details", [
              m("div", [
                m("span.formation-label", "Enseignant: "),
                m("span", "Dr Bob"),
              ]),
              m("div", [
                m("span.formation-label", "Cumule: "),
                m("span", "30/45"),
              ]),
              m("div", [
                m("span.formation-label", "Devoir effectué: "),
                m("span", "2"),
              ]),
              m("div", [
                m("span.formation-label", "Note reçue: "),
                m("span", "0"),
              ]),
              m("br"),
              m("br"),
            ]),
          ]),
          m("div.formation-container", [
            m("div", [
              m("input[type=checkbox]"),
              m(
                "h2",
                { style: "display: inline;" },
                m(
                  "a",
                  { href: "#!/home/pedagogie/suiviUE.js" },
                  "Géométrie des riemaniene des surfaces"
                )
              ),
            ]),
            m("div.formation-details", [
              m("div", [
                m("span.formation-label", "Enseignant: "),
                m("span", "Dr KASAM"),
              ]),
              m("div", [
                m("span.formation-label", "Cumule: "),
                m("span", "10/45"),
              ]),
              m("div", [
                m("span.formation-label", "Devoir effectué: "),
                m("span", "2"),
              ]),
              m("div", [
                m("span.formation-label", "Note reçue: "),
                m("span", "2"),
              ]),
              m("br"),
              m("br"),
            ]),
          ]),
        ]),
      ];
    },
  };
};
