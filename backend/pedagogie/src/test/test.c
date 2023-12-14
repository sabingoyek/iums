#include"unity.h"
#include"../lib.h"

PGconn *conn;
char *formation;
char *erreur = 0;
char *rs;
char req[1024];

/*void sql_init()
{

}*/

int db_open(char* fname, PGconn **conn, char *user, char *db)
{
    char tab[1024];
    FILE *fd;
    PGresult *rs;
    char* buf;
    struct stat st;

    if(stat(fname, &st) < 0)
    {
        perror("fstat: ");
        return 1;
    }

    if ((fd = fopen(fname, "r")) == 0)
    {
        perror("fopen: ");
        return 1;
    }

    buf = malloc(st.st_size + 1);
    fread(buf, 1, st.st_size, fd);
    buf[st.st_size] = '\0';
     
    sprintf(tab, "user=%s dbname=%s", user, db);
    
    *conn = PQconnectdb(tab);
    
    if((PQresultStatus(rs = PQexec(*conn, buf)) != PGRES_COMMAND_OK))
    {
        perror(PQerrorMessage(*conn));
        return 1;
    }

}

int db_close(char *sc, PGconn *conn)
{
    char buf[128];
    PGresult *rs;

    sprintf(buf, "drop schema %s cascade", sc);
    rs = PQexec(conn, buf);
    if ((PQresultStatus(rs)) != PGRES_COMMAND_OK)
    {
        fprintf(stderr, "%s", PQerrorMessage(conn));
        PQfinish(conn);
        return 1;
    }
    return 0;
}

void request_cb(PGconn *conn, char **rs, char **erreur)
{
    PGresult *r;
    while ((r = PQgetResult(conn)))
    {
        if (PQresultStatus(r) != PGRES_TUPLES_OK && PQresultStatus(r) != PGRES_COMMAND_OK)
            *erreur = PQerrorMessage(conn);
        else if (PQresultStatus(r) == PGRES_TUPLES_OK)
            *rs = strdup(PQgetvalue(r, 0, 0));

        PQclear(r);
    }
}

void test_post_formation(void)
{
    post_formation(conn, "{}", &erreur);
    TEST_ASSERT_EQUAL(0, erreur);

    request_cb(conn, 0, &erreur);
    TEST_ASSERT_GREATER_THAN(0, erreur);

    post_formation(conn, "{\"domaine\":\"d\"}", &erreur);
    TEST_ASSERT_EQUAL(0, erreur);

    request_cb(conn, 0, &erreur);
    TEST_ASSERT_GREATER_THAN(0, erreur);

    post_formation(conn, "{\"domaine\":\"d\",\"mention\":\"m\"}", &erreur);
    TEST_ASSERT_EQUAL(0, erreur);

    request_cb(conn, 0, &erreur);
    TEST_ASSERT_GREATER_THAN(0, erreur);

    post_formation(conn, "{\"domaine\":\"d\",\"mention\":\"m\",\"specialite\":\"s\"}", &erreur);
    TEST_ASSERT_EQUAL(0, erreur);

    request_cb(conn, 0, &erreur);
    TEST_ASSERT_GREATER_THAN(0, erreur);

    post_formation(conn, "{\"domaine\":\"d\",\"mention\":\"m\",\"specialite\":\"s\",\"grade\":\"g\"}", &erreur);
    TEST_ASSERT_EQUAL(0, erreur);

    request_cb(conn, 0, &erreur);
    TEST_ASSERT_GREATER_THAN(0, erreur);

    post_formation(conn, "{\"domaine\":\"d\",\"mention\":\"m\",\"specialite\":\"s\",\"grade\":\"g\",\"duree\":\"d\"}", &erreur);
    if (erreur)
        fprintf(stderr, "%s\n", erreur);
    TEST_ASSERT_EQUAL(0, erreur);

    request_cb(conn, 0, &erreur);
    if (erreur)
        fprintf(stderr, "%s\n", erreur);
    TEST_ASSERT_EQUAL(0, erreur);

}

void test_get_formations(void)
{
    get_formations(conn, &erreur);
    if (erreur)
        fprintf(stderr, "%s\n", erreur);
    TEST_ASSERT_EQUAL(0, erreur);

    request_cb(conn, &rs, &erreur);
    if (erreur)
        fprintf(stderr, "%s\n", erreur);
    TEST_ASSERT_EQUAL(0, erreur);
    sprintf(req, "%s", "[{\"id\":6,\"formation\":{\"duree\": \"d\", \"grade\": \"g\", \"domaine\": \"d\", \"mention\": \"m\", \"specialite\": \"s\"}}]");
    cJSON_Minify(req);
    cJSON_Minify(rs);
    TEST_ASSERT_EQUAL_STRING(req, rs);
}

void test_get_formation(void)
{
    get_formation(conn, "6", &erreur);
    if (erreur)
        fprintf(stderr, "%s\n", erreur);
    TEST_ASSERT_EQUAL(0, erreur);

    request_cb(conn, &rs, &erreur);
    if (erreur)
        fprintf(stderr, "%s\n", erreur);
    TEST_ASSERT_EQUAL(0, erreur);
    sprintf(req, "%s", "[{\"id\":6,\"formation\":{\"duree\": \"d\", \"grade\": \"g\", \"domaine\": \"d\", \"mention\": \"m\", \"specialite\": \"s\"}}]");
    cJSON_Minify(req);
    cJSON_Minify(rs);
    TEST_ASSERT_EQUAL_STRING(req, rs);

    // tenter de recuperer une formation inexistente
    get_formation(conn, "5", &erreur);
    if (erreur)
        fprintf(stderr, "%s\n", erreur);
    TEST_ASSERT_EQUAL(0, erreur);

    request_cb(conn, &rs, &erreur);
    if (erreur)
        fprintf(stderr, "%s\n", erreur);
    TEST_ASSERT_EQUAL_STRING("", rs);
}

void test_update_formation(void)
{
    update_formation(conn,
                    "6",
                     "{\"duree\": \"d1\", \"grade\": \"g\", \"domaine\": \"d\", \"mention\": \"m\", \"specialite\": \"s\"}",
                     &erreur);
    if (erreur)
        fprintf(stderr, "%s\n", erreur);
    TEST_ASSERT_EQUAL(0, erreur);

    request_cb(conn, 0, &erreur);
    if (erreur)
        fprintf(stderr, "%s\n", erreur);
    TEST_ASSERT_EQUAL(0, erreur);

    get_formations(conn, &erreur);
    if (erreur)
        fprintf(stderr, "%s\n", erreur);
    TEST_ASSERT_EQUAL(0, erreur);

    request_cb(conn, &rs, &erreur);
    if (erreur)
        fprintf(stderr, "%s\n", erreur);
    TEST_ASSERT_EQUAL(0, erreur);
    sprintf(req, "%s", "[{\"id\":6,\"formation\":{\"duree\": \"d1\", \"grade\": \"g\", \"domaine\": \"d\", \"mention\": \"m\", \"specialite\": \"s\"}}]");
    cJSON_Minify(req);
    cJSON_Minify(rs);
    TEST_ASSERT_EQUAL_STRING(req, rs);

    // test modification de: duree, grade, domaine, mention et specialite
    update_formation(conn,
                    "6",
                     "{\"duree\": \"d5\", \"grade\": \"g4\", \"domaine\": \"d3\", \"mention\": \"m2\", \"specialite\": \"s1\"}",
                     &erreur);
    if (erreur)
        fprintf(stderr, "%s\n", erreur);
    TEST_ASSERT_EQUAL(0, erreur);

    request_cb(conn, 0, &erreur);
    if (erreur)
        fprintf(stderr, "%s\n", erreur);
    TEST_ASSERT_EQUAL(0, erreur);

    get_formations(conn, &erreur);
    if (erreur)
        fprintf(stderr, "%s\n", erreur);
    TEST_ASSERT_EQUAL(0, erreur);

    request_cb(conn, &rs, &erreur);
    if (erreur)
        fprintf(stderr, "%s\n", erreur);
    TEST_ASSERT_EQUAL(0, erreur);
    sprintf(req, "%s", "[{\"id\":6,\"formation\":{\"duree\": \"d5\", \"grade\": \"g4\", \"domaine\": \"d3\", \"mention\": \"m2\", \"specialite\": \"s1\"}}]");
    cJSON_Minify(req);
    cJSON_Minify(rs);
    TEST_ASSERT_EQUAL_STRING(req, rs);
}

void test_ues(void)
{
    post_ue(conn, "6", "{\"code\":\"c\",\"credits\":6,\"semestre\":\"s\",\"intitule\":\"i\"}", &erreur);
    if (erreur)
        fprintf(stderr, "%s\n", erreur);
    TEST_ASSERT_EQUAL(0, erreur);

    request_cb(conn, 0, &erreur);
    if (erreur)
        fprintf(stderr, "%s\n", erreur);
    TEST_ASSERT_EQUAL(0, erreur);

    get_ue(conn, "1", &erreur);
    if (erreur)
        fprintf(stderr, "%s\n", erreur);
    TEST_ASSERT_EQUAL(0, erreur);

    request_cb(conn, &rs, &erreur);
    if (erreur)
        fprintf(stderr, "%s\n", erreur);
    TEST_ASSERT_EQUAL(0, erreur);
    sprintf(req, "%s", "[{\"id\":1, \"id_formation\":6,\"ue\":{\"code\": \"c\", \"credits\": 6,  \"intitule\": \"i\", \"semestre\": \"s\"}}]");
    cJSON_Minify(req);
    cJSON_Minify(rs);
    TEST_ASSERT_EQUAL_STRING(req, rs);

    update_ue(conn, "1", "{\"code\":\"c\",\"credits\":6,\"semestre\":\"s\",\"intitule\":\"i\"}", &erreur);
    TEST_ASSERT_EQUAL(0, erreur);

    request_cb(conn, 0, &erreur);
    if (erreur)
        fprintf(stderr, "%s\n", erreur);
    TEST_ASSERT_EQUAL(0, erreur);

    get_ues(conn, "6", &erreur);
    if (erreur)
        fprintf(stderr, "%s\n", erreur);
    TEST_ASSERT_EQUAL(0, erreur);

    request_cb(conn, &rs, &erreur);
    if (erreur)
        fprintf(stderr, "%s\n", erreur);
    TEST_ASSERT_EQUAL(0, erreur);
    sprintf(req, "%s", "[{\"id\":1,\"id_formation\":6,\"ue\":{\"code\": \"c\", \"credits\": 6, \"intitule\": \"i\", \"semestre\": \"s\"}}]");
    cJSON_Minify(req);
    cJSON_Minify(rs);
    TEST_ASSERT_EQUAL_STRING(req, rs);
}

void test_ecus(void)
{
    post_ecu(conn, "1","{\"intitule\":\"LTP\",\"nheures\": 20}", &erreur);
    if (erreur)
        fprintf(stderr, "%s\n", erreur);
    TEST_ASSERT_EQUAL(0, erreur);

    request_cb(conn, 0, &erreur);
    if (erreur)
        fprintf(stderr, "%s\n", erreur);
    TEST_ASSERT_EQUAL(0, erreur);

    get_ecus(conn,"1", &erreur);
    if (erreur)
        fprintf(stderr, "%s\n", erreur);
    TEST_ASSERT_EQUAL(0, erreur);

    request_cb(conn, &rs, &erreur);
    if (erreur)
        fprintf(stderr, "%s\n", erreur);
    sprintf(req, "%s", "[{\"id\":1, \"id_ue\" : 1, \"ecu\":{\"nheures\":20,\"intitule\":\"LTP\"}}]");
    cJSON_Minify(req);
    cJSON_Minify(rs);
    TEST_ASSERT_EQUAL_STRING(req, rs);

    update_ecu(conn, "1", "{\"intitule\":\"LTP2\",\"nheures\": 20}", &erreur);
    if (erreur)
        fprintf(stderr, "%s\n", erreur);
    TEST_ASSERT_EQUAL(0, erreur);
    request_cb(conn, 0, &erreur);

    get_ecu(conn, "1", &erreur);
    if(erreur)
        fprintf(stderr, "%s\n", erreur);
    TEST_ASSERT_EQUAL(0, erreur);
    request_cb(conn, &rs, &erreur);
    sprintf(req, "%s", "[{\"id\":1, \"id_ue\" : 1, \"ecu\":{\"nheures\":20,\"intitule\":\"LTP2\"}}]");
    cJSON_Minify(req);
    cJSON_Minify(rs);
    TEST_ASSERT_EQUAL_STRING(req, rs);
}

void test_enseignants(void)
{
    post_enseignant(conn, "{\"nom\":\"SABI NGOYE\",\"prenom\":\"Kimba\",\"grade\":\"Professeur titulaire\",\"Universite\":\"UAC\"}", &erreur);
    TEST_ASSERT_EQUAL(0, erreur);

    request_cb(conn, 0, &erreur);
    TEST_ASSERT_EQUAL(0, erreur);

    get_enseignant(conn, "1", &erreur);
    TEST_ASSERT_EQUAL(0, erreur);

    request_cb(conn, &rs, &erreur);
    sprintf(req, "%s", "[{\"id\":1, \"enseignant\":{\"nom\":\"SABI NGOYE\",\"grade\":\"Professeur titulaire\",\"prenom\":\"Kimba\",\"Universite\":\"UAC\"}}]");
    cJSON_Minify(req);
    cJSON_Minify(rs);
    TEST_ASSERT_EQUAL_STRING(req, rs);

    update_enseignant(conn, "1", "{\"nom\":\"SABI NGOYE\",\"grade\":\"Professeur titulaire\",\"prenom\":\"Kimba\",\"Universite\":\"MIT\"}", &erreur);
    TEST_ASSERT_EQUAL(0, erreur);
    request_cb(conn, 0, &erreur);
    if (erreur)
        printf("%s\n", erreur);

    get_enseignants(conn, &erreur);
    TEST_ASSERT_EQUAL(0, erreur);

    request_cb(conn, &rs, &erreur);
    sprintf(req, "%s", "[{\"id\":1, \"enseignant\":{\"nom\":\"SABI NGOYE\",\"grade\":\"Professeur titulaire\",\"prenom\":\"Kimba\",\"Universite\":\"MIT\"}}]");
    cJSON_Minify(req);
    cJSON_Minify(rs);
    TEST_ASSERT_EQUAL_STRING(req, rs);
}

void test_assignment(void)
{
    assign_ecu(conn, "1", "1", "2020", "[{\"jour\":\"Lundi\",\"horaire\":\"9h-12h\"}, {\"jour\":\"Mardi\",\"horaire\":\"9h-12h\"}]", &erreur);
    if(erreur)
        fprintf(stderr, "%s\n", erreur);
    TEST_ASSERT_EQUAL(0, erreur);

    request_cb(conn, 0, &erreur);
    if (erreur)
        fprintf(stderr, "%s\n", erreur);
    TEST_ASSERT_EQUAL(0, erreur);

    get_teacher_ecus(conn, "1", "2020", &erreur);
    TEST_ASSERT_EQUAL(0, erreur);

    request_cb(conn, &rs, &erreur);
    TEST_ASSERT_EQUAL(0, erreur);

    sprintf(req, "%s", "[{\"id_ecu\":1, \"id_enseignant\":1,\"annee\":\"2020\",\"details\":[{\"jour\":\"Lundi\",\"horaire\":\"9h-12h\"}, {\"jour\":\"Mardi\",\"horaire\":\"9h-12h\"}]}]");
    cJSON_Minify(req);
    cJSON_Minify(rs);
    TEST_ASSERT_EQUAL_STRING(req, rs);

    update_ecu_assignment_details(conn, "1", "1", "2020", "[{\"jour\":\"Mardi\",\"horaire\":\"9h-12h\"}, {\"jour\":\"Jeudi\",\"horaire\":\"9h-12h\"}]", &erreur);
    TEST_ASSERT_EQUAL(0, erreur);

    request_cb(conn, 0, &erreur);
    TEST_ASSERT_EQUAL(0, erreur);

    get_teacher_ecus(conn, "1", "2020", &erreur);
    TEST_ASSERT_EQUAL(0, erreur);

    request_cb(conn, &rs, &erreur);
    TEST_ASSERT_EQUAL(0, erreur);

    sprintf(req, "%s", "[{\"id_ecu\":1, \"id_enseignant\":1,\"annee\":\"2020\",\"details\":[{\"jour\":\"Mardi\",\"horaire\":\"9h-12h\"}, {\"jour\":\"Jeudi\",\"horaire\":\"9h-12h\"}]}]");
    cJSON_Minify(req);
    cJSON_Minify(rs);
    TEST_ASSERT_EQUAL_STRING(req, rs);

    delete_ecu_assignment(conn, "1", "1", "2020", &erreur);
    TEST_ASSERT_EQUAL(0, erreur);

    request_cb(conn, 0, &erreur);
    TEST_ASSERT_EQUAL(0, erreur);

    get_teacher_ecus(conn, "1", "2020", &erreur);
    TEST_ASSERT_EQUAL(0, erreur);

    request_cb(conn, &rs, &erreur);
    TEST_ASSERT_EQUAL(0, erreur);

    sprintf(req, "%s", "");
    cJSON_Minify(req);
    cJSON_Minify(rs);
    TEST_ASSERT_EQUAL_STRING(req, rs);

    assign_ecu(conn, "1", "1", "2020", "[{\"jour\":\"Lundi\",\"horaire\":\"9h-12h\"}, {\"jour\":\"Mardi\",\"horaire\":\"9h-12h\"}]", &erreur);
    if (erreur)
        fprintf(stderr, "%s\n", erreur);
    TEST_ASSERT_EQUAL(0, erreur);

    request_cb(conn, 0, &erreur);
    if (erreur)
        fprintf(stderr, "%s\n", erreur);
    TEST_ASSERT_EQUAL(0, erreur);
}

void test_seances(void)
{
    pedagogie_post_seance_cours(conn, "1", "1","2020", "{\"date\":\"13/07/2020\",\"duree\":4,\"horaire\":\"08h-12h\",\"contenu\":\"Introduction\"}", &erreur);
    TEST_ASSERT_EQUAL(0, erreur);

    request_cb(conn, 0, &erreur);
    if(erreur)
        fprintf(stderr, "%s\n", erreur);
    TEST_ASSERT_EQUAL(0, erreur);

    pedagogie_get_seances_cours(conn, "1", "1", "2020", &erreur);
    TEST_ASSERT_EQUAL(0, erreur);

    request_cb(conn, &rs, &erreur);
    TEST_ASSERT_EQUAL(0, erreur);

    sprintf(req, "%s", "[{\"seances\":[{\"date\":\"13/07/2020\",\"duree\":4,\"contenu\":\"Introduction\",\"horaire\":\"08h-12h\"}]}]");
    cJSON_Minify(req);
    cJSON_Minify(rs);
    TEST_ASSERT_EQUAL_STRING(req, rs);

    /*update_seance_cours(conn, "1", "1", "1", "2019", "08/07/2020", "4", "Chapitre 1", &erreur);
    TEST_ASSERT_EQUAL(0, erreur);
    
    request_cb(conn, &rs, &erreur);
    TEST_ASSERT_EQUAL(0, erreur);

    get_seances_cours(conn, "1", "1", "2019", &erreur);
    if (erreur)
        fprintf(stderr, "%s\n", erreur);
    TEST_ASSERT_EQUAL(0, erreur);

    request_cb(conn, &rs, &erreur);
    TEST_ASSERT_EQUAL(0, erreur);

    sprintf(req, "%s", "[{\"date\":\"2020-08-07\", \"duree\":4,\"contenu\" : \"Chapitre 1\"}]");
    cJSON_Minify(req);
    cJSON_Minify(rs);
    TEST_ASSERT_EQUAL_STRING(req, rs);*/
}

void test_presence(void)
{
    
}

void test_notes(void)
{
    PGresult *rs2;
    int i;

    // insertion de 5 etudiants
    for (i = 0; i < 5; i++)
    {
        rs2 = PQexec(conn, "insert into pedagogie.etudiants(etudiant) values ('{\"nom\":\"foo\",\"prenom\":\"foo\"}')");
        if (PQresultStatus(rs2) == PGRES_COMMAND_OK)
            printf("OK\n");
    }
    
    pedagogie_post_note(conn, "1", "1", "2017", "{\"session\":1,\"note\":7}", &erreur);
    request_cb(conn, 0, &erreur);
    if (erreur)
        fprintf(stderr, "%s\n", erreur);
    TEST_ASSERT_EQUAL(0, erreur);

    pedagogie_post_note(conn, "1", "1", "2017", "{\"session\":2,\"note\":17}", &erreur);
    request_cb(conn, 0, &erreur);
    if (erreur)
        fprintf(stderr, "%s\n", erreur);
    TEST_ASSERT_EQUAL(0, erreur);

    pedagogie_post_note(conn, "1", "2", "2017","{\"session\":1,\"note\":17}", &erreur);
    request_cb(conn, 0, &erreur);
    if (erreur)
        fprintf(stderr, "%s\n", erreur);
    TEST_ASSERT_EQUAL(0, erreur);

    pedagogie_post_note(conn, "1", "3", "2017","{\"session\":1,\"note\":15}", &erreur);
    request_cb(conn, 0, &erreur);
    if (erreur)
        fprintf(stderr, "%s\n", erreur);
    TEST_ASSERT_EQUAL(0, erreur);

    pedagogie_post_note(conn, "1", "4", "2017", "{\"session\":1,\"note\":17}", &erreur);
    request_cb(conn, 0, &erreur);
    if (erreur)
        fprintf(stderr, "%s\n", erreur);
    TEST_ASSERT_EQUAL(0, erreur);

    pedagogie_post_note(conn, "1", "5", "2017", "{\"session\":1,\"note\":20}", &erreur);
    request_cb(conn, 0, &erreur);
    if (erreur)
        fprintf(stderr, "%s\n", erreur);
    TEST_ASSERT_EQUAL(0, erreur);

    pedagogie_get_notes(conn, "1", "2017", &erreur);
    if (erreur)
        fprintf(stderr, "%s\n", erreur);
    TEST_ASSERT_EQUAL(0, erreur);

    request_cb(conn, &rs, &erreur);
    if (erreur)
        fprintf(stderr, "%s\n", erreur);
    TEST_ASSERT_EQUAL(0, erreur);

    sprintf(req,
            "%s",
            "[{\"id_etudiants\": 1, \"note\":17,\"session\":2},{\"id_etudiants\": 2, \"note\":17,\"session\":1}, {\"id_etudiants\": 3, \"note\":15,\"session\":1}, {\"id_etudiants\": 4, \"note\":17,\"session\":1}, {\"id_etudiants\": 5, \"note\":20,\"session\":1}]");
    cJSON_Minify(req);
    cJSON_Minify(rs);
    TEST_ASSERT_EQUAL_STRING(req, rs);

    pedagogie_update_note(conn, "1", "1", "2018", "{\"session\":2,\"note\":19}", & erreur);
    if (erreur)
        fprintf(stderr, "%s\n", erreur);
    TEST_ASSERT_EQUAL(0, erreur);

    request_cb(conn, 0, &erreur);
    if (erreur)
        fprintf(stderr, "%s\n", erreur);
    TEST_ASSERT_EQUAL(0, erreur);

    pedagogie_get_notes(conn, "1", "2018", &erreur);
    if (erreur)
        fprintf(stderr, "%s\n", erreur);
    TEST_ASSERT_EQUAL(0, erreur);

    request_cb(conn, &rs, &erreur);
    if (erreur)
        fprintf(stderr, "%s\n", erreur);
    TEST_ASSERT_EQUAL(0, erreur);

    sprintf(req,
            "%s",
            "[{\"id_etudiant\": 1, \"id_ecu\": 1, \"annee\": 2017, \"note\":{\"note\":19,\"session\":2}},{\"id_etudiant\": 2, \"id_ecu\": 1, \"annee\": 2017, \"note\":{\"note\":17,\"session\":1}}, {\"id_etudiant\": 3, \"id_ecu\": 1, \"annee\": 2017, \"note\":{\"note\":15,\"session\":1}}, {\"id_etudiant\": 4, \"id_ecu\": 1, \"annee\": 2017, \"note\":{\"note\":17,\"session\":1}}, {\"id_etudiant\": 5, \"id_ecu\": 1, \"annee\": 2017, \"note\":{\"note\":20,\"session\":1}}]");
    cJSON_Minify(req);
    cJSON_Minify(rs);
    TEST_ASSERT_EQUAL_STRING(req, rs);
}

void setUp(void)
{
    
}

void tearDown(void)
{
    erreur = 0;
    rs = 0;
}

int main(void)
{    
    UNITY_BEGIN();
    db_open("../sql/pedagogie.sql", &conn, "sabingoyek7", "gndb");

    RUN_TEST(test_post_formation);

    RUN_TEST(test_get_formations);

    RUN_TEST(test_get_formation);

    RUN_TEST(test_update_formation);

    RUN_TEST(test_ues);

    RUN_TEST(test_ecus);

    RUN_TEST(test_enseignants);

    RUN_TEST(test_assignment);

    RUN_TEST(test_seances);

    RUN_TEST(test_notes);

    db_close("pedagogie", conn);

    return UNITY_END();
}
