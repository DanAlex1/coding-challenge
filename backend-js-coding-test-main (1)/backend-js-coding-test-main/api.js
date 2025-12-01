const express = require("express");
const fs = require("node:fs").promises;
const path = require("node:path");

const app = express();
const port = process.env.PORT || 3000;

//This function goes through all the JSON files in the data/companies folder and combines them into one array
async function loadCompanies() {
  const companies = [];
  const companiesDir = "data/companies";

  try {
    const files = await fs.readdir(companiesDir);

    for (const file of files) {
      if (file.endsWith(".json")) {
        try {
          const filePath = path.join(companiesDir, file);
          const content = await fs.readFile(filePath, "utf-8");
          const data = JSON.parse(content);
          companies.push(...data);
        } catch (err) {
          console.error(`Skipping ${file}:`, err.message);
        }
      }
    }
  } catch (err) {
    console.error("Error reading companies directory:", err.message);
  }

  return companies;
}

//This function does the same thing as the above function but for employees
async function loadEmployees() {
  const employees = [];
  const employeesDir = path.join(__dirname, "data", "employees");
  try {
    const files = await fs.readdir(employeesDir);
    for (const file of files) {
      if (file.endsWith(".json")) {
        try {
          const filePath = path.join(employeesDir, file);
          const content = await fs.readFile(filePath, "utf-8");
          const data = JSON.parse(content);
          employees.push(...data);
        } catch (err) {
          console.error(`Skipping ${file}:`, err.message);
        }
      }
    }
  } catch (err) {
    console.error("Error reading employees directory:", err.message);
  }
  return employees;
}

//This function takes the companies and employees arrays and adds the employees to their companies
function putEmployeesInCompanies(companies, employees) {
  return companies.map((company) => ({
    ...company,
    employees: employees.filter((emp) => emp.company_id === company.id),
  }));
}

//This is the main endpoint to displaying the companies. It also adds filtering and pagination
app.get("/companies", async (req, res) => {
  try {
    let companies = await loadCompanies();
    const employees = await loadEmployees();
    companies = putEmployeesInCompanies(companies, employees);
    if (req.query.name) {
      companies = companies.filter((c) =>
        c.name.toLowerCase().includes(req.query.name.toLowerCase())
      );
    }

    if (req.query.active) {
      companies = companies.filter(
        (c) => c.active === (req.query.active.toLowerCase() === "true")
      );
    }

    if (req.query.employee) {
      companies = companies.filter((c) => {
        for (const employee of c.employees) {
          const fullName =
            `${employee.first_name} ${employee.last_name}`.toLowerCase();
          if (fullName.includes(req.query.employee.toLowerCase())) {
            return true;
          }
        }
        return false;
      });
    }
    const limit = Number.parseInt(req.query.limit) || 10;
    const offset = Number.parseInt(req.query.offset) || 0;

    const paginatedCompanies = companies.slice(offset, offset + limit);

    res.json({
      data: paginatedCompanies,
      metadata: {
        total: companies.length,
        limit: limit,
        offset: offset,
        count: paginatedCompanies.length,
      },
    });
  } catch (error) {
    console.error("Error fetching companies:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});


//This is the second endpoint to get a specific company by its ID
app.get("/companies/:id", async (req, res) => {
  try {
    let companies = await loadCompanies();
    const employees = await loadEmployees();
    companies = putEmployeesInCompanies(companies, employees);
    const companyID = Number.parseInt(req.params.id);
    for (const company of companies) {
      if (company.id === companyID) {
        res.json(company);
        return;
      }
    }
    res.status(404).json({ error: "Company not found" });
  } catch (error) {
    console.error("Error fetching companies:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
