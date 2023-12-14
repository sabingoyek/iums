#include<postgresql/libpq-fe.h>
#include<string.h>
#include<stdlib.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <unistd.h>
#include<cjson/cJSON.h>


void pedagogie_post_formation(PGconn *conn, char *formation, char **erreur);
void pedagogie_get_formations(PGconn *conn, char **erreur);
void pedagogie_get_formation(PGconn *conn, char *idf, char **erreur);
void pedagogie_update_formation(PGconn *conn, char *idf, char *newf, char **erreur);

void pedagogie_post_ue(PGconn *conn, char *ue, char *idf, char **erreur);
void pedagogie_get_ues(PGconn *conn, char *idf, char *semestre, char **erreur);
void pedagogie_get_ue(PGconn *conn, char *idue, char **erreur);
void pedagogie_update_ue(PGconn *conn, char *idue, char *newue, char *idf, char **erreur);
void pedagogie_delete_ue(PGconn *conn, char *idue, char *idf, char **erreur);


void pedagogie_post_ecu(PGconn *conn, char *idue, char *ecu, char **erreur);
void pedagogie_get_ecus(PGconn *conn, char *idue, char **erreur);
void pedagogie_get_ecu(PGconn *conn, char *idecu, char **erreur);
void pedagogie_update_ecu(PGconn *conn, char *idecu, char *newecu, char **erreur);
void pedagogie_delete_ecu(PGconn *conn, char *idecu, char **erreur);


void pedagogie_post_teacher(PGconn *conn, char *teacher, char **erreur);
void pedagogie_get_teachers(PGconn *conn, char **erreur);
void pedagogie_get_teacher(PGconn *conn, char *idt, char **erreur);
void pedagogie_update_teacher(PGconn *conn, char *idt, char *newteacher, char **erreur);


void assign_ecu(PGconn *conn, char *idecu, char *idteacher, char *year, char *details, char **erreur);
void pedagogie_get_teacher_ecus(PGconn *conn, char *idteacher, char *year, char **erreur);
void pedagogie_update_ecu_assignment_details(PGconn *conn, char *idecu, char *idteacher, char *year, char *details, char **erreur);
void pedagogie_delete_ecu_assignment(PGconn *conn, char *idecu, char *idteacher, char *year, char **erreur);

void pedagogie_get_formation_plan(PGconn *conn, char *idf, char *year, char **erreur);

void pedagogie_post_seance_cours(PGconn *conn, char *idecu, char *idteacher, char *year, char *seance, char **erreur);
void pedagogie_get_seances_cours(PGconn *conn, char *idecu, char *idteacher, char *year, char **erreur);
void pedagogie_update_seance_cours(PGconn *conn, char *idecu, char *idteacher, char *year, char *newseance, char **erreur);




// inserer les notes de tous les etudiants pour un ecu pour une year
// concatenation avec l'existant
//void pedagogie_post_notes_ecu(PGconn *conn, char *idecu, char *year, char *session, char *notes, char **erreur);
void pedagogie_post_notes(PGconn *conn, char *idecu, char *year, char *notes, char **erreur);
void pedagogie_get_notes(PGconn *conn, char *idecu, char *year, char **erreur);
void pedagogie_update_note(PGconn *conn, char *idstudent, char *idecu, char *year, char *newnote, char **erreur);


// format d'envoi
// {"year": "2019-2020", "intitule": "TP", "notes": [{"etudiant": 458, "note": 15}, {"etudiant": 494, "note": 18}]} ou
// {"notes": [{"etudiant": 458, "note": 15}, {"etudiant": 494, "note": 18}]}
// format de stockage
// [{"session": "premiere", "intitule": "TP", "note": 7}, {"year": "2017-2018", "session": "deuxieme", "note": 8},
//  {"year": "2018-2019", "session": "premiere", "note": 19}]

// obtenir les notes de tous les etudiants pour un ecu et pour une year


// mettre a jour la note d'un etudiant pour un ecu


// pourraient etre utiles
// inserer une note pour un etudiant et un ecu
// pas dans l'API

//void append_note(PGconn *conn, char *idecu, char *idstudent, char *notes, char **erreur);
// obtenir les notes d'un etudiant pour un ecu
//void pedagogie_get_notes_etu(PGconn *conn, char *idecu, char *idetu, char **erreur);
// {"year": "2018-2019", "notes": [{"session": "premiere", "note": 9}, {"session": "deuxieme", "note": 14}]

/*********************************************************************************************/

