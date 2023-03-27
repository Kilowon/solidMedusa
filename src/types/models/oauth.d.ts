export declare class Oauth {
    id: string;
    display_name: string;
    application_name: string;
    install_url: string;
    uninstall_url: string;
    data: Record<string, unknown>;
    private beforeInsert;
}
/**
 * @schema OAuth
 * title: "OAuth"
 * description: "Represent an OAuth app"
 * type: object
 * required:
 *   - id
 *   - display_name
 *   - application_name
 * properties:
 *   id:
 *     type: string
 *     description: The app's ID
 *     example: example_app
 *   display_name:
 *     type: string
 *     description: The app's display name
 *     example: Example app
 *   application_name:
 *     type: string
 *     description: The app's name
 *     example: example
 *   install_url:
 *     type: string
 *     description: The URL to install the app
 *     format: uri
 *   uninstall_url:
 *     type: string
 *     description: The URL to uninstall the app
 *     format: uri
 *   data:
 *     type: object
 *     description: Any data necessary to the app.
 *     example: {}
 */
