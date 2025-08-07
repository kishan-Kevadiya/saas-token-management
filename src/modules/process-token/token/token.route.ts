import { Router } from 'express';
import RequestValidator from '@/middlewares/request-validator';
import TokenController from './token.controller';
import { tokenStatusUpdateDto } from './dto/token-update-status-input.dto';

const token: Router = Router();
const controller = new TokenController();

/**
 * Series
 * @typedef {object} Series
 * @property {number} id - Series ID
 * @property {string} hash_id - Series hash ID
 */

/**
 * Counter
 * @typedef {object} Counter
 * @property {number} id - Counter ID
 * @property {string} hash_id - Counter hash ID
 * @property {number} counter_no - Counter number
 */

/**
 * User
 * @typedef {object} User
 * @property {number} id - User ID
 * @property {string} hash_id - User hash ID
 * @property {string} name - User name
 */

/**
 * Language
 * @typedef {object} Language
 * @property {number} id - Language ID
 * @property {string} hash_id - Language hash ID
 * @property {string} name - Language name
 * @property {string} code - Language code (e.g., 'en')
 */

/**
 * Company
 * @typedef {object} Company
 * @property {number} id - Company ID
 * @property {string} hash_id - Company hash ID
 * @property {string} name - Company name
 */

/**
 * Department
 * @typedef {object} Department
 * @property {number} id - Department ID
 * @property {string} hash_id - Department hash ID
 * @property {string} name - Department name
 */

/**
 * TokenResponse
 * @typedef {object} TokenResponse
 * @property {string} token_id - Unique token ID
 * @property {string} token_abbreviation - Abbreviation of the token
 * @property {Series} series - Series information
 * @property {number} token_number - Token number
 * @property {string} token_date - Date of the token (ISO string)
 * @property {number} priority - Priority level of the token
 * @property {'PENDING' | 'HOLD' | 'ACTIVE' | 'TRANSFER' | 'WAITING' | 'COMPLETED'} token_status - Current status of the token
 * @property {Counter} counter - Counter information (optional)
 * @property {User} user - User who handled the token (optional)
 * @property {string} token_series_number - Token's series + number (e.g., A101)
 * @property {string} token_calling_time - Token call time (ISO string or null)
 * @property {string} token_out_time - Token completion time (ISO string or null)
 * @property {Language} language - Language selected for the token
 * @property {Company} company - Company that issued the token
 * @property {Counter} transfer_counter - Transferred counter details (optional)
 * @property {Department} transfer_department - Transferred department (optional)
 * @property {string} customer_name - Customer name (optional)
 * @property {string} customer_mobile_number - Customer mobile number (optional)
 * @property {string} token_generate_time - Token generation time (ISO string)
 * @property {string} form_data - form data (optional)
 * @property {string} time_taken - Time taken in hh:mm:ss format
 */

/**
 * TokenStatusInputBody
 * @typedef {object} TokenStatusInputBody
 * @property {('PENDING' | 'HOLD' | 'ACTIVE' | 'TRANSFER' | 'WAITING' | 'COMPLETED')} status - token status
 * @property {string} counter_id - hash id of the counter
 * @property {string} reason - reason for holding the token
 */

/**
 * POST /process-token/token
 * @summary Update token status
 * @tags token-status
 * @param {string} id.query.required - hash id of the token
 * @param {TokenStatusInputBody} request.body.required
 * @return {TokenResponse} 200 - Token status updated successfully
 * @return 400 - Bad request
 * @return 401 - Unauthorized
 * @return 404 - Not found
 * @return 500 - Internal server error
 */
token.post(
  '/',
  RequestValidator.validate(tokenStatusUpdateDto),
  controller.updateTokenStatus
);

/**
 * GET /process-token/token/active-token
 * @summary Get active token
 * @tags token-status
 * @security Authorization
 * @return {TokenResponse} 200 - Active token get successfully
 * @return 400 - Bad request
 * @return 401 - Unauthorized
 * @return 404 - Not found
 * @return 500 - Internal server error
 */
token.get(
  '/active-token',
  controller.getActiveToken
);



export default token;
