import request from "supertest";
import {
    clearDatabase,
    setupIntegrationTest,
    stopTestDatabase,
} from "../../utils/testDatabase";
import { NewUserRequest } from "../../../types/NewUserRequest";
import { User, UserStatus } from "../../../model/User";
import { accessCollection } from "../../../config/mongoClient";
import { Collection } from "mongodb";
import { App } from "supertest/types";

describe("POST /users", () => {
    let usersCollection: Collection<User>;
    let app: App;

    beforeAll(async () => {
        app = await setupIntegrationTest();
        usersCollection = await accessCollection<User>(
            process.env.USER_COLLECTION_NAME ?? "users"
        );
    });

    afterEach(async () => {
        await clearDatabase(usersCollection);
    });

    afterAll(async () => {
        await stopTestDatabase();
    });

    test("Should create and return a new user", async () => {
        const newUser: NewUserRequest = {
            username: "johnsmith",
            uid: "abc123",
        };

        const res = await request(app)
            .post("/users/create")
            .send(newUser)
            .expect(200);

        const expectedUser: User = {
            username: "johnsmith",
            uid: "abc123",
            status: UserStatus.ACTIVE,
            createdAt: new Date().toISOString(),
        };

        expect(newUser.uid).toBe(expectedUser.uid);
        expect(res.body).toMatchObject({
            message: "Created user with UID: abc123",
        });
    }, 30000);

    test("Should return error when no URI provided", async () => {
        const newUser = {
            username: "alex",
        };

        const res = await request(app)
            .post("/users/create")
            .send(newUser)
            .expect(400);

        expect(res.body).toMatchObject({
            error: "uid was not provided.",
        });
    }, 30000);

    test("Should return error when no Username not provided", async () => {
        const newUser = {
            uid: "abc123",
        };

        const res = await request(app)
            .post("/users/create")
            .send(newUser)
            .expect(400);

        expect(res.body).toMatchObject({
            error: "username was not provided.",
        });
    }, 30000);
});
