import { UserManager } from 'oidc-client';
import { UserPrompt } from 'plugin/user-prompt';

/**
 * Configures the plugin.
 * @param {FrameworkConfiguration} aurelia - the aurelia framework configuration
 * @param {*} pluginCallback - the plugin callback
 */
export function configure(aurelia, pluginCallback) {
  const openIdConfiguration = pluginCallback();
  aurelia.container.registerInstance(UserManager, new UserManager(openIdConfiguration.userManagerSettings));
  aurelia.container.registerInstance(UserPrompt, new UserPrompt(openIdConfiguration.reconnectPrompt, openIdConfiguration.errorPrompt));
  aurelia.container.registerInstance(Window, window);
}
