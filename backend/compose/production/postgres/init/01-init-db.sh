#!/bin/bash
set -e

# Script de inicialización para PostgreSQL 17
# Crea la base de datos si no existe, con encoding UTF8 y timezone America/Bogota

echo "Iniciando configuración de base de datos PostgreSQL 17..."

# Variables de entorno requeridas
: ${POSTGRES_DB:?"POSTGRES_DB no está definido"}
: ${POSTGRES_USER:?"POSTGRES_USER no está definido"}
: ${POSTGRES_PASSWORD:?"POSTGRES_PASSWORD no está definido"}

echo "Configuración:"
echo "  - Base de datos: $POSTGRES_DB"
echo "  - Usuario: $POSTGRES_USER"
echo "  - Encoding: UTF8"
echo "  - Timezone: America/Bogota"

# Función para verificar si la base de datos existe
database_exists() {
    local db_name=$1
    psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "postgres" -tAc "SELECT 1 FROM pg_database WHERE datname='$db_name'" | grep -q 1
}

# Crear base de datos si no existe
if database_exists "$POSTGRES_DB"; then
    echo "La base de datos '$POSTGRES_DB' ya existe, omitiendo creación"
else
    echo "Creando base de datos '$POSTGRES_DB'..."

    psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "postgres" <<-EOSQL
        -- Crear la base de datos con configuraciones específicas
        CREATE DATABASE "$POSTGRES_DB"
        WITH
            OWNER = '$POSTGRES_USER'
            ENCODING = 'UTF8'
            LC_COLLATE = 'en_US.UTF-8'
            LC_CTYPE = 'en_US.UTF-8'
            TABLESPACE = pg_default
            CONNECTION LIMIT = -1
            IS_TEMPLATE = False;

        -- Comentario de la base de datos
        COMMENT ON DATABASE "$POSTGRES_DB"
        IS 'Base de datos para FT Portal Atalaya - Creada automáticamente';
EOSQL

    echo "Base de datos '$POSTGRES_DB' creada exitosamente"
fi

# Configurar timezone en la base de datos específica
echo "Configurando timezone America/Bogota..."
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    -- Configurar timezone para la base de datos
    ALTER DATABASE "$POSTGRES_DB" SET timezone TO 'America/Bogota';

    -- Configurar locale para la sesión actual
    SET timezone TO 'America/Bogota';

    -- Verificar configuración
    SHOW timezone;
EOSQL

# Crear extensiones comunes si no existen
echo "Configurando extensiones PostgreSQL..."
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    -- Crear extensión UUID si no existe (útil para Django)
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    -- Crear extensión pg_trgm para búsquedas de texto (útil para Django full-text search)
    CREATE EXTENSION IF NOT EXISTS "pg_trgm";

    -- Crear extensión unaccent para manejo de acentos
    CREATE EXTENSION IF NOT EXISTS "unaccent";

    -- Mostrar extensiones instaladas
    SELECT extname as "Extensión Instalada" FROM pg_extension WHERE extname IN ('uuid-ossp', 'pg_trgm', 'unaccent');
EOSQL

echo "Configuración de PostgreSQL 17 completada exitosamente!"
echo "Información de la base de datos:"

# Mostrar información final de la base de datos
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    SELECT
        current_database() as "Base de Datos",
        version() as "Versión PostgreSQL",
        current_setting('server_encoding') as "Encoding",
        current_setting('timezone') as "Timezone",
        pg_size_pretty(pg_database_size(current_database())) as "Tamaño";
EOSQL

echo "Inicialización completada!"
