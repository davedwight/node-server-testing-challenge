const db = require("../../data/db-config");
const User = require("./model");

test("is the correct environment", () => {
  expect(process.env.DB_ENV).toBe("testing");
});

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db.seed.run();
});
afterAll(async () => {
  await db.destroy();
});

describe('users model', () => {
    describe('fetch', () => {
        test('it returns all users', async () => {
            const users = await User.fetch();
            expect(users).toMatchObject([
                { user_id: 1, username: 'foo' },
                { user_id: 2, username: 'bar' },
                { user_id: 3, username: 'baz' }
            ])
        })
    })
    describe('add', () => {
        test('it adds a new user to the database', async () => {
            const newUser = await User.add({ username: 'foobar' });
            expect(newUser).toMatchObject({
                user_id: 4,
                username: 'foobar'            
            })
        })
    })
    describe('remove', () => {
        test('it successfully removes the user', async () => {
            await User.remove(3);
            const remainingUsers = await db('users');
            expect(remainingUsers).toHaveLength(2);
            expect(remainingUsers).toMatchObject([
                { user_id: 1, username: 'foo' },
                { user_id: 2, username: 'bar' }
            ])
        })
        test('it returns the deleted user', async () => {
            const removedUser = await User.remove(3);
            expect(removedUser).toMatchObject({
                user_id: 3
            })
        })
    })
})