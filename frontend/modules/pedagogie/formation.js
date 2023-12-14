popup = {
  name: "",
  from: "",
  modal: {
    title: "Edition de la formation",
    content: {
      view: function (v) {
        return [
          m("form-group", [
            m("br"),
            m("br"),
            m("label", "Domaine:  "),
            m("input"),
            m("br"),
            m("br"),
            m("label", "Mention:  "),
            m("input"),
            m("br"),
            m("br"),
            m("label", "Specialite:  "),
            m("input"),
            m("br"),
            m("br"),
            m("label", "Grade:  "),
            m("input"),
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
  var formations;
  var formation;
  var semestres = [];
  return {
    oninit: function (vnode) {
      app.setActions([
        {
          icon: "zmdi zmdi-file-plus",
          fn: () => {
            app.openModal(popup.modal);
          },
        },
      ]);
      
      formations = app.get_userdata();
      var id = parseInt(vnode.attrs.id);
      formation = formations[id];
      console.log(formation);
      for (id = 1; id <= formation.duree; id++)
        semestres.push("Semestre " + id);
    },
    view: function (vnode) {
      return [
        m("h1", { style: "text-align: center;" }, formation.specialite      ),
        m("a", {href: "#!/home/"}, "voir le programme>>"),
        semestres.map(function (v, index) {
          return m("div.columns", [
            m("ul.price", [
              m("li.header", v),
              m("li", "10 Ecus"),
              m("li", "6 En cours d'execution"),
              m("li", "2 Terminés"),
              m("li", "2 examen(s) effectué(s)"),
              m("li", "0 note(s) reçue(s)"),
              m("li", "Taux d'exécution: 10%"),
              m("li.grey", [
                m(
                  "a.button",
                  { href: "#!/home/pedagogie/suivi?id=" + index },
                  "En savoir plus..."
                ),
              ]),
            ]),
          ]);
        }),
      ];
    },
  };
};
