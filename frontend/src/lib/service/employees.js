export const BASE_URL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_API_BASE_URL
    : "/api";

export const getAllEmployees = async () => {
  try {
    const res = await fetch(BASE_URL + "/employees");
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getEmployeeDetail = async (employeeId) => {
  try {
    const res = await fetch(BASE_URL + "/employees/" + employeeId);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createEmployee = async (employeeData) => {
  try {
    const res = await fetch(BASE_URL + "/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employeeData),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateEmployee = async (employeeId, employeeData) => {
  try {
    const res = await fetch(BASE_URL + "/employees/" + employeeId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employeeData),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteEmployee = async (employeeId) => {
  try {
    const res = await fetch(BASE_URL + "/employees/" + employeeId, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getDepartmentList = async () => {
  try {
    const res = await fetch(BASE_URL + "/departments");
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};
