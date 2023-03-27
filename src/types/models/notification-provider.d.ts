export declare class NotificationProvider {
    id: string;
    is_installed: boolean;
}
/**
 * @schema NotificationProvider
 * title: "Notification Provider"
 * description: "Represents a notification provider plugin and holds its installation status."
 * type: object
 * required:
 *   - id
 * properties:
 *   id:
 *     description: "The id of the notification provider as given by the plugin."
 *     type: string
 *     example: sendgrid
 *   is_installed:
 *     description: "Whether the plugin is installed in the current version. Plugins that are no longer installed are not deleted by will have this field set to `false`."
 *     type: boolean
 *     default: true
 */
