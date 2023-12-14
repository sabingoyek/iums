-- Database generated with pgModeler (PostgreSQL Database Modeler).
-- pgModeler  version: 0.9.2
-- PostgreSQL version: 12.0
-- Project Site: pgmodeler.io
-- Model Author: ---


-- Database creation must be done outside a multicommand file.
-- These commands were put in this file only as a convenience.
-- -- object: nouvelle_base | type: DATABASE --
-- DROP DATABASE IF EXISTS nouvelle_base;
-- CREATE DATABASE nouvelle_base;
-- -- ddl-end --
-- 

-- object: pedagogie | type: SCHEMA --
DROP SCHEMA IF EXISTS pedagogie CASCADE;
CREATE SCHEMA pedagogie;
-- ddl-end --

-- -- object: scolarite | type: SCHEMA --
DROP SCHEMA IF EXISTS scolarite CASCADE;
-- CREATE SCHEMA scolarite;
-- -- ddl-end --
-- 
-- SET search_path TO pg_catalog,public,pedagogie,scolarite;
-- ddl-end --

-- object: pedagogie.formations | type: TABLE --
DROP TABLE IF EXISTS pedagogie.formations CASCADE;
CREATE TABLE pedagogie.formations (
	id serial NOT NULL,
	formation jsonb,
	CONSTRAINT formation_pk PRIMARY KEY (id),
	CONSTRAINT domaine_not_null CHECK (formation->>'domaine' is not null),
	CONSTRAINT mention_not_null CHECK (formation->>'mention' is not null),
	CONSTRAINT specialite_not_null CHECK (formation->>'specialite' is not null),
	CONSTRAINT grade_not_null CHECK (formation->>'grade' is not null),
	CONSTRAINT duree_not_null CHECK (formation->>'duree' is not null)

);
-- ddl-end --
COMMENT ON COLUMN pedagogie.formations.formation IS E'domaine, mention, specialite, grade, duree';
-- ddl-end --

-- object: pedagogie.ues | type: TABLE --
DROP TABLE IF EXISTS pedagogie.ues CASCADE;
CREATE TABLE pedagogie.ues (
	id serial NOT NULL,
	ue jsonb,
	id_formations integer NOT NULL,
	CONSTRAINT ue_pk PRIMARY KEY (id),
	CONSTRAINT code_not_null CHECK (ue->>'code' is not null),
	CONSTRAINT nbre_credit_not_null CHECK (ue->>'credits' is not null),
	CONSTRAINT num_semestre_not_null CHECK (ue->>'semestre' is not null),
	CONSTRAINT intitule_not_null CHECK (ue->>'intitule' is not null)

);
-- ddl-end --
COMMENT ON COLUMN pedagogie.ues.ue IS E'code, masse_horaire, nbre_credit, num_semestre, intitule';
-- ddl-end --

-- object: pedagogie.ecus | type: TABLE --
DROP TABLE IF EXISTS pedagogie.ecus CASCADE;
CREATE TABLE pedagogie.ecus (
	id serial NOT NULL,
	ecu jsonb,
	id_ues integer NOT NULL,
	CONSTRAINT ecu_pk PRIMARY KEY (id),
	CONSTRAINT intitule_not_null CHECK (ecu->>'intitule' is not null),
	CONSTRAINT nheures_not_null CHECK (ecu->>'nheures' is not null)

);
-- ddl-end --
COMMENT ON COLUMN pedagogie.ecus.ecu IS E'intitule,heures';
-- ddl-end --

-- object: pedagogie.enseignants | type: TABLE --
DROP TABLE IF EXISTS pedagogie.enseignants CASCADE;
CREATE TABLE pedagogie.enseignants (
	id serial NOT NULL,
	enseignant jsonb NOT NULL,
	CONSTRAINT enseignants_pk PRIMARY KEY (id),
	CONSTRAINT grade_not_null CHECK (enseignant->>'grade' is not null),
	CONSTRAINT nom_not_null CHECK (enseignant->>'nom' is not null),
	CONSTRAINT prenom_not_null CHECK (enseignant->>'prenom' is not null)

);
-- ddl-end --
COMMENT ON COLUMN pedagogie.enseignants.enseignant IS E'nom, prenom, grade, universite, email';
-- ddl-end --

-- object: ues_fk | type: CONSTRAINT --
-- ALTER TABLE pedagogie.ecus DROP CONSTRAINT IF EXISTS ues_fk CASCADE;
ALTER TABLE pedagogie.ecus ADD CONSTRAINT ues_fk FOREIGN KEY (id_ues)
REFERENCES pedagogie.ues (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: pedagogie.etudiants | type: TABLE --
DROP TABLE IF EXISTS pedagogie.etudiants CASCADE;
CREATE TABLE pedagogie.etudiants (
	id serial NOT NULL,
	etudiant jsonb NOT NULL,
	CONSTRAINT etudiants_pk PRIMARY KEY (id),
	CONSTRAINT nom_not_null CHECK (etudiant->>'nom' is not null),
	CONSTRAINT prenom_not_null CHECK (etudiant->>'prenom' is not null)

);
-- ddl-end --
COMMENT ON COLUMN pedagogie.etudiants.etudiant IS E'nom, prenom';
-- ddl-end --

-- object: pedagogie.notes | type: TABLE --
DROP TABLE IF EXISTS pedagogie.notes CASCADE;
CREATE TABLE pedagogie.notes (
	id_etudiants integer NOT NULL,
	id_ecus integer NOT NULL,
	note jsonb NOT NULL DEFAULT '[]',
	annee char(4) NOT NULL,
	CONSTRAINT notes_pk PRIMARY KEY (id_etudiants,id_ecus,annee)

);
-- ddl-end --

-- object: etudiants_fk | type: CONSTRAINT --
-- ALTER TABLE pedagogie.notes DROP CONSTRAINT IF EXISTS etudiants_fk CASCADE;
ALTER TABLE pedagogie.notes ADD CONSTRAINT etudiants_fk FOREIGN KEY (id_etudiants)
REFERENCES pedagogie.etudiants (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: ecus_fk | type: CONSTRAINT --
-- ALTER TABLE pedagogie.notes DROP CONSTRAINT IF EXISTS ecus_fk CASCADE;
ALTER TABLE pedagogie.notes ADD CONSTRAINT ecus_fk FOREIGN KEY (id_ecus)
REFERENCES pedagogie.ecus (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: formations_fk | type: CONSTRAINT --
-- ALTER TABLE pedagogie.ues DROP CONSTRAINT IF EXISTS formations_fk CASCADE;
ALTER TABLE pedagogie.ues ADD CONSTRAINT formations_fk FOREIGN KEY (id_formations)
REFERENCES pedagogie.formations (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: pedagogie.attribution_ecus | type: TABLE --
DROP TABLE IF EXISTS pedagogie.attribution_ecus CASCADE;
CREATE TABLE pedagogie.attribution_ecus (
	id_ecus integer NOT NULL,
	id_enseignants integer NOT NULL,
	annee char(4) NOT NULL,
	nheures smallint DEFAULT 0,
	details jsonb NOT NULL,
	CONSTRAINT attribution_ecus_pk PRIMARY KEY (id_ecus,id_enseignants,annee)

);
-- ddl-end --
COMMENT ON COLUMN pedagogie.attribution_ecus.details IS E'{"details": [{"jour": "Lundi", "horaire": "9h-12h"}, {"jour": "Mardi", "horaire": "9h-12h"}]}';
-- ddl-end --

-- object: ecus_fk | type: CONSTRAINT --
-- ALTER TABLE pedagogie.attribution_ecus DROP CONSTRAINT IF EXISTS ecus_fk CASCADE;
ALTER TABLE pedagogie.attribution_ecus ADD CONSTRAINT ecus_fk FOREIGN KEY (id_ecus)
REFERENCES pedagogie.ecus (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: enseignants_fk | type: CONSTRAINT --
-- ALTER TABLE pedagogie.attribution_ecus DROP CONSTRAINT IF EXISTS enseignants_fk CASCADE;
ALTER TABLE pedagogie.attribution_ecus ADD CONSTRAINT enseignants_fk FOREIGN KEY (id_enseignants)
REFERENCES pedagogie.enseignants (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --


