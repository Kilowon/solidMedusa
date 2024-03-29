export declare class TaxProvider {
    id: string;
    is_installed: boolean;
}
/**
 * @schema TaxProvider
 * title: "Tax Provider"
 * description: "The tax service used to calculate taxes"
 * type: object
 * properties:
 *   id:
 *     description: "The id of the tax provider as given by the plugin."
 *     type: string
 *     example: manual
 *   is_installed:
 *     description: "Whether the plugin is installed in the current version. Plugins that are no longer installed are not deleted by will have this field set to `false`."
 *     type: boolean
 *     default: true
 */
