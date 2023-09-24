import shortId from "shortid";
import { UsersDB } from "./index.js";
import _ from "lodash";
import jwt from "jsonwebtoken";
import passwordHash from "password-hash";
import { appConfig } from "../config/index.js";
class User {
    constructor(value) {
        this.email = value.email;
        this.firstName = value.firstName;
        this.lastName = value.lastName;
        this.password = value.password;
        this.id = value.id || shortId();
    }
    static createUser(newUser) {
        const toSave = Object.assign(Object.assign({}, newUser), { password: passwordHash.generate(newUser.password || ""), id: shortId() });
        return UsersDB.find("/", (user) => {
            return user.email == toSave.email;
        }).then((user) => {
            if (user) {
                throw Error("User already exists");
            }
            return UsersDB.push(`/${toSave.id}`, toSave).then(() => {
                return toSave;
            });
        });
    }
    login() {
        const email = this.email;
        const password = this.password;
        return UsersDB.find("/", (user) => {
            console.log("````````````");
            console.log(user.email == email);
            console.log(user.password, password);
            console.log(passwordHash.verify(password, user.password));
            return (user.email == email && passwordHash.verify(password, user.password));
        }).then((user) => {
            console.log(user);
            if (user) {
                return {
                    message: "login success",
                    token: jwt.sign({
                        id: user.id,
                    }, appConfig.JWTSecret),
                };
            }
            throw new Error("Invalid username or password");
        });
    }
    static getAllUsers(page = 1, limit = 10, search) {
        const from = (page - 1) * limit;
        const to = from + limit;
        if (search) {
            return UsersDB.filter("/", (user) => {
                return (user.email.includes(search) ||
                    user.firstName.includes(search) ||
                    user.lastName.includes(search));
            }).then((users = []) => {
                return users.slice(from, to).map((value) => new User(value));
            });
        }
        return UsersDB.getData("/").then((data) => {
            return _.values(data)
                .slice(from, to)
                .map((value) => new User(value));
        });
    }
    toJSON() {
        _.unset(this, "password");
        return this;
    }
}
export { User };
const hash = passwordHash.generate("123456789");
console.log(hash);
console.log(passwordHash.verify("123456789", "sha1$87dc4e7b$1$0b9917e7a0969523cdbc46bcf84db228c995cca5"));
