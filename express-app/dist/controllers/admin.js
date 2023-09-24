import { User } from "../db/User.js";
import { appConfig } from "../config/index.js";
export const getAllUserHandler = ({ query }, response) => {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || appConfig.pageSize;
    const search = query.search;
    User.getAllUsers(page, limit, search).then((users) => {
        response.json({ users });
    });
};
