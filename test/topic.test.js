const request = require("supertest");
const app = require("../app");

beforeAll(() => {
  initializeCityDatabase();
});

// Post topic api
describe("Test topic POST API", () => {

  test("It should response 201", async () => {
    const response = await request(app).post("/topic").send({name: 'john'});
    expect(response.statusCode).toBe(201);
  });

  test("It should response 400: error missing property name", async () => {
    const response = await request(app).post("/topic").send({});
    expect(response.statusCode).toBe(400);
  });

  test("It should response 400: error less than 5 chars", async () => {
    const response = await request(app).post("/topic").send({name:true});
    expect(response.statusCode).toBe(400);
  });
  test("It should response 400: error more than 50 chars", async () => {
    const name51char = "This usually means that there are asynchronous operations that weren't stopped in your tests. Consider running Jest with `--detectOpenHandles` to troubleshoot this issue"
    const response = await request(app).post("/topic").send({name:name51char});
    expect(response.statusCode).toBe(400);
  });

});

// GET topic api
describe("Test topic GET API", () => {
    test("It should response the GET method", async () => {
      const response = await request(app).get("/topic");
      expect(response.statusCode).toBe(200);
    });
});

// Delete topic API
describe("Test topic GET API", () => {
    test("It should response the GET method", async () => {
      const response = await request(app).delete("/topic/");
      expect(response.statusCode).toBe(200);
    });
});
// Test delete topic API
describe("Test topic DELETE API", () => {
    // let delete_topic_id = "";
    // beforeEach( async () => {
    //     // insert a topic to db then reasign id to id above.
    //     const topic = await request(app).post("/topic").send({name: 'john'});
    //     delete_topic_id = topic._body._id;

    //     // initializeCityDatabase();
    // });
    const fake_id ="not_exist";
    test("It should response error: 404 item not exist in db", async () => {
      const response = await request(app).delete(`/topic/${fake_id}`);
      expect(response.statusCode).toBe(404);
    });

    test("It should response success: 200", async () => {
      //  const topic = await request(app).post("/topic").send({name: 'john'});
       const delete_topic_id =  "q-QtVFYuL"//topic._body._id;
       console.log(delete_topic_id);
       const response = await request(app).delete("/topic/"+delete_topic_id);
       expect(response.statusCode).toBe(200);
      });
});