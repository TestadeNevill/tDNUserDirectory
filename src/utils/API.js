import axios from "axios";

export default {
    allUsers: function () {
        return axios.get("https://randomuser.me/api/?results=200&nat=us")
    }
};
