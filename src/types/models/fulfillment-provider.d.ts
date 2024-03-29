export declare class FulfillmentProvider {
    id: string;
    is_installed: boolean;
}
/**
 * @schema FulfillmentProvider
 * title: "Fulfillment Provider"
 * description: "Represents a fulfillment provider plugin and holds its installation status."
 * type: object
 * properties:
 *   id:
 *     description: "The id of the fulfillment provider as given by the plugin."
 *     type: string
 *     example: manual
 *   is_installed:
 *     description: "Whether the plugin is installed in the current version. Plugins that are no longer installed are not deleted by will have this field set to `false`."
 *     type: boolean
 *     example: true
 */
