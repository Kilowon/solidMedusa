export declare class PaymentProvider {
    id: string;
    is_installed: boolean;
}
/**
 * @schema PaymentProvider
 * title: "Payment Provider"
 * description: "Represents a Payment Provider plugin and holds its installation status."
 * type: object
 * required:
 *   - id
 * properties:
 *   id:
 *     description: "The id of the payment provider as given by the plugin."
 *     type: string
 *     example: manual
 *   is_installed:
 *     description: "Whether the plugin is installed in the current version. Plugins that are no longer installed are not deleted by will have this field set to `false`."
 *     type: boolean
 *     default: true
 */
