"use strict";
const l = console.log;
/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");
const Database = use("Database");

// Task related routes
Route.post("/task", async ({ request, response }) => {
    const data = request.all();
    console.log(data);
    // const data = request.only(['id', 'name', 'status']);
    const { id, name, status } = data;
    console.log(name);

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
