import { Router } from "express";
import CounterController from "./counter.controller";

const counter: Router = Router();
const controller = new CounterController();

/**
 * CounterFilterDetail
 * @typedef {object} CounterFilterDetail
 * @property {string} id - hash id of counter filter
 * @property {number} counter_no - number if counter filter
 * @property {string} counter_name - name of counter filter
 */

/**
 * CounterFilterResponseBody
 * @typedef {object} CounterFilterResponseBody
 * @property {CounterFilterDetail} counter - counter filter detail
 */

/**
 * GET /process-token/counter/{id}
 * @summary Get counter by id
 * @tags counter
 * @security Authorization
 * @param {string} id.path.required - Hash id of city
 * @return {CounterFilterResponseBody} 200 - counter by company id
 * @return 401 - Unauthorized
 * @return 500 - Internal server error
 * @return 404 - Not found
 */
counter.get('/:id', controller.getCounterByCompanyId);

export default counter;
