#include "lib.h"

void post_formation(PGconn *conn, char *formation, char **erreur)
{
    const char *req = "insert into pedagogie.formations(formation) values($1)";
    int nparams = 1;
    const char *params[nparams];

    params[0] = formation;
    *erreur = 0;
    if (!PQsendQueryParams(conn, req, nparams, NULL, params, NULL, NULL, 0))
        *erreur = strdup(PQerrorMessage(conn));
}

void get_formations(PGconn *conn, char **erreur)
{
    const char *req = "select json_agg(f) from (select id, formation from pedagogie.formations) f";
    int nparams = 0;
    const char *params[nparams];
    *erreur = 0;

    if (!PQsendQueryParams(conn, req, nparams, NULL, params, NULL, NULL, 0))
        *erreur = strdup(PQerrorMessage(conn));
}

void get_formation(PGconn *conn, char *idf, char **erreur)
{
    const char *req = "select json_agg(f) from (select id , formation from pedagogie.formations where id = $1) f";
    int nparams = 1;
    const char *params[nparams];
    params[0] = idf;

    *erreur = 0;
    if (!PQsendQueryParams(conn, req, nparams, NULL, params, NULL, NULL, 0))
        *erreur = strdup(PQerrorMessage(conn));
}

void update_formation(PGconn *conn, char *id, char *newf, char **erreur)
{
    const char *req = "update pedagogie.formations set formation = $1 where id = $2";
    int nparams = 2;
    const char *params[nparams];
    params[0] = newf;
    params[1] = id;

    *erreur = 0;
    if (!PQsendQueryParams(conn, req, nparams, NULL, params, NULL, NULL, 0))
        *erreur = strdup(PQerrorMessage(conn));
}

void post_ue(PGconn *conn, char *idf, char *ue, char **erreur)
{
    const char *req = "insert into pedagogie.ues(ue,id_formations) values ($1, $2)";
    int nparams = 2;
    const char *params[nparams];

    params[0] = ue;
    params[1] = idf;
    *erreur = 0;
    if (!PQsendQueryParams(conn, req, nparams, NULL, params, NULL, NULL, 0))
        *erreur = strdup(PQerrorMessage(conn));
}

void get_ues(PGconn *conn, char *idf, char **erreur)
{
    const char *req = "select json_agg(f) from (select id , id_formations as id_formation, ue from pedagogie.ues where id_formations = $1) f";
    int nparams = 1;
    const char *params[nparams];
    params[0] = idf;
    *erreur = 0;
    if (!PQsendQueryParams(conn, req, nparams, NULL, params, NULL, NULL, 0))
        *erreur = strdup(PQerrorMessage(conn));
}

void get_ue(PGconn *conn, char *idue, char **erreur)
{
    const char *req = "select json_agg(f) from (select id, id_formations as id_formation, ue from pedagogie.ues where id = $1) f ";
    int nparams = 1;
    const char *params[nparams];
    params[0] = idue;
    *erreur = 0;
    if (!PQsendQueryParams(conn, req, nparams, NULL, params, NULL, NULL, 0))
        *erreur = strdup(PQerrorMessage(conn));
}

void update_ue(PGconn *conn, char *idue, char *new_ue, char **erreur)
{
    const char *req = "update pedagogie.ues set ue = $1 where id = $2";
    int nparams = 2;
    const char *params[nparams];
    params[0] = new_ue;
    params[1] = idue;

    *erreur = 0;
    if (!PQsendQueryParams(conn, req, nparams, NULL, params, NULL, NULL, 0))
        *erreur = strdup(PQerrorMessage(conn));
}

void post_ecu(PGconn *conn, char *idue, char *ecu, char **erreur)
{
    const char *req = "insert into pedagogie.ecus(ecu, id_ues) values ($1, $2)";
    int nparams = 2;
    const char *params[nparams];

    params[0] = ecu;
    params[1] = idue;
    *erreur = 0;
    if (!PQsendQueryParams(conn, req, nparams, NULL, params, NULL, NULL, 0))
        *erreur = strdup(PQerrorMessage(conn));
}

void get_ecus(PGconn *conn, char *idue, char **erreur)
{
    const char *req = "select json_agg(f) from (select id, id_ues as id_ue, ecu from pedagogie.ecus where id_ues = $1) f";
    int nparams = 1;
    const char *params[nparams];
    params[0] = idue;
    *erreur = 0;
    if (!PQsendQueryParams(conn, req, nparams, NULL, params, NULL, NULL, 0))
        *erreur = strdup(PQerrorMessage(conn));
}

void get_ecu(PGconn *conn, char *idecu, char **erreur)
{
    const char *req = "select json_agg(f) from (select id, id_ues as id_ue, ecu from pedagogie.ecus where id = $1) f";
    int nparams = 1;
    const char *params[nparams];
    params[0] = idecu;
    *erreur = 0;
    if (!PQsendQueryParams(conn, req, nparams, NULL, params, NULL, NULL, 0))
        *erreur = strdup(PQerrorMessage(conn));
}

void update_ecu(PGconn *conn, char *idecu, char *newecu, char **erreur)
{
    const char *req = "update pedagogie.ecus set ecu = $1 where id = $2";
    int nparams = 2;
    const char *params[nparams];
    params[0] = newecu;
    params[1] = idecu;

    *erreur = 0;
    if (!PQsendQueryParams(conn, req, nparams, NULL, params, NULL, NULL, 0))
        *erreur = strdup(PQerrorMessage(conn));
}

void post_enseignant(PGconn *conn, char *enseignant, char **erreur)
{
    const char *req = "insert into pedagogie.enseignants(enseignant) values ($1)";
    int nparams = 1;
    const char *params[nparams];

    params[0] = enseignant;
    *erreur = 0;
    if (!PQsendQueryParams(conn, req, nparams, NULL, params, NULL, NULL, 0))
        *erreur = strdup(PQerrorMessage(conn));
}

void get_enseignants(PGconn *conn, char **erreur)
{
    const char *req = "select json_agg(f) from (select id, enseignant from pedagogie.enseignants) f";
    int nparams = 0;
    const char *params[nparams];
    *erreur = 0;
    if (!PQsendQueryParams(conn, req, nparams, NULL, params, NULL, NULL, 0))
        *erreur = strdup(PQerrorMessage(conn));
}

void get_enseignant(PGconn *conn, char *id, char **erreur)
{
    const char *req = "select json_agg(f) from (select id, enseignant from pedagogie.enseignants) f where id = $1";
    int nparams = 1;
    const char *params[nparams];
    params[0] = id;

    *erreur = 0;
    if (!PQsendQueryParams(conn, req, nparams, NULL, params, NULL, NULL, 0))
        *erreur = strdup(PQerrorMessage(conn));
}

void update_enseignant(PGconn *conn, char *id, char *newenseignant, char **erreur)
{
    const char *req = "update pedagogie.enseignants set enseignant = $1 where id = $2";
    int nparams = 2;
    const char *params[nparams];
    params[0] = newenseignant;
    params[1] = id;

    *erreur = 0;
    if (!PQsendQueryParams(conn, req, nparams, NULL, params, NULL, NULL, 0))
        *erreur = strdup(PQerrorMessage(conn));
}

void assign_ecu(PGconn *conn, char *idecu, char *idenseignant, char *annee, char *details, char **erreur)
{
    const char *req = "insert into pedagogie.attribution_ecus(id_ecus, id_enseignants, annee, details) values ($1, $2, $3, $4)";
    int nparams = 4;
    const char *params[nparams];

    params[0] = idecu;
    params[1] = idenseignant;
    params[2] = annee;
    params[3] = details;
    *erreur = 0;
    if (!PQsendQueryParams(conn, req, nparams, NULL, params, NULL, NULL, 0))
        *erreur = strdup(PQerrorMessage(conn));
}

void get_teacher_ecus(PGconn *conn, char *idenseignant, char *annee, char **erreur)
{
    const char *req = "select json_agg(f) from (select id_ecus as id_ecu, id_enseignants as id_enseignant, annee, details from pedagogie.attribution_ecus where id_enseignants = $1 and annee = $2) f";
    int nparams = 2;
    const char *params[nparams];
    params[0] = idenseignant;
    params[1] = annee;

    *erreur = 0;
    if (!PQsendQueryParams(conn, req, nparams, NULL, params, NULL, NULL, 0))
        *erreur = strdup(PQerrorMessage(conn));
}

void update_ecu_assignment_details(PGconn *conn, char *idecu, char *idenseignant, char *annee, char *details, char **erreur)
{
    const char *req = "update pedagogie.attribution_ecus set details = $1 where id_ecus = $2 and id_enseignants = $3 and annee = $4";
    int nparams = 4;
    const char *params[nparams];
    params[0] = details;
    params[1] = idecu;
    params[2] = idenseignant;
    params[3] = annee;

    *erreur = 0;
    if (!PQsendQueryParams(conn, req, nparams, NULL, params, NULL, NULL, 0))
        *erreur = strdup(PQerrorMessage(conn));
}

void delete_ecu_assignment(PGconn *conn, char *idecu, char *idenseignant, char *annee, char **erreur)
{
    const char *req = "delete from pedagogie.attribution_ecus where id_ecus = $1 and id_enseignants = $2 and annee = $3";
    int nparams = 3;
    const char *params[nparams];
    params[0] = idecu;
    params[1] = idenseignant;
    params[2] = annee;

    *erreur = 0;
    if (!PQsendQueryParams(conn, req, nparams, NULL, params, NULL, NULL, 0))
        *erreur = strdup(PQerrorMessage(conn));
}

void formation_get_plan(PGconn *conn, char *idf, char *annee, char **erreur)
{
    /*const char *req = "insert into formations.seances(annee_academique, duree, contenu, id_enseignants, id_ecus, date) values ($1, $2, $3, $4, $5, $6)";
    int nparams = 6;
    const char *params[nparams];

    params[0] = annee_acad;
    params[1] = duree;
    params[2] = contenu;
    params[3] = idenseignant;
    params[4] = idecu;
    params[5] = date;
    *erreur = 0;
    if (!PQsendQueryParams(conn, req, nparams, NULL, params, NULL, NULL, 0))
        *erreur = strdup(PQerrorMessage(conn));*/
}


void pedagogie_post_seance_cours(PGconn *conn, char *idecu, char *idens, char *annee, char *seance, char **erreur)
{
    const char *req = "update pedagogie.attribution_ecus set seances = seances::jsonb || $1 where id_ecus = $2 and id_enseignants = $3 and annee = $4";
    int nparams = 4;
    const char *params[nparams];

    params[0] = seance;
    params[1] = idecu;
    params[2] = idens;
    params[3] = annee;
    *erreur = 0;
    if (!PQsendQueryParams(conn, req, nparams, NULL, params, NULL, NULL, 0))
        *erreur = strdup(PQerrorMessage(conn));
}

void pedagogie_get_seances_cours(PGconn *conn, char *idecu, char *idens, char *annee, char **erreur)
{
    const char *req = "select json_agg(f) from (select seances from pedagogie.attribution_ecus where id_ecus = $1 and id_enseignants = $2 and annee = $3) f";
    int nparams = 3;
    const char *params[nparams];
    params[0] = idecu;
    params[1] = idens;
    params[2] = annee;

    *erreur = 0;
    if (!PQsendQueryParams(conn, req, nparams, NULL, params, NULL, NULL, 0))
        *erreur = strdup(PQerrorMessage(conn));
}
void pedagogie_update_seance_cours(PGconn *conn, char *idecu, char *idens, char *annee, char *newseance, char **erreur)
{
    /*const char *req = "update formations.seances set annee_academique = $1, duree = $2, contenu = $3, id_enseignants = $4, id_ecus = $5, date = $6 where id = $7";
    int nparams = 7;
    const char *params[nparams];
    params[0] = annee_acad;
    params[1] = duree;
    params[2] = contenu;
    params[3] = idenseignant;
    params[4] = idecu;
    params[5] = date;
    params[6] = idseance;

    *erreur = 0;
    if (!PQsendQueryParams(conn, req, nparams, NULL, params, NULL, NULL, 0))
        *erreur = strdup(PQerrorMessage(conn));*/
}

// note est vu comme la moyenne pour l'ecu, a utiliser uniquement pour la premiere insertion
// update_note les autres fois
void pedagogie_post_note(PGconn *conn, char *idetud, char *idecu, char *annee, char *note, char **erreur)
{
    const char *req = "update pedagogie.notes set note = note::jsonb || $1 where id_ecus = $2 and id_etudiants = $3 and annee = $4";
    int nparams = 4;
    const char *params[nparams];

    params[0] = note;
    params[1] = idecu;
    params[2] = idetud;
    params[3] = annee;
    *erreur = 0;
    if (!PQsendQueryParams(conn, req, nparams, NULL, params, NULL, NULL, 0))
        *erreur = strdup(PQerrorMessage(conn));
}

void pedagogie_get_notes(PGconn *conn, char *idecu, char *annee, char **erreur)
{
    const char *req = "select json_agg(f) from (select id_etudiants as id_etudiant, note from pedagogie.notes where id_ecus = $1 and annee = $2) f";
    int nparams = 2;
    const char *params[nparams];
    params[0] = idecu;
    params[1] = annee;

    *erreur = 0;
    if (!PQsendQueryParams(conn, req, nparams, NULL, params, NULL, NULL, 0))
        *erreur = strdup(PQerrorMessage(conn));
}

void pedagogie_update_note(PGconn *conn, char *idetud, char *idecu, char *annee, char *newnote, char **erreur)
{
    const char *req = "update pedagogie.notes set notes = jsonb_set(notes,'{note}', $1, false) where id_etudiants = $2 and id_ecus = $3 ";
    int nparams = 3;
    const char *params[nparams];
    params[0] = newnote;
    params[1] = idetud;
    params[2] = idecu;

    *erreur = 0;
    if (!PQsendQueryParams(conn, req, nparams, NULL, params, NULL, NULL, 0))
        *erreur = strdup(PQerrorMessage(conn));
}

// obtenir les notes de tous les etudiants pour un ecu et pour une annee
/*void get_notes_ecu(PGconn *conn, char *idecu, char *annee, char **erreur)
{
    const char *req = "select json_agg(f) from (select id_etudiants, notes->'note' as note, notes->'session' as session from formations.notes where id_ecus = $1 and notes->>'annee' = $2) f";
    int nparams = 2;
    const char *params[nparams];
    params[0] = idecu;
    params[1] = annee;

    *erreur = 0;
    if (!PQsendQueryParams(conn, req, nparams, NULL, params, NULL, NULL, 0))
        *erreur = strdup(PQerrorMessage(conn));
}

/*void get_notes_etu(PGconn *conn, char *idecu, char *idetu, char **erreur)
{
    const char *req = "select json_agg(f) from (select notes from formations.notes where id_ecus = $1 and id_etudiants = $2) f";
    int nparams = 2;
    const char *params[nparams];
    params[0] = idecu;
    params[1] = idetu;

    *erreur = 0;
    if (!PQsendQueryParams(conn, req, nparams, NULL, params, NULL, NULL, 0))
        *erreur = strdup(PQerrorMessage(conn));
}*/