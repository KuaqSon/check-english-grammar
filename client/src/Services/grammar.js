import axios from "axios";
const BaseUrl = process.env.MODE === "prod" ? "" : "http://localhost:3001";

export const checkSentence = ({ text }, callback) => {
  axios({
    method: "post",
    url: `${BaseUrl}/api/v1/grammar/check`,
    data: {
      language: "en-US",
      text
    }
  })
    .then(response => {
      if (callback && response.data) callback(response.data.matches);
    })
    .catch(e => {
      console.error(e);
    });
};
