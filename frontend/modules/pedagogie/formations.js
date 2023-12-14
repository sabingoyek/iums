let formation = {};
let formations = [];
let fselected = -1;
let check = [];
for (let i = 0; i < formations.length; i++)
  check[i] = false;

formation = {
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
          m("form-group", [
            m("br"),
            m("br"),
            m("label", "Domaine:  "),
            m("input", {
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
    buttons: [
      {
        type: "button",
        click: () => {
          formation.create();
          //console.log(formations);
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
  },
  create: () => {
    let forma = {
      id: "",
      duree: formation.duree,
      grade: formation.grade,
      domaine: formation.domaine,
      mention: formation.mention,
      specialite: formation.specialite,
    };

    formations.push(forma);

    formation.duree = '';
    formation.grade = '';
    formation.domaine = '';
    formation.mention = '';
    formation.specialite = '';
  },
  copy: (i) => {
    //console.log(i);
    formation.duree = formations[i].duree;
    formation.grade = formations[i].grade;
    formation.domaine = formations[i].domaine;
    formation.mention = formations[i].mention + "(copy)";
    formation.specialite = formations[i].specialite;
    
    formation.create();
  }
};

module.export = () => {
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
            for (let i = 0; i < check.length; i++) {
              //console.log(i, check[i]);
              if (check[i] === true) {
                /*formation.duree = formations[i].duree;
                formation.grade = formations[i].grade;
                formation.domaine = formations[i].domaine;
                formation.mention = formations[i].mention + "(copy)";
                formation.specialite = formations[i].specialite;

                formation.create();*/
                formation.copy(i);
                check[i] = false;
              }
            }
            //app.openModal(formation.modal);
          },
        },
      ]);

      if (app.get_userdata() == null)
        app
          .request({
            method: "get",
            url: "//localhost:3001/pedagogie/formations",
          })
          .then((r) => {
            formations = r;
            app.set_userdata(formations);
            //console.log(formations);
          });
    },
    view: function (vnode) {
      return (
      formations.map(function (v, index) {
        //console.log("v= ", v.duree);
        return m("div.container", [
          m("div.row", [
            m("h1", [
              m("input[type=checkbox]", { onclick: function () { check[i] = !check[i]; } }),
              m("span","   "),
              m("a", { href: "#!/home/pedagogie/formation?id=" + index }, v.mention)
            ])
          ]),
          m("div.row", [
            m("div.col-12.col-sm-6.col-lg-3", [
              m("span.font-weight-lighter", "Domaine: "),
              m("span.font-weight-bold", v.domaine)
            ]),
            m("div.col-12.col-sm-6.col-lg-3", [
              m("span.font-weight-lighter", "Specialite: "),
              m("span.font-weight-bold", v.specialite)
            ]),
            m("div.col-12.col-sm-6.col-lg-3", [
              m("span.font-weight-lighter", "Grade: "),
              m("span.font-weight-bold", v.grade)
            ]),
            m("div.col-12.col-sm-6.col-lg-3", [
              m("span.font-weight-lighter", "Duree: "),
              m("span.font-weight-bold", v.duree)
            ])
          ])
        ]);
      }))
    ;
    }
  };
};
