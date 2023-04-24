export const fetchCandidates = async (candidateId = "") => {
  const response = await fetch(
    `http://localhost:3333/api/candidates${candidateId}`
  );
  const data = await response.json();
  return data;
};

export const fetchReports = async () => {
  const response = await fetch("http://localhost:3333/api/reports");
  const data = await response.json();
  return data;
};

export const fetchCompanies = async () => {
  const response = await fetch("http://localhost:3333/api/companies");
  const data = await response.json();
  return data;
};