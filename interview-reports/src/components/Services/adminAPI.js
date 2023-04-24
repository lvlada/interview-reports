export const postReport = async (data) => {
  const response = await fetch("http://localhost:3333/api/reports", {
    method: "POST",
    body: JSON.stringify({
      candidateId: data.candidateId,
      candidateName: data.candidateName,
      companyId: data.companyId,
      companyName: data.companyName,
      interviewDate: data.interviewDate,
      note: data.note,
      phase: data.phase,
      status: data.status,
    }),
    headers: {
      "Content-type": "application/json",
    },
  });

  const resData = await response.json();
  return resData;
};

export const deleteReport = async (data) => {
  const response = await fetch(`http://localhost:3333/api/reports/${data}`, {
    method: "DELETE",
  });

  const resData = await response.json();
  return resData;
};
