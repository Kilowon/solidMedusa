export declare class StagedJob {
    id: string;
    event_name: string;
    data: Record<string, unknown>;
    options: Record<string, unknown>;
    private beforeInsert;
}
/**
 * @schema StagedJob
 * title: "Staged Job"
 * description: "A staged job resource"
 * type: object
 * required:
 *   - event_name
 * properties:
 *   id:
 *     type: string
 *     description: The staged job's ID
 *     example: job_01F0YET7BZTARY9MKN1SJ7AAXF
 *   event_name:
 *     description: "The name of the event"
 *     type: string
 *     example: order.placed
 *   data:
 *     description: Data necessary for the job
 *     type: object
 *     example: {}
 */
