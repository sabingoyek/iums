let formation = {
  duree: "",
  grade: "",
  domaine: "",
  mention: "",
  specialite: "",
  modal: {
    title: "Ajout d'une nouvelle formation",
    content: {
      view: function (v) {
        return [
          m("form", [
            m("br"),
            m("br"),
            m("label", "Domaine:  "),
            m("input[required]", {
              onchange: (e) => {
                formation.domaine = e.target.value;
              },
              value: formation.domaine,
            }),
            m("br"),
            m("br"),
            m("label", "Mention:  "),
            m("input", {
              onchange: (e) => {
                formation.mention = e.target.value;
              },
              value: formation.mention,
            }),
            m("br"),
            m("br"),
            m("label", "Specialite:  "),
            m("input", {
              onchange: (e) => {
                formation.specialite = e.target.value;
              },
              value: formation.specialite,
            }),
            m("br"),
            m("br"),
            m("label", "Grade:  "),
            m("input", {
              onchange: (e) => {
                formation.grade = e.target.value;
              },
              value: formation.grade,
            }),
            m("br"),
            m("br"),
            m("label", "Duree:  "),
            m("input", {
              onchange: (e) => {
                formation.duree = e.target.value;
              },
              value: formation.duree,
            }),
            m("br"),
            m("br"),
          ]),
        ];
      },
    },
  },
  buttons: [
    {
      type: "button",
      click: () => {
        app.closeModal();
      },
      text: "Save",
    },
    {
      type: "button",
      click: app.closeModal,
      text: "Cancel",
    },
  ],
  create: () => {
    let forma = {
      duree: "",
      grade: "",
      domaine: "",
      mention: "",
      specialite: "",
    };
    formations.push(forma);
  },
};

module.export = () => {
  var formations = [];
  return {
    oninit: function (vnode) {
      app.setActions([
        {
          icon: "zmdi zmdi-file-plus",
          fn: () => {
            app.openModal(formation.modal);
          },
        },
        {
          icon: "zmdi zmdi-copy",
          fn: () => {
            app.openModal(formation.modal);
          },
        },
      ]);

      if (app.get_userdata() == null)
        app
          .request({
            method: "get",
            url: "/pedagogie/formations.json",
          })
          .then((r) => {
            formations = r.data;
            app.set_userdata(formations);
          });
    },
    view: function (vnode) {
      return m("div", [
        formations.map(function (v, index) {
          return m("div.formation-container", [
            m("div", [
              m("input[type=checkbox]"),
              m(
                "h2",
                { style: "display: inline;" },
                m(
                  "a",
                  { href: "#!/home/pedagogie/formation?id=" + index },
                  v.formation.mention
                )
              ),
            ]),
            m("div.formation-details", [
              m("div", [
                m("span.formation-label", "Domaine: "),
                m("span", v.formation.domaine),
              ]),
              m("div", [
                m("span.formation-label", "Specialite: "),
                m("span", v.formation.specialite),
              ]),
              m("div", [
                m("span.formation-label", "Grade: "),
                m("span", v.formation.grade),
              ]),
              m("div", [
                m("span.formation-label", "Duree: "),
                m("span", v.formation.duree + " semestres"),
              ]),
            ]),
          ]);
        }),
      ]);
    },
  };
};
