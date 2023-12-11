import axios from "axios";
import { getConfig } from "../../utils/getConfig";
import { API_URL } from "../../app/config";

const getAllMedicine = async (user) => {
  const config = getConfig();
  const response = await axios.get(
    `${API_URL}medicine/get-all-medicine`,
    config
  );
  return response.data;
};

const deleteMedicine = async (user) => {
  const config = getConfig();
  const response = await axios.delete(
    `${API_URL}medicine/delete-medicine`,
    config
  );
  return response.data;
};

const updateMedicine = async (user, data) => {
  const config = getConfig();
  console.log(data);
  const response = await axios.put(
    `${API_URL}medicine/update-medicine`, data,
    config
  );
  return response.data;
};

const appointmentService = {
  getAllMedicine,
  deleteMedicine,
  updateMedicine
};

export default appointmentService;