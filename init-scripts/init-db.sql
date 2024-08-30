-- Create enum type for submission status
CREATE TYPE submission_status AS ENUM ('APPROVED', 'REJECTED', 'INCOMPLETE', 'PENDING');

-- Create partners table with configuration values
CREATE TABLE partners
(
    id                        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name                      VARCHAR NOT NULL,
    webhook_url               VARCHAR NOT NULL,
    prediction_high_threshold FLOAT   NOT NULL,
    prediction_low_threshold  FLOAT   NOT NULL,
    aml_state                 BOOLEAN NOT NULL,
    cft_state                 BOOLEAN NOT NULL,
    created_at                TIMESTAMP        DEFAULT CURRENT_TIMESTAMP,
    updated_at                TIMESTAMP        DEFAULT CURRENT_TIMESTAMP
);

-- Create customers table
CREATE TABLE customers
(
    id                     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    partner_id             UUID REFERENCES partners (id),
    email                  VARCHAR    NOT NULL,
    full_name              VARCHAR    NOT NULL,
    gender                 VARCHAR(9) NOT NULL,
    address                VARCHAR    NOT NULL,
    phone_number           VARCHAR    NOT NULL,
    identification_number  CHAR(16)   NOT NULL,
    identification_picture TEXT       NOT NULL,
    created_at             TIMESTAMP        DEFAULT CURRENT_TIMESTAMP,
    updated_at             TIMESTAMP        DEFAULT CURRENT_TIMESTAMP
);

-- Create submissions table
CREATE TABLE submissions
(
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES customers (id),
    status      submission_status NOT NULL,
    created_at  TIMESTAMP        DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP        DEFAULT CURRENT_TIMESTAMP
);

-- Create liveness_checks table
CREATE TABLE liveness_checks
(
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    submission_id UUID REFERENCES submissions (id),
    self_picture  TEXT    NOT NULL,
    score         VARCHAR NOT NULL,
    passed        BOOLEAN,
    created_at    TIMESTAMP        DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP        DEFAULT CURRENT_TIMESTAMP
);

-- Create aml_checks table
CREATE TABLE aml_checks
(
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    submission_id UUID REFERENCES submissions (id),
    passed        BOOLEAN,
    created_at    TIMESTAMP        DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP        DEFAULT CURRENT_TIMESTAMP
);

-- Create cft_checks table
CREATE TABLE cft_checks
(
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    submission_id UUID REFERENCES submissions (id),
    passed        BOOLEAN,
    created_at    TIMESTAMP        DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP        DEFAULT CURRENT_TIMESTAMP
);

-- Add indexes for foreign keys to improve query performance
CREATE INDEX idx_customers_partner_id ON customers (partner_id);
CREATE INDEX idx_submissions_customer_id ON submissions (customer_id);
CREATE INDEX idx_liveness_checks_submission_id ON liveness_checks (submission_id);
CREATE INDEX idx_aml_checks_submission_id ON aml_checks (submission_id);
CREATE INDEX idx_cft_checks_submission_id ON cft_checks (submission_id);