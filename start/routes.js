"use strict";
/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");
const Database = use("Database");

// Task related routes
Route.post("/task", async ({ request, response }) => {
    const data = request.all();
    const { id, name, status } = data;

    // If id is passed in, we update not insert
    if (id !== undefined) {
        return await Database.table('Task').where('id', id).update({ name, status });
    }

    // Default is to insert a new record
    return await Database.table('Task').insert({ name, status });                                   
});

// Tasks
Route.get("/tasks", async () => {
  return await Database.table('Task').select('*');
});

// Task
Route.delete("/task", async ({ request, response }) => {
    const data = request.only(['id']);
    const { id } = data;
    return await Database.table('Task').where('id', id).delete();
});
