const { check, param, query } = require('express-validator');
import { ErrorMessage } from '../helper/ErrorMessage';
import { body } from 'express-validator';



/**
 * @author poo
 * @date 22-01-2025
 * @description Function to check for the Validation of Query
 * @param {string} id
 * @param {boolean} isRequired
 */

export let checkQuery = (id) => {
    return query(id, ErrorMessage.id.required).isLength({ min: 1 })
        .trim()
        .exists()
}

/**
 * @author poo
 * @date 22-01-2025
 * @description Function to check for the Validation of Params
 * @param {string} id
 * @param {boolean} isRequired
 */

export let checkParam = (id) => {
    return param(id, ErrorMessage.id.required)
        .trim()
        .exists()
}

/**
 * @author poo
 * @date 22-01-2025
 * @description Function to check for the Validation of boady arguments
 * @param {string} val
 * @param {boolean} isRequired
 */
export let checkRequestBodyParams = (val) => {
    return body(val, ErrorMessage.general.required).isLength({ min: 1 })
        .trim()
        .exists().withMessage(ErrorMessage.general.required)
}
