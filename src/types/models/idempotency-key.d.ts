export declare class IdempotencyKey {
    id: string;
    idempotency_key: string;
    created_at: Date;
    locked_at: Date;
    request_method: string;
    request_params: Record<string, unknown>;
    request_path: string;
    response_code: number;
    response_body: Record<string, unknown>;
    recovery_point: string;
    private beforeInsert;
}
/**
 * @schema IdempotencyKey
 * title: "Idempotency Key"
 * description: "Idempotency Key is used to continue a process in case of any failure that might occur."
 * type: object
 * required:
 *   - idempotency_key
 * properties:
 *   id:
 *     type: string
 *     description: The idempotency key's ID
 *     example: ikey_01G8X9A7ESKAJXG2H0E6F1MW7A
 *   idempotency_key:
 *     description: "The unique randomly generated key used to determine the state of a process."
 *     type: string
 *     externalDocs:
 *       url: https://docs.medusajs.com/advanced/backend/payment/overview#idempotency-key
 *       description: Learn more how to use the idempotency key.
 *   created_at:
 *     description: Date which the idempotency key was locked.
 *     type: string
 *     format: date-time
 *   locked_at:
 *     description: Date which the idempotency key was locked.
 *     type: string
 *     format: date-time
 *   request_method:
 *     description: "The method of the request"
 *     type: string
 *     example: POST
 *   request_params:
 *     type: object
 *     description: "The parameters passed to the request"
 *     example:
 *       id: cart_01G8ZH853Y6TFXWPG5EYE81X63
 *   request_path:
 *     description: "The request's path"
 *     type: string
 *     example: /store/carts/cart_01G8ZH853Y6TFXWPG5EYE81X63/complete
 *   response_code:
 *     type: string
 *     description: "The response's code."
 *     example: 200
 *   response_body:
 *     type: object
 *     description: "The response's body"
 *     example:
 *       id: cart_01G8ZH853Y6TFXWPG5EYE81X63
 *   recovery_point:
 *     type: string
 *     description: "Where to continue from."
 *     default: started
 */
