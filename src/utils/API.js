import axios from "axios";

export default {
  search: function() {
    return axios.get("https://randomuser.me/api/?format=json&inc=name,email,phone,id&results=20", )
      .then(data => {
        return data
      })
  }
};
