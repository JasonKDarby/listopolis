import ApiBuilder from "claudia-api-builder";
import SignUp from './api/calls/SignUp/index';

const API = new ApiBuilder();

//Set up routes here.  Maybe not, dunno yet.
API.get("/hello/{name}", SignUp);

module.exports = API
