# Use the official PostgreSQL image
FROM postgres:15

# Set environment variables
ENV POSTGRES_USER=kyc_user
ENV POSTGRES_PASSWORD=kyc_password
ENV POSTGRES_DB=kyc_database

# Copy initialization scripts
COPY ./init-scripts/ /docker-entrypoint-initdb.d/

# Expose the PostgreSQL port
EXPOSE 5432

# Add a health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD pg_isready -U kyc_user -d kyc_database || exit 1