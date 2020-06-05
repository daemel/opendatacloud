// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Injectable } from '@angular/core';

interface AppConfiguration {
    azureAD: {
        tenant: string;
        audience: string;
        policy: string;
    };
}

@Injectable()
export class AppConfigurationService {
    private config: AppConfiguration;

    loadConfig() {
        return fetch('/api/configuration')
            .then((rsp) => {
                if (!rsp.ok) {
                    throw new Error('Could not read application configuration.');
                }
                return rsp.json();
            })
            .then(data => {
                this.config = data;
            });
    }

    get current(): AppConfiguration {
        return this.config;
    }
}
