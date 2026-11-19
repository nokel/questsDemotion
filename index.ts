/*
 * Vencord, a modification for Discord's desktop app
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import definePlugin, { OptionType } from "@utils/types";
import { findByPropsLazy } from "@webpack";

const RouterUtils = findByPropsLazy("getHistory");

const IGNORED = new Set(["/", "/app", "/login", "/register", "/logout"]);

const settings = definePluginSettings({
    lastPath: {
        type: OptionType.STRING,
        description: "Last page you had open",
        default: "",
        hidden: true
    }
});

let unlisten: (() => void) | undefined;

function save(pathname: string) {
    if (!pathname.startsWith("/") || IGNORED.has(pathname) || pathname.startsWith("/oauth2")) return;
    if (settings.store.lastPath !== pathname) settings.store.lastPath = pathname;
}

export default definePlugin({
    name: "QuestsDemotion",
    description: "Fixes Discord so that it goes back to opening your last tab instead of promoting 'Quests'",
    authors: [{ name: "Nokel", id: 189778143387713536n }],
    settings,

    patches: [
        {
            find: '"SessionRedirector"',
            replacement: [
                {
                    match: /\(0,\i\.\i\)\("SessionRedirector"\)/,
                    replace: "!1"
                },
                {
                    match: /(?<=defaultRoute:)(\i\.\i\.defaultRoute)(?=,defaultRouteFallback:)/,
                    replace: "$self.getStartRoute($1)"
                }
            ]
        }
    ],

    getStartRoute(fallback: string) {
        return settings.store.lastPath || fallback;
    },

    start() {
        unlisten = RouterUtils.getHistory().listen((location: { pathname: string; }) => save(location.pathname));
    },

    stop() {
        unlisten?.();
        unlisten = undefined;
    }
});
