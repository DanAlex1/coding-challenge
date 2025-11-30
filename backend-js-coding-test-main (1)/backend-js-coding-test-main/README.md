
# Coding Challenge: RESTful API 

## Objective

Develop a RESTful API with two endpoints to manage and retrieve company data.

### Endpoints

1.  **GET /companies**
    
    -   Returns a list of companies in JSON format.
2.  **GET /companies/{id}**
    
    -   Returns details of a single company in JSON format.

### Data Structure

-   **Company Data:**
    
    -   `id`: Integer
    -   `name`: String
    -   `industry`: String
    -   `active`: Boolean
    -   `website`: String
    -   `telephone`: String
    -   `slogan`: String
    -   `address`: String
    -   `city`: String
    -   `country`: String
    -   `employees`: Nested array (details below)
-   **Employee Data:**
    
    -   `id`: Integer
    -   `first_name`: String
    -   `last_name`: String
    -   `email`: String (optional)
    -   `role`: String
    -   `company_id`: Integer (reference to a company)

### Data Source

-   Data is stored in multiple JSON files. Responses could include data from any file.
-   Schemas for these files are located in the `data/schemas` folder.
-   Your solution should handle inconsistencies in data and invalid JSON files gracefully.

### Endpoint Requirements

#### GET /companies

**Should:**

-   Return valid JSON with pagination metadata.
-   Return nested employee data if applicable.
-   Support `limit` and `offset` parameters for pagination.
-   Enable filtering by company name, active status, and employee name.

**Could:**

-   Support additional filters for future requirements.
-   Validate parameters for performance, security, and misuse prevention.

#### GET /companies/{id}

**Should:**

-   Return logically structured and valid JSON for easy client consumption.

**Could:**

-   Support returning multiple companies in one request.
-   Validate parameters for performance, security, and misuse prevention.

### Implementation

-   Develop using Node.js.
-   Use modern JavaScript (ES6+) or TypeScript.
-   You may use frameworks or vanilla JS/TS as preferred.

## Guidelines

-   Estimated duration: 3 hours.
-   Create a public Git repository and commit your code.
-   Submit the project by emailing the repository link.
-   Be prepared to discuss your solution.

## Discussion Points

Be ready to discuss the following aspects:

-   **Testing**: Unit, Integration, End-to-End tests.
-   **Architecture**: Deployment strategies, use of tools like Terraform, CloudFormation.
-   **Authentication**: Securing the API.
-   **Security**: Defending against malicious actors.
-   **Monitoring & Alerting**: Ensuring performance and reliability.
