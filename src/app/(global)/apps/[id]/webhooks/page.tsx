"use client";

import { AuthHook } from "@/hooks/authHook";
import { AppLayout } from "@/layout/app-layout";

function Settings() {
  AuthHook("authenticated");

  return (
    <AppLayout>
      <div className="flex-1">
        <div className="grid gap-2">
          <h2 className="capitalize font-semibold">WebHooks</h2>
          <span className="text-sm max-w-[80%]">
            WebHooks are a feature that allows you to integrate with other apps
            like Slack, Jira, and ClickUp to help your QA team to monitor your
            production errors.
          </span>
        </div>
        <div className="mt-4">
          <div className="border-[1px] rounded-md p-2 md:px-4 md:py-8 ">
            <div className="flex items-center justify-center text-center">
              <div>
                <span className="md:md:max-w-[60%] inline-block">
                  This feature is not supported yet, but you will get a
                  notification once it is available.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default Settings;
