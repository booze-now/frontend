import axios from "axios";

export default class DataService {
  constructor(baseURL) {
    axios.defaults.baseURL = baseURL;
  }
  getData(endpoint, callback) {
    axios
      .get(endpoint)
      .then(function (response) {
        callback(response.status, response.data);
      })
      .catch(function (error) {
        let errorResponse = '';
        if (error?.isAxiosError) {
          errorResponse = { message: error.message };
        } else {
          errorResponse = { message: error.response.message };
        }

        callback(error.response?.status, errorResponse);
      })
      .finally(function () { });
  }

  postData(endpoint, data, callback) {
    axios
      .post(endpoint, data)
      .then(function (response) {
        callback(response.status, response.data);
      })
      .catch(function (error) {
        callback(error.response.status, error.response.data);
      })
      .finally(function () { });
  }

  putData(endpoint, data, callback) {
    axios
      .put(endpoint, data)
      .then(function (response) {
        callback(response.status, response.data);
      })
      .catch(function (error) {
        callback(error.response.status, error.response.data);
      })
      .finally(function () { });
  }

  deleteData(endpoint, callback) {
    axios
      .delete(endpoint)
      .then(function (response) {
        callback(response.status, response.data);
      })
      .catch(function (error) {
        callback(error.response.status, error.response.data);

      })
      .finally(function () { });
  }
}
